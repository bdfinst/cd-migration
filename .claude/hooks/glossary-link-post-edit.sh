#!/bin/bash
# Run glossary-link skill after editing a content .md file.
# Called as a PostToolUse hook by Claude Code.
# Stdin: JSON with tool_input.file_path (Edit) or tool_input.file_path (Write).

INPUT=$(cat)

# Extract file_path from JSON
FILE=$(echo "$INPUT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('tool_input',{}).get('file_path',''))" 2>/dev/null)

if [ -z "$FILE" ]; then
  exit 0
fi

# Only process .md files under content/en/docs/, skip the glossary itself
case "$FILE" in
  */content/en/docs/*.md)
    ;;
  *)
    exit 0
    ;;
esac

case "$FILE" in
  */glossary.md)
    exit 0
    ;;
esac

# Run the glossary-link skill in the background (non-blocking)
cd /Users/bryan/_git/cd-migration
claude --dangerously-skip-permissions -p "/glossary-link $FILE" > /tmp/glossary-link-hook.log 2>&1 &

exit 0
