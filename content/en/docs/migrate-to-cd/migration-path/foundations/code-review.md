---
title: "Code Review"
linkTitle: "Code Review"
weight: 5
description: >
  Streamline code review to provide fast feedback without blocking flow.
---

{{% pageinfo %}}
**Phase 1 - Foundations**

Code review is essential for quality, but it is also the most common bottleneck in teams adopting trunk-based development. If reviews take days, daily integration is impossible. This page covers review techniques that maintain quality while enabling the flow that CD requires.
{{% /pageinfo %}}

## Why Code Review Matters for CD

Code review serves multiple purposes:

- **Defect detection:** A second pair of eyes catches bugs that the author missed.
- **Knowledge sharing:** Reviews spread understanding of the codebase across the team.
- **Consistency:** Reviews enforce coding standards and architectural patterns.
- **Mentoring:** Junior developers learn by having their code reviewed and by reviewing others' code.

These are real benefits. The challenge is that traditional code review - open a pull request, wait for someone to review it, address comments, wait again - is too slow for CD.

In a CD workflow, code review must happen **within minutes or hours, not days**. The review is still rigorous, but the process is designed for speed.

## The Core Tension: Quality vs. Flow

Traditional teams optimize review for thoroughness: detailed comments, multiple reviewers, extensive back-and-forth. This produces high-quality reviews but blocks flow.

CD teams optimize review for speed without sacrificing the quality that matters. The key insight is that **most of the quality benefit of code review comes from small, focused reviews done quickly**, not from exhaustive reviews done slowly.

| Traditional Review | CD-Compatible Review |
|--------------------|----------------------|
| Review happens after the feature is complete | Review happens continuously throughout development |
| Large diffs (hundreds or thousands of lines) | Small diffs (< 200 lines, ideally < 50) |
| Multiple rounds of feedback and revision | One round, or real-time feedback during pairing |
| Review takes 1-3 days | Review takes minutes to a few hours |
| Review is asynchronous by default | Review is synchronous by preference |
| 2+ reviewers required | 1 reviewer (or pairing as the review) |

## Synchronous vs. Asynchronous Review

### Synchronous Review (Preferred for CD)

In synchronous review, the reviewer and author are engaged at the same time. Feedback is immediate. Questions are answered in real time. The review is done when the conversation ends.

**Methods:**

- **Pair programming:** Two developers work on the same code at the same time. Review is continuous. There is no separate review step because the code was reviewed as it was written.
- **Mob programming:** The entire team (or a subset) works on the same code together. Everyone reviews in real time.
- **Over-the-shoulder review:** The author walks the reviewer through the change in person or on a video call. The reviewer asks questions and provides feedback immediately.

**Advantages for CD:**

- Zero wait time between "ready for review" and "review complete"
- Higher bandwidth communication (tone, context, visual cues) catches more issues
- Immediate resolution of questions - no async back-and-forth
- Knowledge transfer happens naturally through the shared work

### Asynchronous Review (When Necessary)

Sometimes synchronous review is not possible - time zones, schedules, or team preferences may require asynchronous review. This is fine, but it must be fast.

**Rules for async review in a CD workflow:**

- **Review within 2 hours.** If a pull request sits for a day, it blocks integration. Set a team working agreement: "pull requests are reviewed within 2 hours during working hours."
- **Keep changes small.** A 50-line change can be reviewed in 5 minutes. A 500-line change takes an hour and reviewers procrastinate on it.
- **Use draft PRs for early feedback.** If you want feedback on an approach before the code is complete, open a draft PR. Do not wait until the change is "perfect."
- **Avoid back-and-forth.** If a comment requires discussion, move to a synchronous channel (call, chat). Async comment threads that go 5 rounds deep are a sign the change is too large or the design was not discussed upfront.

## Review Techniques Compatible with TBD

### Pair Programming as Review

When two developers pair on a change, the code is reviewed as it is written. There is no separate review step, no pull request waiting for approval, and no delay to integration.

**How it works with TBD:**

1. Two developers sit together (physically or via screen share)
2. They discuss the approach, write the code, and review each other's decisions in real time
3. When the change is ready, they commit to trunk together
4. Both developers are accountable for the quality of the code

**When to pair:**

- New or unfamiliar areas of the codebase
- Changes that affect critical paths
- When a junior developer is working on a change (pairing doubles as mentoring)
- Any time the change involves design decisions that benefit from discussion

Pair programming satisfies most organizations' code review requirements because two developers have actively reviewed and approved the code.

### Mob Programming as Review

Mob programming extends pairing to the whole team. One person drives (types), one person navigates (directs), and the rest observe and contribute.

**When to mob:**

- Establishing new patterns or architectural decisions
- Complex changes that benefit from multiple perspectives
- Onboarding new team members to the codebase
- Working through particularly difficult problems

Mob programming is intensive but highly effective. Every team member understands the code, the design decisions, and the trade-offs.

### Rapid Async Review

For teams that use pull requests, rapid async review adapts the pull request workflow for CD speed.

**Practices:**

- **Auto-assign reviewers.** Do not wait for someone to volunteer. Use tools to automatically assign a reviewer when a PR is opened.
- **Keep PRs small.** Target < 200 lines of changed code. Smaller PRs get reviewed faster and more thoroughly.
- **Provide context.** Write a clear PR description that explains what the change does, why it is needed, and how to verify it. A good description reduces review time dramatically.
- **Use automated checks.** Run linting, formatting, and tests before the human review. The reviewer should focus on logic and design, not style.
- **Approve and merge quickly.** If the change looks correct, approve it. Do not hold it for nitpicks. Nitpicks can be addressed in a follow-up commit.

## What to Review

Not everything in a code change deserves the same level of scrutiny. Focus reviewer attention where it matters most.

### High Priority (Reviewer Should Focus Here)

- **Behavior correctness:** Does the code do what it is supposed to do? Are edge cases handled?
- **Security:** Does the change introduce vulnerabilities? Are inputs validated? Are secrets handled properly?
- **Clarity:** Can another developer understand this code in 6 months? Are names clear? Is the logic straightforward?
- **Test coverage:** Are the new behaviors tested? Do the tests verify the right things?
- **API contracts:** Do changes to public interfaces maintain backward compatibility? Are they documented?
- **Error handling:** What happens when things go wrong? Are errors caught, logged, and surfaced appropriately?

### Low Priority (Automate Instead of Reviewing)

- **Code style and formatting:** Use automated formatters (Prettier, Black, gofmt). Do not waste reviewer time on indentation and bracket placement.
- **Import ordering:** Automate with linting rules.
- **Naming conventions:** Enforce with lint rules where possible. Only flag naming in review if it genuinely harms readability.
- **Unused variables or imports:** Static analysis tools catch these instantly.
- **Consistent patterns:** Where possible, encode patterns in architecture decision records and lint rules rather than relying on reviewers to catch deviations.

**Rule of thumb:** If a style or convention issue can be caught by a machine, do not ask a human to catch it. Reserve human attention for the things machines cannot evaluate: correctness, design, clarity, and security.

## Review Scope for Small Changes

In a CD workflow, most changes are small - tens of lines, not hundreds. This changes the economics of review.

| Change Size | Expected Review Time | Review Depth |
|-------------|----------------------|--------------|
| < 20 lines | 2-5 minutes | Quick scan: is it correct? Any security issues? |
| 20-100 lines | 5-15 minutes | Full review: behavior, tests, clarity |
| 100-200 lines | 15-30 minutes | Detailed review: design, contracts, edge cases |
| > 200 lines | Consider splitting the change | Large changes get superficial reviews |

Research consistently shows that reviewer effectiveness drops sharply after 200-400 lines. If you are regularly reviewing changes larger than 200 lines, the problem is not the review process - it is the [work decomposition](../work-decomposition/).

## Working Agreements for Review SLAs

Establish clear team agreements about review expectations. Without explicit agreements, review latency will drift based on individual habits.

### Recommended Review Agreements

| Agreement | Target |
|-----------|--------|
| **Response time** | Review within 2 hours during working hours |
| **Reviewer count** | 1 reviewer (or pairing as the review) |
| **PR size** | < 200 lines of changed code |
| **Blocking issues only** | Only block a merge for correctness, security, or significant design issues |
| **Nitpicks** | Use a "nit:" prefix. Nitpicks are suggestions, not merge blockers |
| **Stale PRs** | PRs open for > 24 hours are escalated to the team |
| **Self-review** | Author reviews their own diff before requesting review |

### How to Enforce Review SLAs

- Track review turnaround time. If it consistently exceeds 2 hours, discuss it in retrospectives.
- Make review a first-class responsibility, not something developers do "when they have time."
- If a reviewer is unavailable, any other team member can review. Do not create single-reviewer dependencies.
- Consider pairing as the default and async review as the exception. This eliminates the review bottleneck entirely.

## Code Review and Trunk-Based Development

Code review and TBD work together, but only if review does not block integration. Here is how to reconcile them:

| TBD Requirement | How Review Adapts |
|-----------------|-------------------|
| Integrate to trunk at least daily | Reviews must complete within hours, not days |
| Branches live < 24 hours | PRs are opened and merged within the same day |
| Trunk is always releasable | Reviewers focus on correctness, not perfection |
| Small, frequent changes | Small changes are reviewed quickly and thoroughly |

If your team finds that review is the bottleneck preventing daily integration, the most effective solution is to adopt pair programming. It eliminates the review step entirely by making review continuous.

## Measuring Success

| Metric | Target | Why It Matters |
|--------|--------|----------------|
| Review turnaround time | < 2 hours | Prevents review from blocking integration |
| PR size (lines changed) | < 200 lines | Smaller PRs get faster, more thorough reviews |
| PR age at merge | < 24 hours | Aligns with TBD branch age constraint |
| Review rework cycles | < 2 rounds | Multiple rounds indicate the change is too large or design was not discussed upfront |

## Next Step

Code review practices need to be codified in team agreements alongside other shared commitments. Continue to [Working Agreements](../working-agreements/) to establish your team's definitions of done, ready, and CI practice.

---

Content contributed by [Dojo Consortium](https://dojoconsortium.org), licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

---

## Related Content

- [PRs Waiting for Review](../../../symptoms/flow/prs-waiting-for-review/) - Symptom that slow review practices cause
- [Work Items Take Too Long](../../../symptoms/flow/work-items-take-too-long/) - Symptom worsened when review blocks flow
- [Knowledge Silos](../../../anti-patterns/team-workflow/knowledge-silos/) - Anti-pattern that pairing and mob programming help break down
- [Trunk-Based Development](../trunk-based-development/) - Branching strategy that requires fast review to work
- [Work Decomposition](../work-decomposition/) - Smaller work items make review faster and more effective
- [Working Agreements](../working-agreements/) - Where review SLAs are codified as team commitments
