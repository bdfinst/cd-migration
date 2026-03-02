---
title: "Pitfalls and Metrics"
linkTitle: "Pitfalls and Metrics"
weight: 12
description: >
  Common failure modes when adopting ACD and the metrics that tell you whether it is working.
---

{{% pageinfo %}}
Each pitfall below has a root cause in the same two gaps: skipped [first-class artifacts](../first-class-artifacts/) and absent [pipeline enforcement](../pipeline-enforcement/). Fix those two things and most of these failures become impossible.
{{% /pageinfo %}}

## Key Pitfalls

### 1. Agent defines its own test scenarios

**The failure is not the [agent](../glossary/#agent-ai) writing test code. It is the agent deciding what to test.** When the agent defines both the test scenarios and the implementation, the tests are shaped to pass the code rather than verify the intent.

**Humans define the test specifications before implementation begins.** Scenarios, edge cases, acceptance criteria. The agent generates the test code from those specifications.

**Validate agent-generated test code for two properties.** First, it must test observable behavior, not implementation internals. Second, it must faithfully cover what the human specified. Skipping this validation is the most common way [ACD](../glossary/#acd-agentic-continuous-delivery) fails.

**What to do:** Define test specifications ([BDD](../glossary/#bdd-behavior-driven-development) scenarios and acceptance criteria) before any code generation. Use a [test fidelity agent](../pipeline-enforcement/) to validate that generated test code matches the specification. Review agent-generated test code for implementation coupling before approving it.

### 2. Review queue backs up from agent-generated volume

Agent speed should not pressure humans to review faster. If unreviewed changes accumulate, the temptation is to rubber-stamp reviews or merge without looking.

**What to do:** Apply [WIP](../glossary/#wip-work-in-progress) limits to the agent's change queue. If three changes are awaiting review, the agent stops generating new changes until the queue drains. Treat agent-generated review queue depth as a [pipeline](../glossary/#pipeline) metric. Consider adopting [expert validation agents](../pipeline-enforcement/) to handle mechanical review checks, reserving human review for judgment calls.

### 3. Tests pass so the change must be correct

Passing tests is necessary but not sufficient. Tests cannot verify intent, architectural fitness, or maintainability. A change can pass every test and still introduce unnecessary complexity, violate unstated conventions, or solve the wrong problem.

**What to do:** Human review remains mandatory for agent-generated changes. Focus reviews on intent alignment and architectural fit rather than mechanical correctness (the pipeline handles that). Track how often human reviewers catch issues that tests missed to calibrate your test coverage.

### 4. No provenance tracking for agent-generated changes

Without provenance tracking, you cannot learn from agent-generated failures, audit agent behavior, or improve the agent's constraints over time. When a production incident involves agent-generated code, you need to know which agent, which [prompt](../glossary/#prompt), and which intent description produced it.

**What to do:** Tag every agent-generated commit with the agent identity, the intent description, and the prompt or [context](../glossary/#context-llm) used. Include provenance metadata in your deployment records. Review agent provenance data during incident retrospectives.

### 5. Agent improves code outside the session scope

Agents trained to write good code will opportunistically refactor, rename, or improve things they encounter while implementing a scenario. The intent is not wrong. The scope is.

A session implementing Scenario 2 that also cleans up the module from Scenario 1 produces a commit that cannot be cleanly reviewed. The scenario change and the cleanup are mixed. If the cleanup introduces a regression, the bisect trail is contaminated. The Boy Scout Rule (leave the code better than you found it) is sound engineering, but applying it within a feature session conflicts with the small-batch discipline that makes agent-generated work reviewable.

**What to do:** Define scope boundaries explicitly in the [system prompt](../glossary/#system-prompt) and context. Cleanup is valid work - but as a separate, explicitly scoped session with its own intent description and commit.

Example scope constraint to include in every implementation session:

{{< code-collapse title="Scope constraint: restrict agent to current scenario only" >}}
Implement the behavior described in this scenario and only that behavior.

If you encounter code that could be improved, note it in your summary
but do not change it. Any refactoring, renaming, or cleanup must happen
in a separate session with its own commit. The only code that may change
in this session is the code required to make the acceptance test pass.
{{< /code-collapse >}}

When cleanup is warranted, schedule it explicitly: create a session scoped
to that specific cleanup, commit it separately, and include the cleanup
rationale in the intent description. This keeps the bisect trail clean
and the review scope bounded.

### 6. Agent resumes mid-feature without a context reset

When a session is interrupted - by a pipeline failure, a context limit, or an agent timeout - there is a temptation to continue the session rather than close it out. The agent "already knows" what it was doing.

This is a reliability trap. Agent state is not durable in the way a commit is durable. A session that continues past an interruption carries implicit assumptions about what was completed that may not match the actual committed state. The next session should always start from the committed state, not from the memory of a previous session.

**What to do:** Treat any interruption as a session boundary. Before the next session begins, write the [context summary](../small-batch-sessions/#the-context-summary) based on what is actually committed, not what the agent believed it completed. If nothing was committed, the session produced nothing - start fresh from the last green state.

### 7. Review agent precision is miscalibrated

**Miscalibration is not visible until an incident reveals it.** The team does not know the review agent is generating false positives until developers stop reading its output. They do not know it is missing issues until a production failure traces back to something the agent approved. Miscalibration breaks in both directions:

**Too many false positives:** the review agent flags issues that are not real problems. Developers learn to dismiss the agent's output without reading it. Real issues get dismissed alongside noise. The agent becomes a checkbox rather than a check.

**Too few flags:** the review agent misses issues that human reviewers would catch. The team gains confidence in the agent and reduces human review depth. Issues that should have been caught are not caught.

**What to do:** During the [replacement cycle](../../migrate-to-cd/brownfield/replacing-manual-validations/) for review agents, track disagreements between the agent and human reviewers, not just agreement. When the agent flags something the human dismisses as noise, that is a false positive. When the human catches something the agent missed, that is a false negative. Track both. Set a threshold for acceptable false positive and false negative rates before reducing human review coverage. Review these rates monthly.

### 8. Skipped the prerequisite delivery practices

Teams jump to [ACD](../glossary/#acd-agentic-continuous-delivery) without the delivery foundations: no deterministic pipeline, no automated tests, no fast feedback loops. AI amplifies whatever system it is applied to. Without guardrails, agents generate defects at machine speed.

**What to do:** Follow the [AI Adoption Roadmap](../adoption-roadmap/) sequence. The first four stages (Quality Tools, Clarify Work, Harden Guardrails, Reduce Delivery Friction) are prerequisites, not optional. Do not expand AI to code generation until the pipeline is deterministic and fast.

## After Adoption: Sustaining Quality Over Time

Agents generate code faster than humans refactor it. Without deliberate maintenance practice, the codebase drifts toward entropy faster than it would with human-paced development.

### Keep skills and prompts under version control

The system prompt, session templates, agent configuration, and any skills used in your pipeline are first-class [artifacts](../glossary/#artifact). They belong in version control alongside the code they produce. An agent operating from an outdated skill file or an untracked system prompt is an unreviewed change to your delivery process.

Review your agent configuration on the same cadence you review the pipeline. When an agent produces unexpected output, check the configuration before assuming the model changed.

### Schedule refactoring as explicit sessions

The rule against out-of-scope changes (pitfall 5 above) applies to feature sessions. It does not mean cleanup never happens. It means cleanup is planned and scoped like any other work.

A practical pattern: after every three to five feature sessions, schedule a maintenance session scoped to the files touched during those sessions. The intent description names what to clean up and why. The session produces a single commit with no behavior change. The acceptance criteria are that all existing tests still pass.

Example maintenance session prompt:

{{< code-collapse title="Maintenance session prompt: refactor with no behavior changes" >}}
Refactor the files listed below. The goal is to improve readability and
reduce duplication introduced during the last four feature sessions.

Constraints:
- No behavior changes. All existing tests must pass unchanged.
- No new features, even small ones.
- No changes outside the listed files.
- If you find something that requires a behavior change to fix properly,
  note it but do not fix it in this session.

Files in scope:
[list files]
{{< /code-collapse >}}

### Track skill effectiveness over time

Agent skills accumulate technical debt the same way code does. A skill written six months ago may no longer reflect the current page structure, template conventions, or style rules. Review each skill when the templates or conventions it references change. Add an "updated" date to each skill's front matter so you can identify which ones are stale.

When a skill produces output that requires significant correction, update the skill before running it again. Unaddressed skill drift means every future session repeats the same corrections.

### Prune dead context

Agent sessions accumulate context over time: outdated summaries, resolved TODOs, stale notes about work that was completed months ago. This dead context increases session startup cost and can mislead the agent about current state.

Review the context documents for each active workstream quarterly. Archive or delete summaries for completed work. Update the "current state" description to reflect what is actually true about the codebase, not what was true when the session was first created.

## Measuring Success

| Metric | Target | How to Measure |
|--------|--------|----------------|
| Agent-generated [change failure rate](../glossary/#change-failure-rate-cfr) | Equal to or lower than human-generated | Tag agent-generated deployments in your deployment tracker. Compare [rollback](../glossary/#rollback) and incident rates between agent and human changes over rolling 30-day windows. |
| Review time for agent-generated changes | Comparable to human-generated changes | Measure time from "change ready for review" to "review complete" for both agent and human changes. If agent reviews are significantly faster, reviewers may be rubber-stamping. |
| Test coverage for agent-generated code | Higher than baseline | Run coverage reports filtered by agent-generated files. Compare against team baseline. If agent code coverage is lower, the test generation step is not working. |
| Agent-generated changes with complete artifacts | 100% | Audit a sample of recent agent-generated changes monthly. Check whether each has an intent description, test specification, feature description, and provenance metadata. |

## Related Content

- [ACD](../) - the framework overview, eight constraints, and workflow
- [First-Class Artifacts](../first-class-artifacts/) - the artifacts that prevent these pitfalls
- [Pipeline Enforcement and Expert Agents](../pipeline-enforcement/) - the automated checks that catch failures
- [AI Adoption Roadmap](../adoption-roadmap/) - the prerequisite sequence that prevents most of these pitfalls
- [Code Coverage Mandates](../../anti-patterns/testing/code-coverage-mandates/) - an anti-pattern especially dangerous when agents optimize for coverage rather than intent
- [Pressure to Skip Testing](../../anti-patterns/organizational-cultural/pressure-to-skip-testing/) - an anti-pattern that ACD counters by making test-first workflow mandatory
- [High Coverage but Ineffective Tests](../../symptoms/testing/high-coverage-ineffective-tests/) - a testing symptom that undermines the acceptance criteria agents depend on
