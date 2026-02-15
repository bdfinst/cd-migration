---
aliases:
  - /docs/symptoms/fear-of-deploying/
title: "The Team Is Afraid to Deploy"
linkTitle: "Fear of deploying"
description: >
  Production deployments cause anxiety because they frequently fail. The team delays deployments,
  which increases batch size, which increases risk.
tags:
  - deployment-automation
  - batch-size
  - observability
---

## What you are seeing

Nobody wants to deploy on a Friday. Or a Thursday. Ideally, deployments happen early in the week
when the team is available to respond to problems. The team has learned through experience that
deployments break things, so they treat each deployment as a high-risk event requiring maximum
staffing and attention.

Developers delay merging "risky" changes until after the next deploy so their code does not get
caught in the blast radius. Release managers add buffer time between deploys. The team informally
agrees on a deployment cadence (weekly, biweekly) that gives everyone time to recover between
releases.

The fear is rational. Deployments do break things. But the team's response (deploy less often,
batch more changes, add more manual verification) makes each deployment larger, riskier, and more
likely to fail. The fear becomes self-reinforcing.

## Common causes

### Manual Deployments

When deployment requires human execution of steps, each deployment carries human error risk. The
team has experienced deployments where a step was missed, a script was run in the wrong order, or
a configuration was set incorrectly. The fear is not of the code but of the deployment process
itself. Automated deployments that execute the same steps identically every time eliminate the
process-level risk.

**Read more:** [Manual Deployments](../../anti-patterns/pipeline/manual-deployments/)

### Missing Deployment Pipeline

When there is no automated path from commit to production, the team has no confidence that the
deployed artifact has been properly built and tested. Did someone run the tests? Are we deploying
the right version? Is this the same artifact that was tested in staging? Without a pipeline that
enforces these checks, every deployment requires the team to manually verify the prerequisites.

**Read more:** [Missing Deployment Pipeline](../../anti-patterns/pipeline/missing-deployment-pipeline/)

### Blind Operations

When the team cannot observe production health after a deployment, they have no way to know
quickly whether the deploy succeeded or failed. The fear is not just that something will break but
that they will not know it broke until a customer reports it. Monitoring and automated health
checks transform deployment from "deploy and hope" to "deploy and verify."

**Read more:** [Blind Operations](../../anti-patterns/monitoring-observability/blind-operations/)

### Manual Testing Only

When the team has no automated tests, they have no confidence that the code works before
deploying it. Manual testing provides some coverage, but it is never exhaustive, and the team
knows it. Every deployment carries the risk that an untested code path will fail in production. A
comprehensive automated test suite gives the team evidence that the code works, replacing hope
with confidence.

**Read more:** [Manual Testing Only](../../anti-patterns/testing/manual-testing-only/)

### Monolithic Work Items

When changes are large, each deployment carries more risk simply because more code is changing at
once. A deployment with 200 lines changed across 3 files is easy to reason about and easy to roll
back. A deployment with 5,000 lines changed across 40 files is unpredictable. Small, frequent
deployments reduce risk per deployment rather than accumulating it.

**Read more:** [Monolithic Work Items](../../anti-patterns/team-workflow/monolithic-work-items/)

## How to narrow it down

1. **Is the deployment process automated?** If a human runs the deployment, the fear may be of the
   process, not the code. Start with
   [Manual Deployments](../../anti-patterns/pipeline/manual-deployments/).
2. **Does the team have an automated pipeline from commit to production?** If not, there is no
   systematic guarantee that the right artifact with the right tests reaches production. Start with
   [Missing Deployment Pipeline](../../anti-patterns/pipeline/missing-deployment-pipeline/).
3. **Can the team verify production health within minutes of deploying?** If not, the fear
   includes not knowing whether the deploy worked. Start with
   [Blind Operations](../../anti-patterns/monitoring-observability/blind-operations/).
4. **Does the team have automated tests that provide confidence before deploying?** If not, the
   fear is that untested code will break. Start with
   [Manual Testing Only](../../anti-patterns/testing/manual-testing-only/).
5. **How many changes are in a typical deployment?** If deployments are large batches, the risk
   per deployment is high by construction. Start with
   [Monolithic Work Items](../../anti-patterns/team-workflow/monolithic-work-items/).
