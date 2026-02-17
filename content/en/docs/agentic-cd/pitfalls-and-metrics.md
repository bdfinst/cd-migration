---
title: "Pitfalls and Metrics"
linkTitle: "Pitfalls and Metrics"
weight: 5
description: >
  Common failure modes when adopting ACD and the metrics that tell you whether it is working.
---

{{% pageinfo %}}
These pitfalls come from teams that adopted agentic continuous delivery (ACD) without fully implementing the [six first-class artifacts](../first-class-artifacts/) or the [pipeline enforcement](../pipeline-enforcement/) that makes them effective.
{{% /pageinfo %}}

## Key Pitfalls

### 1. Agent defines its own test scenarios

**The failure is not the agent writing test code. It is the agent deciding what to test.** When the agent defines both the test scenarios and the implementation, the tests are shaped to pass the code rather than verify the intent.

**Humans define the test specifications before implementation begins.** Scenarios, edge cases, acceptance criteria. The agent generates the test code from those specifications.

**Validate agent-generated test code for two properties.** First, it must test observable behavior, not implementation internals. Second, it must faithfully cover what the human specified. Skipping this validation is the most common way ACD fails.

**What to do:** Define test specifications (BDD scenarios and acceptance criteria) before any code generation. Use a [test fidelity agent](../pipeline-enforcement/) to validate that generated test code matches the specification. Review agent-generated test code for implementation coupling before approving it.

### 2. Review queue backs up from agent-generated volume

Agent speed should not pressure humans to review faster. If unreviewed changes accumulate, the temptation is to rubber-stamp reviews or merge without looking.

**What to do:** Apply WIP limits to the agent's change queue. If three changes are awaiting review, the agent stops generating new changes until the queue drains. Treat agent-generated review queue depth as a pipeline metric. Consider adopting [expert validation agents](../pipeline-enforcement/) to handle mechanical review checks, reserving human review for judgment calls.

### 3. Tests pass so the change must be correct

Passing tests is necessary but not sufficient. Tests cannot verify intent, architectural fitness, or maintainability. A change can pass every test and still introduce unnecessary complexity, violate unstated conventions, or solve the wrong problem.

**What to do:** Human review remains mandatory for agent-generated changes. Focus reviews on intent alignment and architectural fit rather than mechanical correctness (the pipeline handles that). Track how often human reviewers catch issues that tests missed to calibrate your test coverage.

### 4. No provenance tracking for agent-generated changes

Without provenance tracking, you cannot learn from agent-generated failures, audit agent behavior, or improve the agent's constraints over time. When a production incident involves agent-generated code, you need to know which agent, which prompt, and which intent description produced it.

**What to do:** Tag every agent-generated commit with the agent identity, the intent description, and the prompt or context used. Include provenance metadata in your deployment records. Review agent provenance data during incident retrospectives.

### 5. Skipped the prerequisite delivery practices

Teams jump to ACD without the delivery foundations: no deterministic pipeline, no automated tests, no fast feedback loops. AI amplifies whatever system it is applied to. Without guardrails, agents generate defects at machine speed.

**What to do:** Follow the [AI Adoption Roadmap](../adoption-roadmap/) sequence. The first four stages (Quality Tools, Clarify Work, Harden Guardrails, Reduce Delivery Friction) are prerequisites, not optional. Do not expand AI to code generation until the pipeline is deterministic and fast.

## Measuring Success

| Metric | Target | How to Measure |
|--------|--------|----------------|
| Agent-generated change failure rate | Equal to or lower than human-generated | Tag agent-generated deployments in your deployment tracker. Compare rollback and incident rates between agent and human changes over rolling 30-day windows. |
| Review time for agent-generated changes | Comparable to human-generated changes | Measure time from "change ready for review" to "review complete" for both agent and human changes. If agent reviews are significantly faster, reviewers may be rubber-stamping. |
| Test coverage for agent-generated code | Higher than baseline | Run coverage reports filtered by agent-generated files. Compare against team baseline. If agent code coverage is lower, the test generation step is not working. |
| Agent-generated changes with complete artifacts | 100% | Audit a sample of recent agent-generated changes monthly. Check whether each has an intent description, test specification, feature description, and provenance metadata. |

## Related Content

- [ACD](../) - the framework overview, eight constraints, and workflow
- [The Six First-Class Artifacts](../first-class-artifacts/) - the artifacts that prevent these pitfalls
- [Pipeline Enforcement and Expert Agents](../pipeline-enforcement/) - the automated checks that catch failures
- [AI Adoption Roadmap](../adoption-roadmap/) - the prerequisite sequence that prevents most of these pitfalls
- [Code Coverage Mandates](../../anti-patterns/testing/code-coverage-mandates/) - an anti-pattern especially dangerous when agents optimize for coverage rather than intent
- [Pressure to Skip Testing](../../anti-patterns/organizational-cultural/pressure-to-skip-testing/) - an anti-pattern that ACD counters by making test-first workflow mandatory
- [High Coverage but Ineffective Tests](../../symptoms/testing/high-coverage-ineffective-tests/) - a testing symptom that undermines the executable truth agents depend on
