---
title: "End-to-End Tests"
linkTitle: "End-to-End Tests"
weight: 3
aliases:
  - /docs/reference/testing/e2e/
  - /docs/testing/e2e/
description: >
  Tests that exercise two or more real components up to the full system. Non-deterministic by nature; never a pre-merge gate.
---

{{< figure src="/images/testing/e2e-test.svg" alt="End-to-end test scope spectrum. Narrow scope: a test drives a real service that calls a real database. Full-system scope: a browser drives a real frontend, which calls a real backend, which calls a real database. All components are real at every scope - no test doubles." >}}

## Definition

An end-to-end test exercises real components working together - no
[test doubles]({{< relref "/docs/testing/glossary#test-double" >}}) replace the dependencies under
test. The scope ranges from two services calling each other,
to a service talking to a real database, to a complete user journey through every
layer of the system.

The defining characteristic is that **real [external dependencies]({{< relref "/docs/reference/glossary#external-dependency" >}}) are present**: actual
databases, live downstream services, real message brokers, or third-party APIs.
Because those dependencies introduce timing, state, and availability factors outside
the test's control, end-to-end tests are typically **non-deterministic**. They fail
for reasons unrelated to code correctness - network instability, service unavailability,
test data collisions, or third-party rate limits.

### Terminology note

"Integration test" and "end-to-end test" are often used interchangeably in the
industry. Martin Fowler distinguishes between narrow integration tests (which use test
doubles at the boundary - what this site calls
[contract tests]({{< relref "/docs/testing/test-types/contract" >}})) and broad integration tests
(which use real dependencies). This site treats them as distinct categories:
[integration tests]({{< relref "/docs/testing/test-types/integration" >}}) validate that contract
test doubles still match the real external systems, while end-to-end tests exercise
user journeys or multi-service flows through real systems.

## Scope

End-to-end tests cover a spectrum based on how many components are real:

| Scope | Example |
|-------|---------|
| **Narrow** | A service making real calls to a real database |
| **Service-to-service** | Order service calling the real inventory service |
| **Multi-service** | A user journey spanning three live services |
| **Full system** | A browser test through a staging environment with all dependencies live |

All of these involve real external dependencies. All share the same fundamental
non-determinism risk. Use the narrowest scope that gives you the confidence you need.

## When to Use

Use end-to-end tests sparingly. They are the most expensive test type to write,
run, and maintain. Use them for:

- **Smoke testing** a deployed environment to verify that key integrations are
  functioning after a deployment.
- **Happy-path validation** of critical business flows that cannot be verified any
  other way (e.g., a payment flow that depends on a real payment provider).
- **Cross-team workflows** that span multiple [deployables]({{< relref "/docs/reference/glossary#deployable" >}}) and cannot be isolated
  within a single [component test]({{< relref "/docs/testing/test-types/component" >}}).

Do **not** use end-to-end tests to cover edge cases, error handling, or input
validation. Those scenarios belong in [unit]({{< relref "/docs/testing/test-types/unit" >}}) or
[component]({{< relref "/docs/testing/test-types/component" >}}) tests, which are faster, cheaper, and
deterministic.

### Vertical vs. horizontal

**Vertical** end-to-end tests target features owned by a single team:

- An order is created and the confirmation email is sent.
- A user uploads a file and it appears in their document list.

**Horizontal** end-to-end tests span multiple teams:

- A user navigates from homepage through search, product detail, cart, and checkout.

Horizontal tests have a large failure surface and are significantly more fragile.
They are **not suitable for blocking the [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}})**; run them on a schedule and
review failures out of band.

## Characteristics

| Property        | Value                                                        |
|-----------------|--------------------------------------------------------------|
| **Speed**       | Seconds to minutes per test                                  |
| **Determinism** | Typically non-deterministic                                  |
| **Scope**       | Two or more real components, up to the full system           |
| **Dependencies**| Real services, databases, brokers, third-party APIs          |
| **Network**     | Full network access                                          |
| **Database**    | Live databases                                               |
| **Breaks build**| No - triggers review or [rollback]({{< relref "/docs/reference/glossary#rollback" >}}), not a pre-merge gate       |

## Examples

A narrow end-to-end test verifying a service against a real database:

{{< card code=true header="**Narrow E2E - order service against a real database**" lang="javascript" >}}
describe("OrderRepository (real database)", () => {
  it("should persist and retrieve an order by ID", async () => {
    const order = await orderRepository.create({
      itemId: "item-42",
      quantity: 2,
      customerId: "cust-99",
    });

    const retrieved = await orderRepository.findById(order.id);
    expect(retrieved.itemId).toBe("item-42");
    expect(retrieved.status).toBe("pending");
  });
});
{{< /card >}}

A full-system browser test using a browser automation framework:

{{< card code=true header="**Full-system E2E - add to cart and checkout with browser automation**" lang="javascript" >}}
test("user can add an item to cart and check out", async ({ page }) => {
  await page.goto("https://staging.example.com");
  await page.getByRole("link", { name: "Running Shoes" }).click();
  await page.getByRole("button", { name: "Add to Cart" }).click();

  await page.getByRole("link", { name: "Cart" }).click();
  await expect(page.getByText("Running Shoes")).toBeVisible();

  await page.getByRole("button", { name: "Checkout" }).click();
  await expect(page.getByText("Order confirmed")).toBeVisible();
});
{{< /card >}}

## Anti-Patterns

- **Using end-to-end tests as the primary safety net**: this is the ice cream cone
  anti-pattern. The majority of your confidence should come from unit and
  [component]({{< relref "/docs/testing/test-types/component" >}}) tests, which are fast and
  deterministic. End-to-end tests are expensive insurance for the gaps.
- **Blocking the pipeline**: end-to-end tests must never be a pre-merge gate. Their
  non-determinism will eventually block a deploy for reasons unrelated to code quality.
- **Blocking on horizontal tests**: horizontal tests span too many teams and failure
  surfaces. Run them on a schedule and review failures as a team.
- **Ignoring flaky failures**: track frequency and root cause. A test that fails for
  environmental reasons is not providing a code quality signal - fix it or remove it.
- **Testing edge cases here**: exhaustive permutation testing in end-to-end tests is
  slow, expensive, and duplicates what unit and component tests should cover.
- **Not capturing failure context**: end-to-end failures are expensive to debug. Capture
  screenshots, network logs, and video recordings automatically on failure.

## Connection to CD Pipeline

End-to-end tests run **after deployment**, not before:

{{< card code=true header="**E2E tests in the pipeline**" lang="text" >}}
Stage 1 (every commit)    Unit tests              Deterministic    Blocks
                          Component tests         Deterministic    Blocks
                          Contract tests          Deterministic    Blocks

Post-deployment           Integration tests       Non-deterministic   Validates contract doubles
                          E2E smoke tests         Non-deterministic   Triggers rollback
                          Scheduled E2E suites    Non-deterministic   Review out of band
                          Synthetic monitoring    Non-deterministic   Triggers alerts
{{< /card >}}

A team may choose to gate on a small, highly reliable set of vertical end-to-end
smoke tests immediately after deployment. This is acceptable only if the team invests
in keeping those tests stable. A flaky smoke gate is worse than no gate: it trains
developers to ignore failures.

Use [contract tests]({{< relref "/docs/testing/test-types/contract" >}}) to verify that the
[test doubles]({{< relref "/docs/testing/glossary#test-double" >}}) in your component tests still
match reality. This gives you deterministic pre-merge confidence without depending on
live external systems.
