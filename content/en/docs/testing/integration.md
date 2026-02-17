---
title: "Integration Tests"
linkTitle: "Integration Tests"
weight: 2
description: >
  Deterministic tests that verify how units interact together or with external system boundaries using test doubles for non-deterministic dependencies.
---

{{% pageinfo %}}
Adapted from [Dojo Consortium](https://dojoconsortium.org)
{{% /pageinfo %}}

## Definition

An integration test is a deterministic test that verifies how the unit under test interacts
with other units without directly accessing external sub-systems. It may validate multiple
units working together (sometimes called a "sociable unit test") or the portion of the code
that interfaces with an external network dependency while using a test double to represent
that dependency.

For clarity: an "integration test" is **not** a test that broadly integrates multiple
sub-systems. That is an [end-to-end test](../e2e/).

## When to Use

Integration tests provide the best balance of speed, confidence, and cost. Use them when:

- You need to verify that **multiple units collaborate correctly** (for example, a service
  calling a repository that calls a data mapper).
- You need to validate **the interface layer** to an external system (HTTP client, message
  producer, database query) while keeping the external system replaced by a test double.
- You want to confirm that a **refactoring** did not break behavior. Integration tests that
  avoid testing implementation details survive refactors without modification.
- You are building a **front-end component** that composes child components and needs to verify
  the assembled behavior from the user's perspective.

If the test requires a live network call to a system outside localhost, it is either a
[contract test](../contract/) or an [E2E test](../e2e/).

## Characteristics

| Property        | Value                                         |
|-----------------|-----------------------------------------------|
| **Speed**       | Milliseconds to low seconds                   |
| **Determinism** | Always deterministic                          |
| **Scope**       | Multiple units or a unit plus its boundary    |
| **Dependencies**| External systems replaced with test doubles   |
| **Network**     | Localhost only                                |
| **Database**    | Localhost / in-memory only                    |
| **Breaks build**| Yes                                           |

## Examples

A JavaScript integration test verifying that a connector returns structured data:

```javascript
describe("retrieving Hygieia data", () => {
  it("should return counts of merged pull requests per day", async () => {
    const result = await hygieiaConnector.getResultsByDay(
      hygieiaConfigs.integrationFrequencyRoute,
      testTeam,
      startDate,
      endDate
    );

    expect(result.status).toEqual(200);
    expect(result.data).toBeInstanceOf(Array);
    expect(result.data[0]).toHaveProperty("value");
    expect(result.data[0]).toHaveProperty("dateStr");
  });

  it("should return an empty array if the team does not exist", async () => {
    const result = await hygieiaConnector.getResultsByDay(
      hygieiaConfigs.integrationFrequencyRoute,
      0,
      startDate,
      endDate
    );
    expect(result.data).toEqual([]);
  });
});
```

### Subcategories

**Service integration tests** validate how the system under test responds to information
from an external service. Use [virtual services](../../glossary/#virtual-service) or static mocks; pair with
[contract tests](../contract/) to keep the doubles current.

**Database integration tests** validate query logic against a controlled data store. Prefer
in-memory databases, isolated DB instances, or personalized datasets over shared live data.

**Front-end integration tests** render the component tree and interact with it the way a
user would. Follow the accessibility order of operations for element selection: visible text
and labels first, ARIA roles second, test IDs only as a last resort.

## Anti-Patterns

- **Peeking behind the curtain**: using tools that expose component internals (e.g.,
  Enzyme's `instance()` or `state()`) instead of testing from the user's perspective.
- **Mocking too aggressively**: replacing every collaborator turns an integration test into a
  unit test and removes the value of testing real interactions. Only mock what is necessary to
  maintain determinism.
- **Testing implementation details**: asserting on internal state, private methods, or call
  counts rather than observable output.
- **Introducing a test user**: creating an artificial actor that would never exist in
  production. Write tests from the perspective of a real end-user or API consumer.
- **Tolerating flaky tests**: non-deterministic integration tests erode trust. Fix or remove
  them immediately.
- **Duplicating E2E scope**: if the test integrates multiple deployed sub-systems with live
  network calls, it belongs in the E2E category, not here.

## Connection to CD Pipeline

Integration tests form the largest portion of a healthy test suite (the "trophy" or the
middle of the pyramid). They run alongside unit tests in the earliest CI stages:

1. **Local development**: run in watch mode or before committing.
2. **PR verification**: CI executes the full suite; failures block merge.
3. **Trunk verification**: CI reruns on the merged HEAD.

Because they are deterministic and fast, integration tests **should always break the build**.
A team whose refactors break many tests likely has too few integration tests and too many
fine-grained unit tests. As Kent C. Dodds advises: "Write tests, not too many, mostly
integration."

---

> This content is adapted from the [Dojo Consortium](https://dojoconsortium.org),
> licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
