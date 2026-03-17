# Triage Redesign: Pain-First Guided Flow

## Customer Feedback Summary

A user reviewed the triage section (Find Your Problems) and raised these points:

1. **Roles feel unnecessary.** The tool is an orientation aid about problems, not a role-based perspective filter. The persona bar ("I am a: Manager / Scrum Master / Developer") adds a step without clear value.

2. **Roles contradict the CD message.** CD migration is about shared ownership. Foregrounding roles implies hierarchy matters, which conflicts with the site's principles.

3. **Too many options at once.** Presenting all symptoms across all categories overwhelms someone unfamiliar with the subject. It is hard to know where to start.

4. **Suggested alternative flow:**
   - Ask about current pain points first (just a few high-level ones).
   - Based on selected pain points, surface the most relevant symptoms.
   - From those symptoms, guide to the solution space.
   - Step by step, not all at once.
   - This makes it clear *why* specific results appeared and helps the reader focus on one aspect rather than the entire journey.

5. **Mobile experience** may amplify the overwhelm (noted by the reviewer).

## Task

Redesign the Multi-Symptom Selector to use a pain-first guided flow. Apply these design principles:

### Remove the persona/role filter
- Delete the persona bar from `layouts/shortcodes/multi-symptom-selector.html`.
- Remove `personas` filtering logic from the JavaScript.
- Remove persona references from `data/finder-symptoms.yml` (the `personas` field on each symptom) only if no other feature depends on it. If other features use it, leave the data but stop filtering on it.
- Update the description text in `content/en/docs/triage/multi-symptom/_index.md` to remove role references.

### Implement a stepped flow
Replace the single "wall of checkboxes" with a progressive disclosure pattern:

**Step 1 - Pain points.** Show 5-7 high-level pain categories derived from the existing symptom categories (e.g., "Releases are painful", "We find bugs late", "Work sits waiting", "We lack visibility into what is happening"). These should be plain-language descriptions a team lead or developer would immediately recognize. Let the user pick 1-3.

**Step 2 - Symptoms.** Based on selected pain points, show only the symptoms relevant to those categories. Keep the checkbox pattern but scoped to a manageable subset. The user checks what sounds familiar.

**Step 3 - Results.** Show anti-pattern matches as today, but add a sentence connecting each result back to the pain points selected in Step 1, so the reader understands *why* this result surfaced.

### UX guidelines
- Each step should fit on one screen, especially on mobile.
- Include a back button so users can revise earlier choices.
- Show a progress indicator (e.g., "Step 1 of 3").
- Animate transitions between steps for orientation.
- Keep the "Clear All / Start Over" action available throughout.

### Impact indicators on triage questions
Add visual icons to symptom checkboxes (Step 2) that signal how much each symptom affects delivery outcomes. This helps users prioritize which symptoms to investigate first.

**Data model.** Add an `impact` field to each symptom in `data/finder-symptoms.yml` with one of three levels:
- `high` - Symptom is strongly correlated with multiple anti-patterns or directly blocks flow.
- `medium` - Symptom contributes to problems but is not the primary driver.
- `low` - Symptom is a secondary signal, often a side effect of deeper issues.

Derive the impact level from the number of anti-patterns each symptom maps to (the existing `anti_patterns` list). Symptoms linked to 3+ anti-patterns are `high`, 2 are `medium`, 1 is `low`. Allow manual overrides in the data file when the calculated level does not match reality.

**Visual design.** Display a small inline icon next to each symptom label:
- High impact: filled circle or flame icon in the site's warning/accent color.
- Medium impact: half-filled circle or neutral icon.
- Low impact: empty circle or muted icon.

Use CSS-only shapes or inline SVG to avoid icon font dependencies. Keep icons small (14-16px) so they do not compete with the checkbox or label text on mobile.

**Tooltip or legend.** Include a short legend above the symptom list: "Icons show how strongly each symptom correlates with delivery problems." Add a `title` attribute on each icon for accessibility (e.g., `title="High impact on delivery outcomes"`).

**Sort order.** Within each pain-point group in Step 2, sort symptoms high-to-low by impact so the most significant ones appear first.

### Files to modify
- `layouts/shortcodes/multi-symptom-selector.html` - main shortcode (HTML + JS)
- `assets/scss/_multi-symptom-selector.scss` - styles (add step/progress styles)
- `content/en/docs/triage/multi-symptom/_index.md` - intro text
- `content/en/docs/triage/_index.md` - landing page description
- `data/finder-symptoms.yml` - may need a `pain_point` or `category_label` mapping for Step 1

### Validation
- Run `npm test` to verify no broken links.
- Test on a narrow viewport (375px) to confirm mobile usability.
- Verify the stepped flow works with JavaScript disabled (graceful fallback to category links already exists).
- Scan all changed content files for endash, emdash, and emoji violations per project rules.
