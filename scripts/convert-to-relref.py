#!/usr/bin/env python3
"""Convert relative markdown links to Hugo relref shortcodes.

Handles the reference section move by resolving links from original file locations.
"""

import os
import re
import sys
from pathlib import Path

CONTENT_ROOT = Path("content/en")

# Files moved from old_path -> new_path (relative to content/en/)
# These are directory prefixes
MOVED_DIRS = {
    "docs/practices": "docs/reference/practices",
    "docs/metrics": "docs/reference/metrics",
    "docs/testing": "docs/reference/testing",
    "docs/pipeline-reference-architecture": "docs/reference/pipeline-reference-architecture",
    "docs/defect-sources": "docs/reference/defect-sources",
}

# Standalone files moved
MOVED_FILES = {
    "docs/glossary.md": "docs/reference/glossary.md",
    "docs/cd-dependency-tree.md": "docs/reference/cd-dependency-tree.md",
    "docs/dora-capabilities.md": "docs/reference/dora-capabilities.md",
    "docs/faq.md": "docs/reference/faq.md",
    "docs/resources.md": "docs/reference/resources.md",
}


def get_original_path(current_path_rel):
    """Get the pre-move path for a file (relative to content/en/)."""
    s = str(current_path_rel)
    for new_prefix, old_prefix in [(v, k) for k, v in MOVED_DIRS.items()]:
        if s.startswith(new_prefix):
            return Path(s.replace(new_prefix, old_prefix, 1))
    for new_file, old_file in [(v, k) for k, v in MOVED_FILES.items()]:
        if s == new_file:
            return Path(old_file)
    return current_path_rel


def resolve_target(source_dir, relative_link):
    """Resolve a relative link to an absolute content path.

    source_dir: directory of the source file, relative to content/en/
    relative_link: the relative path from the markdown link (without anchor)
    Returns: absolute path relative to content/en/ (e.g., 'docs/practices/ci')
    """
    # Join and normalize
    resolved = os.path.normpath(os.path.join(str(source_dir), relative_link))
    # Remove any trailing slash
    resolved = resolved.rstrip("/")
    return resolved


def map_to_new_location(old_path):
    """Map an old content path to its new location after moves."""
    s = str(old_path)
    for old_prefix, new_prefix in MOVED_DIRS.items():
        if s.startswith(old_prefix):
            return s.replace(old_prefix, new_prefix, 1)
    for old_file, new_file in MOVED_FILES.items():
        old_base = old_file.replace(".md", "")
        if s == old_base or s.startswith(old_base + "/") or s.startswith(old_base + "#"):
            return s.replace(old_base, new_file.replace(".md", ""), 1)
    return s


def path_to_relref(content_path):
    """Convert a content-relative path to a relref argument.

    content_path: path relative to content/en/ (e.g., 'docs/reference/practices/ci')
    Returns: relref path (e.g., '/docs/reference/practices/ci')
    """
    # Ensure leading slash
    p = "/" + content_path.lstrip("/")
    # Remove trailing slash
    p = p.rstrip("/")
    return p


def process_file(filepath):
    """Process a single .md file, converting relative links to relref."""
    filepath = Path(filepath)
    rel_path = filepath.relative_to(CONTENT_ROOT)

    # Get the original location for path resolution
    original_path = get_original_path(rel_path)

    # Determine the directory for resolving relative links
    # For _index.md files, the "directory" is the parent (the section itself)
    if original_path.name == "_index.md":
        source_dir = original_path.parent
    else:
        source_dir = original_path.parent

    content = filepath.read_text()
    changes = 0

    def replace_link(match):
        nonlocal changes
        full_match = match.group(0)
        prefix = match.group(1)  # [text](
        link_target = match.group(2)  # the path
        suffix = match.group(3)  # optional title + )

        # Skip external links
        if link_target.startswith(("http://", "https://", "mailto:")):
            return full_match

        # Skip same-page anchors
        if link_target.startswith("#"):
            return full_match

        # Skip already-converted relref/ref
        if "relref" in prefix or "ref " in prefix:
            return full_match

        # Skip image references and shortcodes
        if prefix.startswith("!"):
            return full_match

        # Split off anchor
        anchor = ""
        if "#" in link_target:
            link_target, anchor = link_target.split("#", 1)
            anchor = "#" + anchor

        # Skip non-relative links (absolute paths starting with /)
        if link_target.startswith("/"):
            # Already absolute - just convert to relref
            relref_path = link_target.rstrip("/")
            if anchor:
                relref_path += anchor
            changes += 1
            return f'{prefix}{{{{< relref "{relref_path}" >}}}}{suffix}'

        # Resolve the relative path from the original source directory
        resolved = resolve_target(source_dir, link_target)

        # Map to new location if it was moved
        new_path = map_to_new_location(resolved)

        # Convert to relref format
        relref_path = path_to_relref(new_path)
        if anchor:
            relref_path += anchor

        changes += 1
        return f'{prefix}{{{{< relref "{relref_path}" >}}}}{suffix}'

    # Pattern matches markdown links: [text](path) or [text](path "title")
    # Negative lookbehind for ! to skip image links
    # Group 1: everything up to and including the opening (
    # Group 2: the link target (path + optional anchor)
    # Group 3: optional title and closing )
    pattern = r'((?<!!)\[[^\]]*\]\()([^)\s"]+)((?:\s+"[^"]*")?\))'

    new_content = re.sub(pattern, replace_link, content)

    if changes > 0:
        filepath.write_text(new_content)

    return changes


def main():
    total_changes = 0
    total_files = 0

    # Process all .md files under content/en/docs/
    docs_dir = CONTENT_ROOT / "docs"
    for md_file in sorted(docs_dir.rglob("*.md")):
        changes = process_file(md_file)
        if changes > 0:
            total_files += 1
            total_changes += changes
            print(f"  {md_file}: {changes} links converted")

    print(f"\nTotal: {total_changes} links converted across {total_files} files")


if __name__ == "__main__":
    main()
