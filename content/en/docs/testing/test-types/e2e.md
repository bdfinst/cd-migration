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

Verification of a complete end-to-end user or business transaction through the entire deployed application stack, matching the perspective and experience of an actual user or external consumer.

## Scope & Boundaries

Encompasses the entire system topology—from the frontend UI or external API gateway through all internal microservices, asynchronous workers, live queues, databases, and necessary third-party sandbox integrations.

## Core Characteristics

Highest real-world confidence, highest execution cost, slowest run time, and highest vulnerability to environment or network-induced flakiness.

## Good Practices

-	Restrict to critical revenue/operational paths: Focus E2E coverage strictly on non-negotiable user journeys (e.g., user registration, primary checkout, key ingest pipelines).
-	Automate environment provisioning: Deploy ephemeral, on-demand preview environments to run E2E suites and tear them down immediately upon completion.
-	Implement resilient element selection: Select UI elements using accessibility roles or stable data attributes (e.g., data-testid) rather than fragile CSS classes or absolute XPath selectors.

## Anti-Patterns

-	Using E2E tests for regression safety nets: Relying on E2E suites to catch regressions that could have been detected upstream in unit, component, or contract stages (the "inverted testing pyramid").
-	Arbitrary thread sleeps: Adding fixed pauses (e.g., sleep(5)) to wait for asynchronous events rather than using explicit, condition-driven polling.
-	Accepting flaky tests: Rerunning failing E2E tests until they turn green rather than quarantining and fixing the underlying timing or state issues immediately.

## Weaknesses & Challenges

-	High Flakiness and Low Signal-to-Noise Ratio: Non-deterministic failures are common. Network blips, browser rendering lag, race conditions in asynchronous frontend frameworks, and transient third-party service outages often cause false-negative test failures that erode developer trust.
-	Poor Root-Cause Localization: When an E2E test fails with a generic error (e.g., TimeoutError: Element #confirmation-banner not found), finding the source of the issue requires combing through client logs, gateway routes, backend microservice traces, and database state to determine what actually broke.
-	Environment Maintenance & Resource Cost: E2E suites typically demand fully integrated staging or preview environments. Keeping these environments populated with realistic test data, configured with active credentials, and synchronized across dozens of microservices is notoriously resource-intensive.
-	Prohibitive Execution Times: Running full browser automation or multi-service distributed flows can take anywhere from tens of minutes to several hours. This latency breaks continuous delivery flow, encouraging teams to defer testing to late-stage, batch-processed pipelines rather than getting instant feedback on change.
-	Tight Coupling to Volatile UI/API Layouts: Small cosmetic changes (like modifying class names, reordering markup, or tweaking a multi-step user flow) often break brittle E2E tests even though the underlying business capability remains completely functional.

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

## When to Use / Avoid

### Use them for:

- **Happy-path validation** of critical business flows that cannot be verified any
  other way (e.g., a payment flow that depends on a real payment provider).
- **Entangled domain workflows** that span multiple [deployables]({{< relref "/docs/reference/glossary#deployable" >}}) and cannot be isolated
  within a single [component test]({{< relref "/docs/testing/test-types/component" >}}).

They are the most expensive test type to write, run, and maintain. Use them sparingly.

### Avoid for:

- Edge cases, error handling, or input validation. Those scenarios belong in [unit]({{< relref "/docs/testing/test-types/unit" >}}) or
[component]({{< relref "/docs/testing/test-types/component" >}}) tests.

## Connection to CD Pipeline

E2E tests should only run in the pipeline as part of the longer running acceptance tests if they can be made dependable and deterministic. Otherwise, they should be run on a schedule and not act as a delivery decision.
