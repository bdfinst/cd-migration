---
aliases:
  - /docs/symptoms/inadequate-tooling/
title: "The Development Workflow Has Friction at Every Step"
linkTitle: "Inadequate tooling"
description: >
  Slow CI servers, poor CLI tools, and no IDE integration. Every step in the development process takes longer than it should.
tags:
  - deployment-automation
  - team-dynamics
---

## What you are seeing

The [CI](../../glossary/#ci-continuous-integration) servers are slow. A build that should take 5 minutes takes 25 because the agents are undersized and the queue is long. The IDE has no integration with the team's testing framework, so running a specific test requires dropping to the command line and remembering the exact invocation syntax. The deployment CLI has no tab completion and cryptic error messages. The local development environment requires a 12-step ritual to restart after any configuration change.

Individual friction points seem minor in isolation. A 20-second wait is a slight inconvenience. A missing IDE shortcut is a small annoyance. But friction compounds. A developer who waits 20 seconds, remembers a command, waits 20 more seconds, then navigates an opaque error message has spent a minute on a task that should take 5 seconds. Across ten such interactions per day, across an entire team, this is a meaningful tax on throughput.

The larger cost is attentional, not temporal. Friction interrupts flow. When a developer has to stop thinking about the problem they are solving to remember a command syntax, context-switch to a different tool, or wait for an operation to complete, they lose the thread. Flow states that make complex problems tractable are incompatible with constant context switches caused by tooling friction.

## Common causes

### Missing deployment pipeline

Investment in [pipeline](../../glossary/#pipeline) tooling - build caching, parallelized test execution, automated deployment scripts with good error messages - directly reduces the friction of getting changes to production. Teams without this investment accumulate tooling debt. Each year that passes without improving the pipeline leaves a more elaborate set of workarounds in place.

A team that treats the pipeline as a first-class product, maintained and improved the same way they maintain production code, eliminates friction points incrementally. The slow CI queue, the missing IDE integration, the opaque deployment errors - each one is a bug in the pipeline product, and bugs get fixed when someone owns the product.

**Read more:** [Missing deployment pipeline](../../anti-patterns/pipeline/missing-deployment-pipeline/)

### Manual deployments

When the deployment process is manual, there is no pressure to make the tooling ergonomic. The person doing the deployment learns the steps and adapts. Automation forces the deployment process to be scripted, which creates an interface that can be improved, tested, and measured. A deployment script with good error messages and clear output is a better tool than a deployment runbook, and it can be improved as a piece of software.

**Read more:** [Manual deployments](../../anti-patterns/pipeline/manual-deployments/)

## How to narrow it down

1. **How long does a full pipeline run take?** If builds take more than 10 minutes, build caching and parallelization are likely available but not implemented. Start with [Missing deployment pipeline](../../anti-patterns/pipeline/missing-deployment-pipeline/).
2. **Can a developer deploy with a single command that provides clear output?** If deployment requires multiple manual steps with opaque error messages, the tooling has not been invested in. Start with [Manual deployments](../../anti-patterns/pipeline/manual-deployments/).
3. **Are builds getting faster over time?** If build time is stable or increasing, nobody is actively working on pipeline performance. Start with [Missing deployment pipeline](../../anti-patterns/pipeline/missing-deployment-pipeline/).

**Ready to fix this?** The most common cause is [Missing deployment pipeline](../../anti-patterns/pipeline/missing-deployment-pipeline/). Start with its [How to Fix It](../../anti-patterns/pipeline/missing-deployment-pipeline/#how-to-fix-it) section for week-by-week steps.
