---
title: "Ad Hoc Secret Management"
linkTitle: "Ad hoc secret management"
weight: 47
category: "Pipeline & Infrastructure"
risk_level: high
description: >
  Credentials live in config files, environment variables set manually, or shared in chat - with no vault, rotation, or audit trail.
tags:
  - deployment-automation
  - process-gates
---

{{% pageinfo %}}
**Category:** {{< param category >}} | {{% risk-indicator level="high" %}}
{{% /pageinfo %}}

## What this looks like

The database password lives in `application.properties`, checked into the repository. The API key for the payment processor is in a `.env` file that gets copied manually to each server by whoever is doing the deploy. Someone generated the SSH key for production access two years ago. The key exists on three engineers' laptops and in a shared drive folder. Nobody has rotated it, because nobody knows whether removing it from the shared drive would break something.

When a new developer joins the team, they receive credentials by Slack message. The message contains the production database password, the AWS access key, and the credentials for the shared CI service account. That Slack message now exists in Slack's history indefinitely, accessible to anyone who has ever been in that channel. When the developer leaves the team, nobody rotates those credentials. The rotation process is "change it everywhere it's used," and nobody has a complete list of everywhere it's used.

Secrets appear in CI logs. To diagnose a pipeline failure, an engineer adds a debug line that prints environment variables. The build log now contains the API key in plain text, visible to everyone with access to the CI system. The engineer removes the debug line and reruns the pipeline, but the previous log with the exposed secret is still retained and readable.

Common variations:

- **Secrets in source control.** Credentials are committed directly to the repository in configuration files, `.env` files, or test fixtures. Even if removed in a later commit, they remain in the git history.
- **Manually set environment variables.** Someone configures secrets by logging into each server and running `export SECRET_KEY=value` commands. Nobody records what was set or when.
- **Shared service account credentials.** Multiple people and systems share the same credentials. You cannot attribute access to a specific person or system, or revoke access for one without affecting all.
- **Hard-coded credentials in scripts.** Deployment scripts contain credentials as string literals, passed as command-line arguments, or embedded in URLs.
- **Unrotated long-lived credentials.** Teams generate API keys and certificates once and never rotate them. Exposure risk grows with every passing month and every person who has ever seen them.

The telltale sign: if a developer left the company today, the team could not confidently enumerate and rotate every credential that person had access to.

## Why this is a problem

Unmanaged secrets create security exposure that compounds over time.

### It reduces quality

A new environment fails silently because nobody replicated the manually-set secrets there. The team spends hours ruling out application bugs before discovering a missing credential. Ad hoc secret management leaves the configuration of the production environment partially undocumented and partially unverifiable. Credentials set by hand in production, and absent from any configuration-as-code repository, are invisible to the rest of the delivery process.

The pipeline claims to deploy a fully specified application. In fact, the application depends on manually configured state that the pipeline cannot see, verify, or reproduce.

This hidden state causes quality problems that are difficult to diagnose. An application that works in production fails in a new environment because the manually-set secrets are not present. A credential rotated in one place but not another causes intermittent authentication failures. The team blames the application before finding the real cause. You cannot fully verify the quality of the system when part of its configuration lives outside any systematic process.

With a centralized secrets vault and automated injection, the pipeline configuration specifies which secrets the application gets. That specification is reviewable and consistent across environments. There is no hidden manually-configured state that the pipeline does not know about.

### It increases rework

Secret sprawl creates enormous rework when a credential is compromised or needs to be rotated. The rotation process begins with discovery: where is this credential used? Without a vault, the answer requires searching source code repositories, configuration management systems, CI configuration, server environment variables, and teammates' memories. The search is incomplete by nature. Someone might have forwarded or copied a secret shared via chat or email in ways the search cannot find.

Once you identify all the locations, you must update each one manually and in coordination. Some applications fail if the old and new values are mixed during the rotation window. Coordinating a rotation across a dozen systems managed by different teams is a significant engineering project. If a breach prompts the rotation, the team must finish that project under the pressure of an active security incident.

With a centralized vault and automatic secret injection, rotation is a vault operation. You update the secret in one place. Every application that retrieves the secret at startup or first use receives the new value on its next restart or request. The rework of finding and updating every usage disappears.

### It makes delivery timelines unpredictable

Manual secret management creates unpredictable friction in the delivery process. A deployment to a new environment fails because the credentials were not set up in advance. A pipeline fails because a service account password was rotated without updating the CI configuration. An on-call incident is extended because the engineer on call does not have access to the production secrets they need for the recovery procedure.

These failures have nothing to do with the quality of the code being deployed. They are purely process failures caused by treating secrets as a manual, out-of-band concern. Each one requires investigation, coordination, and manual remediation before delivery can proceed.

When you manage secrets centrally and inject them automatically, credential availability is a property of the pipeline configuration. Nobody has to verify credentials manually before each deploy.

### Impact on continuous delivery

CD requires that deployment be a reliable, automated, repeatable process. A step that requires a human to configure credentials before a deploy cannot be automated, so it cannot be part of a CD pipeline. Suppose a deploy requires someone to log into each server and set environment variables by hand. That deploy is not a continuous delivery process. It is a manual deployment process with some automation around it.

Automated secret injection is a prerequisite for fully automated deployment. The pipeline must be able to retrieve and inject the credentials it needs without human intervention. Injection requires a vault with machine-readable APIs and service account credentials for the pipeline itself, managed in the vault, not ad hoc. It also requires application code that reads secrets from the injected environment rather than from hardcoded values.

## How to fix it

### Step 1: Audit the current secret inventory

Enumerate every credential used by every application and every pipeline. For each credential, record what it is, where it is stored, and who has access to it. Record when it was last rotated and what systems would break if it were revoked. This inventory is almost certainly incomplete on the first pass. Plan to extend it as you discover more credentials in later steps.

### Step 2: Remove secrets from source control immediately

Scan all repositories for committed secrets using a tool such as `git-secrets`, `truffleHog`, or `detect-secrets`. For every credential found in git history, rotate it immediately - assume it is compromised. Removing the value from the repository does not protect it because git history is readable; only rotation makes the exposed credential useless. Add pre-commit hooks and CI checks to prevent new secrets from being committed.

### Step 3: Deploy a secrets vault

Choose and deploy a centralized secrets management system appropriate for your infrastructure. HashiCorp Vault is a common choice for self-managed infrastructure. AWS Secrets Manager, Azure Key Vault, and Google Cloud Secret Manager are appropriate for teams already on those cloud platforms. Kubernetes Secret objects with encryption at rest plus external secrets operators are appropriate for Kubernetes-based deployments. The vault must support machine-readable API access so that pipelines and applications can retrieve secrets without human involvement.

### Step 4: Migrate secrets to the vault and update applications to retrieve them

Move secrets from their current locations into the vault. Update applications to retrieve secrets from the vault at startup. Use one of these approaches:

- The vault's SDK.
- A sidecar agent that writes secrets to a memory-only file.
- An operator that injects secrets from vault references as environment variables at container startup.

Remove secrets from configuration files, environment variable setup scripts, and CI UI configurations. Replace them with vault references that the pipeline resolves at deploy time.

### Step 5: Establish rotation policies and automate rotation

Define a rotation schedule for each credential type: database passwords every 90 days, API keys every 30 days, certificates before expiry. Configure automated rotation where the vault or a scheduled pipeline job can rotate the credential and update all dependent systems. For credentials that cannot be automatically rotated, create a calendar-based reminder process and document the rotation procedure in the repository.

### Step 6: Implement access controls and audit logging

Configure the vault so that each application and each pipeline role can access only the secrets it needs, nothing more. Enable audit logging on all secret access so that every read and write is attributable to a specific identity. Review access logs regularly to identify unused credentials (which should be revoked) and unexpected access patterns (which should be investigated).

| Objection | Response |
|-----------|----------|
| "Setting up a vault is a large infrastructure project." | The managed vault services offered by cloud providers (AWS Secrets Manager, Azure Key Vault) can be set up in hours, not weeks. Start with a managed service rather than self-hosting Vault to reduce the operational overhead. |
| "Our applications are not written to retrieve secrets from a vault." | Most vault integrations do not require application code changes. A sidecar, an init container, or a deployment hook can inject secrets as environment variables. The application does not need to know where the secrets came from. |
| "We do not know which secrets are in the git history." | Scanning tools like `truffleHog` or `gitleaks` can scan the full git history across all branches. Run the scan, compile the list, rotate everything found, and set up pre-commit prevention to stop recurrence. |
| "Rotating credentials will break things." | This is accurate in ad hoc secret management environments where secrets are scattered across many systems. The solution is not to avoid rotation but to fix the scatter by centralizing secrets in a vault, after which rotation becomes a single-system operation. |

## Measuring progress

| Metric | What to look for |
|--------|-----------------|
| [Change fail rate]({{< relref "/docs/reference/metrics/change-fail-rate" >}}) | Reduction in deployment failures caused by credential misconfiguration or missing secrets |
| [Mean time to repair]({{< relref "/docs/reference/metrics/mean-time-to-repair" >}}) | Faster credential-related incident recovery when rotation is a vault operation rather than a multi-system manual process |
| [Lead time]({{< relref "/docs/reference/metrics/lead-time" >}}) | Elimination of manual credential setup steps from the deployment process |
| [Release frequency]({{< relref "/docs/reference/metrics/release-frequency" >}}) | Teams deploy more often when credential management is not a manual bottleneck on each deploy |
| [Development cycle time]({{< relref "/docs/reference/metrics/development-cycle-time" >}}) | Reduction in time new environments take to become operational when credential injection is automated |

## Related content

- [Everything as code]({{< relref "/docs/foundations/everything-as-code" >}})
- [Application configuration management]({{< relref "/docs/pipeline/application-config" >}})
- [No infrastructure as code]({{< relref "/docs/anti-patterns/pipeline/no-infrastructure-as-code" >}})
- [Pipeline definitions not in version control]({{< relref "/docs/anti-patterns/pipeline/pipeline-not-versioned" >}})
- [Single path to production]({{< relref "/docs/pipeline/single-path-to-production" >}})
