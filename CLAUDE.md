# Project Rules

## Content Style

- **No endashes or emdashes.** Use a plain hyphen (`-`) or rewrite the sentence. Never use `–` (endash) or `—` (emdash) in any content file.
- **No emojis.** Never use emoji characters in any content file.
- **Validate on every page.** Before finishing work on any content file, scan it for endash (`–`), emdash (`—`), and emoji characters. Fix any violations before considering the work complete.

## Under-Construction Links

Pages in draft mode are linked via `under-construction` with the original target preserved in an HTML comment:
`[Text](../under-construction/) <!-- target: section/page -->`

When removing `draft: true` from a page:
1. Search all content files for `<!-- target:` comments referencing that page
2. Replace the `under-construction` link with the original target path
3. Run `npm test` to verify no broken links remain
4. If the newly activated page itself links to other draft pages, replace those with under-construction links using the same comment pattern
