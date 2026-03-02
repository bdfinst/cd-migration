---
title: "Missing Deployment Pipeline"
linkTitle: "Missing Deployment Pipeline"
weight: 36
category: "Pipeline & Infrastructure"
risk_level: critical
description: >
  Builds and deployments are manual processes. Someone runs a script on their laptop. There is no
  automated path from commit to production.
tags:
  - deployment-automation
---

{{% pageinfo %}}
**Category:** {{< param category >}} | {{% risk-indicator level="critical" %}}
{{% /pageinfo %}}

## What This Looks Like

Deploying to production requires a person. Someone opens a terminal, SSHs into a server, pulls the
latest code, runs a build command, and restarts a service. Or they download an [artifact](../../glossary/#artifact) from a
shared drive, copy it to the right server, and run an install script. The steps live in a wiki page,
a shared document, or in someone's head. Every deployment is a manual operation performed by
whoever knows the procedure.

There is no automation connecting a code commit to a running system. A developer finishes a feature,
pushes to the repository, and then a separate human process begins: someone must decide it is time
to deploy, gather the right artifacts, prepare the target environment, execute the deployment, and
verify that it worked. Each of these steps involves manual effort and human judgment.

The deployment procedure is a craft. Certain people are known for being "good at deploys." New team
members are warned not to attempt deployments alone. When the person who knows the procedure is
unavailable, deployments wait. The team has learned to treat deployment as a risky, specialized
activity that requires care and experience.

Common variations:

- **The deploy script on someone's laptop.** A shell script that automates some steps, but it lives
  on one developer's machine. Nobody else has it. When that developer is out, the team either waits
  or reverse-engineers the procedure from the wiki.
- **The manual checklist.** A document with 30 steps: "SSH into server X, run this command, check
  this log file, restart this service." The checklist is usually out of date. Steps are missing or
  in the wrong order. The person deploying adds corrections in the margins.
- **The "only Dave can deploy" pattern.** One person has the credentials, the knowledge, and the
  muscle memory to deploy reliably. Deployments are scheduled around Dave's availability. Dave
  is a single point of failure and cannot take vacation during release weeks.
- **The FTP deployment.** Build artifacts are uploaded to a server via FTP, SCP, or a file share.
  The person deploying must know which files go where, which config files to update, and which
  services to restart. A missed file means a broken deployment.
- **The manual build.** There is no automated build at all. A developer runs the build command
  locally, checks that it compiles, and copies the output to the deployment target. The build
  that was tested is not necessarily the build that gets deployed.

The telltale sign: if deploying requires a specific person, a specific machine, or a specific
document that must be followed step by step, no [pipeline](../../glossary/#pipeline) exists.

## Why This Is a Problem

The absence of a pipeline means every deployment is a unique event. No two deployments are
identical because human hands are involved in every step. This creates risk, waste, and
unpredictability that compound with every release.

### It reduces quality

Without a pipeline, there is no enforced quality gate between a developer's commit and production.
Tests may or may not be run before deploying. Static analysis may or may not be checked. The
artifact that reaches production may or may not be the same artifact that was tested. Every "may
or may not" is a gap where defects slip through.

Manual deployments also introduce their own defects. A step skipped in the checklist, a wrong
version of a config file, a service restarted in the wrong order - these are deployment bugs that
have nothing to do with the code. They are caused by the deployment process itself. The more manual
steps involved, the more opportunities for human error.

A pipeline eliminates both categories of risk. Every commit passes through the same automated
checks. The artifact that is tested is the artifact that is deployed. There are no skipped steps
because the steps are encoded in the pipeline definition and execute the same way every time.

### It increases rework

Manual deployments are slow, so teams batch changes to reduce [deployment frequency](../../glossary/#deployment-frequency). Batching means
more changes per deployment. More changes means harder debugging when something goes wrong, because
any of dozens of commits could be the cause. The team spends hours bisecting changes to find the
one that broke production.

Failed manual deployments create their own rework. A deployment that goes wrong must be diagnosed,
rolled back (if [rollback](../../glossary/#rollback) is even possible), and re-attempted. Each re-attempt burns time and
attention. If the deployment corrupted data or left the system in a partial state, the recovery
effort dwarfs the original deployment.

Rework also accumulates in the deployment procedure itself. Every deployment surfaces a new edge
case or a new prerequisite that was not in the checklist. Someone updates the wiki. The next
deployer reads the old version. The procedure is never quite right because manual procedures
cannot be versioned, tested, or reviewed the way code can.

With an automated pipeline, deployments are fast and repeatable. Small changes deploy individually.
Failed deployments are rolled back automatically. The pipeline definition is code - versioned,
reviewed, and tested like any other part of the system.

### It makes delivery timelines unpredictable

A manual deployment takes an unpredictable amount of time. The optimistic case is 30 minutes. The
realistic case includes troubleshooting unexpected errors, waiting for the right person to be
available, and re-running steps that failed. A "quick deploy" can easily consume half a day.

The team cannot commit to release dates because the deployment itself is a variable. "We can deploy
on Tuesday" becomes "we can start the deployment on Tuesday, and we'll know by Wednesday whether it
worked." Stakeholders learn that deployment dates are approximate, not firm.

The unpredictability also limits deployment frequency. If each deployment takes hours of manual
effort and carries risk of failure, the team deploys as infrequently as possible. This increases
[batch size](../../glossary/#batch-size), which increases risk, which makes deployments even more painful, which further
discourages frequent deployment. The team is trapped in a cycle where the lack of a pipeline makes
deployments costly, and costly deployments make the lack of a pipeline seem acceptable.

An automated pipeline makes deployment duration fixed and predictable. A deploy takes the same
amount of time whether it happens once a month or ten times a day. The cost per deployment drops
to near zero, removing the incentive to batch.

### It concentrates knowledge in too few people

When deployment is manual, the knowledge of how to deploy lives in people rather than in code. The
team depends on specific individuals who know the servers, the credentials, the order of
operations, and the workarounds for known issues. These individuals become bottlenecks and single
points of failure.

When the deployment expert is unavailable - sick, on vacation, or has left the company - the team
is stuck. Someone else must reconstruct the deployment procedure from incomplete documentation and
trial and error. Deployments attempted by inexperienced team members fail at higher rates, which
reinforces the belief that only experts should deploy.

A pipeline encodes deployment knowledge in an executable definition that anyone can run. New team
members deploy on their first day by triggering the pipeline. The deployment expert's knowledge is
preserved in code rather than in their head. The bus factor for deployments moves from one to the
entire team.

### Impact on continuous delivery

[Continuous delivery](../../glossary/#cd-continuous-delivery) requires an automated, repeatable pipeline that can take any commit from trunk
and deliver it to production with confidence. Without a pipeline, none of this is possible. There
is no automation to repeat. There is no confidence that the process will work the same way twice.
There is no path from commit to production that does not require a human to drive it.

The pipeline is not an optimization of manual deployment. It is a prerequisite for CD. A team
without a pipeline cannot practice CD any more than a team without source control can practice
version management. The pipeline is the foundation. Everything else - automated testing, deployment
strategies, progressive rollouts, fast rollback - depends on it existing.

## How to Fix It

### Step 1: Document the current manual process exactly

Before automating, capture what the team actually does today. Have the person who deploys most
often write down every step in order:

1. What commands do they run?
2. What servers do they connect to?
3. What credentials do they use?
4. What checks do they perform before, during, and after?
5. What do they do when something goes wrong?

This document is not the solution - it is the specification for the first version of the pipeline.
Every manual step will become an automated step.

### Step 2: Automate the build

Start with the simplest piece: turning source code into a deployable artifact without manual
intervention.

1. Choose a [CI](../../glossary/#ci-continuous-integration) server (Jenkins, GitHub Actions, GitLab CI, CircleCI, or any tool that triggers on
   commit).
2. Configure it to check out the code and run the build command on every push to trunk.
3. Store the build output as a versioned artifact.

At this point, the team has an automated build but still deploys manually. That is fine. The
pipeline will grow incrementally.

### Step 3: Add automated tests to the build

If the team has any automated tests, add them to the pipeline so they run after the build
succeeds. If the team has no automated tests, add one. A single test that verifies the application
starts up is more valuable than zero tests.

The pipeline should now fail if the build fails or if any test fails. This is the first automated
quality gate. No artifact is produced unless the code compiles and the tests pass.

### Step 4: Automate the deployment to a non-production environment (Weeks 3-4)

Take the manual deployment steps from Step 1 and encode them in a script or pipeline stage that
deploys the tested artifact to a staging or test environment:

- Provision or configure the target environment.
- Deploy the artifact.
- Run a smoke test to verify the deployment succeeded.

The team now has a pipeline that builds, tests, and deploys to a non-production environment on
every commit. Deployments to this environment should happen without any human intervention.

### Step 5: Extend the pipeline to production (Weeks 5-6)

Once the team trusts the automated deployment to non-production environments, extend it to
production:

1. Add a manual approval gate if the team is not yet comfortable with fully automated production
   deployments. This is a temporary step - the goal is to remove it later.
2. Use the same deployment script and process for production that you use for non-production. The
   only difference should be the target environment and its configuration.
3. Add post-deployment verification: health checks, smoke tests, or basic monitoring checks that
   confirm the deployment is healthy.

The first automated production deployment will be nerve-wracking. That is normal. Run it alongside
the manual process the first few times: deploy automatically, then verify manually. As confidence
grows, drop the manual verification.

### Step 6: Address the objections (Ongoing)

| Objection | Response |
|-----------|----------|
| "Our deployments are too complex to automate" | If a human can follow the steps, a script can execute them. Complex deployments benefit the most from automation because they have the most opportunities for human error. |
| "We don't have time to build a pipeline" | You are already spending time on every manual deployment. A pipeline is an investment that pays back on the second deployment and every deployment after. |
| "Only Dave knows how to deploy" | That is the problem, not a reason to keep the status quo. Building the pipeline captures Dave's knowledge in code. Dave should lead the pipeline effort because he knows the procedure best. |
| "What if the pipeline deploys something broken?" | The pipeline includes automated tests and can include approval gates. A broken deployment from a pipeline is no worse than a broken deployment from a human - and the pipeline can roll back automatically. |
| "Our infrastructure doesn't support modern pipeline tools" | Start with a shell script triggered by a cron job or a webhook. A pipeline does not require Kubernetes or cloud-native infrastructure. It requires automation of the steps you already perform manually. |

## Measuring Progress

| Metric | What to look for |
|--------|-----------------|
| Manual steps in the deployment process | Should decrease to zero |
| Deployment duration | Should decrease and stabilize as manual steps are automated |
| [Release frequency](../../../metrics/release-frequency/) | Should increase as deployment cost drops |
| Deployment failure rate | Should decrease as human error is removed |
| People who can deploy to production | Should increase from one or two to the entire team |
| [Lead time](../../../metrics/lead-time/) | Should decrease as the manual deployment bottleneck is eliminated |

## Team Discussion

Use these questions in a retrospective to explore how this anti-pattern affects your team:

- How do we currently know if a change is safe to ship? How many manual steps does that involve?
- What was the last deployment incident we had? Would a pipeline have caught it earlier?
- If we automated the next deployment step today, what would we automate first?

## Related Content

- [Build Automation](../../../migrate-to-cd/migration-path/foundations/build-automation/) - The first step in building a pipeline
- [Pipeline Architecture](../../../migrate-to-cd/migration-path/pipeline/pipeline-architecture/) - How to structure a pipeline from commit to production
- [Single Path to Production](../../../migrate-to-cd/migration-path/pipeline/single-path-to-production/) - Every change follows the same automated path
- [Everything as Code](../../../migrate-to-cd/migration-path/foundations/everything-as-code/) - Pipeline definitions, infrastructure, and deployment procedures belong in version control
- [Identify Constraints](../../../migrate-to-cd/migration-path/assess/identify-constraints/) - The absence of a pipeline is often the primary constraint on delivery
- [Systemic Defect Sources](../../defect-sources/) - understand where defects enter the system when there is no automated detection path.
