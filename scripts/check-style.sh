#!/usr/bin/env bash
# Advisory style check. Counts violations of the greppable rules in
# .claude/skills/tech-writing-review/style-rules.md and prints per-rule totals
# and the files with hits. Always exits 0.
#
# Usage: bash scripts/check-style.sh [path]
#   path  Optional file or folder to check. Defaults to content/en.
#
# Skips content/en/docs/changelog.md, front matter, fenced code blocks,
# inline code, shortcodes, HTML comments, and link targets.
set -euo pipefail

target="${1:-content/en}"

if [[ ! -e "$target" ]]; then
  echo "style-check: path not found: $target"
  exit 0
fi

files=()
while IFS= read -r f; do
  files+=("$f")
done < <(find "$target" -type f \( -name '*.md' -o -name '*.html' \) \
  ! -path '*/content/en/docs/changelog.md' ! -path 'content/en/docs/changelog.md' | sort)

if [[ ${#files[@]} -eq 0 ]]; then
  echo "style-check: no content files under $target"
  exit 0
fi

awk '
BEGIN {
  nrules = 6
  name[1] = "e.g. and i.e."
  name[2] = "Inflated words (utilize, initiate, leverage, facilitate, in order to)"
  name[3] = "Filler words (please, simply, just, easy, easily, obviously)"
  name[4] = "Contractions"
  name[5] = "Title-case headings"
  name[6] = "Link text \"here\" or \"click here\""

  B = "(^|[^a-z0-9_])"   # left word boundary
  E = "([^a-z0-9_]|$)"   # right word boundary
  re[1] = B "(e\\.g\\.|i\\.e\\.)"
  re[2] = B "((utiliz|initiat|leverag|facilitat)(e|es|ed|ing)|in order to)" E
  re[3] = B "(please|simply|just|easy|easily|obviously)" E
  re[4] = B "([a-z]+n'\''t|(i|you|we|they|it|that|there|here|what|who|where|he|she|let)'\''(s|re|ve|ll|d|m))" E
  re[6] = "\\[[[:space:]]*(click[[:space:]]+)?here[[:space:]]*\\]"

  split("a an and as at but by for from if in into is nor of on or per so than the to up via vs with", m, " ")
  for (i in m) minor[m[i]] = 1
}

FNR == 1 {
  infm = 0; incode = 0; incomment = 0; fence = ""
  if (FILENAME != prevfile) { order[++nfiles] = FILENAME; prevfile = FILENAME }
}

# Front matter (YAML or TOML) on the first line only.
FNR == 1 && ($0 == "---" || $0 == "+++") { infm = 1; fmdelim = $0; next }
infm { if ($0 == fmdelim) infm = 0; next }

# Fenced code blocks.
{
  stripped = $0
  sub(/^[[:space:]]+/, "", stripped)
}
incode {
  if (substr(stripped, 1, length(fence)) == fence) incode = 0
  next
}
stripped ~ /^(```|~~~)/ { incode = 1; fence = substr(stripped, 1, 3); next }

# HTML comments that span lines.
incomment { if (index($0, "-->")) { incomment = 0; sub(/^.*-->/, "") } else next }

{
  line = $0
  gsub(/<!--[^>]*-->/, "", line)
  if (index(line, "<!--")) { sub(/<!--.*$/, "", line); incomment = 1 }
  gsub(/`[^`]*`/, "", line)                 # inline code
  gsub(/\{\{[<%][^}]*[%>]\}\}/, "", line)  # shortcodes
  gsub(/\]\([^)]*\)/, "]", line)            # link targets
  gsub(/’/, "'\''", line)                   # curly apostrophes
  low = tolower(line)

  for (r = 1; r <= nrules; r++) {
    if (r == 5) continue
    tmp = low
    n = gsub(re[r], "", tmp)
    if (n > 0) { hits[FILENAME, r] += n; total[r] += n }
  }

  if (line ~ /^#+[[:space:]]+/ && titlecase(line)) {
    hits[FILENAME, 5]++; total[5]++
  }
}

# A heading is title case when it has at least one word after the first,
# ignoring minor words, and all of those start with a capital letter and at
# least one of them is not an acronym.
function titlecase(h,    text, n, w, i, word, checked, mixed) {
  text = h
  sub(/^#+[[:space:]]+/, "", text)
  sub(/[[:space:]]*\{#[^}]*\}[[:space:]]*$/, "", text)
  gsub(/[^A-Za-z0-9 '\''-]/, " ", text)
  n = split(text, w, /[[:space:]]+/)
  checked = 0; mixed = 0
  for (i = 2; i <= n; i++) {
    word = w[i]
    if (word == "" || word !~ /^[A-Za-z]/) continue
    if (tolower(word) in minor) continue
    if (word ~ /^[a-z]/) return 0
    checked++
    if (word ~ /[a-z]/) mixed++
  }
  return checked >= 1 && mixed >= 1
}

END {
  print "Style check (advisory)"
  print ""
  print "Per-rule totals:"
  grand = 0
  for (r = 1; r <= nrules; r++) {
    printf "  %6d  %s\n", total[r] + 0, name[r]
    grand += total[r]
  }
  printf "  %6d  Total\n", grand
  print ""

  shown = 0
  for (i = 1; i <= nfiles; i++) {
    f = order[i]
    sum = 0
    for (r = 1; r <= nrules; r++) sum += hits[f, r]
    if (sum == 0) continue
    if (!shown) { print "Files with hits:"; shown = 1 }
    detail = ""
    for (r = 1; r <= nrules; r++) {
      if (hits[f, r] > 0) {
        label = r == 1 ? "eg-ie" : r == 2 ? "inflated" : r == 3 ? "filler" : r == 4 ? "contractions" : r == 5 ? "title-case" : "here-link"
        detail = detail (detail == "" ? "" : ", ") label "=" hits[f, r]
      }
    }
    printf "  %4d  %s (%s)\n", sum, f, detail
  }
  if (!shown) print "No files with hits."
}
' "${files[@]}"

exit 0
