---
title: "End-to-End Tests"
linkTitle: "End-to-End Tests"
weight: 3
aliases:
  - /docs/testing/test-types/e2e/
  - /docs/reference/testing/e2e/
  - /docs/testing/e2e/
description: >
  Tests that exercise two or more real components up to the full system. Non-deterministic by nature; never a pre-merge gate.
---

{{< figure src="/images/testing/e2e-test.svg" alt="End-to-end test scope spectrum. Narrow scope: a test drives a real service that calls a real database. Full-system scope: a browser drives a real frontend, which calls a real backend, which calls a real database. All components are real at every scope - no test doubles." >}}

## Definition

Verification of a complete end-to-end user or business transaction through the entire deployed application stack. The test matches the perspective and experience of an actual user or external consumer.

## Scope & boundaries

Encompasses the entire system topology. Scope runs from the frontend UI or external API gateway through all internal microservices and asynchronous workers. It also includes live queues, databases, and necessary third-party sandbox integrations.

## Core characteristics

Highest real-world confidence, highest execution cost, slowest run time, and highest vulnerability to environment or network-induced flakiness.

## Good practices

-	Restrict to critical revenue/operational paths: Focus E2E coverage strictly on non-negotiable user journeys (for example, user registration, primary checkout, key ingest pipelines).
-	Automate environment provisioning: Deploy ephemeral, on-demand preview environments to run E2E suites and tear them down immediately upon completion.
-	Implement resilient element selection: Select UI elements using accessibility roles or stable data attributes (for example, data-testid). Avoid fragile CSS classes or absolute XPath selectors.

## Anti-patterns

-	Using E2E tests for regression safety nets: Relying on E2E suites to catch regressions that upstream unit, component, or contract stages could have detected. This is the "inverted testing pyramid."
-	Arbitrary thread sleeps: Adding fixed pauses (for example, sleep(5)) to wait for asynchronous events rather than using explicit, condition-driven polling.
-	Accepting flaky tests: Rerunning failing E2E tests until they turn green rather than quarantining and fixing the underlying timing or state issues immediately.

## Weaknesses & challenges

-	High Flakiness and Low Signal-to-Noise Ratio: Non-deterministic failures are common. Common causes are network blips, browser rendering lag, race conditions in asynchronous frontend frameworks, and transient third-party service outages. These false-negative test failures erode developer trust.
-	Poor Root-Cause Localization: An E2E test can fail with a generic error (for example, TimeoutError: Element #confirmation-banner not found). Finding the source then requires combing through client logs, gateway routes, backend microservice traces, and database state.
-	Environment Maintenance & Resource Cost: E2E suites typically demand fully integrated staging or preview environments. These environments need realistic test data, active credentials, and synchronization across dozens of microservices. Maintaining all of that is notoriously resource-intensive.
-	Prohibitive Execution Times: Running full browser automation or multi-service distributed flows can take anywhere from tens of minutes to several hours. This latency breaks continuous delivery flow. It encourages teams to defer testing to late-stage, batch-processed pipelines instead of getting instant feedback on change.
-	Tight Coupling to Volatile UI/API Layouts: Small cosmetic changes often break brittle E2E tests. Examples are modifying class names, reordering markup, or tweaking a multi-step user flow. The tests break even though the underlying business capability remains completely functional.

## Examples

{{< card code=true header="**Example (Playwright UI / Full System Flow)**" lang="javascript" >}}
import { test, expect } from '@playwright/test';

test('user can complete entire purchase flow', async ({ page }) => {
  // Navigates real UI against a fully deployed environment
  await page.goto('https://checkout.staging.example.com');
  await page.fill('#username', 'test_user');
  await page.fill('#password', 'SecurePass123!');
  await page.click('button[type="submit"]');

  // Add item to cart and initiate purchase
  await page.click('button[data-item="product-42"]');
  await page.click('#cart-checkout');
  await page.fill('#card-element', '4242424242424242');
  await page.click('#submit-payment');

  // Confirms response propagated across API, async billing, and UI rendering
  await expect(page.locator('.order-confirmation')).toHaveText(/Order #\d+ Confirmed/);
});
{{< /card >}}

## When to use / avoid

### Use them for:

- **Happy-path validation** of critical business flows that cannot be verified any
  other way (for example, a payment flow that depends on a real payment provider).
- **Entangled domain workflows** that span multiple [deployables]({{< relref "/docs/reference/glossary#deployable" >}}) and cannot be isolated
  within a single [component test]({{< relref "/docs/foundations/testing-fundamentals/test-types/component" >}}).

They are the most expensive test type to write, run, and maintain. Use them sparingly.

### Avoid for:

- Edge cases, error handling, or input validation. Those scenarios belong in [unit]({{< relref "/docs/foundations/testing-fundamentals/test-types/unit" >}}) or
[component]({{< relref "/docs/foundations/testing-fundamentals/test-types/component" >}}) tests.

## Connection to CD pipeline

E2E tests should only run in the pipeline as part of the longer running acceptance tests if they can be made dependable and deterministic. Otherwise, they should be run on a schedule and not act as a delivery decision.
