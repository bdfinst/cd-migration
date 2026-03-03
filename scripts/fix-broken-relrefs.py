#!/usr/bin/env python3
"""Fix broken relref paths by matching page basenames to actual file locations."""

import re
import subprocess
from pathlib import Path

CONTENT_ROOT = Path("content/en")

def build_page_index():
    """Build a map of page basename -> full path for all .md files."""
    index = {}
    for md_file in CONTENT_ROOT.rglob("*.md"):
        rel = md_file.relative_to(CONTENT_ROOT)
        path_str = str(rel)
        if path_str.endswith("/_index.md"):
            url_path = "/" + path_str[:-len("/_index.md")]
        elif path_str.endswith(".md"):
            url_path = "/" + path_str[:-len(".md")]
        else:
            continue

        basename = url_path.rsplit("/", 1)[-1]
        if basename not in index:
            index[basename] = []
        index[basename].append(url_path)

    return index

def get_broken_refs_with_sources():
    """Get broken relref paths with their source files and line numbers."""
    result = subprocess.run(
        ["hugo", "--minify"],
        capture_output=True, text=True, timeout=120
    )
    broken = {}
    for line in result.stderr.split("\n"):
        if "REF_NOT_FOUND" not in line:
            continue
        match = re.search(r'Ref "([^"]+)":\s*"([^"]+):(\d+):(\d+)"', line)
        if match:
            ref = match.group(1)
            source_file = match.group(2)
            ref_no_anchor = ref.split("#")[0]
            if ref_no_anchor not in broken:
                broken[ref_no_anchor] = set()
            broken[ref_no_anchor].add(source_file)
    return broken

def find_correct_path(broken_path, page_index):
    """Try to find the correct path for a broken ref."""
    basename = broken_path.rstrip("/").rsplit("/", 1)[-1]
    candidates = page_index.get(basename, [])

    if len(candidates) == 1:
        return candidates[0]
    elif len(candidates) > 1:
        # Try to disambiguate using path components
        broken_parts = set(broken_path.strip("/").split("/"))
        best = None
        best_score = 0
        for c in candidates:
            candidate_parts = set(c.strip("/").split("/"))
            score = len(broken_parts & candidate_parts)
            if score > best_score:
                best_score = score
                best = c
        return best

    return None

def main():
    print("Building page index...")
    page_index = build_page_index()
    print(f"  {sum(len(v) for v in page_index.values())} pages indexed")

    print("Getting broken refs from Hugo build...")
    broken_refs = get_broken_refs_with_sources()
    print(f"  {len(broken_refs)} unique broken ref paths")

    print("Finding correct paths...")
    fixes = {}
    unfixable = []
    for broken in sorted(broken_refs.keys()):
        correct = find_correct_path(broken, page_index)
        if correct:
            fixes[broken] = correct
        else:
            unfixable.append(broken)
            print(f"  UNFIXABLE: {broken}")

    print(f"\n{len(fixes)} fixable, {len(unfixable)} unfixable")

    # Now do the actual replacements in files
    total_fixed = 0
    for md_file in sorted(CONTENT_ROOT.rglob("*.md")):
        content = md_file.read_text()
        new_content = content

        for broken, correct in fixes.items():
            # Replace the broken path in relref shortcodes
            # Must handle both with and without anchors
            # Pattern: relref "broken_path" or relref "broken_path#anchor"
            old_pattern = f'relref "{broken}'
            new_pattern = f'relref "{correct}'
            if old_pattern in new_content:
                new_content = new_content.replace(old_pattern, new_pattern)

        if new_content != content:
            md_file.write_text(new_content)
            changes = sum(1 for b in fixes if f'relref "{b}' in content)
            total_fixed += changes
            print(f"  Fixed: {md_file}")

    print(f"\nTotal files fixed: {total_fixed}")

if __name__ == "__main__":
    main()
