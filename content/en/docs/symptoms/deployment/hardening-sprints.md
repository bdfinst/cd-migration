---
aliases:
  - /docs/symptoms/hardening-sprints/
title: "Hardening Sprints Are Needed Before Every Release"
linkTitle: "Hardening sprints before releases"
description: >
  The team dedicates one or more sprints after "feature complete" to stabilize code before it can
  be released.
tags:
  - process-gates
  - test-strategy
  - batch-size
---

## What you are seeing

After the team finishes building features, nothing is ready to ship. A "[hardening sprint](../../../glossary/#hardening-sprint)" is
scheduled: one or more sprints dedicated to bug fixing, stabilization, and integration testing. No
new features are built during this period. The team knows from experience that the code is not
production-ready when development ends.

The hardening sprint finds bugs that were invisible during development. Integration issues surface
because components were built in isolation. Performance problems appear under realistic load. Edge
cases that nobody tested during development cause failures. The hardening sprint is not optional
because skipping it means shipping broken software.

The team treats this as normal. Planning includes hardening time by default. A project that takes
four sprints to build is planned as six: four for features, two for stabilization.

## Common causes

### Manual Testing Only

When the team has no automated test suite, quality verification happens manually at the end. The
hardening sprint is where manual testers find the defects that automated tests would have caught
during development. Without automated regression testing, every release requires a full manual
pass to verify nothing is broken.

**Read more:** [Manual Testing Only](../../anti-patterns/testing/manual-testing-only/)

### Inverted Test Pyramid

When most tests are slow end-to-end tests and few are unit tests, defects in business logic go
undetected until integration testing. The E2E tests are too slow to run continuously, so they run
at the end. The hardening sprint is when the team finally discovers what was broken all along.

**Read more:** [Inverted Test Pyramid](../../anti-patterns/testing/inverted-test-pyramid/)

### Undone Work

When the team's definition of done does not include deployment and verification, stories are
marked complete while hidden work remains. Testing, validation, and integration happen after the
story is "done." The hardening sprint is where all that undone work gets finished.

**Read more:** [Undone Work](../../anti-patterns/team-workflow/undone-work/)

### Monolithic Work Items

When features are built as large, indivisible units, integration risk accumulates silently. Each
large feature is developed in relative isolation for weeks. The hardening sprint is the first time
all the pieces come together, and the integration pain is proportional to the [batch size](../../glossary/#batch-size).

**Read more:** [Monolithic Work Items](../../anti-patterns/team-workflow/monolithic-work-items/)

### Pressure to Skip Testing

When management pressures the team to maximize feature output, testing is deferred to "later."
The hardening sprint is that "later." Testing was not skipped; it was moved to the end where it is
less effective, more expensive, and blocks the release.

**Read more:** [Pressure to Skip Testing](../../anti-patterns/organizational-cultural/pressure-to-skip-testing/)

## How to narrow it down

1. **Does the team have automated tests that run on every commit?** If not, the hardening sprint
   is compensating for the lack of continuous quality verification. Start with
   [Manual Testing Only](../../anti-patterns/testing/manual-testing-only/).
2. **Are most automated tests end-to-end or UI tests?** If the test suite is slow and top-heavy,
   defects are caught late because fast unit tests are missing. Start with
   [Inverted Test Pyramid](../../anti-patterns/testing/inverted-test-pyramid/).
3. **Does the team's definition of done include deployment and verification?** If stories are
   "done" before they are tested and deployed, the hardening sprint finishes what "done" should
   have included. Start with
   [Undone Work](../../anti-patterns/team-workflow/undone-work/).
4. **How large are the typical work items?** If features take weeks and integrate at the end, the
   batch size creates the integration risk. Start with
   [Monolithic Work Items](../../anti-patterns/team-workflow/monolithic-work-items/).
5. **Is there pressure to prioritize features over testing?** If testing is consistently deferred
   to hit deadlines, the hardening sprint absorbs the cost. Start with
   [Pressure to Skip Testing](../../anti-patterns/organizational-cultural/pressure-to-skip-testing/).

---

**Ready to fix this?** The most common cause is [Manual Testing Only](../../anti-patterns/testing/manual-testing-only/). Start with its [How to Fix It](../../anti-patterns/testing/manual-testing-only/#how-to-fix-it) section for week-by-week steps.

## Related Content

- [Merge Freezes Before Deployments](../merge-freeze/) - Hardening and freezes are companion symptoms
- [The Team Is Afraid to Deploy](../fear-of-deploying/) - Hardening sprints reinforce the belief that deployment is risky
- [Manual Regression Testing Gates](../../anti-patterns/testing/manual-regression-testing-gates/) - Manual testing phases that drive hardening cycles
- [Testing Fundamentals](../../migrate-to-cd/migration-path/foundations/testing-fundamentals/) - Automated testing that builds quality in continuously
- [Deployable Definition](../../migrate-to-cd/migration-path/pipeline/deployable-definition/) - Making every commit production-ready by definition
- [Change Fail Rate](../../metrics/change-fail-rate/) - Track whether quality improves without hardening
