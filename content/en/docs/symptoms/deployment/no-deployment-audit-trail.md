---
aliases:
  - /docs/symptoms/no-deployment-audit-trail/
title: "No Evidence of What Was Deployed or When"
linkTitle: "No deployment audit trail"
description: >
  The team cannot prove what version is running in production, who deployed it, or what tests it passed.
tags:
  - deployment-automation
  - observability
---

## What you are seeing

An auditor asks a simple question: what version of the payment service is currently running in production, when was it deployed, who authorized it, and what tests did it pass? The team opens a spreadsheet, checks Slack history, and pieces together an answer from memory and partial records. The spreadsheet was last updated two months ago. The Slack message that mentioned the deployment contains a commit hash but not a build number. The [CI](../../glossary/#ci-continuous-integration) system shows jobs that ran, but the logs have been pruned.

Each deployment was treated as a one-time event. Records were not kept because nobody expected to need them. The process that makes deployments auditable is the same process that makes them reliable: a [pipeline](../../glossary/#pipeline) that creates a versioned [artifact](../../glossary/#artifact), records its provenance, and logs each promotion through environments.

Outside of formal audit requirements, the same problem shows up as operational confusion. The team is not sure what is running in production because deployments happen at different times by different people without a centralized record. Debugging a production issue requires determining which version introduced the behavior, which requires reconstructing the deployment history from whatever partial records exist.

## Common causes

### Manual deployments

Manual deployments leave no systematic record. Who ran them, what they ran, and when are questions whose answers depend on the discipline of individual operators. Some engineers write Slack messages when they deploy; others do not. Some keep notes; most do not. The audit trail is as complete as the most diligent person's habits.

Automated deployments with pipeline logs create an audit trail as a side effect of execution. The pipeline records every run: who triggered it, what artifact was deployed, which tests passed, and what the deployment target was. This information exists without anyone having to remember to record it.

**Read more:** [Manual deployments](../../anti-patterns/pipeline/manual-deployments/)

### Missing deployment pipeline

A pipeline produces structured, queryable records of every deployment. Which artifact, which environment, which tests passed, which user triggered the run - all of this is captured automatically. Without a pipeline, audit evidence must be manufactured from logs, Slack messages, and memory rather than extracted from the deployment process itself.

When auditors require evidence of deployment controls, a pipeline makes compliance straightforward. The pipeline log is the compliance record. Without a pipeline, compliance documentation is a manual reporting exercise conducted after the fact.

**Read more:** [Missing deployment pipeline](../../anti-patterns/pipeline/missing-deployment-pipeline/)

### Snowflake environments

When environments are hand-configured, the concept of "what version is deployed" becomes ambiguous. A snowflake environment may have been modified in place after the last deployment - a config file edited directly, a package updated on the server, a manual hotfix applied. The artifact version in the deployment log may not accurately reflect the current state of the environment.

Environments defined as code have their state recorded in version control. The current state of an environment is the current state of the infrastructure code that defines it. When the auditor asks whether production was modified since the last deployment, the answer is in the git log - not in a manual check of whether someone may have edited a config file on the server.

**Read more:** [Snowflake environments](../../anti-patterns/pipeline/snowflake-environments/)

## How to narrow it down

1. **Can the team identify the exact artifact version currently in production?** If not, there is no artifact tracking. Start with [Missing deployment pipeline](../../anti-patterns/pipeline/missing-deployment-pipeline/).
2. **Is there a complete log of who deployed what and when?** If deployment records depend on engineers remembering to write Slack messages, the record will have gaps. Start with [Manual deployments](../../anti-patterns/pipeline/manual-deployments/).
3. **Could the environment have been modified since the last deployment?** If production servers can be changed outside the deployment process, the deployment log does not represent the current state. Start with [Snowflake environments](../../anti-patterns/pipeline/snowflake-environments/).

**Ready to fix this?** The most common cause is [Manual deployments](../../anti-patterns/pipeline/manual-deployments/). Start with its [How to Fix It](../../anti-patterns/pipeline/manual-deployments/#how-to-fix-it) section for week-by-week steps.
