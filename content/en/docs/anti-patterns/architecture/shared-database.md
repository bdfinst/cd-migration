---
title: "Shared Database Across Services"
linkTitle: "Shared Database Across Services"
weight: 77
category: "Architecture"
risk_level: medium
description: >
  Multiple services read and write the same tables, making schema changes a multi-team
  coordination event.
tags:
  - architecture
  - deployment-automation
---

{{% pageinfo %}}
**Category:** {{< param category >}} | {{% risk-indicator level="medium" %}}
{{% /pageinfo %}}

## What This Looks Like

The orders service, the reporting service, the inventory service, and the notification service all
connect to the same database. They each have their own credentials but they point at the same
schema. The orders table is queried by all four services. Each service has its own assumptions
about what columns exist, what values are valid, and what the foreign key relationships mean.

A developer on the orders team needs to rename a column. It is a minor cleanup - the column was
named `order_dt` and should be `ordered_at` for consistency. Before making the change, they post
to the team channel: "Anyone else using the `order_dt` column?" Three other teams respond. Two are
using it in reporting queries. One is using it in a scheduled job that nobody is sure anyone owns
anymore. The rename is shelved. The inconsistency stays because the cost of fixing it is too high.

Common variations:

- **The integration database.** A database designed to be shared across systems from the start.
  Data is centralized by intent. Different teams add tables and columns as needed. Over time, it
  becomes the source of truth for the entire organization, and nobody can touch it without
  coordination.
- **The shared-by-accident database.** Services were originally a monolith. When the team began
  splitting them into services, they kept the shared database because extracting data ownership
  seemed hard. The services are separate in name but coupled in storage.
- **The reporting exception.** Services own their data in principle, but the reporting team has
  read access to all service databases directly. The reporting team becomes an invisible consumer
  of every schema, which makes schema changes require reporting-team approval before they can
  proceed.
- **The cross-service join.** A service query that joins tables from conceptually different
  domains - orders joined to user preferences joined to inventory levels. The query works, but it
  means the service depends on the internal structure of two other domains.

The telltale sign: a developer needs to approve a database schema change in a channel that includes
people from three or more different teams, none of whom own the code being changed.

## Why This Is a Problem

A shared database couples services together at the storage layer, where the coupling is invisible
in service code and extremely difficult to untangle. Services that appear independent - separate
codebases, separate deployments, separate teams - are actually a distributed monolith held together
by shared mutable state.

### It reduces quality

A column rename that takes one developer 20 minutes can break three other services in production before anyone realizes the change shipped. That is the normal cost of shared schema ownership. Each service that reads a table has implicit expectations about that table's structure. When one
service changes the schema, those expectations break in other services. The breaks are not caught
at compile time or in code review - they surface at runtime, often in production, when a different
service fails because a column it expected no longer exists or contains different values.

This makes schema changes high-risk regardless of how simple they appear. A column rename,
a constraint addition, a data type change - all can cascade into failures across services that
were never in the same deployment. The safest response is to never change anything, which leads
to schemas that grow stale, accumulate technical debt, and eventually become incomprehensible.

When each service owns its own data, schema changes are internal to the owning service. Other
services access data through the service's API, not through the database. The API can maintain
backward compatibility while the schema changes. The owning team controls the migration entirely,
without coordinating with consumers who do not even know the schema exists.

### It increases rework

A two-day schema change becomes a three-week coordination exercise when other teams must change their services before the old column can be removed. That overhead is not exceptional - it is the built-in cost of shared ownership. Database migrations in a shared-database system require a multi-phase process. The first phase
deploys code that supports both the old and new schema simultaneously - the old column must stay
while new code writes to both columns, because other services still read the old column. The second
phase deploys all the consuming services to use the new column. The third phase removes the old
column once all consumers have migrated.

Each phase is a separate deployment. Between phases, the system is running in a mixed state that
requires extra production code to maintain. That extra code is rework - it exists only to bridge
the transition and will be deleted later. Any bug in the bridge code is also rework, because it
needs to be diagnosed and fixed in a context that will not exist once the migration is complete.

With service-owned data, the same migration is a single deployment. The service updates its schema
and its internal logic simultaneously. No other service needs to change because no other service
has direct access to the storage.

### It makes delivery timelines unpredictable

Coordinating a schema migration across three teams means aligning three independent deployment
schedules. One team might be mid-sprint and unable to deploy a consuming-service change this week.
Another team might have a release freeze in place. The migration sits in limbo, the bridge code
stays in production, and the developer who initiated the change is blocked.

The dependencies are also invisible in planning. A developer estimates a task that includes a
schema change at two days. They do not account for the four-person coordination meeting, the
one-week wait for another team to schedule their consuming-service change, and the three-phase
deployment sequence. The two-day task takes three weeks.

When schema changes are internal, the owning team deploys on their own schedule. The timeline
depends on the complexity of the change, not on the availability of other teams.

### It prevents independent deployment

Teams that try to increase deployment frequency hit a wall: the pipeline is fast but every schema change requires coordinating three other teams before shipping. The limiting factor is not the code - it is the shared data. Services cannot deploy independently when they share a database.
If Service A deploys a schema change that removes a column Service B depends on, Service B breaks.
The only safe deployment strategy is to coordinate all consuming services and deploy them
simultaneously or in a carefully managed sequence. Simultaneous deployment eliminates independent
release cycles. Managed sequences require orchestration and carry high risk if any service in the
sequence fails.

### Impact on continuous delivery

CD requires that each service can be built, tested, and deployed independently. A shared database
breaks that independence at the most fundamental level: data ownership. Services that share a
database cannot have independent pipelines in a meaningful sense, because a passing pipeline on
Service A does not guarantee that Service A's deployment is safe for Service B.

Contract testing and API versioning strategies - standard tools for managing service dependencies
in CD - do not apply to a shared database, because there is no contract. Any service can read or
write any column at any time. The database is a global mutable namespace shared across all services
and all environments. That pattern is incompatible with the independent deployment cadences that
CD requires.

## How to Fix It

Eliminating a shared database is a long-term effort. The goal is data ownership: each service
controls its own data and exposes it through explicit APIs. This does not happen overnight. The
path is incremental, moving one domain at a time.

### Step 1: Map what reads and writes what

Before changing anything, build a dependency map.

1. List every table in the shared database.
2. For each table, identify every service or codebase that reads it and every service that writes
   it. Use query logs, code search, and database monitoring to find all consumers.
3. Mark tables that are written by more than one service. These require more careful migration
   because ownership is ambiguous.
4. Identify which service has the strongest claim to each table - typically the service that
   created the data originally.

This map makes the coupling visible. Most teams are surprised by how many hidden consumers exist.
The map also identifies the easiest starting points: tables with a single writer and one or two
readers that can be migrated first.

### Step 2: Identify the domain with the least shared read traffic

Pick the domain with the cleanest data ownership to pilot the migration. The criteria:

- A clear owner team that writes most of the data.
- Relatively few consumers (one or two other services).
- Data that is accessed by consumers for a well-defined purpose that could be served by an API.

A domain like "notification preferences" or "user settings" is often a good candidate. A domain
like "orders" that is read by everything is a poor starting point.

### Step 3: Build the API for the chosen domain (Weeks 2-4)

Before removing any direct database access, add an API endpoint that provides the same data.

1. Build the endpoint in the owning service. It should return the data that consuming services
   currently query for directly.
2. Write contract tests: the owning service verifies the API response matches the contract, and
   consuming services verify their code works against the contract. See
   [No Contract Testing]({{< relref "/docs/anti-patterns/testing/no-contract-testing" >}}) for specifics.
3. Deploy the endpoint but do not switch consumers yet. Run it alongside the direct database access.

This is the safest phase. If the API has a bug, consumers are still using the database directly.
No service is broken.

### Step 4: Migrate consumers one at a time (Weeks 4-8)

Switch consuming services from direct database queries to the new API, one service at a time.

1. For the first consuming service, replace the direct query with an API call in a code change
   and deploy it.
2. Verify in production that the consuming service is now using the API.
3. Run both the old and new access patterns in parallel for a short period if possible, to catch
   any discrepancy.
4. Once stable, move on to the next consuming service.

At the end of this step, no service other than the owner is accessing the database tables directly.

### Step 5: Remove direct access grants and enforce the boundary

Once all consumers have migrated:

1. Remove database credentials from consuming services. They can no longer connect to the owner's
   database even if they wanted to.
2. Add a monitoring alert for any new direct database connections from services that are not the
   owner.
3. Update the architectural decision records and onboarding documentation to make the ownership
   rule explicit.

Removing access grants is the only enforcement that actually holds over time. A policy that says
"don't access other services' databases" will be violated under pressure. Removing the credentials
makes it a technical impossibility.

### Step 6: Repeat for the next domain (Ongoing)

Apply the same pattern to the next domain, working from easiest to hardest. Domains with a single
clear writer and few readers migrate quickly. Domains that are written by multiple services require
first resolving the ownership question - typically by choosing one service as the canonical source
and making others write through that service's API.

| Objection | Response |
|-----------|----------|
| "API calls are slower than direct database queries" | The latency difference is typically measured in single-digit milliseconds and can be addressed with caching. The coordination cost of a shared database - multi-team migrations, deployment sequencing, unexpected breakage - is measured in days and weeks. |
| "We'd have to rewrite everything" | No migration requires rewriting everything. Start with one domain, build confidence, and work incrementally. Most teams migrate one domain per quarter without disrupting normal delivery work. |
| "Our reporting needs cross-domain data" | Reporting is a legitimate cross-cutting concern. Build a dedicated reporting data store that receives data from each service via events or a replication mechanism. Reporting reads the reporting store, not production service databases. |
| "It's too risky to change a working database" | The migration adds an API alongside the existing access - nothing is removed until consumers have moved over. The risk of each step is small. The risk of leaving the shared database in place is ongoing coordination overhead and surprise breakage. |

## Measuring Progress

| Metric | What to look for |
|--------|-----------------|
| Tables with multiple-service write access | Should decrease toward zero as ownership is clarified |
| Schema change lead time | Should decrease as changes become internal to the owning service |
| Cross-team coordination events per deployment | Should decrease as services gain independent data ownership |
| [Release frequency]({{< relref "/docs/reference/metrics/release-frequency" >}}) | Should increase as coordination overhead per release drops |
| [Lead time]({{< relref "/docs/reference/metrics/lead-time" >}}) | Should decrease as schema migrations stop blocking delivery |
| Failed deployments due to schema mismatch | Should decrease toward zero as direct cross-service database access is removed |

## Related Content

- [Architecture Decoupling]({{< relref "/docs/migrate-to-cd/optimize/architecture-decoupling" >}}) - The broader strategy for reducing service coupling
- [No Contract Testing]({{< relref "/docs/anti-patterns/testing/no-contract-testing" >}}) - Verifying API boundaries between services
- [Premature Microservices]({{< relref "/docs/anti-patterns/architecture/premature-microservices" >}}) - When splitting services creates more coupling than it removes
- [Distributed Monolith]({{< relref "/docs/anti-patterns/architecture/distributed-monolith" >}}) - The shared database is the most common cause of the distributed monolith pattern
- [Single Path to Production]({{< relref "/docs/migrate-to-cd/pipeline/single-path-to-production" >}}) - Independent data ownership is a prerequisite for independent deployment paths
