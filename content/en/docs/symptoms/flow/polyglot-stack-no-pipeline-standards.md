---
aliases:
  - /docs/symptoms/polyglot-stack-no-pipeline-standards/
title: "Each Language Has Its Own Ad Hoc Pipeline"
linkTitle: "Polyglot stack, no pipeline standards"
description: >
  Services in five languages with five build tools and no shared pipeline patterns. Each service is a unique operational snowflake.
tags:
  - deployment-automation
  - team-dynamics
---

## What you are seeing

The Java service has a Jenkins [pipeline](../../glossary/#pipeline) set up four years ago. The Python service has a GitHub Actions workflow written by a consultant. The Go service has a Makefile. The Node.js service deploys from a developer's laptop. The Ruby service has no deployment automation at all. Each service is a different discipline, maintained by whoever last touched it.

Onboarding a new engineer requires learning five different deployment systems. Fixing a security vulnerability in the dependency scanning step requires five separate changes across five pipeline definitions, each with different syntax. A compliance requirement that all services log deployment events requires five separate implementations, each time reinventing the pattern.

The team knows consolidation would help but cannot agree on a standard. The Java developers prefer their workflow. The Python developers prefer theirs. The effort to migrate any service to a common pattern feels risky because the current approach, however ad hoc, is known to work.

## Common causes

### Missing deployment pipeline

Without an organizational standard for pipeline design, each team or individual who sets up a service makes an independent choice based on personal familiarity. Establishing a standard pipeline pattern - even a minimal one - gives new services a starting point and gives existing services a target to migrate toward. Each service that adopts the standard is one fewer ad hoc pipeline to maintain separately.

**Read more:** [Missing deployment pipeline](../../anti-patterns/pipeline/missing-deployment-pipeline/)

### Knowledge silos

Each pipeline is understood only by the person who built it. Changes require that person. Debugging requires that person. When that person leaves, the pipeline becomes a black box that nobody wants to touch. The knowledge of "how the Ruby service deploys" is not shared across the team.

When pipeline patterns are standardized and documented, any team member can understand, debug, and improve any service's pipeline. The knowledge is in the pattern, not in the person.

**Read more:** [Knowledge silos](../../anti-patterns/team-workflow/knowledge-silos/)

### Manual deployments

Services that start with manual deployment accumulate automation piecemeal, in whatever form the person adding automation prefers. Without a standard, each automation effort produces a different result. The accumulation of five different automation approaches is harder to maintain than one standard approach applied to five services.

**Read more:** [Manual deployments](../../anti-patterns/pipeline/manual-deployments/)

## How to narrow it down

1. **Does the team have a standard pipeline pattern that all services follow?** If each service has a unique pipeline structure, start with establishing the standard. Start with [Missing deployment pipeline](../../anti-patterns/pipeline/missing-deployment-pipeline/).
2. **Can any engineer on the team deploy any service?** If deploying a specific service requires the person who set it up, the pipeline knowledge is siloed. Start with [Knowledge silos](../../anti-patterns/team-workflow/knowledge-silos/).
3. **Are there services with no deployment automation at all?** Start with those services. Start with [Manual deployments](../../anti-patterns/pipeline/manual-deployments/).

**Ready to fix this?** The most common cause is [Missing deployment pipeline](../../anti-patterns/pipeline/missing-deployment-pipeline/). Start with its [How to Fix It](../../anti-patterns/pipeline/missing-deployment-pipeline/#how-to-fix-it) section for week-by-week steps.
