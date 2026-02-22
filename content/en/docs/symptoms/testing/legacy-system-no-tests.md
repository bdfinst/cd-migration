---
aliases:
  - /docs/symptoms/legacy-system-no-tests/
title: "A Large Codebase Has No Automated Tests"
linkTitle: "Legacy system with no tests"
description: >
  Zero test coverage in a production system being actively modified. Nobody is confident enough to change the code safely.
tags:
  - test-strategy
  - architecture
---

## What you are seeing

Every modification to this codebase is a gamble. The system has no automated tests. Changes are validated through manual testing, if they are validated at all. Developers work carefully but know that any change could trigger failures in code they did not touch, because the system has no seams and no isolation. The only way to know if a change works is to deploy it and observe what breaks.

Refactoring is effectively off the table. Improving the design of the code requires changing it in ways that should not alter behavior - but with no tests, there is no way to verify that behavior was preserved. Developers choose to add code around existing code rather than improve it, because change is unsafe. The codebase grows more complex with every feature because improving the underlying structure carries too much risk.

The team knows the situation is unsustainable but cannot see a path out. "We should write tests" appears in every retrospective. The problem is that adding tests to an untestable codebase requires refactoring first - and refactoring requires tests to do safely. The team is stuck in a loop with no obvious entry point.

## Common causes

### Manual testing only

The team has relied on manual testing as the primary quality gate. Automated tests were never required, never prioritized, and never resourced. The codebase was built without testability as a design constraint, which means the architecture does not accommodate automated testing without structural change.

Making the transition requires making a deliberate commitment: new code is always written with tests, existing code gets tests when it is modified, and high-risk areas are prioritized for retrofitted coverage. Over months, the areas of the codebase where developers can no longer safely make changes shrink, and the cycle of deploying to discover breakage is replaced by a test suite that catches failures before production.

**Read more:** [Manual testing only](../../anti-patterns/testing/manual-testing-only/)

### Tightly coupled monolith

Code without dependency injection, without interfaces, and without clear module boundaries cannot be tested without a major structural overhaul. Every function calls other functions directly. Every component reaches into every other component. Writing a test for one function requires instantiating the entire system.

Introducing seams - interfaces, dependency injection, module boundaries - makes code testable. This work is not glamorous and its value is invisible until tests start getting written. But it is the prerequisite for meaningful test coverage in a tightly coupled system. Once the seams exist, functions can be tested in isolation rather than requiring a full application instantiation - and developers stop needing to deploy to find out if a change is safe.

**Read more:** [Tightly coupled monolith](../../anti-patterns/architecture/tightly-coupled-monolith/)

### Pressure to skip testing

If management has historically prioritized features over tests, the codebase will reflect that history. Tests were deferred sprint by sprint. Technical debt accumulated. The team that exists today is inheriting the decisions of teams that operated under different constraints, but the codebase carries the record of every time testing lost to deadline pressure.

Reversing this requires organizational commitment to treat test coverage as a delivery requirement, not as optional work that gets squeezed out when time is short. Without that commitment, the same pressure that created the untested codebase will prevent escaping it - and developers will keep gambling on every deploy.

**Read more:** [Pressure to skip testing](../../anti-patterns/organizational-cultural/pressure-to-skip-testing/)

## How to narrow it down

1. **Can any single function in the codebase be tested without instantiating the entire application?** If not, the architecture does not have the seams needed for unit tests. Start with [Tightly coupled monolith](../../anti-patterns/architecture/tightly-coupled-monolith/).
2. **Has the team ever had a sustained period of writing tests as part of normal development?** If not, the practice was never established. Start with [Manual testing only](../../anti-patterns/testing/manual-testing-only/).
3. **Did historical management decisions consistently deprioritize testing?** If test debt accumulated from external pressure, the organizational habit needs to change before the technical situation can improve. Start with [Pressure to skip testing](../../anti-patterns/organizational-cultural/pressure-to-skip-testing/).

**Ready to fix this?** The most common cause is [Manual testing only](../../anti-patterns/testing/manual-testing-only/). Start with its [How to Fix It](../../anti-patterns/testing/manual-testing-only/#how-to-fix-it) section for week-by-week steps.
