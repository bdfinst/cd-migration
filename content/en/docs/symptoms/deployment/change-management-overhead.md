---
aliases:
  - /docs/symptoms/change-management-overhead/
title: "Every Change Requires a Ticket and Approval Chain"
linkTitle: "Change management overhead"
description: >
  Change management overhead is identical for a one-line fix and a major rewrite. The process creates a queue that delays all changes equally.
tags:
  - process-gates
  - deployment-automation
---

## What you are seeing

The team has a change management process. Every production change requires a change ticket, an impact assessment, a [rollback]({{< relref "/docs/reference/glossary#rollback" >}}) plan document, a peer review, and final approval from a change board. The process was designed with major infrastructure changes in mind. It is now applied uniformly to every change, including renaming a log message.

The change board meets once a week. If a change misses the cutoff, it waits until next week. Urgent changes require emergency approval, which means tracking down the right people and interrupting them at unpredictable hours. The overhead for a critical security patch is the same as for a feature release. The team has learned to batch changes together to amortize the approval cost, which makes each deployment larger and riskier.

The intent of change management - reducing the risk of production changes - is accomplished here by slowing everything down rather than by increasing confidence in individual changes. The process treats all changes as equally risky regardless of their actual scope or the automated evidence available about their safety.

## Common causes

### CAB gates

Change advisory boards apply manual approval uniformly to all changes. The board reviews documentation rather than evidence from automated testing and deployment [pipelines]({{< relref "/docs/reference/glossary#pipeline" >}}). This adds calendar time proportional to the board's meeting cadence, not proportional to the risk of the change. A one-line fix and a major architectural change wait in the same queue.

Automated deployment systems with pipeline-generated evidence - test results, code coverage, [artifact]({{< relref "/docs/reference/glossary#artifact" >}}) provenance - can satisfy the intent of change management without the calendar overhead. Low-risk changes pass automatically; high-risk changes get human review based on objective criteria rather than because everything gets reviewed.

**Read more:** [CAB gates]({{< relref "/docs/anti-patterns/organizational-cultural/governance-process/cab-gates" >}})

### Manual deployments

When deployments are manual, the change management process exists partly as a compensating control. Since the deployment itself is not automated or auditable, the team adds process before and after to create accountability. Manual processes require manual oversight.

Automated deployments with pipeline logs create a built-in audit trail: which artifact was deployed, which tests it passed, who triggered the deployment, and what the environment state was before and after. This evidence replaces the need for pre-approval documentation for routine changes.

**Read more:** [Manual deployments]({{< relref "/docs/anti-patterns/pipeline/manual-deployments" >}})

### Missing deployment pipeline

A pipeline provides objective evidence that a change was tested and what those tests found. Test results, code coverage, dependency scans, and deployment logs are generated as a natural output of the pipeline. This evidence can satisfy auditors and change reviewers without requiring manual documentation.

Without a pipeline, teams substitute documentation for evidence. The change ticket describes what the developer intended to test. It cannot verify that the tests were actually run or that they passed. A pipeline generates verifiable evidence rather than requiring trust in self-reported documentation.

**Read more:** [Missing deployment pipeline]({{< relref "/docs/anti-patterns/pipeline/missing-deployment-pipeline" >}})

## How to narrow it down

1. **Does a committee approve individual production changes?** Manual approval boards add calendar-driven delays independent of change risk. Start with [CAB gates]({{< relref "/docs/anti-patterns/organizational-cultural/governance-process/cab-gates" >}}).
2. **Is the deployment process automated with pipeline-generated audit logs?** If deployment requires manual documentation because there is no automated record, the pipeline is the missing foundation. Start with [Missing deployment pipeline]({{< relref "/docs/anti-patterns/pipeline/missing-deployment-pipeline" >}}).
3. **Do small, low-risk changes go through the same process as major changes?** If the process is uniform regardless of risk, the classification mechanism - not just the process - needs to change. Start with [CAB gates]({{< relref "/docs/anti-patterns/organizational-cultural/governance-process/cab-gates" >}}).

**Ready to fix this?** The most common cause is [CAB gates]({{< relref "/docs/anti-patterns/organizational-cultural/governance-process/cab-gates" >}}). Start with its [How to Fix It]({{< relref "/docs/anti-patterns/organizational-cultural/governance-process/cab-gates#how-to-fix-it" >}}) section for week-by-week steps.
