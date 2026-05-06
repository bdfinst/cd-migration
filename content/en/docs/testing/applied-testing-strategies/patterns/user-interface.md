---
title: "User Interface"
linkTitle: "User Interface"
weight: 4
description: >
  A UI that renders data and accepts user interaction. Talks to one or more backend APIs.
---

A UI that renders data and accepts user interaction. Talks to one or more backend APIs.

## What needs covered

| Layer | Concern | Test type |
| --- | --- | --- |
| Pure rendering | Component renders given props/state | [Solitary unit tests]({{< relref "/docs/testing/glossary#solitary-unit-test" >}}) |
| Component composition | Composed components wire correctly | [Sociable unit tests]({{< relref "/docs/testing/glossary#sociable-unit-test" >}}) |
| Feature behaviour | A flow (login, checkout, search) works through the rendered DOM with the backend stubbed at the network layer | [Component tests]({{< relref "/docs/testing/glossary#component-test" >}}) driven by Playwright with the team's unit-testing framework as the runner |
| Backend contract | What the UI sends and expects from each backend endpoint | [Consumer-side contract tests]({{< relref "/docs/testing/glossary#contract-test" >}}) |
| End-to-end happy paths | A small number of critical journeys against real backends | [E2E tests]({{< relref "/docs/testing/test-types/e2e" >}}), post-deploy |
| Visual regression | The UI looks right | Snapshot or visual diff tests |
| Accessibility | The UI works for assistive tech and keyboard users | Assertions in [component tests]({{< relref "/docs/testing/glossary#component-test" >}}) + automated WCAG scanning |

{{< inline-svg src="/images/testing/patterns/user-interface-coverage.svg" alt="Layered diagram of a user interface with five architectural layers. The first four (pure rendering, component composition, feature behaviour in the rendered DOM, backend HTTP gateway) are inside the component boundary. Below the dashed boundary, the external backend API is drawn with a dashed border. Solitary unit tests cover pure rendering. Sociable unit tests cover composition. Component tests driven by Playwright cover feature behaviour with the backend doubled at the network layer. Consumer contract tests pin each backend boundary. End-to-end tests run post-deploy against the real backend." >}}

UI component tests run in a real browser engine (Chromium, Firefox, WebKit) driven by Playwright, with the team's existing unit-testing framework (Vitest, Jest, or whatever is already in the project) as the runner. In-memory renderer shortcuts like JSDOM are rejected: they trade accuracy for speed and produce false greens around layout, focus, event timing, Intersection Observer, and animations - exactly the surface where UI bugs live. Playwright's headless Chromium starts in milliseconds and runs the suite fast enough to use as the default. Backends are stubbed at the network layer with `page.route` so the same fixtures drive component tests today and end-to-end smoke tests later.

## Positive test cases

Common cases to consider, not an exhaustive list. Drop items that don't apply and add ones the pattern doesn't mention but your component needs.

- **Critical flows**: a user can complete each documented critical flow via keyboard and via mouse.
- **Forms**: accept valid input, submit, and show success.
- **Loading states**: render while the backend is in flight.
- **Empty, populated, and overflow states**: all render correctly.
- **Internationalization**: the UI renders with longer translations and right-to-left scripts.
- **Responsive layouts**: render at the documented breakpoints.

## Negative test cases

Common cases to consider, not an exhaustive list. Drop items that don't apply and add ones the pattern doesn't mention but your component needs.

- **Backend errors**: for every API call the UI makes, what does the user see for 4xx, 5xx, network failure, timeout? Test each. The most common UI bug is "spins forever on error."
- **Form validation**: required fields, format errors, length limits, cross-field rules. Each shows a specific, actionable message that's announced to screen readers.
- **Authentication expiry**: token expires mid-session. Verify the user is sent through the documented re-auth flow, not silently dropped.
- **Permission denied**: the user navigates to a page they cannot access. Verify the documented response (redirect, "not authorized," etc.).
- **Stale data**: a list rendered, then a delete on another tab, then the user clicks the deleted item. Verify the documented refresh or error behavior.
- **Slow network**: every interaction has a documented behavior at 3G speeds. Verify with throttled fixtures.
- **Concurrent edit**: two users editing the same record. Verify the optimistic-lock UX behaves as documented.
- **Browser back button**: the back button is a public interface. Test it.
- **Accessibility violations**: automated WCAG scan in component tests catches missing labels, contrast failures, ARIA misuse on every commit. Don't defer to quarterly audits.

## Test double validation

Backend doubles in component tests must match the real backends. Same mechanism as the [API consumer pattern]({{< relref "/docs/testing/applied-testing-strategies/patterns/api-consumer" >}}): the UI is a consumer, every backend it talks to is a provider. Consumer-driven contracts run on every commit; provider verification runs in the backend's [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}). Post-deploy E2E smoke tests against the real backend close the loop on drift the contract didn't pin.

Because UI component tests run in a real browser engine, there is no renderer-level double to validate. The browser **is** the production renderer, just headless. The remaining gap is between the stubbed backend and the real backend, which the [out-of-band]({{< relref "/docs/testing/glossary#out-of-band-test" >}}) E2E suite covers. Out-of-band failures trigger review, not a build break.

## Pipeline placement

- Unit tests (rendering, composition): [CI]({{< relref "/docs/reference/glossary#ci-continuous-integration" >}}) Stage 1.
- Component tests in headless browser (including a11y assertions): CI Stage 1.
- Visual regression: CI Stage 1 if fast, CI Stage 2 if slow.
- Consumer-side contract tests for each backend: CI Stage 1.
- E2E happy-path smoke tests against real backends: post-deploy, in a [production-like environment]({{< relref "/docs/reference/glossary#production-like-environment" >}}), blocking the rollout but not the build.
- Real user monitoring + synthetic transactions: continuously in production.

## Example: UI component test for an error path

A flow-oriented test for the checkout error path. Playwright drives a headless browser; the backend is stubbed at the network layer with `page.route`; the team's existing unit-testing framework (Vitest, JUnit, xUnit) runs the test. The assertion: the user sees a documented error message and the spinner does not get stuck.

{{< tabpane >}}
{{< tab header="Java" lang="java" >}}
@Test
void shows_error_and_clears_spinner_when_checkout_fails_with_500() {
  try (Playwright playwright = Playwright.create();
       Browser browser = playwright.chromium().launch()) {
    Page page = browser.newPage();

    page.route("**/api/checkout", route ->
        route.fulfill(new Route.FulfillOptions()
            .setStatus(500)
            .setContentType("application/json")
            .setBody("{\"error\":{\"code\":\"INTERNAL\"}}")));

    page.navigate("http://localhost:3000/checkout");
    page.getByRole(AriaRole.BUTTON,
        new Page.GetByRoleOptions().setName("Place order")).click();

    assertThat(page.getByRole(AriaRole.ALERT))
        .containsText("Something went wrong, please try again");
    assertThat(page.getByRole(AriaRole.STATUS)).not().isVisible();
  }
}
{{< /tab >}}
{{< tab header="C#" lang="csharp" >}}
[Fact]
public async Task Shows_error_and_clears_spinner_when_checkout_fails_with_500()
{
    using var playwright = await Playwright.CreateAsync();
    await using var browser = await playwright.Chromium.LaunchAsync();
    var page = await browser.NewPageAsync();

    await page.RouteAsync("**/api/checkout", route => route.FulfillAsync(new()
    {
        Status = 500,
        ContentType = "application/json",
        Body = "{\"error\":{\"code\":\"INTERNAL\"}}"
    }));

    await page.GotoAsync("http://localhost:3000/checkout");
    await page.GetByRole(AriaRole.Button, new() { Name = "Place order" })
        .ClickAsync();

    await Expect(page.GetByRole(AriaRole.Alert))
        .ToContainTextAsync("Something went wrong, please try again");
    await Expect(page.GetByRole(AriaRole.Status)).Not.ToBeVisibleAsync();
}
{{< /tab >}}
{{< tab header="JavaScript" lang="javascript" >}}
import { test, expect, beforeAll, afterAll } from "vitest";
import { chromium } from "playwright";

let browser;

beforeAll(async () => { browser = await chromium.launch(); });
afterAll(async () => { await browser.close(); });

test("shows error and clears spinner when checkout fails with 500", async () => {
  const page = await browser.newPage();

  await page.route("**/api/checkout", route =>
    route.fulfill({
      status: 500,
      contentType: "application/json",
      body: JSON.stringify({ error: { code: "INTERNAL" } }),
    })
  );

  await page.goto("http://localhost:3000/checkout");
  await page.getByRole("button", { name: /place order/i }).click();

  await expect(page.getByRole("alert"))
    .toContainText(/something went wrong, please try again/i);
  await expect(page.getByRole("status")).not.toBeVisible();
});
{{< /tab >}}
{{< /tabpane >}}

The test exercises the rendered DOM the way a real user would. Intercepting at the network layer with `page.route` keeps the same fixtures reusable when the component test gets promoted to an end-to-end smoke test against the real backend.
