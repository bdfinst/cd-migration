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
| Pure rendering | Component renders given props/state | [Solitary unit tests]({{< relref "/docs/testing/test-types/unit" >}}) |
| Component composition | Composed components wire correctly | [Sociable unit tests]({{< relref "/docs/testing/glossary#sociable-unit-test" >}}) |
| Feature behavior (JSDOM) | A flow (login, checkout, search) works through the rendered DOM with backend gateways doubled | [Component tests]({{< relref "/docs/testing/test-types/component" >}}) in JSDOM or equivalent in-memory renderer |
| Feature behavior (real browser) | The same flows in a real browser engine, exercising real layout, real event loop, real network stack to a stubbed backend (WireMock or service worker mocks) | A small set of component tests in headless Chromium/Firefox/WebKit |
| Backend contract | What the UI sends and expects from each backend endpoint | [Consumer-side contract tests]({{< relref "/docs/testing/test-types/contract" >}}) |
| End-to-end happy paths | A small number of critical journeys against real backends | E2E tests, post-deploy |
| Visual regression | The UI looks right | Snapshot or visual diff tests |
| Accessibility | The UI works for assistive tech and keyboard users | Assertions in component tests + automated WCAG scanning |

{{< figure src="/images/testing/patterns/user-interface-coverage.svg" alt="Coverage matrix for a user interface. Rows are pure rendering, component composition, feature behavior in the rendered DOM, the backend HTTP gateway, the renderer (JSDOM or real browser), and the external backend API. Columns are solitary unit, sociable unit, JSDOM component, headless-browser component, consumer contract, and end-to-end (post-deploy). Solitary unit tests cover pure rendering. Sociable unit tests cover composition. JSDOM component tests cover feature behavior, backend gateway, and the in-memory renderer with the real backend doubled. Headless-browser component tests run a representative subset of the same flows in a real browser. Consumer contract tests pin what the UI sends and depends on at each backend boundary. End-to-end tests run post-deploy in a real browser against the real backend and never block the build." >}}

The default for UI work is JSDOM: render the component tree in JSDOM (or React Native's test renderer, or whatever the framework's in-memory renderer is), drive it with Testing Library, double the backend gateway. The headless-browser variant, the same component tests running in headless Chromium, is the layer that catches what JSDOM gets wrong: real CSS layout, real focus management, real event timing, real Intersection Observer behavior. Run the full suite under JSDOM; run a representative subset in a headless browser to validate that JSDOM hasn't lied to you.

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

Two classes of doubles, validated through different mechanisms:

1. **Backend doubles in component tests must match the real backends.** Same mechanism as the [API consumer pattern]({{< relref "/docs/testing/applied-testing-strategies/patterns/api-consumer" >}}): the UI is a consumer, every backend it talks to is a provider. Consumer-driven contracts run on every commit; provider verification runs in the backend's [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}). Post-deploy E2E smoke tests against the real backend close the loop on drift the contract didn't pin.
2. **The renderer itself is a double of the real browser.** JSDOM and other in-memory renderers approximate browser behavior. Well enough for most logic, badly enough for layout, focus, and timing. The headless-browser subset is what validates the renderer-level double [in-band]({{< relref "/docs/testing/glossary#in-band-test" >}}). The E2E suite running [out-of-band]({{< relref "/docs/testing/glossary#out-of-band-test" >}}) against a real browser and a real backend in production-like conditions is the final backstop. Out-of-band failures trigger review, not a build break.

## Pipeline placement

- Unit and JSDOM component tests (including a11y assertions): [CI]({{< relref "/docs/reference/glossary#ci-continuous-integration" >}}) Stage 1.
- Headless-browser component tests (small set): CI Stage 1 or Stage 2.
- Visual regression: CI Stage 1 if fast, CI Stage 2 if slow.
- Consumer-side contract tests for each backend: CI Stage 1.
- E2E happy-path smoke tests against real backends in real browsers: post-deploy, in a [production-like environment]({{< relref "/docs/reference/glossary#production-like-environment" >}}), blocking the rollout but not the build.
- Real user monitoring + synthetic transactions: continuously in production.

## Example: JSDOM component test

A flow-oriented test for the checkout error path. The backend gateway is doubled with MSW; the test asserts the user sees a documented error message and the spinner does not get stuck:

```javascript
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Checkout } from "./Checkout.jsx";
import { cartFixture } from "./test/fixtures.js";

const server = setupServer();
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("shows error and clears spinner when checkout fails with 500", async () => {
  server.use(
    http.post("/api/checkout", () => HttpResponse.json(
      { error: { code: "INTERNAL" } }, { status: 500 }))
  );
  const user = userEvent.setup();
  render(<Checkout cart={cartFixture()} />);

  await user.click(screen.getByRole("button", { name: /place order/i }));

  expect(await screen.findByRole("alert"))
    .toHaveTextContent(/something went wrong, please try again/i);
  expect(screen.queryByRole("status")).not.toBeInTheDocument();
});
```

The test exercises the rendered DOM the way a real user would. The backend double is MSW, which intercepts at the network layer rather than at the SDK, so the same fixtures can drive the headless-browser variant of this test.
