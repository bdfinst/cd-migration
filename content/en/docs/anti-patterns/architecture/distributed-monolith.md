---
title: "Distributed Monolith"
linkTitle: "Distributed Monolith"
weight: 78
category: "Architecture"
risk_level: high
description: >
  Services exist but the boundaries are wrong. Every business operation requires a synchronous
  chain across multiple services, and nothing can be deployed independently.
tags:
  - architecture
  - deployment-automation
---

{{% pageinfo %}}
**Category:** {{< param category >}} | {{% risk-indicator level="high" %}}
{{% /pageinfo %}}

## What This Looks Like

The organization has services. The architecture diagram shows boxes with arrows between them. But
deploying any one service without simultaneously deploying two others breaks production. A single
user request passes through four services synchronously before returning a response. When one
service in the chain is slow, the entire operation fails. The team has all the complexity of a
distributed system and all the coupling of a monolith.

Common variations:

- **Technical-layer services.** Services were decomposed along technical lines: an "auth service,"
  a "notification service," a "data access layer," a "validation service." No single service can
  handle a complete business operation. Every user action requires orchestrating calls across
  multiple services because the business logic is scattered across technical boundaries.
- **The shared database.** Services have separate codebases but read and write the same database
  tables. A schema change in one service breaks queries in others. The database is the hidden
  coupling that makes independent deployment impossible regardless of how clean the service APIs
  look.
- **The synchronous chain.** Service A calls Service B, which calls Service C, which calls Service
  D. The response time of the user's request is the sum of all four services plus network latency
  between them. If any service in the chain is deploying, the entire operation fails. The chain
  must be deployed as a unit.
- **The orchestrator service.** One service acts as a central coordinator, calling all other
  services in sequence to fulfill a request. It contains the business logic for how services
  interact. Every new feature requires changes to the orchestrator and at least one downstream
  service. The orchestrator is a god object distributed across the network.

The telltale sign: services cannot be deployed, scaled, or failed independently. A problem in any
one service cascades to all the others.

## Why This Is a Problem

A distributed monolith combines the worst properties of both architectures. It has the operational
complexity of microservices (network communication, partial failures, distributed debugging) with
the coupling of a monolith (coordinated deployments, shared state, cascading failures). The team
pays the cost of both and gets the benefits of neither.

### It reduces quality

Incorrect service boundaries scatter related business logic across multiple services. A developer
implementing a feature must understand how three or four services interact rather than reading one
cohesive module. The mental model required to make a correct change is larger than it would be in
either a well-structured monolith or a correctly decomposed service architecture.

Distributed failure modes compound this. Network calls between services can fail, time out, or
return stale data. When business logic spans services, handling these failures correctly requires
understanding the full chain. A developer who changes one service may not realize that a timeout
in their service causes a cascade failure three services downstream.

### It increases rework

Every feature that touches a business domain crosses service boundaries because the boundaries do
not align with domains. A change to how orders are discounted requires modifying the pricing
service, the order service, and the invoice service because the discount logic is split across all
three. The developer opens three PRs, coordinates three reviews, and sequences three deployments.

When the team eventually recognizes the boundaries are wrong, correcting them is a second
architectural migration. Data must move between databases. Contracts must be redrawn. Clients must
be updated. The cost of redrawing boundaries after the fact is far higher than drawing them
correctly the first time.

### It makes delivery timelines unpredictable

Coordinated deployments are inherently riskier and slower than independent ones. The team must
schedule release windows, write deployment runbooks, and plan rollback sequences. If one service
fails during the coordinated release, the team must decide whether to roll back everything or push
forward with a partial deployment. Neither option is safe.

Cross-service debugging also adds unpredictable time. A bug that manifests in Service A may
originate in Service C's response format. Tracing the issue requires reading logs from multiple
services, correlating request IDs, and understanding the full call chain. What would be a
30-minute investigation in a monolith becomes a half-day effort.

### It eliminates the benefits of services

The entire point of service decomposition is independent operation: deploy independently, scale
independently, fail independently. A distributed monolith achieves none of these:

- **Cannot deploy independently.** Deploying Service A without Service B breaks production because
  they share state or depend on matching contract versions without backward compatibility.
- **Cannot scale independently.** The synchronous chain means scaling Service A is pointless if
  Service C (which Service A calls) cannot handle the increased load. The bottleneck moves but
  does not disappear.
- **Cannot fail independently.** A failure in one service cascades through the chain. There are no
  circuit breakers, no fallbacks, and no graceful degradation because the services were not
  designed for partial failure.

### Impact on continuous delivery

CD requires that every change can flow from commit to production independently. A distributed
monolith makes this impossible because changes cannot be deployed independently. The deployment
unit is not a single service but a coordinated set of services that must move together.

This forces the team back to batch releases: accumulate changes across services, test them
together, deploy them together. The batch grows over time because each release window is expensive
to coordinate. Larger batches mean higher risk, longer rollbacks, and less frequent delivery. The
architecture that was supposed to enable faster delivery actively prevents it.

## How to Fix It

### Step 1: Map the actual dependencies

For each service, document:

- What other services does it call synchronously?
- What database tables does it share with other services?
- What services must be deployed at the same time?

Draw the dependency graph. Services that form a cluster of mutual dependencies are candidates for
consolidation or boundary correction.

### Step 2: Identify domain boundaries

Map business capabilities to services. For each business operation (place an order, process a
payment, send a notification), trace which services are involved. If a single business operation
touches four services, the boundaries are wrong.

Correct boundaries align with business domains: orders, payments, inventory, users. Each domain
service can handle its business operations without synchronous calls to other domain services.
Cross-domain communication happens through asynchronous events or well-versioned APIs with
backward compatibility.

### Step 3: Consolidate or redraw one boundary (Weeks 3-8)

Pick the cluster with the worst coupling and address it:

- **If the services are small and owned by the same team,** merge them into one service. This is
  the fastest fix. A single service with clear internal modules is better than three coupled
  services that cannot operate independently.
- **If the services are large or owned by different teams,** redraw the boundary along domain
  lines. Move the scattered business logic into the service that owns that domain. Extract shared
  database tables into the owning service and replace direct table access with API calls.

### Step 4: Break synchronous chains (Weeks 6+)

For cross-domain communication that remains after boundary correction:

- Replace synchronous calls with asynchronous events where the caller does not need an immediate
  response. Order placed? Publish an event. The notification service subscribes and sends the
  email without the order service waiting for it.
- For calls that must be synchronous, add backward-compatible versioning to contracts so each
  service can deploy on its own schedule.
- Add circuit breakers and timeouts so that a failure in one service does not cascade to callers.

### Step 5: Eliminate the shared database (Weeks 8+)

Each service should own its data. If two services need the same data, one of them owns the table
and the other accesses it through an API. Shared database access is the most common source of
hidden coupling and the most important to eliminate.

This is a gradual process: add the API, migrate one consumer at a time, and remove direct table
access when all consumers have migrated.

| Objection | Response |
|-----------|----------|
| "Merging services is going backward" | Merging poorly decomposed services is going forward. The goal is correct boundaries, not maximum service count. Fewer services with correct boundaries deliver faster than many services with wrong boundaries. |
| "Asynchronous communication is too complex" | Synchronous chains across services are already complex and fragile. Asynchronous events are more resilient and allow each service to operate independently. The complexity is different, not greater, and it pays for itself in deployment independence. |
| "We can't change the database schema without breaking everything" | That is exactly the problem. The shared database is the coupling. Eliminating it is the fix, not an obstacle. Use the Strangler Fig pattern: add the API alongside the direct access, migrate consumers gradually, and remove the old path. |

## Measuring Progress

| Metric | What to look for |
|--------|-----------------:|
| Services that must deploy together | Should decrease as boundaries are corrected |
| Synchronous call chain depth | Should decrease as chains are broken with async events |
| Shared database tables | Should decrease toward zero as each service owns its data |
| [Lead time](../../../metrics/lead-time/) | Should decrease as coordinated releases are replaced by independent deployments |
| [Change fail rate](../../../metrics/change-fail-rate/) | Should decrease as cascading failures are eliminated |
| Deployment coordination events per month | Should decrease toward zero |

## Related Content

- [Tightly Coupled Monolith](../tightly-coupled-monolith/) - The same coupling problem in a single codebase
- [Premature Microservices](../premature-microservices/) - When the problem is not wrong boundaries but unnecessary decomposition
- [Architecture Decoupling](../../../migrate-to-cd/migration-path/optimize/architecture-decoupling/) - Strategies for creating real service boundaries
- [Horizontal Slicing](../../team-workflow/horizontal-slicing/) - Technical-layer decomposition that produces distributed monoliths
- [Multiple Services Must Be Deployed Together](../../../symptoms/deployment/coordinated-deployments/) - The primary symptom of a distributed monolith
