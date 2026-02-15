---
title: "Deployable Definition"
linkTitle: "Deployable Definition"
weight: 3
description: >
  Clear, automated criteria that determine when a change is ready for production.
---

{{% pageinfo %}}
**Phase 2 - Pipeline** | Adapted from [MinimumCD.org](https://minimumcd.org)
{{% /pageinfo %}}

## Definition

A deployable definition is the set of automated quality criteria that every artifact must
satisfy before it is considered ready for production. It is the pipeline's answer to the
question: "How do we know this is safe to deploy?"

This is not a checklist that a human reviews. It is a set of automated gates - executable
validations built into the pipeline - that every change must pass. If the pipeline is
green, the artifact is deployable. If the pipeline is red, it is not. There is no
ambiguity, no judgment call, and no "looks good enough."

## Why It Matters for CD Migration

Without a clear, automated deployable definition, teams rely on human judgment to decide
when something is ready to ship. This creates bottlenecks (waiting for approval), variance
(different people apply different standards), and fear (nobody is confident the change is
safe). All three are enemies of continuous delivery.

During a CD migration, the deployable definition replaces manual approval processes with
automated confidence. It is what allows a team to say "any green build can go to
production" - which is the prerequisite for continuous deployment.

## Key Principles

### The definition must be automated

Every criterion in the deployable definition is enforced by an automated check in the
pipeline. If a requirement cannot be automated, either find a way to automate it or
question whether it belongs in the deployment path.

### The definition must be comprehensive

The deployable definition should cover all dimensions of quality that matter for
production readiness:

#### Security

- **Static Application Security Testing (SAST)** - scan source code for known vulnerability patterns
- **Dependency vulnerability scanning** - check all dependencies against known vulnerability databases (CVE lists)
- **Secret detection** - verify that no credentials, API keys, or tokens are present in the codebase
- **Container image scanning** - if deploying containers, scan images for known vulnerabilities
- **License compliance** - verify that dependency licenses are compatible with your distribution requirements

#### Functionality

- **Unit tests** - fast, isolated tests that verify individual components behave correctly
- **Integration tests** - tests that verify components work together correctly
- **End-to-end tests** - tests that verify the system works from the user's perspective
- **Regression tests** - tests that verify previously fixed defects have not reappeared
- **Contract tests** - tests that verify APIs conform to their published contracts

#### Compliance

- **Audit trail** - the pipeline itself produces the compliance artifact: who changed what, when, and what validations it passed
- **Policy as code** - organizational policies (e.g., "no deployments on Friday") encoded as pipeline logic
- **Change documentation** - automatically generated from commit metadata and pipeline results

#### Performance

- **Performance benchmarks** - verify that key operations complete within acceptable thresholds
- **Load test baselines** - verify that the system handles expected load without degradation
- **Resource utilization checks** - verify that the change does not introduce memory leaks or excessive CPU usage

#### Reliability

- **Health check validation** - verify that the application starts up correctly and responds to health checks
- **Graceful degradation tests** - verify that the system behaves acceptably when dependencies fail
- **Rollback verification** - verify that the deployment can be rolled back (see [Rollback](../rollback/))

#### Code Quality

- **Linting and static analysis** - enforce code style and detect common errors
- **Code coverage thresholds** - not as a target, but as a safety net to detect large untested areas
- **Complexity metrics** - flag code that exceeds complexity thresholds for review

### The definition must be fast

A deployable definition that takes hours to evaluate will not support continuous delivery.
The entire pipeline - including all deployable definition checks - should complete in
minutes, not hours. This often requires running checks in parallel, investing in test
infrastructure, and making hard choices about which slow checks provide enough value to
keep.

### The definition must be maintained

The deployable definition is a living document. As the system evolves, new failure modes
emerge, and the definition should be updated to catch them. When a production incident
occurs, the team should ask: "What automated check could have caught this?" and add it to
the definition.

## Anti-Patterns

### Manual approval gates

Requiring a human to review and approve a deployment after the pipeline has passed all
automated checks is an anti-pattern. It adds latency, creates bottlenecks, and implies
that the automated checks are not sufficient. If a human must approve, it means your
automated definition is incomplete - fix the definition rather than adding a manual gate.

### "Good enough" tolerance

Allowing deployments when some checks fail because "that test always fails" or "it is
only a warning" degrades the deployable definition to meaninglessness. Either the check
matters and must pass, or it does not matter and should be removed.

### Post-deployment validation only

Running validation only after deployment to production (production smoke tests, manual
QA in production) means you are using production users to find problems. Pre-deployment
validation must be comprehensive enough that post-deployment checks are a safety net, not
the primary quality gate.

### Inconsistent definitions across teams

When different teams have different deployable definitions, organizational confidence
in deployment varies. While the specific checks may differ by service, the categories of
validation (security, functionality, performance, compliance) should be consistent.

## Good Patterns

### Pipeline gates as policy

Encode the deployable definition as pipeline stages that block progression. A change
cannot move from build to test, or from test to deployment, unless the preceding stage
passes completely. The pipeline enforces the definition; no human override is possible.

### Shift-left validation

Run the fastest, most frequently failing checks first. Unit tests and linting run before
integration tests. Integration tests run before end-to-end tests. Security scans run in
parallel with test stages. This gives developers the fastest possible feedback.

### Continuous definition improvement

After every production incident, add or improve a check in the deployable definition that
would have caught the issue. Over time, the definition becomes a comprehensive record of
everything the team has learned about quality.

### Visible, shared definitions

Make the deployable definition visible to all team members. Display the current pipeline
status on dashboards. When a check fails, provide clear, actionable feedback about what
failed and why. The definition should be understood by everyone, not hidden in pipeline
configuration.

## How to Get Started

### Step 1: Document your current "definition of done"

Write down every check that currently happens before a deployment - automated or manual.
Include formal checks (tests, scans) and informal ones (someone eyeballs the logs,
someone clicks through the UI).

### Step 2: Classify each check

For each check, determine: Is it automated? Is it fast? Is it reliable? Is it actually
catching real problems? This reveals which checks are already pipeline-ready and which
need work.

### Step 3: Automate the manual checks

For every manual check, determine how to automate it. A human clicking through the UI
becomes an end-to-end test. A human reviewing logs becomes an automated log analysis step.
A manager approving a deployment becomes a set of automated policy checks.

### Step 4: Build the pipeline gates

Organize your automated checks into pipeline stages. Fast checks first, slower checks
later. All checks must pass for the artifact to be considered deployable.

### Step 5: Remove manual approvals

Once the automated definition is comprehensive enough that a green build genuinely means
"safe to deploy," remove manual approval gates. This is often the most culturally
challenging step.

## Connection to the Pipeline Phase

The deployable definition is the contract between the pipeline and the organization. It is
what makes the [single path to production](../single-path-to-production/) trustworthy -
because every change that passes through the path has been validated against a clear,
comprehensive standard.

Combined with a [deterministic pipeline](../deterministic-pipeline/), the deployable
definition ensures that green means green and red means red. Combined with
[immutable artifacts](../immutable-artifacts/), it ensures that the artifact you validated
is the artifact you deploy. It is the bridge between automated process and organizational
confidence.

---

> This content is adapted from [MinimumCD.org](https://minimumcd.org),
> licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

## Related Content

- [Hardening Sprints](../../../symptoms/deployment/hardening-sprints/) - a symptom indicating the deployable definition is incomplete, forcing manual quality efforts before release
- [Infrequent Releases](../../../symptoms/deployment/infrequent-releases/) - often caused by unclear or manual criteria for what is ready to ship
- [Manual Deployments](../../../anti-patterns/pipeline/manual-deployments/) - an anti-pattern that automated quality gates in the deployable definition replace
- [Deterministic Pipeline](../deterministic-pipeline/) - the Pipeline practice that ensures deployable definition checks produce reliable results
- [Change Fail Rate](../../../reference/metrics/change-fail-rate/) - a key metric that improves as the deployable definition becomes more comprehensive
- [Testing Fundamentals](../../foundations/testing-fundamentals/) - the Foundations practice that provides the test suite enforced by the deployable definition
