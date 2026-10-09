---
title: "Pipeline Definitions Not in Version Control"
linkTitle: "Pipeline definitions not in version control"
weight: 44
category: "Pipeline & Infrastructure"
risk_level: medium
description: >
  Pipeline definitions are maintained through a UI rather than source control, with no review process, history, or reproducibility.
tags:
  - deployment-automation
---

{{% pageinfo %}}
**Category:** {{< param category >}} | {{% risk-indicator level="medium" %}}
{{% /pageinfo %}}

## What this looks like

The pipeline that builds, tests, and deploys your application is configured through a web interface. Someone with admin access to the CI system logs in, navigates through a series of forms, sets values in text fields, and clicks save. The pipeline definition lives in the CI tool's internal database. No file in the source repository describes what the pipeline does.

When a new team member asks how the pipeline works, the answer is "log into Jenkins and look at the job configuration." When something breaks, the investigation requires comparing the current UI configuration against what someone remembers it looking like before the last change. When the team migrates the CI system to a new server or tool, someone must recreate the pipeline from scratch. They work from memory, or they read through the old system's UI before it goes offline.

Changes to the pipeline accumulate the same way changes to any unversioned file accumulate. An administrator adjusts a timeout value to fix a flaky step and does not document the change. A developer adds a build parameter to accommodate a new service and does not tell anyone. A security team member modifies a credential reference, and the development team never sees the change. Six months later nobody knows who changed what or when, and the pipeline has diverged from any documentation that was written about it.

Common variations:

- **Freestyle Jenkins jobs.** Pipeline logic is distributed across multiple job configurations, shell script fields, and plugin settings in the Jenkins UI, with no Jenkinsfile in the repository.
- **UI-configured GitHub Actions workflows.** GitHub Actions uses YAML files, but some teams configure repository settings, secrets, and environment protection rules only through the UI. No documentation or infrastructure-as-code equivalent exists.
- **Undocumented plugin dependencies.** The pipeline depends on specific versions of CI plugins, installed and updated through the CI tool's plugin manager UI. Nobody records which versions are required.
- **Shared library configuration drift.** Jobs use a shared pipeline library, but each job pins the library version through the UI rather than in code. Different jobs silently run different library versions.

The telltale sign: if the CI system's database were deleted tonight, it would be impossible to recreate the pipeline from source control alone.

## Why this is a problem

A pipeline that exists only in a UI is infrastructure that cannot be reviewed, audited, rolled back, or reproduced.

### It reduces quality

Anyone with access can silently remove a security scan from the pipeline with a few UI clicks. No one on the team will know until an incident surfaces the gap. Pipeline changes made through a UI bypass the review process that code changes go through.

To add a test stage, a developer submits a pull request that gets reviewed, discussed, and approved. To skip a test stage, a developer can change the CI UI with no review and no record. The pipeline - which is the quality gate for all application changes - has weaker quality controls applied to it than the application code it governs.

This asymmetry creates real risk. The pipeline enforces quality standards: it runs the tests, checks the coverage, scans for vulnerabilities, and validates the artifact. When changes to the pipeline are unreviewed and untracked, any of those checks can be weakened or removed without the team noticing. A pipeline that silently has its security scan disabled is indistinguishable from one that never had a security scan.

Version-controlled pipeline definitions bring pipeline changes into the same review process as application changes. A pull request that removes a required test stage is visible, reviewable, and reversible, the same as a pull request that removes application code.

### It increases rework

When a pipeline breaks and there is no version history, diagnosing what changed is a forensic exercise. Someone must compare the current pipeline configuration against their memory of how it worked before. They look for recent admin activity logs, if the CI system keeps them, and ask colleagues about recent changes. This investigation is slow, imprecise, and often inconclusive.

Worse, a pipeline bug fixed through the UI leaves no record of the fix. The next time the same bug occurs - or when the pipeline is migrated to a new system - the fix must be rediscovered from scratch. Teams in this state frequently solve the same pipeline problem multiple times because the institutional knowledge of the solution is not captured anywhere durable.

With version-controlled pipelines, you debug pipeline problems with standard git tooling:

- `git log` shows recent changes.
- `git blame` finds who changed a specific line.
- `git revert` undoes a change that caused a regression.

The same toolchain you use to understand application changes applies to the pipeline itself.

### It makes delivery timelines unpredictable

An unversioned pipeline creates fragile recovery scenarios. The CI system can go down from a disk failure, a cloud provider outage, or a botched upgrade. Recovery then requires restoring the CI tool's internal database from backup, or rebuilding the pipeline configuration from scratch. If no backup exists or the backup is from a point before recent changes, the recovery is incomplete and potentially slow.

For teams practicing CD, pipeline downtime is delivery downtime. Every hour the pipeline is unavailable is an hour during which no changes can be verified or deployed. A script can recreate a source-controlled pipeline in minutes. Without source control, an experienced administrator spends several hours reconstructing the pipeline from memory.

### Impact on continuous delivery

CD requires that the delivery process itself be reliable and reproducible. The pipeline is the delivery process. A pipeline that cannot be recreated from source control has unknown reliability. It works until it does not, and then recovery is slow and uncertain.

Infrastructure-as-code principles apply to the pipeline as much as to the application infrastructure. The CD-compatible approach is a Jenkinsfile or GitHub Actions workflow file committed to the repository. It follows the same review and versioning practices as application code. The pipeline definition should travel with the code it builds and be subject to the same rigor.

## How to fix it

### Step 1: Export and document the current pipeline configuration

Capture the current pipeline state before making any changes. Most CI tools have an export or configuration-as-code option. For Jenkins, the Job DSL or Configuration as Code plugin can export job definitions. For other systems, document the pipeline stages, parameters, environment variables, and credentials references manually. This export becomes the starting point for the source-controlled version.

### Step 2: Write the pipeline definition as code

Translate the exported configuration into a pipeline-as-code format appropriate for your CI system. Jenkins uses Jenkinsfiles with declarative or scripted pipeline syntax. GitHub Actions uses YAML workflow files in `.github/workflows/`, and GitLab CI uses `.gitlab-ci.yml`. The goal is a file in the repository that completely describes the pipeline behavior. The CI system can execute that file with no additional UI configuration.

### Step 3: Validate that the code-defined pipeline matches the UI pipeline

Run both pipelines on the same commit and compare outputs. The code-defined pipeline should produce the same artifacts, run the same tests, and execute the same deployment steps as the UI-defined pipeline. Investigate and reconcile any differences. Do not skip this validation. Subtle behavioral differences between the old and new pipelines can introduce regressions.

### Step 4: Migrate CI system configuration to infrastructure as code

Beyond the pipeline definition itself, the CI system has configuration: installed plugins, credential stores, agent definitions, and folder structures. Where the CI system supports it, bring that configuration under infrastructure-as-code management as well. Jenkins Configuration as Code (JCasC), Terraform providers for CI systems, or the CI system's own CLI can automate configuration management. Document what cannot be automated as explicit setup steps in a runbook committed to the repository.

### Step 5: Require pipeline changes to go through pull requests

Establish a policy that pipeline definitions are changed only through the source-controlled files, never through direct UI edits. Configure branch protection to require review on changes to pipeline files. If the CI system allows UI overrides, disable or restrict that access. The pipeline file should be the authoritative source of truth - the UI is a read-only view of what the file defines.

| Objection | Response |
|-----------|----------|
| "Our pipeline is too complex to describe in a single file." | Complex pipelines often benefit most from being in source control because their complexity makes undocumented changes especially risky. Use shared libraries or template mechanisms to manage complexity rather than keeping the pipeline in a UI. |
| "The CI admin team controls the pipeline and does not work in our repository." | Pipeline-as-code can be maintained in a separate repository from the application code. The important property is that it is in version control and subject to review, not that it is in the same repository. |
| "We do not know how to write pipeline code for our CI system." | All major CI systems have documentation and community examples for their pipeline-as-code formats. The learning curve is typically a few hours for basic pipelines. Start with a simple pipeline and expand incrementally. |
| "We use proprietary plugins that do not have code equivalents." | Document plugin dependencies in the repository even if the plugin itself must be installed manually. The dependency is then visible, reviewable, and reproducible - which is most of the value. |

## Measuring progress

| Metric | What to look for |
|--------|-----------------|
| [Build duration]({{< relref "/docs/reference/metrics/build-duration" >}}) | Stable and predictable pipeline duration once the pipeline definition is version-controlled and changes are reviewed |
| [Change fail rate]({{< relref "/docs/reference/metrics/change-fail-rate" >}}) | Fewer pipeline-related failures as unreviewed configuration changes are eliminated |
| [Mean time to repair]({{< relref "/docs/reference/metrics/mean-time-to-repair" >}}) | Faster pipeline recovery when the pipeline can be recreated from source control rather than reconstructed from memory |
| [Lead time]({{< relref "/docs/reference/metrics/lead-time" >}}) | Reduction in pipeline downtime contribution to delivery lead time |

## Related content

- [Everything as code]({{< relref "/docs/foundations/everything-as-code" >}})
- [Pipeline architecture]({{< relref "/docs/pipeline/pipeline-architecture" >}})
- [No infrastructure as code]({{< relref "/docs/anti-patterns/pipeline/no-infrastructure-as-code" >}})
- [Build automation]({{< relref "/docs/foundations/build-automation" >}})
- [Single path to production]({{< relref "/docs/pipeline/single-path-to-production" >}})
