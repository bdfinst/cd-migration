---
title: "Manual Deployments"
linkTitle: "Manual Deployments"
weight: 37
category: "Pipeline & Infrastructure"
risk_level: high
description: >
  The build is automated but deployment is not. Someone must SSH into servers, run scripts, and
  shepherd each release to production by hand.
tags:
  - deployment-automation
  - process-gates
---

{{% pageinfo %}}
**Category:** {{< param category >}} | {{% risk-indicator level="high" %}}
{{% /pageinfo %}}

## What This Looks Like

The team has a CI server. Code is built and tested automatically on every push. The pipeline
dashboard is green. But between "pipeline passed" and "code running in production," there is a
person. Someone must log into a deployment tool, click a button, select the right artifact, choose
the right environment, and watch the output scroll by. Or they SSH into servers, pull the artifact,
run migration scripts, restart services, and verify health checks - all by hand.

The team may not even think of this as a problem. The build is automated. The tests run
automatically. Deployment is "just the last step." But that last step takes 30 minutes to an hour
of focused human attention, can only happen when the right person is available, and fails often
enough that nobody wants to do it on a Friday afternoon.

Deployment has its own rituals. The team announces in Slack that a deploy is starting. Other
developers stop merging. Someone watches the logs. Another person checks the monitoring dashboard.
When it is done, someone posts a confirmation. The whole team holds its breath during the process
and exhales when it works. This ceremony happens every time, whether the release is one commit or
fifty.

Common variations:

- **The button-click deploy.** The pipeline tool has a "deploy to production" button, but a human must
  click it and then monitor the result. The automation exists but is not trusted to run
  unattended. Someone watches every deployment from start to finish.
- **The runbook deploy.** A document describes the deployment steps in order. The deployer follows
  the runbook, executing commands manually at each step. The runbook was written months ago and
  has handwritten corrections in the margins. Some steps have been added, others crossed out.
- **The SSH-and-pray deploy.** The deployer SSHs into each server individually, pulls code or
  copies artifacts, runs scripts, and restarts services. The order matters. Missing a server means
  a partial deployment. The deployer keeps a mental checklist of which servers are done.
- **The release coordinator deploy.** One person coordinates the deployment across multiple systems.
  They send messages to different teams: "deploy service A now," "run the database migration,"
  "restart the cache." The deployment is a choreographed multi-person event.
- **The after-hours deploy.** Deployments happen only outside business hours because the manual
  process is risky enough that the team wants minimal user traffic. Deployers work evenings or
  weekends. The deployment window is sacred and stressful.

The telltale sign: if the pipeline is green but the team still needs to "do a deploy" as a
separate activity, deployment is manual.

## Why This Is a Problem

A manual deployment negates much of the value that an automated build and test pipeline provides.
The pipeline can validate code in minutes, but if the last mile to production requires a human,
the delivery speed is limited by that human's availability, attention, and reliability.

### It reduces quality

Manual deployment introduces a category of defects that have nothing to do with the code. A
deployer who runs migration scripts in the wrong order corrupts data. A deployer who forgets to
update a config file on one of four servers creates inconsistent behavior. A deployer who restarts
services too quickly triggers a cascade of connection errors. These are process defects - bugs
introduced by the deployment method, not the software.

Manual deployments also degrade the quality signal from the pipeline. The pipeline tests a specific
artifact in a specific configuration. If the deployer manually adjusts configuration, selects a
different artifact version, or skips a verification step, the deployed system no longer matches
what the pipeline validated. The pipeline said "this is safe to deploy," but what actually reached
production is something slightly different.

Automated deployment eliminates process defects by executing the same steps in the same order
every time. The artifact the pipeline tested is the artifact that reaches production. Configuration
is applied from version-controlled definitions, not from human memory. The deployment is identical
whether it happens at 2 PM on Tuesday or 3 AM on Saturday.

### It increases rework

Because manual deployments are slow and risky, teams batch changes. Instead of deploying each
commit individually, they accumulate a week or two of changes and deploy them together. When
something breaks in production, the team must determine which of thirty commits caused the problem.
This diagnosis takes hours. The fix takes more hours. If the fix itself requires a deployment, the
team must go through the manual process again.

Failed deployments are especially costly. A manual deployment that leaves the system in a broken
state requires manual recovery. The deployer must diagnose what went wrong, decide whether to roll
forward or roll back, and execute the recovery steps by hand. If the deployment was a multi-server
process and some servers are on the new version while others are on the old version, the recovery
is even harder. The team may spend more time recovering from a failed deployment than they spent
on the deployment itself.

With automated deployments, each commit deploys individually. When something breaks, the cause is
obvious - it is the one commit that just deployed. Rollback is a single action, not a manual
recovery effort. The time from "something is wrong" to "the previous version is running" is
minutes, not hours.

### It makes delivery timelines unpredictable

The gap between "pipeline is green" and "code is in production" is measured in human availability.
If the deployer is in a meeting, the deployment waits. If the deployer is on vacation, the
deployment waits longer. If the deployment fails and the deployer needs help, the recovery depends
on who else is around.

This human dependency makes release timing unpredictable. The team cannot promise "this fix will be
in production in 30 minutes" because the deployment requires a person who may not be available for
hours. Urgent fixes wait for deployment windows. Critical patches wait for the release coordinator
to finish lunch.

The batching effect adds another layer of unpredictability. When teams batch changes to reduce
deployment frequency, each deployment becomes larger and riskier. Larger deployments take longer to
verify and are more likely to fail. The team cannot predict how long the deployment will take
because they cannot predict what will go wrong with a batch of thirty changes.

Automated deployment makes the time from "pipeline green" to "running in production" fixed and
predictable. It takes the same number of minutes regardless of who is available, what day it is,
or how many other things are happening. The team can promise delivery timelines because the
deployment is a deterministic process, not a human activity.

### It prevents fast recovery

When production breaks, speed of recovery determines the blast radius. A team that can deploy a
fix in five minutes limits the damage. A team that needs 45 minutes of manual deployment work
exposes users to the problem for 45 minutes plus diagnosis time.

Manual rollback is even worse. Many teams with manual deployments have no practiced rollback
procedure at all. "Rollback" means "re-deploy the previous version," which means running the
entire manual deployment process again with a different artifact. If the deployment process takes
an hour, rollback takes an hour. If the deployment process requires a specific person, rollback
requires that same person.

Some manual deployments cannot be cleanly rolled back. Database migrations that ran during the
deployment may not have reverse scripts. Config changes applied to servers may not have been
tracked. The team is left doing a forward fix under pressure, manually deploying a patch through
the same slow process that caused the problem.

Automated pipelines with automated rollback can revert to the previous version in minutes. The
rollback follows the same tested path as the deployment. No human judgment is required. The team's
mean time to repair drops from hours to minutes.

### Impact on continuous delivery

Continuous delivery means any commit that passes the pipeline can be released to production at any
time with confidence. Manual deployment breaks this definition at "at any time." The commit can
only be released when a human is available to perform the deployment, when the deployment window
is open, and when the team is ready to dedicate attention to watching the process.

The manual deployment step is the bottleneck that limits everything upstream. The pipeline can
validate commits in 10 minutes, but if deployment takes an hour of human effort, the team will
never deploy more than a few times per day at best. In practice, teams with manual deployments
release weekly or biweekly because the deployment overhead makes anything more frequent
impractical.

The pipeline is only half the delivery system. Automating the build and tests without automating
the deployment is like paving a highway that ends in a dirt road. The speed of the paved section
is irrelevant if every journey ends with a slow, bumpy last mile.

## How to Fix It

### Step 1: Script the current manual process (Week 1)

Take the runbook, the checklist, or the knowledge in the deployer's head and turn it into a
script. Do not redesign the process yet - just encode what the team already does.

1. Record a deployment from start to finish. Note every command, every server, every check.
2. Write a script that executes those steps in order.
3. Store the script in version control alongside the application code.

The script will be rough. It will have hardcoded values and assumptions. That is fine. The goal
is to make the deployment reproducible by any team member, not to make it perfect.

### Step 2: Run the script from the pipeline (Week 2)

Connect the deployment script to the pipeline so it runs automatically after the build and
tests pass. Start with a non-production environment:

1. Add a deployment stage to the pipeline that targets a staging or test environment.
2. Trigger it automatically on every successful build.
3. Add a smoke test after deployment to verify it worked.

The team now gets automatic deployments to a non-production environment on every commit. This
builds confidence in the automation and surfaces problems early.

### Step 3: Externalize configuration and secrets (Weeks 2-3)

Manual deployments often involve editing config files on servers or passing environment-specific
values by hand. Move these out of the manual process:

- Store environment-specific configuration in a config management system or environment variables
  managed by the pipeline.
- Move secrets to a secrets manager (Vault, AWS Secrets Manager, Azure Key Vault, or even
  encrypted pipeline variables as a starting point).
- Ensure the deployment script reads configuration from these sources rather than from hardcoded
  values or manual input.

This step is critical because manual configuration is one of the most common sources of deployment
failures. Automating deployment without automating configuration just moves the manual step.

### Step 4: Automate production deployment with a gate (Weeks 3-4)

Extend the pipeline to deploy to production using the same script and process:

1. Add a production deployment stage after the non-production deployment succeeds.
2. Include a manual approval gate - a button that a team member clicks to authorize the production
   deployment. This is a temporary safety net while the team builds confidence.
3. Add post-deployment health checks that automatically verify the deployment succeeded.
4. Add automated rollback that triggers if the health checks fail.

The approval gate means a human still decides when to deploy, but the deployment itself is fully
automated. No SSHing. No manual steps. No watching logs scroll by.

### Step 5: Remove the manual gate (Weeks 6-8)

Once the team has seen the automated production deployment succeed repeatedly, remove the manual
approval gate. The pipeline now deploys to production automatically when all checks pass.

This is the hardest step emotionally. The team will resist. Expect these objections:

| Objection | Response |
|-----------|----------|
| "We need a human to decide when to deploy" | Why? If the pipeline validates the code and the deployment process is automated and tested, what decision is the human making? If the answer is "checking that nothing looks weird," that check should be automated. |
| "What if it deploys during peak traffic?" | Use deployment windows in the pipeline configuration, or use progressive rollout strategies that limit blast radius regardless of traffic. |
| "We had a bad deployment last month" | Was it caused by the automation or by a gap in testing? If the tests missed a defect, the fix is better tests, not a manual gate. If the deployment process itself failed, the fix is better deployment automation, not a human watching. |
| "Compliance requires manual approval" | Review the actual compliance requirement. Most require evidence of approval, not a human clicking a button at deployment time. A code review approval, an automated policy check, or an audit log of the pipeline run often satisfies the requirement. |
| "Our deployments require coordination with other teams" | Automate the coordination. Use API contracts, deployment dependencies in the pipeline, or event-based triggers. If another team must deploy first, encode that dependency rather than coordinating in Slack. |

### Step 6: Add deployment observability (Ongoing)

Once deployments are automated, invest in knowing whether they worked:

- Monitor error rates, latency, and key business metrics after every deployment.
- Set up automatic rollback triggers tied to these metrics.
- Track deployment frequency, duration, and failure rate over time.

The team should be able to deploy without watching. The monitoring watches for them.

## Measuring Progress

| Metric | What to look for |
|--------|-----------------|
| Manual steps per deployment | Should reach zero |
| Deployment duration (human time) | Should drop from hours to zero - the pipeline does the work |
| [Release frequency](../../../reference/metrics/release-frequency/) | Should increase as deployment friction drops |
| [Change fail rate](../../../reference/metrics/change-fail-rate/) | Should decrease as manual process defects are eliminated |
| [Mean time to repair](../../../reference/metrics/mean-time-to-repair/) | Should decrease as rollback becomes automated |
| [Lead time](../../../reference/metrics/lead-time/) | Should decrease as the deployment bottleneck is removed |

## Related Content

- [Pipeline Architecture](../../../migrate-to-cd/migration-path/pipeline/pipeline-architecture/) - How to structure a pipeline that includes deployment
- [Single Path to Production](../../../migrate-to-cd/migration-path/pipeline/single-path-to-production/) - Every change follows the same automated path through the same pipeline
- [Rollback](../../../migrate-to-cd/migration-path/pipeline/rollback/) - Automated rollback depends on automated deployment
- [Everything as Code](../../../migrate-to-cd/migration-path/foundations/everything-as-code/) - Deployment scripts, configuration, and infrastructure belong in version control
- [Missing Deployment Pipeline](missing-deployment-pipeline/) - If the build is also manual, start there first
