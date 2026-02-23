---
title: "Getting Started: Where to Put What"
linkTitle: "Configuration Quick Start"
weight: 5
description: >
  How to structure agent configuration across CLAUDE.md, rules, skills, and hooks - mapped to their purpose and time horizon for effective context management.
---

{{% pageinfo %}}
The four configuration mechanisms serve four different purposes. Placing information in the right mechanism controls context cost: it determines what every agent pays on every invocation, and what must be loaded only when needed.
{{% /pageinfo %}}

## The Four Mechanisms

| Mechanism | Purpose | When loaded |
|-----------|---------|-------------|
| `CLAUDE.md` | Project facts every agent always needs | Every session |
| Rules (system prompts) | Per-agent behavior constraints | Every agent invocation |
| Skills | Named session procedures | On explicit invocation |
| Hooks | Automated, deterministic actions | On trigger event - no agent involved |

---

## `CLAUDE.md`

`CLAUDE.md` is the project context document. Every agent reads it at the start of every session. Put here anything that every agent always needs to know about the project.

**Put in `CLAUDE.md`:**

- Language, framework, and toolchain versions
- Repository structure - key directories and what lives where
- Architecture decisions that constrain all changes (example: "this service must not make synchronous external calls in the request path")
- Non-obvious conventions that agents would otherwise violate (example: "all database access goes through the repository layer; never access the ORM directly from handlers")
- Where tests live and naming conventions for test files
- Non-obvious business rules that govern all changes

**Do not put in `CLAUDE.md`:**

- Task instructions - those go in rules or skills
- File contents - load those dynamically per session
- Context specific to one agent - that goes in that agent's rules
- Anything an agent only needs occasionally - load it when needed, not always

Because `CLAUDE.md` loads on every session, every line is a token cost on every invocation. Keep it to stable facts, not procedures. A bloated `CLAUDE.md` is an invisible per-session tax.

---

## Rules (System Prompts)

Rules define how a specific agent behaves. Each agent has its own rules document, injected at the top of that agent's context on every invocation. Rules are stable across sessions - they define the agent's operating constraints, not what it is doing right now.

**Put in rules:**

- Agent scope: what the agent is responsible for, and explicitly what it is not
- Output format requirements - especially for agents whose output feeds another agent (use structured JSON at these boundaries)
- Explicit prohibitions ("do not modify files not in your context")
- Early-exit conditions to minimize cost ("if the diff contains no logic changes, return `{"decision": "pass"}` immediately without analysis")
- Verbosity constraints ("return code only; no explanation unless explicitly requested")

**Do not put in rules:**

- Project facts - those go in `CLAUDE.md`
- Session-specific information - that is loaded dynamically by the orchestrator
- Multi-step procedures - those go in skills

Rules are placed first in every agent's context. This placement is a caching decision, not just convention. Stable content at the top of context allows the model's server to cache the rules prefix and reuse it across calls, which reduces the effective input cost of every invocation. See [Tokenomics](../tokenomics/) for how caching interacts with context order.

---

## Skills

A skill is a named session procedure - a markdown document describing a multi-step workflow that an agent invokes by name. Skills live in `.claude/skills/`. The agent reads the skill document, follows its instructions, and returns a result. A skill has no runtime; it is pure specification in text.

**Put in skills:**

- Session lifecycle procedures: how to start a session, how to run the pre-commit review gate, how to close a session and write the summary
- Pipeline-restore procedures for when the pipeline fails mid-session
- Any multi-step workflow the agent should execute consistently and reproducibly

**Do not put in skills:**

- One-time instructions - write those inline
- Anything that should run automatically without agent involvement - that belongs in a hook
- Project facts - those go in `CLAUDE.md`
- Per-agent behavior constraints - those go in rules

Each skill should do one thing. A skill named `review-and-commit` is doing two things. Split it. When a procedure fails mid-execution, a single-responsibility skill makes it obvious which step failed and where to look.

A normal session runs three skills in sequence: `/start-session` (assembles context and prepares the implementation agent), `/review` (invokes the pre-commit review gate), and `/end-session` (validates all gates, writes the session summary, and commits). Add `/fix` for pipeline-restore mode. See [Coding Agent Configuration](../agent-configuration/#skills) for the complete definition of each skill.

---

## Hooks

Hooks are automated actions triggered by events - pre-commit, file-save, post-test. Hooks run deterministic tooling: linters, type checkers, secret scanners, static analysis. No agent decision is involved; the tool either passes or blocks.

**Put in hooks:**

- Linting and formatting checks
- Type checking
- Secret scanning
- Static analysis (SAST)
- Any check that is fast, deterministic, and should block on failure without requiring judgment

**Do not put in hooks:**

- Semantic review - that requires an agent; invoke the review orchestrator via a skill
- Checks that require judgment - agents decide, hooks enforce
- Steps that depend on session context - hooks operate without session awareness

Hooks run before the review agent. If the linter fails, there is no reason to invoke the review orchestrator. Deterministic checks fail fast; the AI review gate runs only on changes that pass the baseline mechanical checks.

---

## Decision Framework

For any piece of information or procedure, apply this sequence:

1. Does every agent always need this? - `CLAUDE.md`
2. Does this constrain how one specific agent behaves? - That agent's rules
3. Is this a multi-step procedure invoked by name? - A skill
4. Should this run automatically without any agent decision? - A hook

---

## Context Loading Order

Within each agent invocation, load context in this order:

1. Agent rules (stable - cached across every invocation)
2. `CLAUDE.md` project context (stable - cached across every invocation)
3. Feature description (stable within a feature - often cached)
4. BDD scenario for this session (changes per session)
5. Relevant existing files (changes per session)
6. Prior session summary (changes per session)
7. Staged diff or current task context (changes per invocation)

Stable content at the top. Volatile content at the bottom. Rules and `CLAUDE.md` belong at the top because they are constant across invocations and benefit from server-side caching. Staged diffs and current files change on every call and provide no caching benefit regardless of where they appear.

---

## File Layout

A Claude Code project configured for ACD has this structure:

{{< code-collapse title="Claude Code ACD project layout" lang="text" >}}
.claude/
  skills/
    start-session.md    # session initialization - assembles context for the implementation agent
    review.md           # pre-commit gate - invokes the review orchestrator
    end-session.md      # session close - writes summary and commits
    fix.md              # pipeline-restore mode - minimum context, one failing test
  settings.json         # hooks and Claude Code configuration
CLAUDE.md               # project facts for all agents
{{< /code-collapse >}}

The skill documents contain the procedure text in markdown. The hooks configuration lives in `.claude/settings.json`. The agent rules (system prompts) are stored in your agent framework or injected programmatically at session start.

---

## Related Content

- [Agentic Architecture Patterns](../agentic-architecture/) - the design principles behind skills, agents, hooks, and multi-agent composition
- [Coding Agent Configuration](../agent-configuration/) - the complete rules, skills, and hooks for a coding and pre-commit review configuration
- [Small-Batch Sessions](../small-batch-sessions/) - how session discipline and context hygiene work together
- [Tokenomics](../tokenomics/) - the full optimization framework including prompt caching strategy and context order
