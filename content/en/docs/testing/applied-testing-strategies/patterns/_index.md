---
title: "Patterns"
linkTitle: "Patterns"
weight: 2
description: >
  Eight common component patterns and how to test each fully. Each page covers what to verify, positive and negative cases, double validation, pipeline placement, and a small code example.
---

Each page in this subsection covers one component pattern. The structure is the same on every page so you can scan-compare:

1. **What needs covered** - the layers of testing the pattern typically benefits from.
2. **Positive test cases** - common success behaviours worth testing.
3. **Negative test cases** - common failure modes that produce production incidents.
4. **Test double validation** - how the doubles in [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}) tests stay honest.
5. **Pipeline placement** - where each test type tends to run.
6. **Example** - a short code sample illustrating one of the harder cases for that pattern.

These are recommended starting points, not exhaustive lists or required gates. Real components have details these pages don't capture; ignore items that don't apply, and add items the pattern doesn't mention but your component clearly needs. The goal is to prompt the conversation, not to constrain it.

API provider, API consumer, scheduled job, and user interface are covered in depth. Event consumer, event producer, CLI/library, and stateful service are deliberately briefer sketches: the same six principles apply, the same checklist still prompts useful questions, and the test double validation model is the same. Use the briefer sketches as a starting point and expand the depth in your own runbooks for the patterns your services actually use.

## The patterns

- [API provider]({{< relref "/docs/testing/applied-testing-strategies/patterns/api-provider" >}}) - a backend service exposing an HTTP/gRPC/GraphQL API and owning its own data.
- [API consumer]({{< relref "/docs/testing/applied-testing-strategies/patterns/api-consumer" >}}) - the above, plus outbound calls to other services. The most failure-prone pattern.
- [Scheduled job]({{< relref "/docs/testing/applied-testing-strategies/patterns/scheduled-job" >}}) - a service triggered on a cron, queue, or external scheduler.
- [User interface]({{< relref "/docs/testing/applied-testing-strategies/patterns/user-interface" >}}) - a UI that renders data and accepts user interaction.
- [Event consumer]({{< relref "/docs/testing/applied-testing-strategies/patterns/event-consumer" >}}) - a service that consumes messages from a broker.
- [Event producer]({{< relref "/docs/testing/applied-testing-strategies/patterns/event-producer" >}}) - a service that produces messages to a broker.
- [CLI tool or library]({{< relref "/docs/testing/applied-testing-strategies/patterns/cli-library" >}}) - a binary or package consumed by other developers.
- [Stateful service]({{< relref "/docs/testing/applied-testing-strategies/patterns/stateful-service" >}}) - a service that maintains long-lived in-memory state.
