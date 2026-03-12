---
title: "AI Evals for AI Enablement Platforms"
linkTitle: "Platform AI Evals"
weight: 22
description: >
  How platform teams build shared eval infrastructure for reusable AI coding tools that serve multiple teams and diverse codebases.
aliases:
  - /docs/agentic-cd/platform-ai-evals/
---

{{% pageinfo %}}
Platform teams build reusable AI coding tools for multiple teams. Shared eval infrastructure (base configs, grader libraries, rubric templates) eliminates duplication and enforces consistency across the plugin portfolio.
{{% /pageinfo %}}

## What is an AI Enablement Platform

An AI enablement platform is the team that builds reusable AI coding tools ([prompts]({{< relref "/docs/reference/glossary#prompt" >}}),
[agents]({{< relref "/docs/reference/glossary#agent-ai" >}}), plugins, skills) for multiple teams in an organization. Instead of every team
writing their own code review agent or scaffolding command, the platform team builds
these once and distributes them.

The platform challenge: your tools must work across diverse codebases with different
languages, frameworks, and coding conventions. You cannot manually test against every
consumer's codebase. You cannot rely on consumer teams to report regressions.

The eval challenge compounds this: each tool in your portfolio needs its own eval
suite, and those suites share common infrastructure. Without shared eval patterns, you
duplicate graders, rubrics, and fixture conventions across every plugin.

## Shared Eval Infrastructure

Platform teams need a shared foundation that every plugin eval builds on. This
eliminates duplication and enforces consistency.

### Base Configuration

A single base config defines the provider, timeout, output format, and universal
assertions. From [eval-infra/promptfoo-base.yaml](https://github.com/bailejl/dev-plugins/blob/main/eval-infra/promptfoo-base.yaml):

```yaml
providers:
  - id: anthropic:messages:claude-sonnet-4-20250514
    label: claude-sonnet
    config:
      temperature: 0
      max_tokens: 16384

defaultTest:
  options:
    timeout: 300000
    transform: output.trim()
  assert:
    # Universal assertions applied to every test case
    - type: javascript
      value: "output.length > 0"
      metric: non_empty_output
    - type: javascript
      value: "output.length >= 500"
      metric: min_output_length
    - type: javascript
      value: "output.length <= 50000"
      metric: max_output_length
```

Every plugin config replicates these defaults and adds plugin-specific variables
(`pluginRoot`, `fixtureRoot`, `graderRoot`, `referenceRoot`). Shared variables
(`evalInfraRoot`, `graderLibRoot`, `rubricRoot`) point back to the central
infrastructure.

### Shared Grader Library

The grader library ([eval-infra/grader-lib/](https://github.com/bailejl/dev-plugins/blob/main/eval-infra/grader-lib/)) provides reusable grading functions
that any plugin can use:

| Grader                   | Purpose                                             |
| ------------------------ | --------------------------------------------------- |
| `report-schema.js`       | Validates markdown heading structure or JSON fields |
| `finding-parser.js`      | Extracts findings with severity and evidence        |
| `hallucination-check.js` | Detects fabricated file path references             |
| `transcript-utils.js`    | Parses agent transcripts and tool-call sequences    |
| `build-check.sh`         | Runs `npm install && npm run build` in fixtures     |
| `lint-check.sh`          | Runs ESLint and reports error/warning counts        |

Plugin-specific graders import from the shared library. For example, a transcript
grader in [evals/ai-readiness/graders/transcript/evidence-gathering.js](https://github.com/bailejl/dev-plugins/blob/main/evals/ai-readiness/graders/transcript/evidence-gathering.js) loads
`transcript-utils.js` from the shared `graderLibRoot` path to parse transcripts
and count tool calls.

### Shared Rubric Templates

LLM rubric templates in [eval-infra/rubric-templates/](https://github.com/bailejl/dev-plugins/blob/main/eval-infra/rubric-templates/) provide consistent judging
criteria across plugins:

- `code-quality-base.md` - Five weighted criteria (correctness, readability,
  maintainability, idiomatic usage, error handling) with a 3.5/5 pass threshold
- `over-engineering-base.md` - Checks for unnecessary abstraction and complexity
- `instruction-following.md` - Checks adherence to prompt instructions
- `report-quality.md` - Evaluates report structure and actionability

Plugin-specific rubrics extend or reference these templates. This prevents each
plugin team from inventing their own quality criteria.

### The Extend and Specialize Pattern

The shared infrastructure provides the foundation. Each plugin specializes it:

1. **Base config** sets provider, timeout, and universal assertions
2. **Shared graders** handle common structural checks
3. **Shared rubrics** define baseline quality criteria
4. **Plugin config** adds plugin-specific variables and test suites
5. **Plugin graders** handle domain-specific checks (e.g., accessibility patterns,
   security vulnerability detection)
6. **Plugin rubrics** add domain-specific quality criteria

This layering means a new plugin gets structural validation, hallucination detection,
and transcript analysis for free. The plugin author only writes graders for the
domain-specific checks their tool needs.

## Multi-Plugin Eval Architecture

The monorepo structure separates shipping artifacts from eval infrastructure:

```
plugins/frontend-dev/          # Ships to users
  .claude-plugin/plugin.json
  commands/*.md
  agents/*.md
  skills/*/SKILL.md

plugins/ai-readiness/          # Ships to users
  .claude-plugin/plugin.json
  commands/*.md
  agents/*.md
  skills/*/SKILL.md

evals/frontend-dev/            # Stays in repo
  promptfooconfig.yaml
  suites/                      # 5 positive + 3 negative suites
  graders/{deterministic,transcript,llm-rubrics}/
  fixtures/
  reference-solutions/

evals/ai-readiness/            # Stays in repo
  promptfooconfig.yaml
  suites/                      # 7 positive + 7 negative suites
  graders/{deterministic,transcript,llm-rubrics}/
  fixtures/
  reference-solutions/

eval-infra/                    # Shared across all plugins
  promptfoo-base.yaml
  grader-lib/
  rubric-templates/
  scripts/
```

### Running Evals Across the Portfolio

Run evals for a single plugin or the entire portfolio:

```bash
npm run eval:frontend          # One plugin
npm run eval:readiness         # Another plugin
npm run eval:all               # All plugins
```

The [eval-infra/scripts/run-plugin-evals.sh](https://github.com/bailejl/dev-plugins/blob/main/eval-infra/scripts/run-plugin-evals.sh) script iterates over a `KNOWN_PLUGINS`
list, running each plugin's eval suite and aggregating results.

### Plugin Validation

Before running evals, validate that a plugin has the required structure:

```bash
./eval-infra/scripts/validate-plugin.sh frontend-dev
```

This checks for required directories, manifest fields, at least one command, at least
one eval suite, and proper naming conventions. Validation catches structural problems
before they cause confusing eval failures.

## Fixture Diversity

Platform tools must handle diverse codebases. Your fixture portfolio should cover the
range of code your tools will encounter in production.

### Building a Fixture Matrix

From [evals/ai-readiness/fixtures/](https://github.com/bailejl/dev-plugins/blob/main/evals/ai-readiness/fixtures/), seven fixture types exercise different tool
capabilities:

| Fixture                | What It Tests                            | Positive/Negative |
| ---------------------- | ---------------------------------------- | ----------------- |
| `messy-repo/`          | Naming, duplication, dead code detection | Positive          |
| `insecure-repo/`       | Security vulnerability detection         | Positive          |
| `bad-git-repo/`        | Git hygiene assessment                   | Positive          |
| `untested-repo/`       | Test coverage gap detection              | Positive          |
| `bad-api-repo/`        | API design issue detection               | Positive          |
| `spaghetti-arch-repo/` | Architecture problem detection           | Positive          |
| `clean-repo/`          | False positive prevention                | Negative          |

Each positive fixture has documented, planted issues. The `clean-repo/` fixture
follows best practices (clear naming, proper structure, tests, documentation) and
drives negative tests across multiple suites.

### Coverage Dimensions

Design fixtures to cover these dimensions:

- **Language/framework diversity**: If your tool supports React, Vue, and Angular,
  build fixtures for each.
- **Problem type diversity**: Naming issues, security vulnerabilities, architecture
  problems, missing tests, and API design flaws exercise different detection
  capabilities.
- **Severity diversity**: Include minor, moderate, and critical issues. Your tool
  should rate severity appropriately.
- **Clean examples**: At least one fixture per problem domain should be clean to
  drive negative tests.

## Reference Solutions as Platform Artifacts

Reference solutions serve double duty on a platform team:

1. **Grader calibration.** Compare agent output against the reference to verify
   graders catch real failures and pass correct behavior. When a grader disagrees
   with the reference solution, the grader is probably wrong.

2. **Onboarding material.** New team members read reference solutions to understand
   what good output looks like for each tool. The reference solution for
   `messy-repo-audit.md` documents exactly what findings the code review tool should
   produce, at what severity, with what evidence.

From [evals/ai-readiness/reference-solutions/](https://github.com/bailejl/dev-plugins/blob/main/evals/ai-readiness/reference-solutions/), seven reference solutions cover the
full fixture portfolio:

| Reference Solution           | Fixture                |
| ---------------------------- | ---------------------- |
| `messy-repo-audit.md`        | `messy-repo/`          |
| `insecure-repo-findings.md`  | `insecure-repo/`       |
| `bad-git-health-report.md`   | `bad-git-repo/`        |
| `untested-repo-findings.md`  | `untested-repo/`       |
| `bad-api-findings.md`        | `bad-api-repo/`        |
| `spaghetti-arch-findings.md` | `spaghetti-arch-repo/` |
| `clean-repo-audit.md`        | `clean-repo/`          |

The `clean-repo-audit.md` reference solution documents what the agent should say about
well-structured code: acknowledge what is done well, note minor improvement
opportunities without false alarm, and assign no critical or major findings.

## Meta-Evaluation

Platform teams face a second-order problem: how do you evaluate your eval
infrastructure itself? If your graders are miscalibrated or your fixtures are
unrealistic, your evals give false confidence.

### The Eval-Rubric Pattern

The eval-rubric pattern uses a structured assessment against known best practices.
This repo's `/eval-rubric` command scores the eval infrastructure against 12 dimensions
from Anthropic's "Demystifying Evals for AI Agents" article, each scored 0-5:

1. Start Early with Real Failures
2. Source from Real User Behavior
3. Unambiguous Tasks + Reference Solutions
4. Balanced Problem Sets
5. Robust Eval Harness + Stable Environment
6. Thoughtful Grader Design
7. Read Transcripts Regularly
8. Monitor Capability Eval Saturation
9. Maintain Evals Long-Term
10. Non-Determinism Handling
11. Agent-Specific Approaches
12. Holistic Evaluation

**Score thresholds:** 0-2 requires an action plan to reach 3. 3-4 indicates adequate
infrastructure with room for refinement. 5 indicates complete coverage.

The eval-rubric runs against the actual repo contents, reading suite files, grader
implementations, fixture directories, and CI configuration before scoring. It produces
evidence-based assessments, not opinions.

### Running Meta-Evaluation Periodically

Run the eval-rubric after significant infrastructure changes:

- Adding a new grader type
- Expanding the fixture portfolio
- Changing the base configuration
- Adding a new plugin

Track scores over time. A dimension that drops below 3 after an infrastructure
change indicates a regression in eval quality.

## Expert Validation Agents

[ACD]({{< relref "/docs/reference/glossary#acd-agentic-continuous-delivery" >}}) defines [expert validation agents]({{< relref "/docs/agentic-cd/operations/pipeline-enforcement#expert-validation-agents" >}})
that validate agent output at runtime, the production counterpart to offline
evals. Where evals catch issues during development, expert agents catch issues
during execution.

| Expert Agent          | What It Validates                | Offline Eval Counterpart          |
| --------------------- | -------------------------------- | --------------------------------- |
| Intent Clarity Agent  | Prompt matches user intent       | LLM rubric (intent alignment)    |
| Behavior Validation   | Output matches expected behavior | LLM rubric (behavior quality)    |
| Constraint Checker    | Output respects system rules     | Transcript grader (process)       |
| Implementation Review | Code quality and correctness     | Deterministic grader (structure)  |
| Truth Verification    | Output passes executable checks  | Deterministic grader (build/test) |

**Both need calibration.** Expert agents, like graders, can be miscalibrated.
Apply the same calibration discipline: test against known-good and known-bad
outputs, investigate disagreements, and recalibrate periodically.

**Both need negative testing.** An expert agent that flags everything is as
useless as a grader with 100% false positive rate. Test expert agents against
clean inputs to verify they do not fabricate issues.

**The division:** Offline evals validate during development. They run in [CI]({{< relref "/docs/reference/glossary#ci-continuous-integration" >}}) and
during prompt engineering. Expert agents validate during execution. They run
alongside the agent in production. A mature platform uses both.

## The Eval Lifecycle at Scale

### Adding New Plugins

When adding a new plugin to the platform, follow this checklist (detailed in
`docs/ADDING_A_PLUGIN.md`):

1. Create the plugin directory structure (`plugins/<name>/`)
2. Create the plugin manifest (`plugin.json`)
3. Write at least one command or agent
4. Create the eval directory structure (`evals/<name>/`)
5. Create the eval config replicating base defaults
6. Write at least one positive suite with a fixture
7. Write the corresponding negative suite
8. Add the plugin to `KNOWN_PLUGINS` in the run script
9. Validate structure with `validate-plugin.sh`

The checklist ensures every plugin ships with evals from day one. A plugin without
evals does not ship.

### Monitoring Capability Saturation

Track pass@k metrics over time for each plugin. When pass@5 consistently exceeds 95%
across all capability suites, the current eval suite is saturated. The tool handles
everything you test for. Either:

- The tool is genuinely excellent (check pass^5 to verify reliability)
- The tests are too easy (add harder fixtures, more subtle issues)
- The test suite has gaps (add new capability dimensions)

Saturation is a signal to expand the eval suite, not to stop evaluating.

### Baseline Management

Record baselines after significant prompt or eval changes:

```bash
./eval-infra/scripts/record-baseline.sh ai-readiness
```

This appends a timestamped JSON record to [evals/ai-readiness/eval-history.jsonl](https://github.com/bailejl/dev-plugins/blob/main/evals/ai-readiness/eval-history.jsonl)
with pass@k metrics, git commit, and branch. Use the history to:

- Detect metric regressions across prompt changes
- Measure the impact of model migrations
- Report capability improvement over time to stakeholders

### Eval Maintenance and Retirement

Eval suites require ongoing maintenance. Without a retirement policy, suites
accumulate stale tests that slow runs and obscure signal.

**When to retire eval cases:**

- **Saturated AND stable.** A test that passes consistently (pass^5 > 95%) across
  multiple model versions has served its purpose. Archive it, do not delete it.
  Archived tests can be re-activated if regressions appear.

**When to split suites:**

- **Suites exceeding 20 cases.** Large suites make it hard to identify which
  capability dimension failed. Split by capability dimension (e.g., separate
  "naming" from "architecture" tests).

**Ownership model:**

- **Shared graders** (in [eval-infra/grader-lib/](https://github.com/bailejl/dev-plugins/blob/main/eval-infra/grader-lib/)) - platform team owns
- **Plugin-specific graders** (in [evals/<plugin>/graders/](https://github.com/bailejl/dev-plugins/blob/main/evals/<plugin>/graders/)) - plugin team owns
- **Rubric templates** (in [eval-infra/rubric-templates/](https://github.com/bailejl/dev-plugins/blob/main/eval-infra/rubric-templates/)) - platform team owns

**Review cadence:** Quarterly, aligned with model migration timelines. Review
pass@k trends, retire saturated cases, split oversized suites, and recalibrate
graders against updated reference solutions.

## Common Platform Pitfalls

**Building tools without evals first.** The platform team ships a new plugin, gets
user complaints, and then scrambles to build evals. Write the eval suite alongside
the first command. Evals are the development tool, not an afterthought.

**Overly generic shared graders.** A grader that checks "output is valid markdown"
adds little value. Shared graders should check specific structural properties
(heading hierarchy, score arithmetic, hallucinated file paths) that apply across
multiple plugins.

**Overly specific shared graders.** A grader that checks for React-specific patterns
does not belong in the shared library. It belongs in the plugin's grader directory.
Keep the shared library domain-agnostic.

**Uncalibrated rubric templates.** LLM rubric templates need calibration against
reference solutions. Run the rubric against your reference solution and verify it
scores 4-5. Run it against a known-bad output and verify it scores 1-2. A rubric
that gives 3.5 to everything is useless.

**Not validating plugin structure.** A missing grader directory or misconfigured
manifest causes confusing eval failures. Run `validate-plugin.sh` before every eval
run in CI.

**Ignoring negative testing.** Platform tools face the strongest temptation to
over-report issues because they optimize for "finding things." Negative test suites
with clean fixtures are the only defense against false positive drift.

## Related Content

- [AI Eval Methodology]({{< relref "ai-eval-methodology" >}}) - Three-layer grading framework
  and core eval concepts
- [Team AI Evals for Coding Tools]({{< relref "team-ai-evals" >}}) - Setting up evals for
  individual team AI tools
- [Pipeline Enforcement]({{< relref "/docs/agentic-cd/operations/pipeline-enforcement" >}}) - How quality gates
  enforce ACD constraints
- [Tokenomics]({{< relref "/docs/agentic-cd/operations/tokenomics" >}}) - Optimizing [token]({{< relref "/docs/reference/glossary#token" >}}) usage in agent
  architecture
