---
aliases:
  - /docs/symptoms/dependency-heavy-planning/
title: "Sprint Planning Is Dominated by Dependency Negotiation"
linkTitle: "Dependency-heavy planning"
description: >
  Teams can't start work until another team finishes something. Planning sessions map dependencies rather than commit to work.
tags:
  - architecture
  - work-decomposition
---

## What you are seeing

Sprint planning takes hours. Half the time is spent mapping dependencies: Team A cannot start story X until Team B delivers API Y. Team B cannot deliver that until Team C finishes infrastructure work Z. The board fills with items in "blocked" status before the sprint begins. Developers spend Monday through Wednesday waiting for upstream deliverables and then rush everything on Thursday and Friday.

The dependency graph is not stable. It changes every sprint as new work surfaces new cross-team requirements. Planning sessions produce a list of items the team hopes to complete, contingent on factors outside their control. Commitments are made with invisible asterisks. When something slips - and something always slips - the team negotiates whether the miss was their fault or the fault of a dependency.

The structural problem is that teams are organized around technical components or layers rather than around end-to-end capabilities. A feature that delivers value to a user requires work from three teams because no single team owns the full stack for that capability. The teams are coupled by the feature, even if the architecture nominally separates them.

## Common causes

### Tightly coupled monolith

When services or components are tightly coupled, changes to one require coordinated changes in others. A change to the data model requires the API team to update their queries, which requires the frontend team to update their calls. Teams working on different parts of a tightly coupled system cannot proceed independently because the code does not allow it.

Decomposed systems with stable interfaces allow teams to work against contracts rather than against each other's code. When an interface is stable, the consuming team can proceed without waiting for the providing team to finish. The items that spent a sprint sitting in "blocked" status start moving again because the code no longer requires the other team to act first.

**Read more:** [Tightly coupled monolith]({{< relref "/docs/anti-patterns/architecture/tightly-coupled-monolith" >}})

### Distributed monolith

Services that are nominally independent but require coordinated deployment create the same dependency patterns as a monolith. Teams that own different services in a distributed monolith cannot ship independently. Every feature delivery is a joint operation involving multiple teams whose services must change and deploy together.

Services that are genuinely independent can be changed, tested, and deployed without coordination. True service independence is a prerequisite for team independence. Sprint planning stops being a dependency negotiation session when each team's services can ship without waiting on another team's deployment schedule.

**Read more:** [Distributed monolith]({{< relref "/docs/anti-patterns/architecture/distributed-monolith" >}})

### Horizontal slicing

When teams are organized by technical layer - front end, back end, database - every user-facing feature requires coordination across all teams. The frontend team needs the API before they can build the UI. The API team needs the database schema before they can write the queries. No team can deliver a complete feature independently.

Organizing teams around [vertical slices]({{< relref "/docs/reference/glossary#vertical-sliced-story" >}}) of capability - a team that owns the full stack for a specific domain - eliminates most cross-team dependencies. The team that owns the feature can deliver it without waiting on other teams.

**Read more:** [Horizontal slicing]({{< relref "/docs/anti-patterns/team-workflow/horizontal-slicing" >}})

### Monolithic work items

Large work items have more opportunities to intersect with other teams' work. A story that takes one week and touches the data layer, the API layer, and the UI layer requires coordination with three teams at three different times. Smaller items scoped to a single layer or component can often be completed within one team without external dependencies.

Decomposing large items into smaller, more self-contained pieces reduces the surface area of cross-team interaction. Even when teams remain organized by layer, smaller items spend less time in blocked states.

**Read more:** [Monolithic work items]({{< relref "/docs/anti-patterns/team-workflow/monolithic-work-items" >}})

## How to narrow it down

1. **Does changing one team's service require changing another team's service?** If interface changes cascade across teams, the services are coupled. Start with [Tightly coupled monolith]({{< relref "/docs/anti-patterns/architecture/tightly-coupled-monolith" >}}).
2. **Must multiple services deploy simultaneously to deliver a feature?** If services cannot be deployed independently, the architecture is the [constraint]({{< relref "/docs/reference/glossary#constraint" >}}). Start with [Distributed monolith]({{< relref "/docs/anti-patterns/architecture/distributed-monolith" >}}).
3. **Does each team own only one technical layer?** If no team can deliver end-to-end functionality, the organizational structure creates dependencies. Start with [Horizontal slicing]({{< relref "/docs/anti-patterns/team-workflow/horizontal-slicing" >}}).
4. **Are work items frequently blocked waiting on another team's deliverable?** If items spend more time blocked than in progress, decompose items to reduce cross-team surface area. Start with [Monolithic work items]({{< relref "/docs/anti-patterns/team-workflow/monolithic-work-items" >}}).

**Ready to fix this?** The most common cause is [Tightly coupled monolith]({{< relref "/docs/anti-patterns/architecture/tightly-coupled-monolith" >}}). Start with its [How to Fix It]({{< relref "/docs/anti-patterns/architecture/tightly-coupled-monolith#how-to-fix-it" >}}) section for week-by-week steps.
