---
title: "End-to-End Tests"
linkTitle: "End-to-End Tests"
weight: 4
description: >
  Non-deterministic tests that validate the entire software system along with its integration with external interfaces and production-like scenarios.
---

{{% pageinfo %}}
Adapted from [Dojo Consortium](https://dojoconsortium.org)
{{% /pageinfo %}}

## Definition

End-to-end (E2E) tests validate the entire software system, including its integration with
external interfaces. They exercise complete production-like scenarios using real (or
production-like) data and environments to simulate real-time settings. No test doubles are
used. The test hits live services, databases, and third-party integrations just as a real
user would.

Because they depend on external systems, E2E tests are typically **non-deterministic**: they
can fail for reasons unrelated to code correctness, such as network instability or
third-party outages.

## When to Use

E2E tests should be the **least-used** test type due to their high cost in execution time and
maintenance. Use them for:

- **Happy-path validation** of critical business flows (e.g., user signup, checkout, payment
  processing).
- **Smoke testing** a deployed environment to verify that key integrations are functioning.
- **Cross-team workflows** that span multiple sub-systems and cannot be tested any other way.

Do **not** use E2E tests to cover edge cases, error handling, or input validation. Those
scenarios belong in [unit](../unit/), [integration](../integration/), or
[functional](../functional/) tests.

### Vertical vs. Horizontal E2E Tests

**Vertical E2E tests** target features under the control of a single team:

- Favoriting an item and verifying it persists across refresh.
- Creating a saved list and adding items to it.

**Horizontal E2E tests** span multiple teams:

- Navigating from the homepage through search, item detail, cart, and checkout.

Horizontal tests are significantly more complex and fragile. Due to their large failure
surface area, they are **not suitable for blocking release pipelines**.

## Characteristics

| Property        | Value                                              |
|-----------------|----------------------------------------------------|
| **Speed**       | Seconds to minutes per test                        |
| **Determinism** | Typically non-deterministic                        |
| **Scope**       | Full system including external integrations         |
| **Dependencies**| Real services, databases, third-party APIs          |
| **Network**     | Full network access                                |
| **Database**    | Live databases                                     |
| **Breaks build**| Generally no (see guidance below)                  |

## Examples

A vertical E2E test verifying user lookup through a live web interface:

```java
@Test
public void verifyValidUserLookup() throws Exception {
    // Act -- interact with the live application
    homePage.getUserData("validUserId");
    waitForElement(By.xpath("//span[@id='name']"));

    // Assert -- verify real data returned from the live backend
    assertEquals("Ada Lovelace", homePage.getName());
    assertEquals("Engineering", homePage.getOrgName());
    assertEquals("Grace Hopper", homePage.getManagerName());
}
```

A browser-based E2E test using a tool like Playwright:

```javascript
test("user can add an item to cart and check out", async ({ page }) => {
  await page.goto("https://staging.example.com");
  await page.getByRole("link", { name: "Running Shoes" }).click();
  await page.getByRole("button", { name: "Add to Cart" }).click();

  await page.getByRole("link", { name: "Cart" }).click();
  await expect(page.getByText("Running Shoes")).toBeVisible();

  await page.getByRole("button", { name: "Checkout" }).click();
  await expect(page.getByText("Order confirmed")).toBeVisible();
});
```

## Anti-Patterns

- **Using E2E tests as the primary safety net**: this is the "ice cream cone" anti-pattern.
  E2E tests are slow and fragile; the majority of your confidence should come from unit and
  integration tests.
- **Blocking the pipeline with horizontal E2E tests**: these tests span too many teams and
  failure surfaces. Run them asynchronously and review failures out of band.
- **Ignoring flaky failures**: E2E tests often fail for environmental reasons. Track the
  frequency and root cause of failures. If a test is not providing signal, fix it or remove
  it.
- **Testing edge cases in E2E**: exhaustive input validation and error-path testing should
  happen in cheaper, faster test types.
- **Not capturing failure context**: E2E failures are expensive to debug. Capture
  screenshots, network logs, and video recordings automatically on failure.

## Connection to CD Pipeline

E2E tests run in the **later stages** of the delivery pipeline, after the build artifact has
passed all deterministic tests and has been deployed to a staging or pre-production
environment:

1. **Post-deployment smoke tests**: a small, fast suite of vertical E2E tests verifies that
   the deployment succeeded and critical paths work.
2. **Scheduled regression suites**: broader E2E suites (including horizontal tests) run on a
   schedule rather than on every commit.
3. **Production monitoring**: customer experience alarms (synthetic monitoring) are a form of
   continuous E2E testing that runs in production.

Because E2E tests are non-deterministic, they should **not break the build** in most cases. A
team may choose to gate on a small set of highly reliable vertical E2E tests, but must invest
in reducing false positives to make this valuable. CD pipelines should be optimized for rapid
recovery of production issues rather than attempting to prevent all defects with slow,
fragile E2E gates.

---

> This content is adapted from the [Dojo Consortium](https://dojoconsortium.org),
> licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
