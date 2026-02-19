---
aliases:
  - /docs/symptoms/uneven-service-maturity/
title: "Services in the Same Portfolio Have Wildly Different Maturity Levels"
linkTitle: "Uneven service maturity"
description: >
  Some services have full pipelines and coverage. Others have no tests and are deployed manually. No consistent baseline exists.
tags:
  - deployment-automation
  - test-strategy
---

## What you are seeing

Some services have full pipelines, comprehensive test coverage, automated deployment, and monitoring dashboards. Others have no tests, no pipeline, and are deployed by copying files onto a server. Both sit in the same team's portfolio. The team's CD practices apply to the modern ones. The legacy ones exist outside them.

Improving the legacy services feels impossible to prioritize. They are not blocking any immediate feature work. The incidents they cause are infrequent enough to accept. Adding tests, setting up a pipeline, and improving the deployment process are multi-week investments with no immediate visible output. They compete for sprint capacity against features that have product owners and deadlines.

The maturity gap widens over time. The modern services get more capable as the team's CD practices improve. The legacy ones stay frozen. Eventually they represent a liability: they cannot benefit from any of the team's improved practices, they are too risky to touch, and they handle increasingly critical functionality as other services are modernized around them.

## Common causes

### Missing deployment pipeline

Services without pipelines cannot participate in the team's CD practices. The pipeline is the foundation on which automated testing, deployment automation, and observability build. A service with no pipeline is a service that will always require manual attention for every change.

Establishing a minimal viable pipeline for every service - even if it just runs existing tests and provides a deployment command - closes the gap between the modern services and the legacy ones. A service with even a basic pipeline can participate in the team's practices and improve from there; a service with no pipeline cannot improve at all.

**Read more:** [Missing deployment pipeline](../../anti-patterns/pipeline/missing-deployment-pipeline/)

### Thin-spread teams

Teams spread across too many services and responsibilities cannot allocate the focused investment needed to bring lower-maturity services up to standard. Each sprint, the urgency of visible work displaces the sustained effort that improvement requires. Investment in a legacy service delivers no value for weeks before the improvement becomes visible.

Teams with appropriate scope relative to capacity can allocate improvement time in each sprint. A team that owns two services instead of six can invest in both. A team that owns six has to accept that four will be neglected.

**Read more:** [Thin-spread teams](../../anti-patterns/organizational-cultural/thin-spread-teams/)

## How to narrow it down

1. **Does every service in the team's portfolio have an automated deployment pipeline?** If not, identify which services lack pipelines and why. Start with [Missing deployment pipeline](../../anti-patterns/pipeline/missing-deployment-pipeline/).
2. **Does the team have time to improve services that are not actively producing incidents?** If improvement work is always displaced by feature or incident work, the team is spread too thin. Start with [Thin-spread teams](../../anti-patterns/organizational-cultural/thin-spread-teams/).
3. **Are there services the team owns but is afraid to touch?** Fear of touching a service is a strong indicator that the service lacks the safety nets (tests, pipeline, documentation) needed for safe modification.
