# CD Migration Guide

[![CI](https://github.com/bdfinst/cd-migration/actions/workflows/ci.yml/badge.svg)](https://github.com/bdfinst/cd-migration/actions/workflows/ci.yml)

[![NetlifyStatus](https://api.netlify.com/api/v1/badges/99655174-d314-47e9-9d1c-ee14ec7993b5/deploy-status)](https://app.netlify.com/projects/cd-migration/deploys)

Practices, patterns, and solutions to deploy every change with confidence. Built on years of helping teams across industries remove friction, improve delivery outcomes, and raise team morale through continuous delivery.

**Site:** [migration.minimumcd.org](https://migration.minimumcd.org/)

This guide expands on the practices defined at [MinimumCD.org](https://minimumcd.org) and production-tested playbooks from the [Dojo Consortium](https://dojoconsortium.org), grounded in one driving question: "Why can't I deliver today's work to production today?"

## What's in the Guide

- **Dysfunction Symptoms** - Observable problems teams experience, organized by testing, deployment, flow, and visibility
- **Anti-Patterns** - Common practices that undermine delivery performance, with concrete steps to fix each one
- **Migration Phases** - A phased path from Assess through Foundations, Pipeline, Optimize, and Continuous Deployment
- **Systemic Defect Fixes** - A catalog of defect sources with earliest detection points, AI shift-left opportunities, and systemic fixes
- **AI Adoption Roadmap** - A prescriptive sequence for incorporating AI into delivery safely
- **Reference** - Glossary, metrics definitions, testing guides, DORA capabilities, and additional resources

## Prerequisites

- [Hugo](https://gohugo.io/installation/) 0.152.2+ (extended version required)
- [Go](https://go.dev/dl/) 1.25+
- [Node.js](https://nodejs.org/) 22+

## Getting Started

```sh
# Clone the repository
git clone https://github.com/bdfinst/cd-migration.git
cd cd-migration

# Install dependencies
npm install

# Start the development server
npm start
```

The site will be available at `http://localhost:1313/`.

## Available Commands

| Command | Description |
|---------|-------------|
| `npm start` | Start local dev server with live reload |
| `npm run build` | Production build with minification |
| `npm run build:clean` | Clean `public/` and rebuild |
| `npm test` | Run markdown lint and internal link check |
| `npm run lint` | Check markdown style only |
| `npm run lint:fix` | Auto-fix markdown style issues |
| `npm run link-check` | Build and check external links (slow) |
| `npm run link-check:local` | Build and check internal links |
| `npm run format:fix` | Auto-format with Prettier |
| `npm run update` | Update all npm and Hugo module dependencies |

## Project Structure

```
cd-migration/
  assets/scss/              Custom styles (tables, indicators, landing page)
  content/en/               All site content
    docs/
      anti-patterns/        Anti-pattern pages (7 categories)
      symptoms/             Symptom pages (testing, deployment, flow, visibility)
      migrate-to-cd/        Migration phases and guides
      reference/            Glossary, metrics, testing guides
      defect-sources.md     Defect detection catalog
      agentic-cd.md
      faq.md
    _index.html             Home page
  layouts/                  Hugo template overrides and custom shortcodes
  _vendor/                  Vendored Hugo modules (Docsy theme)
  .github/workflows/        CI/CD pipeline definitions
  .husky/                   Git hooks (pre-commit runs npm test)
  hugo.toml                 Hugo configuration
  netlify.toml              Netlify deployment settings
```

## Tech Stack

- **Static site generator:** [Hugo](https://gohugo.io/) with [Docsy](https://www.docsy.dev/) theme
- **CSS:** SCSS with PostCSS and Autoprefixer
- **Deployment:** Netlify
- **CI:** GitHub Actions (link checking on every push and PR)
- **Linting:** markdownlint, Prettier
- **Link validation:** htmltest (internal), Linkinator (external)
- **SEO:** Auto-generated `llms.txt`, `llms-full.txt`, `robots.txt`, and sitemap

---

## Contributing

Contributions are welcome. This section covers the conventions and quality checks that keep the site consistent.

### Content Style Rules

These rules are enforced on every page:

- **No endashes or emdashes.** Use a plain hyphen (`-`) or rewrite the sentence. Never use `--` (endash) or `---` (emdash) in content files.
- **No emojis.** Never use emoji characters in content files.
- **Validate before committing.** Scan every file you touch for endash, emdash, and emoji violations before considering the work complete.

### Writing Conventions

- Write in second person ("you") or third person ("teams"), not first person
- Keep sentences direct and concise
- Use active voice
- Link to related content within the guide where relevant
- Each page should include a Related Content section at the bottom

### Content Page Templates

**Symptom pages** follow this structure:

1. Front matter with title, description, tags
2. What you are seeing
3. Common causes (with sub-sections linking to anti-patterns)
4. How to narrow it down
5. Related content

**Anti-pattern pages** follow this structure:

1. Front matter with title, description, tags
2. What this looks like (observable symptoms)
3. Why this is a problem (sub-sections per impact)
4. How to fix it (numbered, time-boxed steps with objection-handling table)
5. Measuring progress (specific metrics)
6. Related content

### Draft Pages and Under-Construction Links

Pages in draft mode are linked with `under-construction` and the original target preserved in an HTML comment:

```markdown
[Link Text](../under-construction/) <!-- target: section/page -->
```

When removing `draft: true` from a page:

1. Search all content files for `<!-- target:` comments referencing that page
2. Replace the `under-construction` link with the actual target path
3. Run `npm test` to verify no broken links remain

### Quality Checks

A pre-commit hook runs `npm test` automatically, which includes:

1. **Markdown linting** - Enforces consistent style via markdownlint
2. **Internal link checking** - Builds the site and validates all internal links with htmltest

Both checks must pass before a commit is accepted.

To run checks manually:

```sh
npm test
```

To check external links (slower, hits live URLs):

```sh
npm run link-check
```

### Allowed HTML in Markdown

The markdownlint config permits these HTML elements in markdown files: `div`, `h6`, `br`, `details`, `summary`, `strong`, `span`. Other inline HTML will trigger a lint error.

### Development Workflow

1. Create a branch for your changes
2. Run `npm start` to preview locally
3. Make your changes following the style rules above
4. Run `npm test` to validate (also runs automatically on commit)
5. Open a pull request against `main`
6. CI will run link checking on the PR

### Commit Messages

- State what changed, not who changed it
- No author attribution lines
- Use a short summary line followed by bullet points for detail

---

## License

This work is licensed under [Creative Commons Attribution 4.0 International (CC BY 4.0)](LICENSE).

Content is adapted from [MinimumCD.org](https://minimumcd.org) and the [Dojo Consortium](https://dojoconsortium.org), both licensed under CC BY 4.0.
