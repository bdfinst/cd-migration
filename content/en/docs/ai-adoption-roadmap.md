---
title: "AI Adoption Roadmap"
linkTitle: "AI Adoption Roadmap"
weight: 6
description: >
  A prescriptive guide for incorporating AI into your delivery process safely - remove friction and add safety before accelerating with AI coding.
---

{{% pageinfo %}}
Adapted from [Incorporating AI Without Crashing](https://bryanfinster.substack.com/p/incorporating-ai-without-crashing)

AI adoption is chaos testing for your organization. It does not create new problems - it reveals
existing ones. Teams that try to accelerate with AI before fixing their delivery process get the
same result as putting a bigger engine in a car with no way to steer or stop: you go faster,
briefly, and then something expensive happens. This page provides the prescriptive sequence for
incorporating AI safely, mirroring the [brownfield migration phases](brownfield/).
{{% /pageinfo %}}

## The Key Insight

AI amplifies whatever system it is applied to. If your delivery process has strong guardrails,
fast feedback, and clear requirements, AI makes you faster. If your process has unclear
requirements, manual gates, fragile tests, and slow pipelines, AI makes those problems worse -
and it makes them worse faster.

**The sequence matters:** remove friction and add safety before you accelerate.

## The Progression

```mermaid
graph LR
    A["1. Quality Tools"] --> B["2. Clarify Work"]
    B --> C["3. Harden Guardrails"]
    C --> D["4. Remove Friction"]
    D --> E["5. Accelerate with AI"]

    style A fill:#e8f4fd,stroke:#1a73e8
    style B fill:#e8f4fd,stroke:#1a73e8
    style C fill:#fce8e6,stroke:#d93025
    style D fill:#fce8e6,stroke:#d93025
    style E fill:#e6f4ea,stroke:#137333
```

Each step builds on the previous one. Skipping steps means AI amplifies your weaknesses
instead of your strengths.

## Step 1: Start with Quality Tools

**Brownfield phase:** Assess

Before using AI for anything, choose models and tools that minimize hallucination and rework.
Not all AI tools are equal. A model that generates plausible-looking but incorrect code creates
more work than it saves.

**What to do:**

- Evaluate AI coding tools on accuracy, not speed. A tool that generates correct code 80% of
  the time and incorrect code 20% of the time has a hidden rework tax on every use.
- Use models with strong reasoning capabilities for code generation. Smaller, faster models are
  appropriate for autocomplete and suggestions, not for generating business logic.
- Establish a baseline: measure how much rework AI-generated code requires before and after
  changing tools. If rework exceeds 20% of generated output, the tool is a net negative.

**What this enables:** A foundation of AI tooling that generates correct output more often than
not, so subsequent steps build on working code rather than compensating for broken code.

## Step 2: Clarify Work Before Coding

**Brownfield phase:** Assess / Foundations

Use AI to improve requirements before code is written, not to write code from vague requirements.
Ambiguous requirements are the single largest source of defects
(see [Defect Sources](defect-sources/)), and AI can detect ambiguity faster than
manual review.

**What to do:**

- Use AI to review tickets, user stories, and acceptance criteria before development begins.
  Prompt it to identify gaps, contradictions, untestable statements, and missing edge cases.
- Use AI to generate test scenarios from requirements. If the AI cannot generate clear test
  cases, the requirements are not clear enough for a human either.
- Use AI to analyze support tickets and incident reports for patterns that should inform
  the backlog.

**What this enables:** Higher-quality inputs to the development process. Developers (human or AI)
start with clear, testable specifications rather than ambiguous descriptions that produce
ambiguous code.

## Step 3: Harden Guardrails

**Brownfield phase:** Foundations / Pipeline

Before accelerating code generation, strengthen the safety net that catches mistakes. This means
both product guardrails (does the code work?) and development guardrails (is the code
maintainable?).

**Product and operational guardrails:**

- Automated test suites with meaningful coverage of critical paths
- Deterministic CI/CD pipelines that run on every commit
- Deployment validation (smoke tests, health checks, canary analysis)

**Development guardrails:**

- Code style enforcement (linters, formatters) that runs automatically
- Architecture rules (dependency constraints, module boundaries) enforced in the pipeline
- Security scanning (SAST, dependency vulnerability checks) on every commit

**What to do:**

- Audit your current guardrails. For each one, ask: "If AI generated code that violated this,
  would our pipeline catch it?" If the answer is no, fix the guardrail before expanding AI use.
- Add [contract tests](reference/testing/) at service boundaries. AI-generated code is
  particularly prone to breaking implicit contracts between services.
- Ensure test suites run in minutes, not hours. Slow tests create pressure to skip them, which
  is dangerous when code is generated faster.

**What this enables:** A safety net that catches mistakes regardless of who (or what) made them.
The pipeline becomes the authority on code quality, not human reviewers.

## Step 4: Reduce Delivery Friction

**Brownfield phase:** Pipeline / Optimize

Remove the manual steps, slow processes, and fragile environments that limit how fast you can
safely deliver. These bottlenecks exist in every brownfield system and they become acute when AI
accelerates the code generation phase.

**What to do:**

- Remove manual approval gates that add wait time without adding safety
  (see [Replacing Manual Validations](brownfield/replacing-manual-validations/)).
- Fix fragile test and staging environments that cause intermittent failures.
- Shorten branch lifetimes. If branches live longer than a day, integration pain will increase
  as AI accelerates code generation.
- Automate deployment. If deploying requires a runbook or a specific person, it is a bottleneck
  that will be exposed when code moves faster.

**What this enables:** A delivery pipeline where the time from "code complete" to "running in
production" is measured in minutes, not days. When this path is fast and reliable, AI-generated
code flows through the same pipeline as human-generated code with the same safety guarantees.

## Step 5: Accelerate with AI Coding

**Brownfield phase:** Optimize / Continuous Deployment

Now - and only now - expand AI use to code generation, refactoring, and autonomous contributions.
The guardrails are in place. The pipeline is fast. Requirements are clear. The outcome of every
change is deterministic regardless of whether a human or an AI wrote it.

**What to do:**

- Use AI for code generation with the test-first workflow described in
  [Agentic CD](migration-path/continuous-deployment/agentic-cd/). Write tests first, then let
  AI generate the implementation.
- Use AI for refactoring: extracting interfaces, reducing complexity, improving test coverage.
  These are high-value, low-risk tasks where AI excels.
- Use AI to analyze incidents and suggest fixes, with the same pipeline validation applied to
  any change.

**What this enables:** AI-accelerated development where the speed increase translates to faster
delivery, not faster defect generation. The pipeline enforces the same quality bar regardless of
the author.

## Mapping to Brownfield Phases

| AI Adoption Step | Brownfield Phase | Key Connection |
|-----------------|-----------------|----------------|
| 1. Quality Tools | Assess | Evaluate tooling as part of current-state assessment |
| 2. Clarify Work | Assess / Foundations | Better requirements feed better work decomposition |
| 3. Harden Guardrails | Foundations / Pipeline | Same testing and pipeline work, with AI-readiness as additional motivation |
| 4. Remove Friction | Pipeline / Optimize | Same automation and flow optimization, unblocking AI-speed delivery |
| 5. Accelerate with AI | Optimize / CD | AI coding becomes safe when the pipeline is deterministic and fast |

{{% alert title="The Destination: Agentic CD" %}}
The end state of this roadmap is a delivery pipeline where AI agents can contribute code with the
same safety guarantees as human developers. This is
[Agentic CD](migration-path/continuous-deployment/agentic-cd/) - the extension of
continuous deployment to handle agent-generated changes. You do not need to be at CD maturity to
start the AI adoption roadmap, but the roadmap leads there.
{{% /alert %}}

## Related Content

- [Brownfield CD Overview](brownfield/) - The phased migration approach this roadmap parallels
- [Replacing Manual Validations](brownfield/replacing-manual-validations/) - The core mechanical cycle for Step 4
- [Defect Sources](defect-sources/) - Catalog of defect causes that AI can help detect (Step 2)
- [Agentic CD](migration-path/continuous-deployment/agentic-cd/) - The destination for teams completing this roadmap
- [Anti-Patterns](anti-patterns/) - Problems that Steps 3 and 4 are designed to eliminate
- [Common Blockers](reference/common-blockers/) - Obstacles you will encounter along the way

---

> This content is adapted from
> [Incorporating AI Without Crashing](https://bryanfinster.substack.com/p/incorporating-ai-without-crashing)
> by Bryan Finster.
