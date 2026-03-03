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

## What This Looks Like

The database password lives in `application.properties`, checked into the repository. The API key for the payment processor is in a `.env` file that gets copied manually to each server by whoever is doing the deploy. The SSH key for production access was generated two years ago, exists on three engineers' laptops and in a shared drive folder, and has never been rotated because nobody knows whether removing it from the shared drive would break something.

When a new developer joins the team, they receive credentials by Slack message. The message contains the production database password, the AWS access key, and the credentials for the shared CI service account. That Slack message now exists in Slack's history indefinitely, accessible to anyone who has ever been in that channel. When the developer leaves the team, nobody rotates those credentials because the rotation process is "change it everywhere it's used," and nobody has a complete list of everywhere it's used.

Secrets appear in CI logs. An engineer adds a debug line that prints environment variables to diagnose a pipeline failure, and the build log now contains the API key in plain text, visible to everyone with access to the CI system. The engineer removes the debug line and reruns the pipeline, but the previous log with the exposed secret is still retained and readable.

Common variations:

- **Secrets in source control.** Credentials are committed directly to the repository in configuration files, `.env` files, or test fixtures. Even if removed in a later commit, they remain in the git history.
- **Manually set environment variables.** Secrets are configured by logging into each server and running `export SECRET_KEY=value` commands, with no record of what was set or when.
- **Shared service account credentials.** Multiple people and systems share the same credentials, making it impossible to attribute access to a specific person or system or to revoke access for one without affecting all.
- **Hard-coded credentials in scripts.** Deployment scripts contain credentials as string literals, passed as command-line arguments, or embedded in URLs.
- **Unrotated long-lived credentials.** API keys and certificates are generated once and never rotated, accumulating exposure risk with every passing month and every person who has ever seen them.

The telltale sign: if a developer left the company today, the team could not confidently enumerate and rotate every credential that person had access to.

## Why This Is a Problem

Unmanaged secrets create security exposure that compounds over time.

### It reduces quality

A new environment fails silently because the manually-set secrets were never replicated there, and the team spends hours ruling out application bugs before discovering a missing credential. Ad hoc secret management means the configuration of the production environment is partially undocumented and partially unverifiable. When the production environment has credentials set by hand that do not appear in any configuration-as-code repository, those credentials are invisible to the rest of the delivery process. A pipeline that claims to deploy a fully specified application is actually deploying an application that depends on manually configured state that the pipeline cannot see, verify, or reproduce.

This hidden state causes quality problems that are difficult to diagnose. An application that works in production fails in a new environment because the manually-set secrets are not present. A credential that was rotated in one place but not another causes intermittent authentication failures that are blamed on the application before the real cause is found. The quality of the system cannot be fully verified when part of its configuration is managed outside any systematic process.

A centralized secrets vault with automated injection means that the secrets available to the application are specified in the pipeline configuration, reviewable, and consistent across environments. There is no hidden manually-configured state that the pipeline does not know about.

### It increases rework

Secret sprawl creates enormous rework when a credential is compromised or needs to be rotated. The rotation process begins with discovery: where is this credential used? Without a vault, the answer requires searching source code repositories, configuration management systems, CI configuration, server environment variables, and teammates' memories. The search is incomplete by nature - secrets shared via chat or email may have been forwarded or copied in ways that are invisible to the search.

Once all the locations are identified, each one must be updated manually, in coordination, because some applications will fail if the old and new values are mixed during the rotation window. Coordinating a rotation across a dozen systems managed by different teams is a significant engineering project - one that must be completed under the pressure of an active security incident if the rotation is prompted by a breach.

With a centralized vault and automatic secret injection, rotation is a vault operation. Update the secret in one place, and every application that retrieves it at startup or at first use will receive the new value on their next restart or next request. The rework of finding and updating every usage disappears.

### It makes delivery timelines unpredictable

Manual secret management creates unpredictable friction in the delivery process. A deployment to a new environment fails because the credentials were not set up in advance. A pipeline fails because a service account password was rotated without updating the CI configuration. An on-call incident is extended because the engineer on call does not have access to the production secrets they need for the recovery procedure.

These failures have nothing to do with the quality of the code being deployed. They are purely process failures caused by treating secrets as a manual, out-of-band concern. Each one requires investigation, coordination, and manual remediation before delivery can proceed.

When secrets are managed centrally and injected automatically, credential availability is a property of the pipeline configuration, not a precondition that must be manually verified before each deploy.

### Impact on continuous delivery

CD requires that deployment be a reliable, automated, repeatable process. Any step that requires a human to manually configure credentials before a deploy is a step that cannot be automated, which means it cannot be part of a CD pipeline. A deploy that requires someone to log into each server and set environment variables by hand is, by definition, not a continuous delivery process - it is a manual deployment process with some automation around it.

Automated secret injection is a prerequisite for fully automated deployment. The pipeline must be able to retrieve and inject the credentials it needs without human intervention. That requires a vault with machine-readable APIs, service account credentials for the pipeline itself (managed in the vault, not ad hoc), and application code that reads secrets from the injected environment rather than from hardcoded values.

## How to Fix It

### Step 1: Audit the current secret inventory

Enumerate every credential used by every application and every pipeline. For each credential, record what it is, where it is currently stored, who has access to it, when it was last rotated, and what systems would break if it were revoked. This inventory is almost certainly incomplete on the first pass - plan to extend it as you discover additional credentials during subsequent steps.

### Step 2: Remove secrets from source control immediately

Scan all repositories for committed secrets using a tool such as `git-secrets`, `truffleHog`, or `detect-secrets`. For every credential found in git history, rotate it immediately - assume it is compromised. Removing the value from the repository does not protect it because git history is readable; only rotation makes the exposed credential useless. Add pre-commit hooks and CI checks to prevent new secrets from being committed.

### Step 3: Deploy a secrets vault (Weeks 2-3)

Choose and deploy a centralized secrets management system appropriate for your infrastructure. HashiCorp Vault is a common choice for self-managed infrastructure. AWS Secrets Manager, Azure Key Vault, and Google Cloud Secret Manager are appropriate for teams already on those cloud platforms. Kubernetes Secret objects with encryption at rest plus external secrets operators are appropriate for Kubernetes-based deployments. The vault must support machine-readable API access so that pipelines and applications can retrieve secrets without human involvement.

### Step 4: Migrate secrets to the vault and update applications to retrieve them (Weeks 3-6)

Move secrets from their current locations into the vault. Update applications to retrieve secrets from the vault at startup - either by using the vault's SDK, by using a sidecar agent that writes secrets to a memory-only file, or by using an operator that injects secrets as environment variables at container startup from vault references. Remove secrets from configuration files, environment variable setup scripts, and CI UI configurations. Replace them with vault references that the pipeline resolves at deploy time.

### Step 5: Establish rotation policies and automate rotation (Weeks 6-8)

Define a rotation schedule for each credential type: database passwords every 90 days, API keys every 30 days, certificates before expiry. Configure automated rotation where the vault or a scheduled pipeline job can rotate the credential and update all dependent systems. For credentials that cannot be automatically rotated, create a calendar-based reminder process and document the rotation procedure in the repository.

### Step 6: Implement access controls and audit logging

Configure the vault so that each application and each pipeline role can access only the secrets it needs, nothing more. Enable audit logging on all secret access so that every read and write is attributable to a specific identity. Review access logs regularly to identify unused credentials (which should be revoked) and unexpected access patterns (which should be investigated).

| Objection | Response |
|-----------|----------|
| "Setting up a vault is a large infrastructure project." | The managed vault services offered by cloud providers (AWS Secrets Manager, Azure Key Vault) can be set up in hours, not weeks. Start with a managed service rather than self-hosting Vault to reduce the operational overhead. |
| "Our applications are not written to retrieve secrets from a vault." | Most vault integrations do not require application code changes. Environment variable injection patterns (via a sidecar, an init container, or a deployment hook) can make secrets available to the application as environment variables without the application knowing where they came from. |
| "We do not know which secrets are in the git history." | Scanning tools like `truffleHog` or `gitleaks` can scan the full git history across all branches. Run the scan, compile the list, rotate everything found, and set up pre-commit prevention to stop recurrence. |
| "Rotating credentials will break things." | This is accurate in ad hoc secret management environments where secrets are scattered across many systems. The solution is not to avoid rotation but to fix the scatter by centralizing secrets in a vault, after which rotation becomes a single-system operation. |

## Measuring Progress

| Metric | What to look for |
|--------|-----------------|
| [Change fail rate](../../../metrics/change-fail-rate/) | Reduction in deployment failures caused by credential misconfiguration or missing secrets |
| [Mean time to repair](../../../metrics/mean-time-to-repair/) | Faster credential-related incident recovery when rotation is a vault operation rather than a multi-system manual process |
| [Lead time](../../../metrics/lead-time/) | Elimination of manual credential setup steps from the deployment process |
| [Release frequency](../../../metrics/release-frequency/) | Teams deploy more often when credential management is not a manual bottleneck on each deploy |
| [Development cycle time](../../../metrics/development-cycle-time/) | Reduction in time new environments take to become operational when credential injection is automated |

## Related Content

- [Everything as code](../../../migrate-to-cd/migration-path/foundations/everything-as-code/)
- [Application configuration management](../../../migrate-to-cd/migration-path/pipeline/application-config/)
- [No infrastructure as code](../no-infrastructure-as-code/)
- [Pipeline definitions not in version control](../pipeline-not-versioned/)
- [Single path to production](../../../migrate-to-cd/migration-path/pipeline/single-path-to-production/)
