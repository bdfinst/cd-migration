# Documentation style rules

Reference for the tech-writing-review skill. These rules apply to prose the skill writes or reviews. They sit alongside `principles.md`, which covers page structure and scannability.

## The three rules

1. **Follow the Google Developer Documentation Style Guide.**
2. **Use ASD-STE100-derived precision rules.**
3. **Apply Zinsser's four principles: clarity, simplicity, brevity, and humanity.**

When they conflict, the Google guide decides formatting and mechanics, the STE-derived rules decide how precise an instruction is, and Zinsser decides how the prose reads. The project content style rules in `CLAUDE.md` (no endashes, no emdashes, no emojis, "CD" means continuous delivery) override all three.

## Google style mechanics

- Address the reader as "you". Use active voice and present tense.
- Use sentence case for headings. Make link text describe the target, never "here".
- Use the serial comma. Use "for example", not "e.g.".
- Use numbered lists for ordered steps and bulleted lists for unordered items.
- Format code, file names, and commands as code. Bold UI labels.
- Cut "please", "simply", "just", "easy", and "obviously".
- Use "can" for ability and "might" for possibility. Use "must" only for a hard requirement.

## ASD-STE100-derived precision

These rules borrow STE's discipline. They do not require the STE dictionary.

- One word, one meaning. Pick one term for each concept and keep it. Use the glossary terms (see the `glossary` and `agentic-cd-docs` skills).
- Prefer the plain word: "use", not "utilize"; "start", not "initiate".
- Write one instruction per sentence in a procedure. Start it with a verb.
- Keep procedure sentences to 20 words or fewer and other sentences to 25 or fewer.
- Keep paragraphs to five sentences or fewer (see principle 2 in `principles.md`).
- Repeat the noun instead of an unclear "it" or "this".
- Avoid noun stacks of more than three nouns. Avoid contractions in procedures and warnings.
- State a prohibition as a direct command: "Do not push to `main`."

## Zinsser's four principles

- **Clarity.** Say what you mean. If a sentence can be read two ways, rewrite it.
- **Simplicity.** Use the short word and the plain construction. Remove jargon the reader does not need.
- **Brevity.** Delete every word that does no work: qualifiers, throat-clearing, repeated points.
- **Humanity.** Write as one person to another. Keep a natural voice and respect the reader's time.
