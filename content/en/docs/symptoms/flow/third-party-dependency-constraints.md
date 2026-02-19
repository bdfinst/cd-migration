---
aliases:
  - /docs/symptoms/third-party-dependency-constraints/
title: "Vendor Release Cycles Constrain the Team's Deployment Frequency"
linkTitle: "Third-party dependency constraints"
description: >
  Upstream systems deploy quarterly or downstream consumers require advance notice. External constraints set the team's release schedule.
tags:
  - architecture
  - deployment-automation
---

## What you are seeing

The team is ready to deploy. But the upstream payment provider releases their API once a quarter and the new version the team depends on is not live yet. Or the downstream enterprise consumer the team integrates with requires 30 days advance notice before any API change goes live. The team's own deployment readiness is irrelevant - external constraints set the schedule.

The team adapts by aligning their release cadence with their most constraining external dependency. If one vendor deploys quarterly, the team deploys quarterly. Every advance the team makes in internal deployment speed is nullified by the external constraint. The most sophisticated internal pipeline in the world still produces a team that ships four times per year.

Some external constraints are genuinely fixed. A payment network's settlement schedule, regulatory reporting requirements, hardware firmware update cycles - these cannot be accelerated. But many "external" constraints turn out to be negotiable, workaroundable through abstraction, or simply assumed to be fixed without ever being tested.

## Common causes

### Tightly coupled monolith

When the team's system is tightly coupled to third-party systems at the technical level, any change to either side requires coordinated deployment. The integration code is tightly bound to specific vendor API versions, specific response shapes, specific timing assumptions. Wrapping third-party integrations in adapter layers creates the abstraction needed to deploy the team's side independently.

An adapter that isolates the team's code from vendor-specific details can handle multiple API versions simultaneously. The team can deploy their adapter update, leaving the old vendor path active until the vendor's new version is available, then switch.

**Read more:** [Tightly coupled monolith](../../anti-patterns/architecture/tightly-coupled-monolith/)

### Distributed monolith

When the team's services must be deployed in coordination with other systems - whether internal or external - the coupling forces joint releases. Each deployment event becomes a multi-party coordination exercise. The team cannot ship independently because their services are not actually independent.

Services that expose stable interfaces and handle both old and new protocol versions simultaneously can be deployed and upgraded without coordinating with consumers. That interface stability is what removes the external constraint: the team can ship on their own schedule because changing one side no longer requires the other side to change at the same time.

**Read more:** [Distributed monolith](../../anti-patterns/architecture/distributed-monolith/)

### Missing deployment pipeline

Without a pipeline, there is no mechanism for gradual migrations - running old and new integration paths simultaneously during a transition period. Switching to a new vendor API requires deploying new code that breaks old behavior unless both paths are maintained in parallel.

A pipeline with feature flag support can activate the new vendor integration for a subset of traffic, validate it against real load, and then complete the migration when confidence is established. This decouples the team's deployment from the vendor's release schedule.

**Read more:** [Missing deployment pipeline](../../anti-patterns/pipeline/missing-deployment-pipeline/)

## How to narrow it down

1. **Is the team's code tightly bound to specific vendor API versions?** If the integration cannot handle multiple vendor versions simultaneously, every vendor change requires a coordinated deployment. Start with [Tightly coupled monolith](../../anti-patterns/architecture/tightly-coupled-monolith/).
2. **Must the team coordinate deployment timing with external parties?** If yes, the interfaces between systems do not support independent deployment. Start with [Distributed monolith](../../anti-patterns/architecture/distributed-monolith/).
3. **Can the team run old and new integration paths simultaneously?** If switching to a new vendor version is a hard cutover, the pipeline does not support gradual migration. Start with [Missing deployment pipeline](../../anti-patterns/pipeline/missing-deployment-pipeline/).
