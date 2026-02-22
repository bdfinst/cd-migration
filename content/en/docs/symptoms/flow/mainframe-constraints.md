---
aliases:
  - /docs/symptoms/mainframe-constraints/
title: "The Deployment Target Does Not Support Modern CI/CD Tooling"
linkTitle: "Mainframe or proprietary platform constraints"
description: >
  Mainframes or proprietary platforms require custom integration or manual steps. CD practices stop at the boundary of the legacy stack.
tags:
  - deployment-automation
---

## What you are seeing

The deployment target is a z/OS mainframe, an AS/400, an embedded device firmware platform, or a proprietary industrial control system. The standard [CI](../../glossary/#ci-continuous-integration)/[CD](../../glossary/#cd-continuous-delivery) tools the rest of the organization uses do not support this target. The vendor's deployment tooling is command-line based, requires a licensed runtime, and was designed around a workflow that predates modern software delivery practices.

The team's modern application code lives in a standard git repository with a standard [pipeline](../../glossary/#pipeline) for the web tier. But the batch processing layer, the financial calculation engine, or the device firmware is deployed through a completely separate process involving FTP, JCL job cards, and a deployment checklist that exists as a Word document on a shared drive.

The organization's [CD](../../glossary/#cd-continuous-delivery) practices stop at the boundary of the modern stack. The legacy platform exists in a different operational world with different tooling, different skills, different deployment cadence, and different risk models. Bridging the two worlds requires custom integration work that is unglamorous, expensive, and consistently deprioritized.

## Common causes

### Manual deployments

Legacy platform deployments are almost always manual. The platform predates modern deployment automation. The deployment procedure exists in documentation and in the heads of the people who have done it. Without investment in custom tooling, mainframe deployments remain manual indefinitely.

Building automation for a mainframe or proprietary platform requires understanding both the platform's native tools and modern automation principles. The result may not look like a standard pipeline, but it can provide the same benefits: consistent, repeatable, auditable deployments that do not require a specific person.

**Read more:** [Manual deployments](../../anti-patterns/pipeline/manual-deployments/)

### Missing deployment pipeline

A pipeline that covers the full deployment surface - modern application code, database changes, and legacy platform components - requires platform-specific extensions. Standard pipeline tools do not ship with mainframe support, but they can be extended with custom steps that invoke platform-native tools. Without this investment, the pipeline covers only the modern stack.

Building coverage incrementally - wrapping the most common deployment operations first, then expanding - is more achievable than trying to fully automate a complex legacy deployment in one effort.

**Read more:** [Missing deployment pipeline](../../anti-patterns/pipeline/missing-deployment-pipeline/)

### Knowledge silos

Mainframe and proprietary platform skills are rare and concentrating. Teams typically have one or two people who understand the platform deeply. When those people leave, the deployment process becomes opaque to everyone remaining. The knowledge that enables manual deployments is not distributed and not documented in a form anyone else can use.

Deliberately distributing platform knowledge - pair deployments, written procedures, runbooks that reflect the actual current process - reduces single-person dependency even before automation is available.

**Read more:** [Knowledge silos](../../anti-patterns/team-workflow/knowledge-silos/)

## How to narrow it down

1. **Is there anyone on the team other than one or two people who can deploy to the legacy platform?** If not, knowledge concentration is the immediate risk. Start with [Knowledge silos](../../anti-patterns/team-workflow/knowledge-silos/).
2. **Is the legacy platform deployment automated in any way?** If completely manual, automation of even one step is a starting point. Start with [Manual deployments](../../anti-patterns/pipeline/manual-deployments/).
3. **Is the legacy platform deployment included in the same pipeline as modern services?** If it is managed outside the pipeline, it lacks all the pipeline's safety properties. Start with [Missing deployment pipeline](../../anti-patterns/pipeline/missing-deployment-pipeline/).

**Ready to fix this?** The most common cause is [Manual deployments](../../anti-patterns/pipeline/manual-deployments/). Start with its [How to Fix It](../../anti-patterns/pipeline/manual-deployments/#how-to-fix-it) section for week-by-week steps.
