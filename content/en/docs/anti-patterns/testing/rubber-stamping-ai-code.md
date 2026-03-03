---
title: "Rubber-Stamping AI-Generated Code"
linkTitle: "Rubber-stamping AI-generated code"
weight: 28
category: "Testing & Quality"
risk_level: critical
description: >
  Developers accept AI-generated code without understanding the logic, allowing functional bugs
  and security vulnerabilities to ship because "the tests pass."
tags:
  - test-strategy
  - team-dynamics
---

{{% pageinfo %}}
**Category:** {{< param category >}} | {{% risk-indicator level="critical" %}}
{{% /pageinfo %}}

## What This Looks Like

A developer uses an AI assistant to implement a feature. The AI produces working code. The
developer glances at it, confirms the tests pass, and commits. In the code review, the
reviewer reads the diff but does not challenge the approach because the tests are green and the
code looks reasonable. Nobody asks: "Why does it handle the edge case this way?" or "What
happens if the input is malformed?"

The team has adopted AI tooling to move faster, but the review standard has not changed to
match. Before AI, developers wrote code they understood because they wrote it line by line.
With AI, developers commit code they have read but not traced. The gap between "I read it"
and "I understand it" is where bugs and vulnerabilities hide.

Common variations:

- **The approval-without-understanding.** The reviewer approves because the tests pass and the
  code is syntactically clean. They do not trace the logic because they assume the AI got it
  right. Security vulnerabilities - SQL injection, broken access control, exposed secrets -
  ship because the reviewer checked structure, not behavior.
- **The AI-fixes-AI loop.** A bug is found in AI-generated code. The developer asks the AI to
  fix it. The AI produces a patch. The developer commits the patch without understanding the
  original code or the fix. The codebase accumulates layers of code nobody has traced.
- **The missing edge cases.** The AI generates code that handles the happy path correctly. The
  developer does not add tests for edge cases because they did not think of them - they
  delegated the thinking to the AI. The AI did not think of them either.
- **The false confidence.** The team's test suite has high line coverage. AI-generated code
  passes the suite. The team believes the code is correct because coverage is high. But
  coverage measures execution, not correctness. Lines are exercised without the assertions
  that would catch wrong behavior.

The telltale sign: when a bug appears in AI-generated code, the developer who committed it
cannot explain the original logic without re-reading the entire implementation from scratch.

## Why This Is a Problem

### It creates unmaintainable code

Code that the committing developer does not understand is code that nobody understands. When a
bug appears three months later, the developer must reverse-engineer the AI's approach before
they can diagnose the problem. If the developer has left the team, the next person inherits
code with no human context about why it was written the way it was.

AI-generated code often uses patterns that are technically correct but unfamiliar to the team.
Without a developer who understood the code at commit time, the team treats it as a black box.
Black boxes get patched around rather than fixed, accumulating workarounds that make the code
progressively harder to change.

### It introduces security vulnerabilities

AI models generate code based on patterns in training data. Those patterns include insecure
code. An AI assistant will produce code with SQL injection vulnerabilities, hardcoded secrets,
missing input validation, or broken authentication flows if the [prompt](../../reference/glossary/#prompt) does not explicitly
constrain against them - and sometimes even if it does.

A developer who traces the logic would catch many of these issues because they would ask, "What
happens if this input contains a SQL fragment?" or "Where is this secret stored?" A developer
who reads without tracing accepts the code at face value. The vulnerability ships.

### It degrades the team's domain knowledge

When developers delegate implementation to AI and commit without understanding, they stop
building mental models of the codebase. Over time, the team knows less about its own system.
Domain knowledge shifts from the team to the AI's training data - which is frozen, generic,
and unaware of the team's specific constraints.

This knowledge loss is invisible at first. The team is shipping features faster. But when
something goes wrong - a production incident, an unexpected interaction, a refactoring that
touches AI-generated code - the team discovers they cannot reason about their own system.

### Impact on continuous delivery

[CD](../../reference/glossary/#cd-continuous-delivery) requires that every change is [deployable](../../reference/glossary/#deployable) with high confidence. Confidence comes from
understanding what the change does, verifying it against [acceptance criteria](../../reference/glossary/#acceptance-criteria), and knowing it
will not introduce regressions. When developers commit code they do not understand, the
confidence is synthetic: based on test results, not on comprehension.

Synthetic confidence fails under stress. When a production incident involves AI-generated code,
the team's mean time to recovery increases because they must understand the code before they
can fix it. When a refactoring touches AI-generated modules, the developers cannot predict the
impact because they do not understand the current behavior.

## How to Fix It

### Step 1: Establish the "explain it or don't commit it" rule (Week 1)

Add a [working agreement](../../reference/glossary/#working-agreement): any code committed to the repository - regardless of whether a human
or an AI wrote it - must be explainable by the committing developer. "The AI wrote it" is not
an explanation. "It does X because Y, and handles Z by doing W" is an explanation.

This does not mean banning AI tools. It means requiring that developers who use AI tools
understand and own the output. The AI is a drafting tool, not an author.

1. Add the rule to the team's working agreements.
2. In code reviews, reviewers ask the author to explain the logic of any section that is not
   self-evident. If the author cannot explain it, the review is not approved until they can.
3. Track how often reviews are sent back for explanation. This is a leading indicator of how
   often unexamined code was reaching the review stage.

### Step 2: Require acceptance criteria before AI-assisted implementation (Weeks 2-3)

Before a developer asks an AI to implement a feature, the acceptance criteria must be written
and reviewed. The criteria serve two purposes: they constrain the AI's output, and they give
the developer a checklist to verify the result against.

1. Each work item must include specific, testable acceptance criteria before implementation
   starts.
2. AI prompts should reference the acceptance criteria explicitly.
3. The developer verifies the AI output against every criterion before committing.

### Step 3: Add security-focused review for AI-generated code (Weeks 2-4)

AI-generated code has a higher baseline risk of security vulnerabilities because the AI
optimizes for functional correctness, not security.

1. Add static application security testing (SAST) tools to the [pipeline](../../reference/glossary/#pipeline) that flag common vulnerability patterns.
2. For AI-assisted changes, the code review checklist includes: input validation, access
   control, secret handling, and injection prevention.
3. Track the rate of security findings in AI-generated code vs human-written code. If
   AI-generated code has a higher rate, tighten the review criteria.

### Step 4: Strengthen the test suite to catch AI blind spots (Weeks 3-6)

AI-generated code passes your tests. The question is whether your tests are good enough to
catch wrong behavior.

1. Add mutation testing to measure test suite effectiveness. If mutants survive in AI-generated
   code, the tests are not asserting on the right things.
2. Require edge case tests for every AI-generated function: null inputs, boundary values,
   malformed data, concurrent access where applicable.
3. Review test coverage not by lines executed but by behaviors verified. A function with 100%
   line coverage and no assertions on error paths is undertested.

| Objection | Response |
|-----------|----------|
| "This slows down the speed benefit of AI tools" | The speed benefit is real only if the code is correct. Shipping bugs faster is not a speed improvement - it is a rework multiplier. A 10-minute review that catches a vulnerability saves days of incident response. |
| "Our developers are experienced - they can spot problems in AI output" | Experience helps, but reading is not the same as tracing. Experienced developers who rubber-stamp AI output still miss bugs because they are scanning, not analyzing. The rule creates the expectation to analyze. |
| "We have high test coverage already" | Coverage measures execution, not correctness. A test that executes a code path but does not assert on its behavior provides coverage without confidence. Mutation testing reveals whether the coverage is meaningful. |
| "Requiring explanation of every line is too much overhead" | The rule is not "explain every line." It is "explain the logic and approach." A developer who understands the code can explain it in two minutes. A developer who cannot explain it should not commit it. |

## Measuring Progress

| Metric | What to look for |
|--------|-----------------|
| Code reviews returned for insufficient explanation | Should start high and decrease as developers internalize the review standard |
| Security findings in AI-generated code | Should decrease as review and static analysis improve |
| Defects in AI-generated code vs human-written code | Should converge as the team applies equal rigor to both |
| Mutation testing survival rate | Should decrease as test assertions become more specific |
| Mean time to resolve defects in AI-generated code | Should decrease as developers understand the code they committed |

## Related Content

- [AI-Generated Code Ships Without Developer Understanding]({{< relref "/docs/symptoms/testing/ai-code-without-understanding" >}}) - The symptom this anti-pattern produces
- [Pitfalls and Metrics]({{< relref "/docs/agentic-cd/operations/pitfalls-and-metrics" >}}) - Failure modes when adopting AI coding tools
- [AI Adoption Roadmap]({{< relref "/docs/agentic-cd/getting-started/adoption-roadmap" >}}) - Prerequisites for safe AI-assisted development
- [Testing Fundamentals]({{< relref "/docs/migrate-to-cd/foundations/testing-fundamentals" >}}) - Building tests that verify behavior, not just execution
- [Inverted Test Pyramid]({{< relref "/docs/anti-patterns/testing/inverted-test-pyramid" >}}) - A test structure that lets incorrect AI code pass undetected
- [Working Agreements]({{< relref "/docs/migrate-to-cd/foundations/working-agreements" >}}) - Making review standards explicit and enforceable
