---
title: "Horizontal Slicing"
linkTitle: "Horizontal Slicing"
weight: 29
category: "Team Workflow"
risk_level: medium
description: >
  Work is organized by technical layer ("build the API," "update the schema") rather than by
  independently deliverable behavior. Nothing ships until all the pieces are assembled.
tags:
  - work-decomposition
  - batch-size
---

{{% pageinfo %}}
**Category:** {{< param category >}} | {{% risk-indicator level="medium" %}}
{{% /pageinfo %}}

## What This Looks Like

The team breaks a feature into work items by technical layer. One item for the database schema. One
for the API. One for the UI. Maybe one for "integration testing" at the end. Each item lives in a
different lane or is assigned to a different specialist. Nothing reaches production until the last
layer is finished and all the pieces are stitched together.

In distributed systems this gets worse. A feature touches multiple services owned by different
teams. Instead of slicing the work so each team can deliver their part independently, the teams
plan a coordinated release. Team A builds the new API, Team B updates the UI, Team C modifies the
downstream processor. All three deliver "at the same time" during a release window, and the
integration is tested for the first time when the pieces come together.

Common variations:

- **Layer-based assignment.** "The backend team builds the API, the frontend team builds the UI."
  Each team delivers their layer independently. Integration is a separate phase that happens after
  both teams finish.
- **The database-first approach.** Every feature starts with "build the schema." Weeks of database
  work happen before any API or UI exists. The schema is designed for the complete feature rather
  than for the first thin slice.
- **The API-then-UI pattern.** The API is built and "tested" in isolation with Postman or curl.
  The UI is built weeks later against the API. Mismatches between what the API provides and what
  the UI needs are discovered at the end.
- **The cross-team integration sprint.** Multiple teams build their parts of a feature
  independently, then dedicate a sprint to wiring everything together. This sprint always takes
  longer than planned because the teams built on different assumptions about contracts and data
  formats.
- **Technical stories on the board.** The backlog contains items like "create database indexes,"
  "add caching layer," or "refactor service class." None of these deliver observable behavior. They
  are infrastructure work that has been separated from the feature it supports.

The telltale sign: a team cannot deploy their changes until another team deploys theirs first, or
until a coordinated release window.

## Why This Is a Problem

Horizontal slicing feels natural because it matches how developers think about the system's
architecture. But it optimizes for how the code is organized, not for how value is delivered. The
consequences compound in distributed systems where cross-team coordination multiplies every delay.

### It reduces quality

A horizontal slice delivers no observable behavior on its own. The schema alone does nothing. The
API alone does nothing a user can see. The UI alone has no data to display. Value only emerges when
all layers are assembled, and that assembly happens at the end.

When teams in a distributed system build their layers in isolation, each team makes assumptions
about how their service will interact with the others. These assumptions are untested until
integration. The longer the layers are built separately, the more assumptions accumulate and the
more likely they are to conflict. Integration becomes the riskiest phase, the phase where all the
hidden mismatches surface at once.

With [vertical slicing](../../../glossary/#vertical-sliced-story), integration happens with every item. The first slice forces the developer to
verify the contracts between services immediately. Assumptions are tested on day one, not month
three.

### It increases rework

A team that builds a complete API layer before any consumer touches it is guessing what the
consumer needs. When the UI team (or the upstream service team) finally integrates, they discover
the response format does not match, fields are missing, or the interaction model is wrong. The API
team reworks what they built weeks ago.

In a distributed system, this rework cascades. A contract mismatch between two services means both
teams rework their code. If a third service depends on the same contract, it reworks too. A single
misalignment discovered during a coordinated integration can send multiple teams back to revise
work they considered done.

Vertical slicing surfaces these mismatches immediately. Each slice forces the real contract to be
exercised end-to-end, so misalignments are caught when the cost of change is low: one slice, not
an entire layer.

### It makes delivery timelines unpredictable

Horizontal slicing creates hidden dependencies between teams. Team A cannot ship until Team B
finishes their layer. Team B is blocked on Team C's schema change. Nobody knows the real delivery
date because it depends on the slowest team in the chain.

Vertical slicing within a team's domain eliminates cross-team delivery dependencies. Each team
decomposes work so that their changes are independently [deployable](../../../glossary/#deployable). The team ships when their slice
is ready, not when every other team's slice is ready.

### It creates coordination overhead that scales poorly

When features require a coordinated release across teams, the coordination effort grows with the
number of teams involved. Someone has to schedule the release window. Someone has to sequence the
deployments. Someone has to manage the [rollback](../../../glossary/#rollback) plan when one team's deployment fails. This
coordination tax is paid on every feature, and it grows as the system grows.

Teams that slice vertically within their domains can deploy independently. They define stable
contracts at their service boundaries and deploy behind those contracts without waiting for other
teams. The coordination cost drops to near zero because the interfaces (not the release
schedule) handle the integration.

### Impact on continuous delivery

[CD](../../../glossary/#cd-continuous-delivery) requires a steady flow of small, independently deployable changes. Horizontal slicing produces
the opposite: batches of interdependent layer changes that can only be deployed together after a
separate integration phase.

A team that slices horizontally cannot deploy continuously because there is nothing to deploy until
all layers converge. In distributed systems, this gets worse because the team cannot deploy until other
teams converge too. The deployment unit grows from "one team's layers" to "multiple teams' layers,"
and the risk grows with it.

Vertical slicing is what makes independent deployment possible. Each slice delivers complete
behavior within the team's domain, exercises real contracts with other services, and can move
through the [pipeline](../../../glossary/#pipeline) on its own.

## How to Fix It

### Step 1: Learn to recognize horizontal slices (Week 1)

Review the current sprint board and backlog. For each work item, ask:

- Can a user or another service observe the change after this item is deployed?
- Can the team deploy this item without waiting for another team?
- Does this item deliver behavior, or does it deliver a layer?

If the answer to any of these is no, the item is likely a horizontal slice. Tag these items and
count them. Most teams discover that a majority of their backlog is horizontally sliced.

### Step 2: Map your team's domain boundaries (Week 1)

In a distributed system, the team does not own the entire feature. They own a domain. Identify
what services, data stores, and interfaces the team controls. The team's vertical slices cut
through the layers within their domain, not through the entire system.

How "end-to-end" is defined depends on what your team owns. A [full-stack product team](../../../glossary/#full-stack-product-team) owns the
entire user-facing surface from UI to database; their slice is done when a user can observe the
behavior. A [subdomain product team](../../../glossary/#subdomain-product-team) owns a service boundary; their slice is done when the API
contract satisfies the agreed behavior for consumers. The [Work Decomposition](../../../migrate-to-cd/migration-path/foundations/work-decomposition/#vertical-slicing-in-distributed-systems) guide covers both
contexts with diagrams.

For each service the team owns, identify the contracts other services depend on. These contracts
are the boundaries that enable independent deployment. If the contracts are not explicit (no
schema, no versioning, no documentation), define them. You cannot slice independently if you do not
know where your domain ends and another team's begins.

### Step 3: Reslice one feature vertically within your domain (Week 2)

Pick one upcoming feature and practice reslicing it:

**Before (horizontal):**

1. Add new columns to the orders table
2. Build the discount calculation endpoint
3. Update the order summary UI component
4. Integration testing across services

**After (vertical, within team's domain):**

1. Apply a percentage discount to a single-item order (schema + logic + contract)
2. Apply a percentage discount to a multi-item order
3. Reject an expired discount code with a clear error response
4. Display the discount breakdown in the order summary (UI service)

Each slice is independently deployable within the team's domain. The UI service (item 4) treats the
order service's discount response as a contract. It can be built and deployed separately once the
contract is defined, just like any other service integration.

### Step 4: Treat the UI as a service (Week 2+)

The UI is not the "top layer" that assembles everything. It is a service that consumes contracts
from other services. Apply the same principles:

- **Define the contract.** The UI depends on API responses with specific shapes. Make these
  contracts explicit. Version them. Test against them with contract tests.
- **Deploy independently.** The UI service should be deployable without coordinating with backend
  service deployments. If it cannot be, the coupling between the UI and backend is too tight.
- **Slice vertically within the UI.** A UI change that adds a new widget is a vertical slice if it
  delivers complete behavior. A UI change that "restructures the component hierarchy" is a
  horizontal slice.

When the UI is loosely coupled to backend services through stable contracts, UI teams and backend
teams can deploy on their own schedules. [Feature flags](../../../glossary/#feature-flag) in the UI control when new behavior is
visible to users, independent of when the backend capability was deployed.

### Step 5: Use contract tests to enable independent delivery (Week 3+)

In a distributed system, the alternative to coordinated releases is contract testing. Each team
verifies that their service honors the contracts other services depend on:

- **Provider tests** verify that your service produces responses matching the agreed contract.
- **Consumer tests** verify that your service correctly handles the responses it receives.

When both sides test against the shared contract, each team can deploy independently with
confidence that integration will work. The contract (not the release schedule) guarantees
compatibility.

### Step 6: Make the deployability test a refinement habit (Week 3+)

For every proposed work item, ask: "Can the team deploy this item on its own, without waiting for
another team or another item to be finished?"

If not, the item needs reslicing. This single question catches most horizontal slices before they
enter the sprint.

| Objection | Response |
|-----------|----------|
| "Our developers are specialists. They can't work across layers." | That is a skill gap, not a constraint. Pairing a frontend developer with a backend developer on a vertical slice builds the missing skills while delivering the work. The short-term slowdown produces long-term flexibility. |
| "The database schema needs to be designed holistically" | Design the schema incrementally. Add the columns and tables needed for the first slice. Extend them for the second. This is how trunk-based database evolution works - backward-compatible, incremental changes. |
| "We can't deploy without the other team" | That is a signal about your service contracts. If your deployment depends on another team's deployment, the interface between the services is not well defined. Invest in explicit, versioned contracts so each team can deploy on its own schedule. |
| "Vertical slices create duplicate work across layers" | They create less total work because integration problems are caught immediately instead of accumulating. The "duplicate" concern usually means the team is building more infrastructure than the current slice requires. |
| "Our architecture makes vertical slicing hard" | That is a signal about the architecture. Services that cannot be changed independently are a deployment risk. Vertical slicing exposes this coupling early, which is better than discovering it during a high-stakes coordinated release. |

## Measuring Progress

| Metric | What to look for |
|--------|-----------------|
| Percentage of work items that are independently deployable | Should increase toward 100% |
| Time from feature start to first production deploy | Should decrease as the first vertical slice ships early |
| Cross-team deployment dependencies per feature | Should decrease toward zero |
| [Development cycle time](../../../metrics/development-cycle-time/) | Should decrease as items no longer wait for other layers or teams |
| [Integration frequency](../../../metrics/integration-frequency/) | Should increase as deployable slices are completed and merged daily |

## Related Content

- [Work Decomposition](../../../migrate-to-cd/migration-path/foundations/work-decomposition/) - The practice guide for vertical slicing techniques, including how the approach differs for full-stack product teams versus subdomain product teams in distributed systems
- [Small Batches](../../../migrate-to-cd/migration-path/optimize/small-batches/) - Vertical slicing is how you achieve small batch size at the story level
- [Work Items Take Too Long](../../../symptoms/flow/work-items-take-too-long/) - Horizontal slices are often large because they span an entire layer
- [Trunk-Based Development](../../../migrate-to-cd/migration-path/foundations/trunk-based-development/) - Vertical slices enable daily integration because each is independently complete
- [Architecture Decoupling](../../../migrate-to-cd/migration-path/optimize/architecture-decoupling/) - Loose coupling between services enables independent vertical slicing
- [Team Alignment to Code](../../../migrate-to-cd/migration-path/optimize/team-alignment/) - Organizing teams around domain boundaries rather than layers removes the structural cause of horizontal slicing
