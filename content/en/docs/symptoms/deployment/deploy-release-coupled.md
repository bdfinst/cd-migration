---
aliases:
  - /docs/symptoms/deploy-release-coupled/
title: "Every Deployment Is Immediately Visible to All Users"
linkTitle: "Deploy and release are coupled"
description: >
  There is no way to deploy code without activating it for users. All deployments are full releases with no controlled rollout.
tags:
  - deployment-automation
  - batch-size
---

## What you are seeing

The team deploys and releases in a single step. When code reaches production, it is immediately live for every user. There is no mechanism to deploy an incomplete feature, route traffic to a new version gradually, or test new behavior in production before a full rollout.

This constraint shapes how the team works. Features must be fully complete before they can be deployed. Partially built functionality cannot live in production even in a dormant state. The team must complete entire features end to end before getting production feedback, which means feedback arrives only at the end of development - when changing course is most expensive.

For teams shipping to large user bases, the absence of controlled rollout means every deployment is an all-or-nothing event. An issue that affects 10% of users under specific conditions immediately affects 100% of users. The team cannot limit blast radius by controlling exposure, cannot validate behavior with a subset of real traffic, and cannot respond to emerging problems before they become full incidents.

## Common causes

### Monolithic work items

When work items are large, the absence of release separation matters more. A feature that takes one week to build can be deployed as a cohesive unit with acceptable risk. A feature that takes three months has accumulated enough scope and uncertainty that deploying it to all users simultaneously carries substantial risk. Large work items amplify the need for controlled rollout.

Decomposing work into smaller items reduces the blast radius of any individual deployment even without explicit release mechanisms. When each deployment contains a small, focused change, an issue that surfaces in production affects a narrow area. The team is no longer in the position where a single all-or-nothing deployment immediately affects every user with no ability to limit exposure.

**Read more:** [Monolithic work items]({{< relref "/docs/anti-patterns/team-workflow/monolithic-work-items" >}})

### Missing deployment pipeline

A [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}) that supports [blue-green deployments]({{< relref "/docs/reference/glossary#blue-green-deployment" >}}), canary releases, or [feature flag]({{< relref "/docs/reference/glossary#feature-flag" >}}) integration requires infrastructure that does not exist without deliberate investment. Traffic routing, percentage rollouts, and gradual exposure are capabilities built on top of a mature deployment pipeline. Without the pipeline foundation, these capabilities cannot be added.

A pipeline with deployment controls transforms release strategy from "deploy everything now" to "deploy to N percent of traffic, watch metrics, expand or roll back." The team moves from all-or-nothing deployments that immediately expose every user to a new version, to controlled rollouts where a problem that would have affected 100% of users is caught when it affects 5%.

**Read more:** [Missing deployment pipeline]({{< relref "/docs/anti-patterns/pipeline/missing-deployment-pipeline" >}})

### Horizontal slicing

When stories are organized by technical layer rather than user-visible behavior, complete functionality requires all layers to be done before anything ships. An API endpoint with no UI and a UI component that calls no API are both non-functional in isolation. The team cannot deploy incrementally because nothing is usable until all layers are complete.

Vertical slices deliver thin but complete functionality - a user can accomplish something with each slice. These can be deployed as soon as they are done, independently of other slices. The team gets production feedback continuously rather than at the end of a large batch.

**Read more:** [Horizontal slicing]({{< relref "/docs/anti-patterns/team-workflow/horizontal-slicing" >}})

## How to narrow it down

1. **Can the team deploy code to production without immediately exposing it to users?** If every deployment activates immediately for all users, deploy and release are coupled. Start with [Missing deployment pipeline]({{< relref "/docs/anti-patterns/pipeline/missing-deployment-pipeline" >}}).
2. **How large are typical deployments?** Large deployments have more surface area for problems. Start with [Monolithic work items]({{< relref "/docs/anti-patterns/team-workflow/monolithic-work-items" >}}).
3. **Are features built as complete end-to-end slices or as technical layers?** Layered development prevents incremental delivery. Start with [Horizontal slicing]({{< relref "/docs/anti-patterns/team-workflow/horizontal-slicing" >}}).

**Ready to fix this?** The most common cause is [Missing deployment pipeline]({{< relref "/docs/anti-patterns/pipeline/missing-deployment-pipeline" >}}). Start with its [How to Fix It]({{< relref "/docs/anti-patterns/pipeline/missing-deployment-pipeline#how-to-fix-it" >}}) section for week-by-week steps.
