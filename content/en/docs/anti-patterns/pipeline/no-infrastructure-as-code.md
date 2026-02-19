---
title: "No Infrastructure as Code"
linkTitle: "No Infrastructure as Code"
weight: 39
category: "Pipeline & Infrastructure"
risk_level: high
description: >
  Servers are provisioned manually through UIs, making environment creation slow, error-prone, and unrepeatable.
tags:
  - environment-consistency
  - deployment-automation
---

{{% pageinfo %}}
**Category:** {{< param category >}} | {{% risk-indicator level="high" %}}
{{% /pageinfo %}}

## What This Looks Like

When a new environment is needed, someone files a ticket to a platform or operations team. The ticket describes the server size, the operating system, and the software that needs to be installed. The operations engineer logs into a cloud console or a physical rack, clicks through a series of forms, runs some installation commands, and emails back when the environment is ready. The turnaround is measured in days, sometimes weeks.

The configuration of that environment lives primarily in the memory of the engineer who built it and in a scattered collection of wiki pages, runbooks, and tickets. When something needs to change - an OS patch, a new configuration parameter, a firewall rule - another ticket is filed, another human makes the change manually, and the wiki page may or may not be updated to reflect the new state.

There is no single source of truth for what is actually on any given server. The production environment and the staging environment were built from the same wiki page six months ago, but each has accumulated independent manual changes since then. Nobody knows exactly what the differences are. When a deploy behaves differently in production than in staging, the investigation always starts with "let's see what's different between the two," and finding that answer requires logging into each server individually and comparing outputs line by line.

Common variations:

- **Click-ops provisioning.** Cloud resources are created exclusively through the AWS, Azure, or GCP console UIs with no corresponding infrastructure code committed to source control.
- **Pet servers.** Long-lived servers that have been manually patched, upgraded, and configured over months or years such that no two are truly identical, even if they were cloned from the same image.
- **Undocumented runbooks.** A runbook exists, but it is a prose description of what to do rather than executable code, meaning the result of following it varies by operator.
- **Configuration drift.** Infrastructure was originally scripted, but emergency changes applied directly to servers have caused the actual state to diverge from what the scripts would produce.

The telltale sign: the team cannot destroy an environment and recreate it from source control in a repeatable, automated way.

## Why This Is a Problem

Manual infrastructure provisioning turns every environment into a unique artifact. That uniqueness undermines every guarantee the rest of the delivery pipeline tries to make.

### It reduces quality

When environments diverge, production breaks for reasons invisible in staging - costing hours of investigation per incident. An environment that was assembled by hand is an environment with unknown contents. Two servers nominally running the same application may have different library versions, different kernel patches, different file system layouts, and different environment variables - all because different engineers followed the same runbook on different days under different conditions.

When tests pass in the environment where the application was developed and fail in the environment where it is deployed, the team spends engineering time hunting for configuration differences rather than fixing software. The investigation is slow because there is no authoritative description of either environment to compare against. Every finding is a manual discovery, and the fix is another manual change that widens the configuration gap.

Infrastructure as code eliminates that class of problem. When both environments are created from the same Terraform module or the same Ansible playbook, the only differences are the ones intentionally parameterized - region, size, external endpoints. Unexpected divergence becomes impossible because the creation process is deterministic.

### It increases rework

Manual provisioning is slow, so teams provision as few environments as possible and hold onto them as long as possible. A staging environment that takes two weeks to build gets treated as a shared, permanent resource. Because it is shared, its state reflects the last person who deployed to it, which may or may not match what you need to test today. Teams work around the contaminated state by scheduling "staging windows," coordinating across teams to avoid collisions, and sometimes wiping and rebuilding manually - which takes another two weeks.

This contention generates constant low-level rework: deployments that fail because staging is in an unexpected state, tests that produce false results because the environment has stale data from a previous team, and debugging sessions that turn out to be environment problems rather than application problems. Every one of those episodes is rework that would not exist if environments could be created and destroyed on demand.

Infrastructure as code makes environments disposable. A new environment can be spun up in minutes, used for a specific test run, and torn down immediately after. That disposability eliminates most of the contention that slow, manual provisioning creates.

### It makes delivery timelines unpredictable

When a new environment is a multi-week ticket process, environment availability becomes a blocking constraint on delivery. A team that needs a pre-production environment to validate a large release cannot proceed until the environment is ready. That dependency creates unpredictable lead time spikes that have nothing to do with the complexity of the software being delivered.

Emergency environments needed for incident response are even worse. When production breaks at 2 AM and the recovery plan involves spinning up a replacement environment, discovering that the process requires a ticket and a business-hours operations team introduces delays that extend outage duration directly. The inability to recreate infrastructure quickly turns recoverable incidents into extended outages.

With infrastructure as code, environment creation is a pipeline step with a known, stable duration. Teams can predict how long it will take, automate it as part of deployment, and invoke it during incident response without human gatekeeping.

### Impact on continuous delivery

CD requires that any commit be deployable to production at any time. Achieving that requires environments that can be created, configured, and validated automatically - not environments that require a two-week ticket and a skilled operator. Manual infrastructure provisioning makes it structurally impossible to deploy frequently because each deployment is rate-limited by the speed of human provisioning processes.

Infrastructure as code is a prerequisite for the production-like environments that give pipeline test results their meaning. Without it, the team cannot know whether a passing pipeline run reflects passing behavior in an environment that resembles production. CD confidence comes from automated, reproducible environments, not from careful human assembly.

## How to Fix It

### Step 1: Document what exists (Week 1)

Before writing any code, inventory the environments you have and what is in each one. For each environment, record the OS, the installed software and versions, the network configuration, and any environment-specific variables. This inventory is both the starting point for writing infrastructure code and a record of the configuration drift you need to close.

### Step 2: Choose a tooling approach and write code for one environment (Weeks 2-3)

Pick an infrastructure-as-code tool that fits your stack - Terraform for cloud resources, Ansible or Chef for configuration management, Pulumi if your team prefers a general-purpose language. Write the code to describe one non-production environment completely. Run it against a fresh account or namespace to verify it produces the correct result from a blank state. Commit the code to source control.

### Step 3: Extend to all environments using parameterization (Weeks 4-5)

Use the same codebase to describe all environments, with environment-specific values (region, instance size, external endpoints) as parameters or variable files. Environments should be instances of the same template, not separate scripts. Run the code against each environment and reconcile any differences you find - each difference is a configuration drift that needs to be either codified or corrected.

### Step 4: Commit infrastructure changes to source control with review (Week 6)

Establish a policy that all infrastructure changes go through a pull request process. No engineer makes manual changes to any environment without a corresponding code change merged first. For emergency changes made under incident pressure, require a follow-up PR within 24 hours that captures what was changed and why. This closes the feedback loop that allows drift to accumulate.

### Step 5: Automate environment creation in the pipeline (Weeks 7-8)

Wire the infrastructure code into your deployment pipeline so that environment creation and configuration are pipeline steps rather than manual preconditions. Ephemeral test environments should be created at pipeline start and destroyed at pipeline end. Production deployments should apply the infrastructure code as a step before deploying the application, ensuring the environment is always in the expected state.

### Step 6: Validate by destroying and recreating a non-production environment (Week 8)

Delete an environment entirely and recreate it from source control alone, with no manual steps. Confirm it behaves identically. Do this in a non-production environment before you need to do it under pressure in production.

| Objection | Response |
|-----------|----------|
| "We do not have time to learn a new tool." | The time investment in learning Terraform or Ansible is recovered within the first environment recreation that would otherwise require a two-week ticket. Most teams see payback within the first month. |
| "Our infrastructure is too unique to script." | This is almost never true. Every unique configuration is a parameter, not an obstacle. If it truly cannot be scripted, that is itself a problem worth solving. |
| "The operations team owns infrastructure, not us." | Infrastructure as code does not eliminate the operations team - it changes their work from manual provisioning to reviewing and merging code. Bring them into the process as authors and reviewers. |
| "We have pet servers with years of state on them." | Start with new environments and new services. You do not have to migrate everything at once. Expand coverage as services are updated or replaced. |

## Measuring Progress

| Metric | What to look for |
|--------|-----------------|
| [Lead time](../../../metrics/lead-time/) | Reduction in environment creation time from days or weeks to minutes |
| [Change fail rate](../../../metrics/change-fail-rate/) | Fewer production failures caused by environment configuration differences |
| [Mean time to repair](../../../metrics/mean-time-to-repair/) | Faster incident recovery when replacement environments can be created automatically |
| [Release frequency](../../../metrics/release-frequency/) | Increased deployment frequency as environment availability stops being a blocking constraint |
| [Development cycle time](../../../metrics/development-cycle-time/) | Reduction in time developers spend waiting for environment provisioning tickets to be fulfilled |

## Related Content

- [Everything as code](../../../migrate-to-cd/migration-path/foundations/everything-as-code/)
- [Production-like environments](../../../migrate-to-cd/migration-path/pipeline/production-like-environments/)
- [Pipeline architecture](../../../migrate-to-cd/migration-path/pipeline/pipeline-architecture/)
- [Identify constraints](../../../migrate-to-cd/migration-path/assess/identify-constraints/)
- [Value stream mapping](../../../migrate-to-cd/migration-path/assess/value-stream-mapping/)
