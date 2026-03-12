---
title: "Team AI Evals for Coding Tools"
linkTitle: "Team AI Evals"
weight: 21
description: >
  How individual teams set up, write, and run evals for their AI coding tools using eval-driven development.
aliases:
  - /docs/agentic-cd/team-ai-evals/
---

{{% pageinfo %}}
If you would notice a regression, it needs an eval. This page covers setting up eval infrastructure, writing your first positive and negative tests, choosing graders, and integrating evals into your [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}).
{{% /pageinfo %}}

## What Needs Evals

Not every AI interaction needs an eval. Use this heuristic: **if you would notice a
regression, it needs an eval.**

Artifacts that need evals:

- **Custom prompts** that guide agent behavior (code review checklists, scaffolding
  instructions, refactoring patterns)
- **Slash commands** that users invoke directly
- **Agents** that orchestrate multi-step workflows
- **Skills** (knowledge bases) that inform agent decisions
- **Model migrations** when you upgrade the underlying model version
- **Configuration changes** to temperature, timeout, or system prompts

Artifacts that do not need evals:

- One-off queries with no reuse expectation
- Simple wrappers around built-in IDE features
- Configuration that does not affect AI behavior (formatting, display preferences)

The decision comes down to blast radius. If a regression affects one developer once,
skip the eval. If it affects every developer every time they use the tool, write the
eval.

## Setting Up Eval Infrastructure

**Prerequisites:** You need an eval framework (this guide uses Promptfoo), a
working plugin to evaluate, and at least one realistic fixture. Start with a
single real failure case, the last time your AI tool produced wrong output.

This walkthrough uses [Promptfoo](https://www.promptfoo.dev/) as the eval runner. The
patterns apply to any eval framework that supports custom assertions and multi-trial
execution.

### Directory Structure

Mirror your plugin structure with an eval directory:

```
plugins/my-tool/           # Ships to users
  commands/review.md
  agents/reviewer.md
  skills/patterns/SKILL.md

evals/my-tool/             # Stays in repo
  promptfooconfig.yaml     # Eval runner configuration
  suites/                  # Test case definitions
    review.yaml
    review-neg.yaml
  graders/
    deterministic/         # Fast structural checks
    transcript/            # Agent process validation
    llm-rubrics/           # LLM-as-judge quality checks
  fixtures/                # Test input codebases
    buggy-app/
    clean-app/
  reference-solutions/     # Gold-standard expected outputs
```

### Configuration

The eval config sets the model provider, timeout, output format, and baseline
assertions that apply to every test. From [evals/frontend-dev/promptfooconfig.yaml](https://github.com/bailejl/dev-plugins/blob/main/evals/frontend-dev/promptfooconfig.yaml):

```yaml
providers:
  - id: anthropic:messages:claude-sonnet-4-20250514
    label: claude-sonnet
    config:
      temperature: 0
      max_tokens: 16384

defaultTest:
  options:
    timeout: 300000 # 5 minutes per test case
    transform: output.trim()
  assert:
    - type: javascript
      value: "output.length > 0" # Non-empty output
    - type: javascript
      value: "output.length >= 500" # Minimum substance
    - type: javascript
      value: "output.length <= 50000" # Maximum length bound
```

Key settings:

- **Temperature 0**: Reduces variance between runs, making evals more reproducible.
- **Timeout 300000ms**: Agents need time to read files, run tools, and compose output.
  Five minutes accommodates complex multi-step tasks.
- **Baseline assertions**: Every test automatically checks for non-empty output within
  length bounds. These catch complete failures without adding noise to individual test
  definitions.

## Writing Your First Eval

Start with a real failure, not a hypothetical one. Think of the last time your AI tool
produced wrong output. That failure becomes your first eval.

### Step 1: Pick a Real Failure

Example: your accessibility audit command missed missing `<label>` elements on a form.

### Step 2: Build a Fixture That Reproduces It

Create a realistic component with the issue planted:

```jsx
// fixtures/bad-form/BadForm.jsx
export default function BadForm() {
  return (
    <div>
      <h1>Contact Us</h1>
      <h4>Fill out the form</h4> {/* Heading level skip */}
      <input type="text" placeholder="Name" /> {/* No label */}
      <input type="email" placeholder="Email" /> {/* No label */}
      <div onClick={() => submit()}>Submit</div> {/* No keyboard handler */}
    </div>
  );
}
```

### Step 3: Write a Positive Test

````yaml
- description: "Accessibility audit detects missing labels and keyboard issues"
  metadata:
    suite: a11y
    case: bad-form-positive
    evalType: capability
    source: production-failure
  vars:
    fixture: "{{fixtureRoot}}/bad-form"
    prompt: |
      Review this component for accessibility violations:
      {% raw %}
      ```jsx
      // BadForm.jsx -- component source here
      ```
      {% endraw %}
  assert:
    - type: javascript
      value: "output.match(/label/i) !== null"
      metric: detects_missing_labels
      weight: 3
    - type: javascript
      value: "output.match(/keyboard|onClick.*div/i) !== null"
      metric: detects_keyboard_issues
      weight: 2
````

### Step 4: Build the Clean Counterpart

Create a component that does everything right:

```jsx
// fixtures/accessible-form/SearchBox.jsx
export default function SearchBox() {
  return (
    <form role="search">
      <label htmlFor="q">Search</label>
      <input id="q" type="search" aria-describedby="hint" />
      <p id="hint">Enter keywords to search</p>
      <button type="submit">Search</button>
    </form>
  );
}
```

### Step 5: Write the Negative Test

````yaml
- description: "Accessible form should not trigger false positives"
  metadata:
    suite: a11y-neg
    case: accessible-form-negative
    evalType: regression
    source: manual
  vars:
    fixture: "{{fixtureRoot}}/accessible-form"
    prompt: |
      Review this component for accessibility violations:
      {% raw %}
      ```jsx
      // SearchBox.jsx -- component source here
      ```
      {% endraw %}
  assert:
    - type: not-icontains
      value: "critical"
      weight: 2
    - type: llm-rubric
      value: >
        The output should not report false positive accessibility violations
        against this well-structured accessible form component.
      weight: 4
````

You now have a positive test proving the tool finds real issues and a negative test
proving it does not fabricate issues on clean code.

## Choosing Graders

The [AI Eval Methodology]({{< relref "ai-eval-methodology" >}}) page details the three-layer
grading framework. Here is the practical guidance for choosing graders on your team.

**Start with deterministic graders.** They run in milliseconds, produce clear pass/fail
results, and are easy to debug. For most teams, deterministic graders cover 60-70% of
what you need to check.

Minimal deterministic grader:

```javascript
// graders/deterministic/checks-labels.js
module.exports = function (output) {
  const mentionsLabels = /label|htmlFor|aria-label/i.test(output);
  return {
    pass: mentionsLabels,
    score: mentionsLabels ? 1 : 0,
    reason: mentionsLabels
      ? "Output discusses form labeling"
      : "Output does not mention labels, htmlFor, or aria-label",
  };
};
```

**Add transcript graders for agent behavior.** When your tool involves multi-step agent
workflows (reading files, running tools, composing output), add transcript graders to
verify the agent followed a sound process.

**Add LLM rubrics for quality.** When you need to evaluate subjective qualities like
"are the recommendations actionable?" or "is the severity rating appropriate?", use
an LLM rubric.

Minimal LLM rubric:

```yaml
- type: llm-rubric
  value: >
    The output identifies specific accessibility violations with WCAG success
    criterion references. Each finding includes the file location and a concrete
    fix recommendation. Generic advice like "add labels" without specifying which
    elements is insufficient.
  weight: 3
```

### Calibrating Graders

A grader that consistently returns the wrong verdict is worse than no grader. It
gives false confidence. Calibrate every grader before relying on it.

**Three-step calibration process:**

1. **Run against reference solutions.** Your reference solution represents known-good
   output. Every grader should pass when given the reference solution. If a grader
   fails the reference, the grader is wrong.
2. **Run against known-bad output.** Manually craft output with specific flaws (wrong
   files cited, missing findings, fabricated issues). Every grader should fail when
   given bad output. If a grader passes bad output, it is too permissive.
3. **Investigate disagreements.** When a grader disagrees with your human judgment,
   diagnose whether the grader's logic is wrong or your judgment needs updating.
   Usually, it is the grader.

**The CORE-Bench lesson:** A research benchmark found that fixing grader bugs
improved measured agent performance from 42% to 95%. The agents were capable all
along. The graders were miscalibrated. This is common and costly.

**When to recalibrate:**

- After modifying a grader's logic
- After adding a new fixture to the suite
- Before and after a model migration
- When score distributions shift unexpectedly (sudden pass rate drop or spike)

## Building Fixtures

Good fixtures determine good evals. Follow these principles:

- **Take real codebase snapshots.** Copy actual code that triggered failures. Sanitize
  proprietary details but keep the structural complexity.

- **Plant issues deliberately.** Document every planted issue so you can write targeted
  assertions. A fixture without documented issues is untestable.

- **Build clean counterparts.** For every fixture with planted issues, build a clean
  version that follows best practices. The clean fixture drives your negative tests.

- **Keep them small but realistic.** A fixture with 3-5 files covering 100-300 lines
  total is enough to test most agent behaviors without making eval runs slow.

## Running and Interpreting Results

### Single Run

```bash
npm run eval:frontend
```

This runs every test suite once and produces a scorecard.

### Multi-Trial Execution

For pass@k metrics, run each test multiple times. Configure the `repeat` field in
your promptfoo config or run the eval multiple times and aggregate results.

### Reading the Scorecard

The scorecard shows each test case with its assertion results. Focus on:

- **Which assertions failed?** A failed deterministic check points to a specific
  structural problem. A failed LLM rubric suggests a quality issue.
- **What is the score?** Weighted assertions contribute proportionally. A test with
  a score of 0.7 passed most assertions but missed some.
- **Are failures consistent?** A test that fails the same way every run has a
  systematic problem. A test that fails intermittently has a variance problem.

### The Transcript Viewer

The transcript viewer shows you the full agent conversation for failed tests:

```bash
./eval-infra/scripts/transcript-viewer.sh evals/frontend-dev/.promptfoo
```

Options:

- `-a` / `--all`: Show all transcripts, not just failures
- `-s` / `--short`: Abbreviated view (first/last 3 lines)
- `-t` / `--test <name>`: Filter by test description
- `-c` / `--count`: Print pass/fail counts only

Reading transcripts is the single most valuable debugging activity. The transcript
shows you which files the agent read, which tools it used, where it got confused, and
why it produced wrong output.

### pass@k Computation

After running evals, compute capability and reliability metrics:

```bash
python eval-infra/scripts/compute-pass-at-k.py \
  --results evals/frontend-dev/.promptfoo/output.json \
  --k 1 3 5 \
  --group-by evalType
```

This groups results by `evalType` (capability vs. regression) and computes pass@k
(capability ceiling) and pass^k (reliability floor) for k=1, 3, and 5.

## The Eval-Driven Development Loop

The eval is your development tool, not your release gate. The loop works like this:

1. **Run the eval.** Start with the full suite.

2. **Read transcripts for failures.** Open the transcript viewer and read the full
   agent conversation for every failed test. Do not skip this step.

3. **Identify the failure mode.** Common modes:
   - Agent did not read the right files (prompt needs better guidance)
   - Agent read the files but missed the issue (prompt needs more specific criteria)
   - Agent found the issue but described it poorly (prompt needs output format guidance)
   - Agent fabricated a finding (need a negative test to prevent this)

4. **Improve the prompt or agent.** Make one targeted change that addresses the
   identified failure mode.

5. **Re-run the eval.** Verify the fix works without breaking other tests.

**When to add new test cases:** When you discover a failure mode that no existing test
covers.

**When to improve existing tests:** When a test passes for the wrong reasons or fails
for reasons unrelated to the capability it tests.

**Recording baselines:** After a successful eval run, record the baseline:

```bash
./eval-infra/scripts/record-baseline.sh frontend-dev
```

This saves a timestamped record of pass@k metrics, git commit, and branch to
[evals/frontend-dev/eval-history.jsonl](https://github.com/bailejl/dev-plugins/blob/main/evals/frontend-dev/eval-history.jsonl). Use baselines to track improvement over time
and detect regressions across prompt changes.

## Model Migration Testing

When upgrading the underlying model (e.g., from Claude Sonnet 4 to a newer
version), use your eval suite to validate the migration systematically.

1. **Run the full suite on the current model.** Record baselines for all metrics.
2. **Run the identical suite on the new model.** Change only the provider; keep
   everything else constant.
3. **Run negative suites first.** Regressions (fabricated findings on clean code)
   are the highest-risk failure mode in model migrations.
4. **Compare pass@k and pass^k.** Look for changes in both capability ceiling and
   reliability floor.
5. **Read transcripts for new failure modes.** A new model may fail differently
   than the old one: different tools used, different reasoning patterns,
   different output structure.

**Watch for masked regressions:** Aggregate pass rates can improve while
individual tasks regress. Compare per-task results, not just suite-level metrics.
A model that scores 85% overall but drops three previously-passing tasks may be
worse for your users than the old model at 80%.

## CI Integration

Run evals automatically when prompt or agent files change.

### What to Run in CI

- **Always run deterministic and transcript graders.** They are fast and cheap.
- **Run LLM rubrics on pull requests only.** They are slow and cost real API tokens.
  Skip them on every commit to manage costs.
- **Run the full suite with multi-trial on release branches.** This gives you pass@k
  confidence before shipping.

**Pipeline stage mapping:**

| Pipeline Stage | Graders to Run                   | Rationale                          |
| -------------- | -------------------------------- | ---------------------------------- |
| Pre-commit     | Deterministic only               | Instant feedback, zero cost        |
| CI (every push)| Deterministic + Transcript       | Fast, free, catches process issues |
| Pull request   | All layers including LLM rubrics | Full quality assessment at review  |
| Release branch | Full suite, multi-trial          | pass@k confidence before shipping  |

Most commits get fast, cheap feedback. Expensive LLM rubric runs happen only at
decision points where the full quality picture matters.

### Gating Criteria

Gate on the regression (negative) suite:

```
Regression suite pass@1 >= 90%
```

This means: on a single run, at least 90% of negative tests pass. This prevents
shipping prompts that fabricate findings on clean code.

Do not gate on capability suite pass rates during early development. Use capability
metrics to track improvement, not to block merges.

### Cost Management

| Grader Type      | Speed   | Cost     | When to Run    |
| ---------------- | ------- | -------- | -------------- |
| Deterministic    | < 1s    | Free     | Every commit   |
| Transcript       | < 1s    | Free     | Every commit   |
| LLM Rubric       | 5-30s   | API cost | PR only        |
| Full multi-trial | Minutes | API cost | Release branch |

**Optimizing token costs:**

- **Cache eval prompts.** Structure prompts with stable content (system prompts,
  instructions) first so provider caching can apply.
- **Smaller models for initial passes.** Use a faster, cheaper model for
  deterministic and transcript grading passes before running expensive LLM rubrics.
- **Track per-run token costs.** Log input and output tokens per eval run to
  identify cost trends and outliers.
- **Batch rubric evaluations.** Where possible, combine multiple rubric checks
  into a single LLM judge prompt to reduce per-call overhead.

For broader token optimization strategies, see
[Tokenomics]({{< relref "/docs/agentic-cd/operations/tokenomics" >}}).

## Evals in the Quality Feedback Loop

Evals catch regressions before deployment. Production monitoring catches
unanticipated failures after deployment. Together, they form a complete quality
feedback loop.

**The cycle:**

```
Evals --> Deploy --> Monitor --> User reports --> New eval cases --> Evals
```

**How production failures become eval cases:**

1. **Capture the failure.** Save the user's input, the agent's output, and the
   expected behavior.
2. **Build a fixture.** Create a minimal reproduction from the captured input.
3. **Write the eval case.** Add a test with `source: production-failure` in the
   metadata.
4. **Verify the failure.** Run the eval and confirm the agent fails the same way.
5. **Fix and validate.** Improve the prompt or agent, then re-run until the eval
   passes without breaking existing tests.

**Complementary monitoring methods:**

- **Manual transcript review.** Sample 5-10 transcripts per week from production
  to catch failure modes your evals miss.
- **Expert validation agents.** Deploy
  [expert agents]({{< relref "/docs/agentic-cd/operations/pipeline-enforcement#expert-validation-agents" >}}) that validate [agent]({{< relref "/docs/reference/glossary#agent-ai" >}})
  output at runtime.
- **User satisfaction signals.** Track whether users accept, modify, or reject
  agent output. High rejection rates indicate undetected failure modes.

## Related Content

- [AI Eval Methodology]({{< relref "ai-eval-methodology" >}}) - Three-layer grading framework
  and core eval concepts
- [AI Evals for AI Enablement Platforms]({{< relref "platform-ai-evals" >}}) - Building shared
  eval infrastructure across multiple plugins
- [Pipeline Enforcement]({{< relref "/docs/agentic-cd/operations/pipeline-enforcement" >}}) - How quality gates
  enforce [ACD]({{< relref "/docs/reference/glossary#acd-agentic-continuous-delivery" >}}) constraints
- [Small-Batch Sessions]({{< relref "/docs/agentic-cd/architecture/small-batch-sessions" >}}) - Structuring
  focused agent work sessions
- [Tokenomics]({{< relref "/docs/agentic-cd/operations/tokenomics" >}}) - Optimizing [token]({{< relref "/docs/reference/glossary#token" >}}) usage and costs
  for AI agent operations
