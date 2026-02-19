---
aliases:
  - /docs/symptoms/release-manager-bottleneck/
title: "Releases Depend on One Person"
linkTitle: "Release manager bottleneck"
description: >
  A single person coordinates and executes all production releases. Deployments stop when that person is unavailable.
tags:
  - deployment-automation
  - process-gates
---

## What you are seeing

Deployments stop when one person is unavailable. The team has a release manager - or someone who has informally become one - who holds the institutional knowledge of how deployments work. They know which config values need to be updated, which services need to restart in which order, which monitoring dashboards to watch, and what warning signs of a bad deploy look like. When they go on vacation, the team either waits for them to return or attempts a deployment with noticeably less confidence.

The release manager's calendar becomes a constraint on when the team can ship. Releases are scheduled around their availability. On-call engineers will not deploy without them present because the process is too opaque to navigate alone. When a production incident requires a hotfix, the first step is "find that person" rather than "follow the rollback procedure."

The bottleneck is rarely a single person's fault. It reflects a deployment process that was never made systematic or automated. Knowledge accumulated in one person because the process was never documented in a way that made it executable without that person. The team worked around the complexity rather than removing it.

## Common causes

### Manual deployments

Manual deployments require human expertise. When the steps are not automated, a deployment is only as reliable as the person executing it. Over time, the most experienced person becomes the de-facto release manager by default - not because anyone decided this, but because they have done it the most times and accumulated the most context.

Automated deployments remove the dependency on individual skill. The pipeline executes the same steps identically every time, regardless of who triggers it. Any team member can initiate a deployment by running the pipeline; the expertise is encoded in the automation rather than in a person.

**Read more:** [Manual deployments](../../anti-patterns/pipeline/manual-deployments/)

### Knowledge silos

The deployment process knowledge is not written down or codified. It lives in one person's head. When that person leaves or is unavailable, the knowledge gap is immediately felt. The team discovers gaps in their collective knowledge only when the person who filled those gaps is not present.

Externalizing deployment knowledge into runbooks, pipeline definitions, and infrastructure code means the on-call engineer can deploy without finding the one person who knows the steps. The pipeline definition is readable by any engineer. When a production incident requires a hotfix, the first step is "follow the procedure" rather than "find that person."

**Read more:** [Knowledge silos](../../anti-patterns/team-workflow/knowledge-silos/)

### Snowflake environments

When environments are hand-configured and differ from each other in undocumented ways, releases require someone who has memorized those differences. The person who configured the environment knows which server needs the manual step and which config file is different from the others. Without that person, the deployment is a minefield of undocumented quirks.

Environments defined as code have their differences captured in the code. Any engineer reading the infrastructure definition can understand what is deployed where and why. The deployment procedure is the same regardless of which environment is the target.

**Read more:** [Snowflake environments](../../anti-patterns/pipeline/snowflake-environments/)

### Missing deployment pipeline

A pipeline codifies deployment knowledge as executable code. Every step is documented, versioned, and runnable by any team member. The pipeline is the answer to "how do we deploy" - not a person, not a wiki page, but an automated procedure that the team maintains together.

Without a pipeline, the knowledge of how to deploy stays in the people who have done it. The release manager's calendar remains a constraint on when the team can ship because no executable procedure exists that someone else could follow in their place. Any engineer can trigger the pipeline; no one can trigger another person's institutional memory.

**Read more:** [Missing deployment pipeline](../../anti-patterns/pipeline/missing-deployment-pipeline/)

## How to narrow it down

1. **Can any engineer on the team deploy to production without help?** If not, the deployment process has concentrations of required knowledge. Start with [Knowledge silos](../../anti-patterns/team-workflow/knowledge-silos/).
2. **Is the deployment process automated end to end?** If a human runs deployment steps manually, expertise concentrates by default. Start with [Manual deployments](../../anti-patterns/pipeline/manual-deployments/).
3. **Do environments have undocumented configuration differences?** If different environments require different steps known only to certain people, the environments are the knowledge trap. Start with [Snowflake environments](../../anti-patterns/pipeline/snowflake-environments/).
4. **Does a written pipeline definition exist in version control?** If not, the team has no shared, authoritative record of the deployment process. Start with [Missing deployment pipeline](../../anti-patterns/pipeline/missing-deployment-pipeline/).
