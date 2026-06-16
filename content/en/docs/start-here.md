---
title: "Start Here"
linkTitle: "Start Here"
weight: 2
description: >
  You need the right framework that drives the right mindset to use CD and agents correctly
---

{{% pageinfo %}}
Two questions turn CD and agentic continuous delivery (ACD) into a diagnostic tool: "Why can't we deliver today's work
to production today?" and "How do I make sure I can still sleep at night?"
{{% /pageinfo %}}

## Why Continuous Delivery

Continuous delivery is not just deploying frequently. It is not even just a workflow that keeps
your system always deployable so you can deliver the latest change on demand. CD becomes a
diagnostic tool when a team takes it seriously and holds two offsetting questions as constraints:

1. **Why can't we deliver today's work to production today?**
2. **How do I make sure I can still sleep at night?**

Focusing only on the first question produces garbage. Focusing only on the second produces
bureaucratic paralysis. Holding both at once forces you to confront the real obstacles.

What CD typically reveals:

- **Architecture** - Tightly coupled systems that lack clear domain boundaries and cannot be
  deployed independently.
- **Testing** - Test suites that nobody trusts, so every change requires manual verification
  before release.
- **Process** - Tribal knowledge embedded in deployment runbooks, snowflake server
  configurations, and approval gates that exist for compliance theater rather than actual risk
  reduction.
- **Organization** - Silos that force handoffs, creating queues and wait states that dominate
  your lead time.

The payoff comes when you fix what the diagnostic reveals. Teams that address these root causes
consistently see shorter lead times, lower change failure rates, faster recovery, and higher
deployment frequency - the four key metrics that predict both delivery performance and
organizational performance.

## Why ACD Amplifies the Effect

Apply the same two questions to AI agents generating and delivering changes through your
pipeline, and every structural weakness surfaces faster - in days rather than months.

Agents are literal executors. They cannot rely on tribal knowledge or work around vague
requirements the way experienced developers do. When a specification gap exists, an agent
exposes it immediately. When a test suite is unreliable, agents produce failures at a rate that
makes the problem impossible to ignore. When architecture is coupled, agent-generated changes
cascade breakage across boundaries that humans had learned to navigate carefully.

This is not a flaw in the agents. It is the diagnostic working as intended.

For the full picture on ACD constraints and practices, see the
[ACD]({{< relref "/docs/agentic-cd" >}}) section.

## Fix the System, Not the Symptoms

The value of CD and ACD comes from fixing what the diagnostic reveals, not from the
tool itself. Adding continuous delivery to a broken system does not make the system better. It
makes the dysfunction visible. Adding AI agents to a broken system does not make the system
faster. It makes the dysfunction louder.

The teams that benefit most are the ones that treat pipeline failures, test brittleness, and
deployment friction as signals - not noise. They invest in architectural discipline, automated
quality gates they actually trust, and organizational structures that minimize handoffs.

For the full argument, see
[ACD Is a Diagnostic Tool](https://bryanfinster.substack.com/p/acd-is-a-diagnostic-tool).

## Where to Go Next

- **[Triage]({{< relref "/docs/triage" >}})** - Answer a few questions to identify your most likely dysfunction.
- **[Dysfunction Symptoms]({{< relref "/docs/symptoms" >}})** - Browse observable delivery problems by category and trace them back to root causes.
- **[Anti-Patterns]({{< relref "/docs/anti-patterns" >}})** - A catalog of harmful practices organized by domain, each with root causes and remediation steps.
- **[Migrate to CD]({{< relref "/docs/migrate-to-cd" >}})** - A phased path from assessment through continuous deployment, covering both greenfield and brownfield contexts.
- **[Improvement Plays]({{< relref "/docs/playbook" >}})** - Standalone plays teams can run independently to address specific delivery problems.
- **[Agentic CD]({{< relref "/docs/agentic-cd" >}})** - Constraints and practices for safely incorporating AI agent-generated changes into your pipeline.
- **[Architecting Tests for CD]({{< relref "/docs/testing" >}})** - Test types, architecture, and practices for building confidence in your delivery pipeline.
- **[Reference]({{< relref "/docs/reference" >}})** - Practice definitions, metrics, glossary, and other supporting material.
