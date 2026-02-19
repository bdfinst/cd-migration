---
title: "Big-Bang Feature Delivery"
linkTitle: "Big-Bang Feature Delivery"
weight: 33
category: "Team Workflow"
risk_level: high
description: >
  Features are designed and built as large monolithic units with no incremental delivery - either the whole feature ships or nothing does.
tags:
  - batch-size
  - work-decomposition
---

{{% pageinfo %}}
**Category:** {{< param category >}} | {{% risk-indicator level="high" %}}
{{% /pageinfo %}}

## What This Looks Like

The planning session produces a feature that will take four to six weeks to complete. The
feature is assigned to two developers. For the next six weeks, they work in a shared branch,
building the backend, the API layer, the UI, and the database migrations as one interconnected
unit. The branch grows. The diff between their branch and main reaches 3,000 lines. Other
developers cannot see their work because it is not merged until it is finished.

On completion day, the branch merge is a major event. Reviewers receive a pull request with
3,000 lines of changes across 40 files. The review takes two days. Conflicts with main branch
changes have accumulated while the feature was in progress. Some of the code written in week
one was made redundant by decisions made in week four, but nobody is quite sure which parts
are now dead code. The merge happens. The feature ships. For a few hours, the team holds
its breath.

From the outside, this looks like normal development. The feature is done when it is done.
The alternative - delivering a feature in pieces - seems to require the feature to be "half
shipped," which nobody wants. So the team ships features whole. And each whole feature takes
longer to build, longer to review, longer to test, longer to merge, and produces more
production surprises than smaller, incremental deliveries would.

Common variations:

- **The feature branch that lives for months.** A feature with many components grows in
  a long-lived branch. By the time it is ready to merge, the branch has diverged significantly
  from main. Integration is a major project in itself.
- **The "it's not done until all parts are done" constraint.** The team does not consider
  merging parts of a feature because the product owner or stakeholders define "done" as
  the complete, user-visible feature. Intermediate states are considered undeliverable by
  definition.
- **The UI-last integration.** Backend work is complete and merged. UI work is complete in
  a separate branch. The two halves are integrated at the end. Integration surfaces
  mismatches between what the backend provides and what the UI expects, late in the cycle.
- **The "save it all for the big release" pattern.** Multiple features are kept undeployed
  until they can be released together for marketing or business reasons. The deployment batch
  grows over weeks and is released in a single event.

The telltale sign: the word "feature" is synonymous with a unit of work that takes weeks and
ships as a single deployment, and the team cannot describe how they would ship the same
functionality in smaller pieces.

## Why This Is a Problem

The size of a change determines its risk, its cost to review, its cost to debug, and its time
in flight before reaching users. Big-bang feature delivery maximizes all of these costs
simultaneously. Every property of a large change is worse than the equivalent properties of
the same work done incrementally.

### It reduces quality

Quality problems in a large feature have a long runway before discovery. A design mistake made
in week one is not discovered until the feature is complete and tested - potentially five weeks
later. By that point, the design decision has influenced every other component of the feature.
Reversing it requires touching everything that was built on top of it.

Code review quality degrades with change size. A reviewer presented with a 50-line diff can
give it detailed attention and catch subtle issues. A reviewer presented with a 3,000-line diff
faces an impossible task. They will review the most prominent parts carefully and skim the
rest. Defects in the skimmed sections reach production because reviews at that scale are
necessarily superficial.

Test coverage is also harder to achieve for large features. Testing a complete feature as a
unit means constructing test scenarios that span the full scope of the feature. Intermediate
states - which may represent how the feature will actually behave under real usage patterns -
are never individually tested.

Incremental delivery forces the team to define and verify quality at each increment. Each
small merge is reviewable in detail. Each intermediate state is tested independently. Problems
are caught when the affected code is fresh and the context is clear.

### It increases rework

When a large feature reveals a problem at integration time, the scope of rework is proportional
to the size of the feature. A misunderstanding about how a backend API should structure its
response, discovered at the end of a six-week feature, requires changes to the backend,
updates to the API contract, changes to the UI components consuming the API, and updates to
any tests written against the original API shape. All of this work was built on a faulty
assumption that could have been caught much earlier.

Large features also suffer from internal rework that never appears in the commit log. Code
written in week one and refactored in week three represents work done twice. Approaches tried
and abandoned in the middle of a large feature are invisible overhead. Teams underestimate the
real cost of their large features because they do not account for the internal rework that
happens before the feature is ever reviewed or tested.

Merge conflicts compound rework further. A feature branch that lives for four weeks will
accumulate conflicts with the changes that other developers made during those four weeks.
Resolving those conflicts takes time, and the resolution itself can introduce bugs. The
longer the branch lives, the worse the conflict situation becomes - exponentially, not linearly.

### It makes delivery timelines unpredictable

Large features hide risk until late in the cycle. The first three weeks of a six-week feature
often feel like progress - code is being written, components are taking shape. The final week
or two is where the risk surfaces: integration problems, performance issues, edge cases the
design did not account for. The timeline slips because the risk was invisible during the
planning and early development phases.

The "it's done when it's done" nature of big-bang delivery makes it impossible to give
stakeholders accurate, current information. At three weeks into a six-week feature, the team
may say they are "halfway done" - but "halfway done" for a large feature does not mean the
first half is delivered and working. It means the second half is still entirely unknown risk.

Incremental delivery provides genuinely useful progress signals. When a vertical slice of
functionality is deployed and working in production after one week, the team has delivered
real value and has real data about what works and what does not. The remaining work is scoped
against actual production behavior, not against a specification written before any code existed.

### Impact on continuous delivery

Continuous delivery operates on the principle that small, frequent changes are safer than
large, infrequent ones. Big-bang feature delivery is the inverse: large, infrequent changes
that maximize blast radius. Every property of CD - fast feedback, small blast radius, easy
rollback, predictable timelines - is degraded by large feature units.

CD also depends on the ability to merge to the main branch frequently. A feature that lives
in a branch for four weeks is not being integrated continuously. The developer is integrating
with a stale view of the codebase. When they finally merge, they are integrating weeks of
drift all at once. The continuous in continuous delivery requires that integration happens
continuously, not once per feature.

Feature flags make incremental delivery possible for complex features that cannot be user-visible
until complete. The code merges continuously to main behind a flag. The feature is not visible
to users until the flag is enabled. The delivery is continuous even though the user-visible
release happens at a defined moment.

## How to Fix It

### Step 1: Distinguish delivery from release (Week 1)

Separate the concept of deployment from the concept of release. The most common objection
to incremental delivery is "we cannot ship a half-finished feature to users" - but this
conflates the two:

- Deployment means the code is running in production.
- Release means users can see and use the feature.

These are separable. Code can be deployed behind a feature flag, completely invisible to
users, while the feature is built incrementally over several weeks. When the feature is
complete, the flag is enabled. The release happens without a deployment. This resolves the
"half-finished" objection.

Run a working session with the team and product stakeholders to explain this distinction.
Agree that "delivering incrementally" does not mean "exposing incomplete features to users."

### Step 2: Practice decomposing a current feature into vertical slices (Week 1-2)

Take a feature currently in planning and decompose it into the smallest possible deliverable
slices:

1. Identify the end state: what does the fully-delivered feature look like?
2. Work backward: what is the smallest possible version of this feature that provides any
   value at all? This is the first slice.
3. What addition to that smallest version provides the next unit of value? This is the second
   slice.
4. Continue until the full feature is covered.

A vertical slice cuts through all layers of the stack: it includes backend, API, UI, and tests
for one small piece of end-to-end functionality. It is the opposite of "first we build all
the backend, then all the frontend." Each slice is deployable independently.

### Step 3: Implement a feature flag for the current feature (Week 2-3)

For the feature being piloted, add a feature flag:

1. Add a configuration-based feature flag that defaults to off.
2. Gate the feature's entry points behind the flag in the codebase.
3. Begin merging incremental work to the main branch behind the flag.
4. The feature is invisible in production until the flag is enabled, even as components
   are deployed.

This allows the team to merge small, reviewable changes to main continuously while maintaining
the product constraint that the feature is not user-visible until complete.

### Step 4: Set a maximum story size (Week 2-3)

Define a maximum size for individual work items that the team will carry at any one time:

- A story should be completable within one or two days, not one or two weeks.
- A story should result in a pull request that a reviewer can meaningfully review in under
  an hour - typically under 400 lines of net new code.
- A story should be mergeable to main independently without requiring other stories to ship
  first (with the feature flag pattern enabling this for user-visible work).

The team will initially find it uncomfortable to decompose work to this granularity. Run
decomposition workshops using the feature in Step 2 as practice material.

### Step 5: Change the definition of "done" for a story (Week 3-4)

Redefine "done" to require deployment, not just code completion. A story is done when:

1. The code is merged to main.
2. The CI pipeline passes.
3. The change is deployed to staging (or production behind a flag).

"Code complete" in a branch is not done. "In review" is not done. "Waiting for merge" is
not done. This definition forces small batches because a story that cannot be merged to main
is not done, and a story that cannot be merged to main is probably too large.

### Step 6: Retrospect on the first feature delivered incrementally (Week 4-6)

After completing the pilot feature using incremental delivery, hold a focused retrospective:

- How did the review experience compare to large feature reviews?
- Were integration problems caught earlier?
- Did the timeline feel more predictable?
- What decomposition decisions could have been better?

Use the retrospective findings to refine the decomposition practice and the maximum story size
guideline.

| Objection | Response |
|-----------|----------|
| "Our features are too complex to decompose into small pieces" | Every feature that has ever been built was built one small piece at a time - the question is whether those pieces are integrated continuously or accumulated in a branch. Take your current most complex feature and run the vertical slice decomposition from Step 2 on it - most teams find at least three independently deliverable slices within the first hour. |
| "Product management defines features, not the team - we cannot change the batch size" | Product management defines what users see, not how code is organized or deployed. Introduce the deployment-vs-release distinction in your next sprint planning. Product management can still plan user-visible features of any size; the team controls how those features are delivered underneath. |
| "Our system requires all components to be updated together" | This is an architectural constraint worth addressing. Backward-compatible changes, API versioning, and the expand-contract pattern allow components to be updated independently. Pick one tightly coupled interface, apply the expand-contract pattern this sprint, and measure whether the next change to that interface requires coordinated deployment. |
| "Code review takes the same amount of time regardless of batch size" | This is not supported by evidence. Review quality and thoroughness decrease sharply with change size. Track actual review time and defect escape rate for your next five large reviews versus your next five small ones - the data will show the difference. |

## Measuring Progress

| Metric | What to look for |
|--------|-----------------|
| [Work in progress](../../../metrics/work-in-progress/) | Should decrease as stories are smaller and move through the system faster |
| [Development cycle time](../../../metrics/development-cycle-time/) | Should decrease as features are broken into deliverable slices |
| [Integration frequency](../../../metrics/integration-frequency/) | Should increase as developers merge to main more often |
| Average pull request size (lines changed) | Should decrease toward a target of under 400 net lines |
| [Lead time](../../../metrics/lead-time/) | Should decrease as features in flight are smaller and complete faster |
| Production incidents per deployment | Should decrease as smaller deployments carry less risk |

## Related Content

- [Work Decomposition](../../../migrate-to-cd/migration-path/foundations/work-decomposition/) - The practice of breaking large features into small, deliverable slices
- [Feature Flags](../../../migrate-to-cd/migration-path/optimize/feature-flags/) - The mechanism that enables incremental delivery of user-invisible work
- [Small Batches](../../../migrate-to-cd/migration-path/optimize/small-batches/) - The principle that small changes are safer and faster than large ones
- [Monolithic Work Items](monolithic-work-items/) - A closely related anti-pattern at the story level
- [Horizontal Slicing](horizontal-slicing/) - The anti-pattern of building all the backend before any frontend
