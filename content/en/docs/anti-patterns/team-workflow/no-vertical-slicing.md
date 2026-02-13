---
title: "No Vertical Slicing"
linkTitle: "No Vertical Slicing"
weight: 29
description: >
  Work is organized by technical layer - "build the API," "build the UI" - rather than by
  user-visible behavior. Nothing is deployable until all layers are done.
---

## What This Looks Like

The team breaks a feature into work items by architectural layer. One item for the database
schema. One for the API. One for the frontend. Maybe one for "integration testing" at the end.
Each item lives in a different lane or is assigned to a different specialist. Nothing reaches
production until the last layer is finished and all the pieces are stitched together.

Common variations:

- **Layer-based assignment.** "The backend team builds the API, the frontend team builds the UI."
  Each team delivers their layer independently. Integration is a separate phase that happens after
  both teams are "done."
- **The database-first approach.** Every feature starts with "build the schema." Weeks of database
  work happen before any API or UI exists. The schema is designed for the complete feature rather
  than for the first thin slice.
- **The API-then-UI pattern.** The API is built and "tested" in isolation with Postman or curl.
  The UI is built weeks later against the API. Mismatches between what the API provides and what
  the UI needs are discovered at the end.
- **The "integration sprint."** After the layers are built separately, the team dedicates a sprint
  to wiring everything together. This sprint always takes longer than planned because the layers
  were built on different assumptions.
- **Technical stories on the board.** The backlog contains items like "create database indexes,"
  "add caching layer," or "refactor service class." None of these deliver user-visible value. They
  are infrastructure work that has been separated from the feature it supports.

The telltale sign: ask "can we deploy this work item to production and have a user see something
different?" If the answer is no, the work is sliced horizontally.

## Why This Is a Problem

Horizontal slicing feels natural to developers because it matches how they think about the
system's architecture. But it optimizes for how the code is organized, not for how value is
delivered. The consequences compound across every dimension of delivery.

### Nothing is deployable until everything is done

A horizontal slice delivers no user-visible value on its own. The database schema alone does
nothing. The API alone does nothing a user can see. The UI alone has no data to display. Value
only emerges when all layers are assembled - and that assembly happens at the end.

This means the team has zero deployable output for the entire duration of the feature build. A
feature that takes three sprints to build across layers produces three sprints of work in progress
and zero deliverables. The team is busy the entire time, but nothing reaches production.

With vertical slicing, every item is deployable. The first slice might be "user can create a
basic order" - thin, but it touches the database, API, and UI. It can be deployed to production
behind a feature flag on day two. Feedback starts immediately. The remaining slices build on a
working foundation rather than converging on an untested one.

### Integration risk accumulates invisibly

When layers are built separately, each team or developer makes assumptions about how their layer
will connect to the others. The backend developer assumes the API contract looks a certain way.
The frontend developer assumes the response format matches their component design. The database
developer assumes the query patterns align with how the API will call them.

These assumptions are untested until integration. The longer the layers are built in isolation,
the more assumptions accumulate and the more likely they are to conflict. Integration becomes the
riskiest phase of the project - the phase where all the hidden mismatches surface at once.

With vertical slicing, integration happens with every item. The first slice forces the developer
to connect all the layers immediately. Assumptions are tested on day one, not month three.
Subsequent slices extend a working, integrated system rather than building isolated components
that have never talked to each other.

### Feedback is delayed until it is expensive to act on

A horizontal approach delays user feedback until the full feature is assembled. If the team builds
the wrong thing - misunderstands a requirement, makes a poor UX decision, or solves the wrong
problem - they discover it after weeks of work across multiple layers.

At that point, the cost of changing direction is enormous. The database schema, API contracts, and
UI components all need to be reworked. The team has already invested heavily in an approach that
turns out to be wrong.

Vertical slicing delivers feedback with every increment. The first slice ships a thin version of
the feature that real users can see. If the approach is wrong, the team discovers it after a day
or two of work, not after a month. The cost of changing direction is the cost of one small item,
not the cost of an entire feature.

### It creates specialist dependencies and handoff delays

Horizontal slicing naturally leads to specialist assignment: the database expert takes the
database item, the API expert takes the API item, the frontend expert takes the frontend item.
Each person works in isolation on their layer, and the work items have dependencies between them -
the API cannot be built until the schema exists, the UI cannot be built until the API exists.

These dependencies create sequential handoffs. The database work finishes, but the API developer
is busy with something else. The API work finishes, but the frontend developer is mid-sprint on
a different feature. Each handoff introduces wait time that has nothing to do with the complexity
of the work.

Vertical slicing eliminates these dependencies. A single developer (or pair) implements the full
slice across all layers. There are no handoffs between layers because one person owns the entire
thin slice from database to UI. This also spreads knowledge - developers who work across all
layers understand the full system, not just their specialty.

### Impact on continuous delivery

Continuous delivery requires a continuous flow of small, independently deployable changes.
Horizontal slicing produces the opposite: a batch of interdependent layer changes that can only
be deployed together after a separate integration phase.

A team that slices horizontally cannot deploy continuously because there is nothing to deploy
until all layers converge. They cannot get production feedback because nothing user-visible exists
until the end. They cannot limit risk because the first real test of the integrated system happens
after all the work is done.

The pipeline itself becomes less useful. When changes are horizontal slices, the pipeline can only
verify that one layer works in isolation - it cannot run meaningful end-to-end tests until all
layers exist. The pipeline gives a false green signal ("the API tests pass") that hides the real
question ("does the feature work?").

## How to Fix It

### Step 1: Learn to recognize horizontal slices (Week 1)

Before changing how the team slices, build awareness. Review the current sprint board and backlog.
For each work item, ask:

- Can a user (or another system) observe the change after this item is deployed?
- Can I write an end-to-end test for this item alone?
- Does this item deliver value without waiting for other items to be completed?

If the answer to any of these is no, the item is likely a horizontal slice. Tag these items and
count them. Most teams discover that a majority of their backlog is horizontally sliced.

### Step 2: Reslice one feature vertically (Week 2)

Pick one upcoming feature and practice reslicing it. Start with the current horizontal breakdown
and convert it:

**Before (horizontal):**

1. Create the database tables for notifications
2. Build the notification API endpoints
3. Build the notification preferences UI
4. Integration testing for notifications

**After (vertical):**

1. User receives an email notification when their order ships (DB + API + email + minimal UI)
2. User can view notification history on their profile page
3. User can disable email notifications for order updates
4. User can choose between email and SMS for shipping notifications

Each vertical slice is independently deployable and testable end-to-end. Each delivers something
a user can see. The team gets feedback after item 1 instead of after item 4.

### Step 3: Use the deployability test in refinement (Week 3+)

Make the deployability test a standard part of backlog refinement. For every proposed work item,
ask: "If this were the only thing we shipped this sprint, would a user notice?"

If not, the item needs reslicing. This single question catches most horizontal slices before they
enter the sprint.

Complement this with concrete acceptance criteria in Given-When-Then format. Each scenario should
describe observable behavior, not technical implementation:

- Good: "Given a registered user, when they update their email, then a verification link is sent
  to the new address"
- Bad: "Build the email verification API endpoint"

### Step 4: Break the specialist habit (Week 4+)

Horizontal slicing and specialist assignment reinforce each other. As long as "the backend
developer does the backend work," slicing by layer feels natural.

Break this cycle:

- **Have developers work full-stack on vertical slices.** A developer who implements the entire
  slice - database, API, and UI - will naturally slice vertically because they own the full
  delivery.
- **Pair a specialist with a generalist.** If a developer is uncomfortable with a particular
  layer, pair them with someone who knows it. This builds cross-layer skills while delivering
  vertical slices.
- **Rotate who works on what.** Do not let the same person always take the database items. When
  anyone can work on any layer, the team stops organizing work by layer.

### Step 5: Address the objections

| Objection | Response |
|-----------|----------|
| "Our developers are specialists - they can't work across layers" | That is a skill gap, not a constraint. Pairing a frontend developer with a backend developer on a vertical slice builds the missing skills while delivering the work. The short-term slowdown produces long-term flexibility. |
| "The database schema needs to be designed holistically" | Design the schema incrementally. Add the columns and tables needed for the first slice. Extend them for the second. This is how trunk-based database evolution works - backward-compatible, incremental changes. Designing the "complete" schema upfront leads to speculative design that changes anyway. |
| "Vertical slices create duplicate work across layers" | They create less total work because integration problems are caught immediately instead of accumulating. The "duplicate" concern usually means the team is building more infrastructure than the current slice requires. Build only what the current slice needs. |
| "Some work is genuinely infrastructure" | True infrastructure work (setting up a new database, provisioning a service) still needs to be connected to a user outcome. "Provision the notification service and send one test notification" is a vertical slice that includes the infrastructure. |
| "Our architecture makes vertical slicing hard" | That is a signal about the architecture. Tightly coupled layers that cannot be changed independently are a deployment risk. Vertical slicing exposes this coupling early, which is better than discovering it during a high-stakes integration phase. |

## Measuring Progress

| Metric | What to look for |
|--------|-----------------|
| Percentage of work items that are independently deployable | Should increase toward 100% |
| Time from feature start to first production deploy | Should decrease as the first vertical slice ships early |
| [Development cycle time](../../../under-construction/) <!-- target: reference/metrics/development-cycle-time --> | Should decrease as items no longer wait for other layers |
| Integration issues discovered late | Should decrease as integration happens with every slice |
| [Integration frequency](../../../under-construction/) <!-- target: reference/metrics/integration-frequency --> | Should increase as deployable slices are completed and merged daily |

## Related Content

- [Work Decomposition](../../../under-construction/) <!-- target: migration-path/foundations/work-decomposition --> - The practice guide for vertical slicing techniques
- [Small Batches](../../../under-construction/) <!-- target: migration-path/optimize/small-batches --> - Vertical slicing is how you achieve small batch size at the story level
- [Work Items Too Large](../stories-too-large/) - Horizontal slices are often large because they span an entire layer
- [Trunk-Based Development](../../../under-construction/) <!-- target: migration-path/foundations/trunk-based-development --> - Vertical slices enable daily integration because each is independently complete
