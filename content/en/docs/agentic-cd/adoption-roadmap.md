---
title: "AI Adoption Roadmap"
linkTitle: "AI Adoption Roadmap"
weight: 3
description: >
  A guide for incorporating AI into your delivery process safely - remove friction and add safety before accelerating with AI coding.
---

{{% pageinfo %}}
AI adoption stress-tests your organization. AI does not create new problems. It reveals
existing ones faster. Teams that try to accelerate with AI before fixing their delivery process get the
same result as putting a bigger engine in a car with no brakes. This page provides the
recommended sequence for incorporating AI safely, mirroring the
[brownfield migration phases](../migrate-to-cd/brownfield/).
{{% /pageinfo %}}

## Before You Add AI: A Decision Framework

Not every problem warrants an AI-based solution. The decision tree below is a gate, not a funnel. Work through each question in order. If you can resolve the need at an earlier step, stop there.

```mermaid
graph TD
    A["New capability or automation need"] --> B{"Is the process as simple as possible?"}
    B -->|No| C["Optimize the process first"]
    B -->|Yes| D{"Can existing system capabilities do it?"}
    D -->|Yes| E["Use them"]
    D -->|No| F{"Can a deterministic component do it?"}
    F -->|Yes| G["Build it"]
    F -->|No| H{"Does the benefit of AI exceed its risk and cost?"}
    H -->|Yes| I["Try an AI-based solution"]
    H -->|No| J["Do not automate this yet"]
```

If steps 1-3 were skipped, step 4 is not available. An AI solution applied to a process that could be simplified, handled by existing capabilities, or replaced by a deterministic component is complexity in place of clarity.

## The Key Insight

**The sequence matters:** remove friction and add safety before you accelerate. AI amplifies whatever system it is applied to - strong process gets faster, broken process gets more broken, faster.

## The Progression

```mermaid
graph LR
    P1["Quality Tools"] --> P2["Clarify Work"]
    P2 --> P3["Harden Guardrails"]
    P3 --> P4["Reduce Delivery Friction"]
    P4 --> P5["Accelerate with AI"]

    style P1 fill:#e8f4fd,stroke:#1a73e8
    style P2 fill:#e8f4fd,stroke:#1a73e8
    style P3 fill:#fce8e6,stroke:#d93025
    style P4 fill:#fce8e6,stroke:#d93025
    style P5 fill:#e6f4ea,stroke:#137333
```

Quality Tools, Clarify Work, Harden Guardrails, Remove Friction, then Accelerate with AI.

## Quality Tools

**Brownfield phase:** Assess

Before using AI for anything, choose models and tools that minimize hallucination and rework.
Not all AI tools are equal. A model that generates plausible-looking but incorrect code creates
more work than it saves.

**What to do:**

- Choose based on accuracy, not speed. A tool with a 20% error rate carries a hidden rework tax on every use. If rework exceeds 20% of generated output, the tool is a net negative.
- Use models with strong reasoning capabilities for code generation. Smaller, faster models are
  appropriate for autocomplete and suggestions, not for generating business logic.
- Establish a baseline: measure how much rework AI-generated code requires before and after
  changing tools.

**What this enables:** AI tooling that generates correct output more often than not. Subsequent
steps build on working code rather than compensating for broken code.

## Clarify Work

**Brownfield phase:** Assess / Foundations

Use AI to improve requirements before code is written, not to write code from vague requirements.
Ambiguous requirements are the single largest source of defects
(see [Systemic Defect Fixes](../defect-sources/)), and AI can detect ambiguity faster than
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

## Harden Guardrails

**Brownfield phase:** Foundations / [Pipeline](../glossary/#pipeline)

Before accelerating code generation, strengthen the safety net that catches mistakes. This means
both product guardrails (does the code work?) and development guardrails (is the code
maintainable?).

**Product and operational guardrails:**

- Automated test suites with meaningful coverage of critical paths
- Deterministic [CD](../glossary/#cd-continuous-delivery) pipelines that run on every commit
- Deployment validation (smoke tests, health checks, canary analysis)

**Development guardrails:**

- Code style enforcement (linters, formatters) that runs automatically
- Architecture rules (dependency constraints, module boundaries) enforced in the pipeline
- Security scanning (SAST, dependency vulnerability checks) on every commit

**What to do:**

- Audit your current guardrails. For each one, ask: "If AI generated code that violated this,
  would our pipeline catch it?" If the answer is no, fix the guardrail before expanding AI use.
- Add [contract tests](../testing/) at service boundaries. AI-generated code is
  particularly prone to breaking implicit contracts between services.
- Ensure test suites run in under ten minutes. Slow tests create pressure to skip them, which
  is dangerous when code is generated faster.

**What this enables:** A safety net that catches mistakes regardless of who (or what) made them.
The pipeline becomes the authority on code quality, not human reviewers. See
[Pipeline Enforcement and Expert Agents](../pipeline-enforcement/) for how these guardrails
extend to [ACD](../glossary/#acd-agentic-continuous-delivery).

## Reduce Delivery Friction

**Brownfield phase:** Pipeline / Optimize

Remove the manual steps, slow processes, and fragile environments that limit how fast you can
safely deliver. These bottlenecks exist in every brownfield system and they become acute when AI
accelerates the code generation phase.

**What to do:**

- Remove manual approval gates that add wait time without adding safety
  (see [Replacing Manual Validations](../migrate-to-cd/brownfield/replacing-manual-validations/)).
- Fix fragile test and staging environments that cause intermittent failures.
- Shorten [branch lifetimes](../glossary/#branch-lifetime). If branches live longer than a day, integration pain will increase
  as AI accelerates code generation.
- Automate deployment. If deploying requires a runbook or a specific person, it is a bottleneck
  that will be exposed when code moves faster.

**What this enables:** A delivery pipeline where the time from "code complete" to "running in
production" is measured in minutes, not days. AI-generated code flows through the same pipeline
as human-generated code with the same safety guarantees.

## Accelerate with AI

**Brownfield phase:** Optimize / [Continuous Deployment](../glossary/#continuous-deployment)

Now - and only now - expand AI use to code generation, refactoring, and autonomous contributions.
The guardrails are in place. The pipeline is fast. Requirements are clear. The outcome of every
change is deterministic regardless of whether a human or an AI wrote it.

{{% alert title="Do not let AI define the test scenarios" color="warning" %}}
Humans define what to test. [Agents](../glossary/#agent-ai) generate the test code from those specifications. See [Executable Truth](../first-class-artifacts/#4-executable-truth) for the validation properties required before implementation begins.
{{% /alert %}}

**What to do:**

- Use AI for code generation with the specification-first workflow described in
  [the ACD workflow](../). Define test scenarios first, let AI generate
  the test code (validated for behavior focus and spec fidelity), then let AI generate
  the implementation.
- Use AI for refactoring: extracting interfaces, reducing complexity, improving test coverage.
  These are high-value, low-risk tasks where AI excels. Well-structured, well-named code
  also reduces the token cost of every subsequent AI interaction - see
  [Tokenomics: Code Quality as a Token Cost Driver](../tokenomics/#8-code-quality-as-a-token-cost-driver).
- Use AI to analyze incidents and suggest fixes, with the same pipeline validation applied to
  any change.

**What this enables:** AI-accelerated development where the speed increase translates to faster
delivery, not faster defect generation. The pipeline enforces the same quality bar regardless of
the author. See [Pitfalls and Metrics](../pitfalls-and-metrics/) for what to watch for and how
to measure progress.

## Mapping to Brownfield Phases

| AI Adoption Stage | Brownfield Phase | Key Connection |
|-------------------|-----------------|----------------|
| Quality Tools | Assess | Use the [current-state assessment](../migrate-to-cd/migration-path/assess/) to evaluate AI tooling alongside delivery process gaps |
| Clarify Work | Assess / Foundations | AI-generated test scenarios from requirements feed directly into [work decomposition](../migrate-to-cd/migration-path/foundations/work-decomposition/) |
| Harden Guardrails | Foundations / Pipeline | The [testing fundamentals](../migrate-to-cd/migration-path/foundations/testing-fundamentals/) and pipeline gates are the same work, with AI-readiness as additional motivation |
| Reduce Delivery Friction | Pipeline / Optimize | [Replacing manual validations](../migrate-to-cd/brownfield/replacing-manual-validations/) unblocks AI-speed delivery |
| Accelerate with AI | Optimize / CD | The [six first-class artifacts](../first-class-artifacts/) become the delivery contract once the pipeline is deterministic and fast |

## Related Content

- [Brownfield CD Overview](../migrate-to-cd/brownfield/) - the phased migration approach this roadmap parallels
- [Replacing Manual Validations](../migrate-to-cd/brownfield/replacing-manual-validations/) - the core mechanical cycle for Reduce Delivery Friction
- [Systemic Defect Fixes](../defect-sources/) - catalog of defect causes that AI can help detect during Clarify Work
- [ACD](../) - the destination for teams completing this roadmap
- [Anti-Patterns](../anti-patterns/) - problems that Harden Guardrails and Reduce Delivery Friction are designed to eliminate
- [The Six First-Class Artifacts](../first-class-artifacts/) - the artifacts that Accelerate with AI's specification-first workflow requires
- [Pipeline Enforcement and Expert Agents](../pipeline-enforcement/) - how the pipeline enforces the guardrails from Harden Guardrails and Reduce Delivery Friction
- [Pitfalls and Metrics](../pitfalls-and-metrics/) - common failures when steps are skipped, and how to measure progress
- [Tokenomics](../tokenomics/) - how code quality drives token cost, and how to architect agents and workflows to minimize unnecessary consumption

---

Content contributed by {{% contributor-credit "bryan-finster" %}}.
