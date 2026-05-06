---
title: "Pre-ship Checklist"
linkTitle: "Pre-ship Checklist"
weight: 1
description: >
  Quick audit for any component before it ships. Walk back to the section that needs attention for any item that fails.
---

Use this as a set of prompts for a quick self-audit, not a list of gates that must all pass. Items that don't apply to a component can be ignored; items the list doesn't mention but your component clearly needs should be added. Walk back to the [pattern]({{< relref "/docs/testing/applied-testing-strategies/patterns" >}}) or [cross-cutting concern]({{< relref "/docs/testing/applied-testing-strategies/cross-cutting-concerns" >}}) that needs attention for any item that prompts a "we should fix that."

- [ ] The bulk of the suite is [sociable unit tests]({{< relref "/docs/testing/glossary#sociable-unit-test" >}}) that exercise how behaviours collaborate to deliver a domain operation. [Solitary unit tests]({{< relref "/docs/testing/test-types/unit" >}}) are reserved for genuinely complex pure logic.
- [ ] Tests are organized around domain operations, not around classes or methods. Test names read as something a stakeholder would recognize.
- [ ] Every public-interface contract (inbound and outbound) has a [contract test]({{< relref "/docs/testing/test-types/contract" >}}) running in the [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}).
- [ ] Classes are tested through their public methods only. No reflection, no test-only visibility relaxations, no asserting on private state.
- [ ] Every consumed [external dependency]({{< relref "/docs/reference/glossary#external-dependency" >}}) is wrapped in a gateway the team owns; doubles are of the gateway, not of the third-party library.
- [ ] Every gateway has a adapter integration test against the real dependency or a high-fidelity stand-in (testcontainer, WireMock with provider fixtures).
- [ ] The bulk of testing runs [in-band]({{< relref "/docs/testing/glossary#in-band-test" >}}) in the pipeline and gates the build; [out-of-band]({{< relref "/docs/testing/glossary#out-of-band-test" >}}) checks against real systems run on a schedule and trigger review on failure, never a build break.
- [ ] Every [test double]({{< relref "/docs/testing/glossary#test-double" >}}) has a corresponding non-deterministic check that exercises the real dependency on a schedule or post-deploy.
- [ ] Every documented failure mode has a negative test.
- [ ] Every error response has a test that verifies the error envelope, status code, and any side effects (or absence thereof).
- [ ] Time, randomness, and the network are injected, not called directly. No `sleep` in tests. Use bounded polling or a fake clock.
- [ ] All deterministic tests run pre-commit and in [CI]({{< relref "/docs/reference/glossary#ci-continuous-integration" >}}) Stage 1, and fail the build on failure.
- [ ] All post-deploy integration checks run out of pipeline and trigger review on failure, never blocking a commit.
- [ ] Pipeline gates map to defect sources from the [Systemic Defect Fixes]({{< relref "/docs/reference/defect-sources" >}}) catalog. If a defect category has no automated check, that's a known risk.
- [ ] Authn and authz are tested across every protected endpoint, not as one-offs per feature.
- [ ] Database migrations are tested forward, backward (where supported), and on representative data volume against the production engine.
- [ ] Fixtures are generated from the schema or built through Object Mother / builder helpers, not inline literals.
- [ ] Failure-path tests assert on observability (metric incremented, structured log emitted with correlation ID), not just the response.
- [ ] Per-endpoint perf budgets exist for hot paths; load tests gate production promotion; soak tests run out of pipeline.
- [ ] Flaky tests are quarantined with a dated owner and time-boxed remediation. No permanent quarantine list.
- [ ] The deterministic suite respects the pattern's time budget (under 5 to 8 minutes per component, under 10 minutes total).
