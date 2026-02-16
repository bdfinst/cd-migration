---
aliases:
  - /docs/symptoms/coordinated-deployments/
title: "Multiple Services Must Be Deployed Together"
linkTitle: "Coordinated deployments required"
description: >
  Changes cannot go to production until multiple services are deployed in a specific order
  during a coordinated release window.
tags:
  - architecture
  - deployment-automation
---

## What you are seeing

A developer finishes a change to one service. It is tested, reviewed, and ready to deploy. But it
cannot go out alone. The change depends on a schema migration in a shared database, a new endpoint
in another service, and a UI update in a third. All three teams coordinate a release window.
Someone writes a deployment runbook with numbered steps. If step four fails, steps one through
three need to be rolled back manually.

The team cannot deploy on a Tuesday afternoon because the other teams are not ready. The change
sits in a branch (or merged to main but feature-flagged off) waiting for the coordinated release
next Thursday. By then, more changes have accumulated, making the release larger and riskier.

## Common causes

### Tightly Coupled Architecture

When services share a database, call each other without versioned contracts, or depend on
deployment order, they cannot be deployed independently. A change to Service A's data model breaks
Service B if Service B is not updated at the same time. The architecture forces coordination
because the boundaries between services are not real boundaries. They are implementation details
that leak across service lines.

**Read more:** [Tightly Coupled Monolith](../../anti-patterns/architecture/tightly-coupled-monolith/)

### Distributed Monolith

The organization moved from a monolith to services, but the service boundaries are wrong. Services
were decomposed along technical lines (a "database service," an "auth service," a "notification
service") rather than along domain lines. The result is services that cannot handle a business
request on their own. Every user-facing operation requires a synchronous chain of calls across
multiple services. If one service in the chain is unavailable or deploying, the entire operation
fails.

This is a monolith distributed across the network. It has all the operational complexity of
microservices (network latency, partial failures, distributed debugging) with none of the
benefits (independent deployment, team autonomy, fault isolation). Deploying one service still
requires deploying the others because the boundaries do not correspond to independent units of
business functionality.

**Read more:** [Distributed Monolith](../../anti-patterns/architecture/distributed-monolith/)

### Horizontal Slicing

When work for a feature is decomposed by service ("Team A builds the API, Team B updates the UI,
Team C modifies the processor"), each team's change is incomplete on its own. Nothing is
deployable until all teams finish their part. The decomposition created the coordination
requirement. Vertical slicing within each team's domain, with stable contracts between services,
allows each team to deploy when their slice is ready.

**Read more:** [Horizontal Slicing](../../anti-patterns/team-workflow/horizontal-slicing/)

### Undone Work

Sometimes the coordination requirement is artificial. The service could technically be deployed
independently, but the team's definition of done requires a cross-service integration test that
only runs during the release window. Or deployment is gated on a manual approval from another
team. The coordination is not forced by the architecture but by process decisions that bundle
independent changes into a single release event.

**Read more:** [Undone Work](../../anti-patterns/team-workflow/undone-work/)

## How to narrow it down

1. **Do services share a database or call each other without versioned contracts?** If yes, the
   architecture forces coordination. Changes to shared state or unversioned interfaces cannot be
   deployed independently. Start with
   [Tightly Coupled Monolith](../../anti-patterns/architecture/tightly-coupled-monolith/).
2. **Does every user-facing request require a synchronous chain across multiple services?** If a
   single business operation touches three or more services in sequence, the service boundaries
   were drawn in the wrong place. You have a distributed monolith. Start with
   [Distributed Monolith](../../anti-patterns/architecture/distributed-monolith/).
3. **Was the feature decomposed by service or team rather than by behavior?** If each team built
   their piece of the feature independently and now all pieces must go out together, the work was
   sliced horizontally. Start with
   [Horizontal Slicing](../../anti-patterns/team-workflow/horizontal-slicing/).
4. **Could each service technically be deployed on its own, but process or policy prevents it?**
   If the coupling is in the release process (shared release window, cross-team sign-off, manual
   integration test gate) rather than in the code, the constraint is organizational. Start with
   [Undone Work](../../anti-patterns/team-workflow/undone-work/) and examine whether the definition
   of done requires unnecessary coordination.

---

## Related Content

- [Releases Are Infrequent and Painful](../infrequent-releases/) - Coordination overhead makes releases less frequent
- [Distributed Monolith](../../anti-patterns/architecture/distributed-monolith/) - Services that cannot deploy independently
- [Tightly Coupled Monolith](../../anti-patterns/architecture/tightly-coupled-monolith/) - Architectural coupling that forces coordination
- [Architecture Decoupling](../../migrate-to-cd/migration-path/optimize/architecture-decoupling/) - Breaking dependencies between services
- [Lead Time](../../metrics/lead-time/) - Measure the cost of coordination in delivery speed
