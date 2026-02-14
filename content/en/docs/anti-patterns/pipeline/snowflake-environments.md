---
title: "Snowflake Environments"
linkTitle: "Snowflake Environments"
weight: 38
category: "Pipeline & Infrastructure"
risk_level: high
description: >
  Each environment is hand-configured and unique. Nobody knows exactly what is running where.
  Configuration drift is constant.
tags:
  - environment-consistency
  - deployment-automation
---

{{% pageinfo %}}
**Category:** {{< param category >}} | {{% risk-indicator level="high" %}}
{{% /pageinfo %}}

## What This Looks Like

Staging has a different version of the database than production. The dev environment has a library
installed that nobody remembers adding. Production has a configuration file that was edited by hand
six months ago during an incident and never committed to source control. Nobody is sure all three
environments are running the same OS patch level.

A developer asks "why does this work in staging but not in production?" The answer takes hours to
find because it requires comparing configurations across environments by hand - diffing config
files, checking installed packages, verifying environment variables one by one.

Common variations:

- **The hand-built server.** Someone provisioned the production server two years ago. They followed
  a wiki page that has since been edited, moved, or deleted. Nobody has provisioned a new one
  since. If the server dies, nobody is confident they can recreate it.
- **The magic SSH session.** During an incident, someone SSH-ed into production and changed a
  config value. It fixed the problem. Nobody updated the deployment scripts, the infrastructure
  code, or the documentation. The next deployment overwrites the fix - or doesn't, depending on
  which files the deployment touches.
- **The shared dev environment.** A single development or staging environment is shared by the
  whole team. One developer installs a library, another changes a config value, a third adds a
  cron job. The environment drifts from any known baseline within weeks.
- **The "production is special" mindset.** Dev and staging environments are provisioned with
  scripts, but production was set up differently because of "security requirements" or "scale
  differences." The result is that the environments the team tests against are structurally
  different from the one that serves users.
- **The environment with a name.** Environments have names like "staging-v2" or "qa-new" because
  someone created a new one alongside the old one. Both still exist. Nobody is sure which one the
  pipeline deploys to.

The telltale sign: deploying the same artifact to two environments produces different results,
and the team's first instinct is to check environment configuration rather than application code.

## Why This Is a Problem

Snowflake environments undermine the fundamental premise of testing: that the behavior you observe
in one environment predicts the behavior you will see in another. When every environment is
unique, testing in staging tells you what works in staging - nothing more.

### It reduces quality

When environments differ, bugs hide in the gaps. An application that works in staging may fail in
production because of a different library version, a missing environment variable, or a filesystem
permission that was set by hand. These bugs are invisible to testing because the test environment
does not reproduce the conditions that trigger them.

The team learns this the hard way, one production incident at a time. Each incident teaches the
team that "passed in staging" does not mean "will work in production." This erodes trust in the
entire testing and deployment process. Developers start adding manual verification steps -
checking production configs by hand before deploying, running smoke tests manually after
deployment, asking the ops team to "keep an eye on things."

When environments are identical and provisioned from the same code, the gap between staging and
production disappears. What works in staging works in production because the environments are the
same. Testing produces reliable results.

### It increases rework

Snowflake environments cause two categories of rework. First, developers spend hours debugging
environment-specific issues that have nothing to do with application code. "Why does this work on
my machine but not in CI?" leads to comparing configurations, googling error messages related to
version mismatches, and patching environments by hand. This time is pure waste.

Second, production incidents caused by environment drift require investigation, rollback, and
fixes to both the application and the environment. A configuration difference that causes a
production failure might take five minutes to fix once identified, but identifying it takes hours
because nobody knows what the correct configuration should be.

Teams with reproducible environments spend zero time on environment debugging. If an environment
is wrong, they destroy it and recreate it from code. The investigation time drops from hours to
minutes.

### It makes delivery timelines unpredictable

Deploying to a snowflake environment is unpredictable because the environment itself is an
unknown variable. The same deployment might succeed on Monday and fail on Friday because someone
changed something in the environment between the two deploys. The team cannot predict how long a
deployment will take because they cannot predict what environment issues they will encounter.

This unpredictability compounds across environments. A change must pass through dev, staging, and
production, and each environment is a unique snowflake with its own potential for surprise. A
deployment that should take minutes takes hours because each environment reveals a new
configuration issue.

Reproducible environments make deployment time a constant. The same artifact deployed to the same
environment specification produces the same result every time. Deployment becomes a predictable
step in the pipeline rather than an adventure.

### It makes environments a scarce resource

When environments are hand-configured, creating a new one is expensive. It takes hours or days of
manual work. The team has a small number of shared environments and must coordinate access. "Can
I use staging today?" becomes a daily question. Teams queue up for access to the one environment
that resembles production.

This scarcity blocks parallel work. Two developers who both need to test a database migration
cannot do so simultaneously if there is only one staging environment. One waits while the other
finishes. Features that could be validated in parallel are serialized through a shared
environment bottleneck.

When environments are defined as code, spinning up a new one is a pipeline step that takes
minutes. Each developer or feature branch can have its own environment. There is no contention
because environments are disposable and cheap.

### Impact on continuous delivery

Continuous delivery requires that any change can move from commit to production through a fully
automated pipeline. Snowflake environments break this in multiple ways. The pipeline cannot
provision environments automatically if environments are hand-configured. Testing results are
unreliable because environments differ. Deployments fail unpredictably because of configuration
drift.

A team with snowflake environments cannot trust their pipeline. They cannot deploy frequently
because each deployment risks hitting an environment-specific issue. They cannot automate
fully because the environments require manual intervention. The path from commit to production
is neither continuous nor reliable.

## How to Fix It

### Step 1: Document what exists today (Week 1)

Before automating anything, capture the current state of each environment:

1. For each environment (dev, staging, production), record: OS version, installed packages,
   configuration files, environment variables, external service connections, and any manual
   customizations.
2. Diff the environments against each other. Note every difference.
3. Classify each difference as intentional (e.g., production uses a larger instance size) or
   accidental (e.g., staging has an old library version nobody updated).

This audit surfaces the drift. Most teams are surprised by how many accidental differences exist.

### Step 2: Define one environment specification (Weeks 2-3)

Choose an infrastructure-as-code tool (Terraform, Pulumi, CloudFormation, Ansible, or similar)
and write a specification for one environment. Start with the environment you understand best -
usually staging.

The specification should define:

- Base infrastructure (servers, containers, networking)
- Installed packages and their versions
- Configuration files and their contents
- Environment variables with placeholder values
- Any scripts that run at provisioning time

Verify the specification by destroying the staging environment and recreating it from code. If
the recreated environment works, the specification is correct. If it does not, fix the
specification until it does.

### Step 3: Parameterize for environment differences (Week 3)

Intentional differences between environments (instance sizes, database connection strings, API
keys) become parameters, not separate specifications. One specification with environment-specific
variables:

| Parameter | Dev | Staging | Production |
|-----------|-----|---------|------------|
| Instance size | small | medium | large |
| Database host | dev-db.internal | staging-db.internal | prod-db.internal |
| Log level | debug | info | warn |
| Replica count | 1 | 2 | 3 |

The structure is identical. Only the values change. This eliminates accidental drift because every
environment is built from the same template.

### Step 4: Provision environments through the pipeline (Week 4)

Add environment provisioning to the deployment pipeline:

1. Before deploying to an environment, the pipeline provisions (or updates) it from the
   infrastructure code.
2. The application artifact is deployed to the freshly provisioned environment.
3. If provisioning or deployment fails, the pipeline fails - no manual intervention.

This closes the loop. Environments cannot drift because they are recreated or reconciled on
every deployment. Manual SSH sessions and hand edits have no lasting effect because the next
pipeline run overwrites them.

### Step 5: Make environments disposable (Week 5+)

The ultimate goal is that any environment can be destroyed and recreated in minutes with no data
loss and no human intervention:

1. Practice destroying and recreating staging weekly. This verifies the specification stays
   accurate and builds team confidence.
2. Provision ephemeral environments for feature branches or pull requests. Let the pipeline
   create and destroy them automatically.
3. If recreating production is not feasible yet (stateful systems, licensing), ensure you can
   provision a production-identical environment for testing at any time.

| Objection | Response |
|-----------|----------|
| "Production has unique requirements we can't codify" | If a requirement exists only in production and is not captured in code, it is at risk of being lost. Codify it. If it is truly unique, it belongs in a parameter, not a hand-edit. |
| "We don't have time to learn infrastructure-as-code" | You are already spending that time debugging environment drift. The investment pays for itself within weeks. Start with the simplest tool that works for your platform. |
| "Our environments are managed by another team" | Work with them. Provide the specification. If they provision from your code, you both benefit: they have a reproducible process and you have predictable environments. |
| "Containers solve this problem" | Containers solve application-level consistency. You still need infrastructure-as-code for the platform the containers run on - networking, storage, secrets, load balancers. Containers are part of the solution, not the whole solution. |

## Measuring Progress

| Metric | What to look for |
|--------|-----------------|
| Environment provisioning time | Should decrease from hours/days to minutes |
| Configuration differences between environments | Should reach zero accidental differences |
| "Works in staging but not production" incidents | Should drop to near zero |
| [Change fail rate](../../../reference/metrics/change-fail-rate/) | Should decrease as environment parity improves |
| [Mean time to repair](../../../reference/metrics/mean-time-to-repair/) | Should decrease as environments become reproducible |
| Time spent debugging environment issues | Track informally - should approach zero |

## Related Content

- [Everything as Code](../../../foundations/everything-as-code/) - Infrastructure, configuration, and environments defined in source control
- [Production-Like Environments](../../../pipeline/production-like-environments/) - Ensuring test environments match production
- [Pipeline Architecture](../../../pipeline/pipeline-architecture/) - How environments fit into the deployment pipeline
- [Missing Deployment Pipeline](../missing-deployment-pipeline/) - Snowflake environments often coexist with manual deployment processes
- [Deterministic Pipeline](../../../pipeline/deterministic-pipeline/) - A pipeline that gives the same answer every time requires identical environments
