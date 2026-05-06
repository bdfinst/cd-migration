---
name: persona-page-sync
description: >
  Audit and update the curated persona symptom pages (for-developers.md, for-agile-coaches.md,
  for-managers.md) when symptoms or anti-patterns are added, removed, or moved. Use this skill
  whenever new symptom or anti-pattern pages are created, when existing pages are deleted or
  reorganized, after running /cd-symptom-page or /cd-anti-pattern-page, or when the user asks
  to update the persona reading lists. Also use proactively at the end of any session that added
  or changed symptom content.
user_invocable: true
---

# Persona Page Sync

Keep the curated persona reading lists in sync with the full symptom catalogue.

The site has three persona pages under `content/en/docs/triage/`:
- `for-developers.md` - daily coding friction, testing pain, integration, deployment, environment issues
- `for-agile-coaches.md` - process improvement, collaboration, integration workflows, team knowledge, sustainability
- `for-managers.md` - unpredictable delivery, quality reaching customers, coordination overhead, team health

Each page is a hand-curated subset of symptoms organized into thematic sections. They are not
auto-generated and should not become a dump of every symptom. The value is in curation: picking
the symptoms most relevant to each audience and writing a one-sentence context line that explains
why that symptom matters from that perspective.

## When to run

- After creating a new symptom page
- After deleting or moving a symptom page
- After significant changes to the symptom catalogue structure
- When the user asks to audit or update persona pages

## Instructions

### 1. Gather current state

Read these files to understand what exists:
- `data/finder-symptoms.yaml` - the full symptom catalogue with categories
- `content/en/docs/triage/for-developers.md`
- `content/en/docs/triage/for-agile-coaches.md`
- `content/en/docs/triage/for-managers.md`

Extract the list of symptom `relref` links from each persona page so you know what is already included.

### 2. Identify gaps

Compare the full symptom catalogue against each persona page. For each symptom not yet on
any persona page, decide which page(s) it fits based on these guidelines:

**Developers** - symptoms the person writing code would directly experience:
- Test suite problems (flaky, slow, ineffective)
- Build and pipeline friction
- Merge and integration pain
- Environment inconsistency
- Deployment fear and failure
- Tooling and local development friction

**Agile Coaches** - symptoms visible in team process and collaboration:
- Work in progress and flow problems
- Planning and dependency issues
- Retrospective and working agreement failures
- Knowledge silos and team stability
- Review bottlenecks and integration resistance
- Pace and sustainability concerns

**Managers** - symptoms that show up as business impact:
- Unpredictable delivery and missed commitments
- Quality problems reaching customers
- Coordination overhead across teams
- Team health, burnout, and retention risk
- Visibility gaps in production

A symptom can appear on multiple persona pages if it is genuinely relevant to more than one
audience. Most symptoms belong on one or two pages, rarely all three.

If a symptom does not clearly fit any persona page, that is fine. Not every symptom needs to
appear on a curated list.

### 3. Check for stale entries

Look for symptoms on persona pages whose `relref` targets no longer exist (page was deleted
or moved). Flag these for removal or path update.

### 4. Present recommendations

Show the user a summary grouped by persona page:

```
## for-developers.md
ADD: [Symptom Title](path) - under section "Section Name"
     Suggested context: one-sentence explanation of relevance

## for-agile-coaches.md
ADD: [Symptom Title](path) - under section "Section Name"
REMOVE: [Symptom Title] - page no longer exists

## for-managers.md
(no changes needed)
```

Explain the reasoning briefly for each recommendation. If there are no changes needed for a
page, say so.

### 5. Apply changes (with user approval)

After the user confirms which recommendations to apply:

1. Add new entries to the appropriate section of each persona page, matching the existing
   format: bold linked title followed by a dash and a one-sentence context line.
2. Write the context line from that persona's perspective. A developer cares about different
   aspects of the same symptom than a manager does.
3. Remove any stale entries.
4. If a new symptom does not fit any existing section, propose a new section heading and
   placement. Keep section count reasonable (4-6 per page).

### 6. Validate

- Run `npm test` to verify no broken links.
- Scan changed files for endash, emdash, and emoji violations.
- Verify that the symptoms index page (`content/en/docs/triage/_index.md`) still lists
  all three persona pages under "Curated lists".

## Style rules

- Follow the existing bullet format exactly: `- **[Title]({{< relref "path" >}})** - Context sentence.`
- Context sentences should be concise (one sentence, under 30 words).
- Do not add symptoms just because they exist. Each entry should earn its place on the list
  by being clearly relevant to that audience.
- Do not reorder existing entries unless the user asks. New entries go at the end of the
  most relevant section.
