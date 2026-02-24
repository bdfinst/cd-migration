---
title: "Getting Started: Where to Put What"
linkTitle: "Configuration Quick Start"
weight: 1
description: >
  How to structure agent configuration across the project context file, rules, skills, and hooks - mapped to their purpose and time horizon for effective context management.
---

{{% pageinfo %}}
Each configuration mechanism serves a different purpose. Placing information in the right mechanism controls [context](../glossary/#context-llm) cost: it determines what every [agent](../glossary/#agent-ai) pays on every invocation, and what must be loaded only when needed.
{{% /pageinfo %}}

## Configuration Mechanisms

| Mechanism | Purpose | When loaded |
|-----------|---------|-------------|
| Project context file | Project facts every agent always needs | Every session |
| Rules ([system prompts](../glossary/#system-prompt)) | Per-agent behavior constraints | Every agent invocation |
| Skills | Named session procedures - the specification | On explicit invocation |
| Commands | Named invocations - trigger a skill or a direct action | On user or agent call |
| Hooks | Automated, deterministic actions | On trigger event - no agent involved |

---

## Project Context File

The project context file is a markdown document that every agent reads at the start of every session. Put here anything that every agent always needs to know about the project. The filename differs by tool - Claude Code uses `CLAUDE.md`, Gemini CLI uses `GEMINI.md`, OpenAI Codex uses `AGENTS.md`, and GitHub Copilot uses `.github/copilot-instructions.md` - but the purpose does not.

**Put in the project context file:**

- Language, framework, and toolchain versions
- Repository structure - key directories and what lives where
- Architecture decisions that constrain all changes (example: "this service must not make synchronous external calls in the request path")
- Non-obvious conventions that agents would otherwise violate (example: "all database access goes through the repository layer; never access the ORM directly from handlers")
- Where tests live and naming conventions for test files
- Non-obvious business rules that govern all changes

**Do not put in the project context file:**

- Task instructions - those go in rules or skills
- File contents - load those dynamically per session
- Context specific to one agent - that goes in that agent's rules
- Anything an agent only needs occasionally - load it when needed, not always

Because the project context file loads on every session, every line is a [token](../glossary/#token) cost on every invocation. Keep it to stable facts, not procedures. A bloated project context file is an invisible per-session tax.

{{< tabpane lang="markdown" >}}
{{< tab header="Claude Code (CLAUDE.md)" >}}
# Language and toolchain
Language: Java 21, Spring Boot 3.2

# Repository structure
services/   bounded contexts - one service per domain
shared/     cross-cutting concerns - no domain logic here

# Architecture constraints
- No direct database access from handlers; all access through the repository layer
- All external calls go through a port interface; never instantiate adapters from handlers
- Payment processing is synchronous; fulfillment is always async via the event bus

# Test layout
src/test/unit/         fast, no I/O
src/test/integration/  requires running dependencies
Test class names mirror source class names with a Test suffix
{{< /tab >}}
{{< tab header="Gemini CLI (GEMINI.md)" >}}
# Language and toolchain
Language: Java 21, Spring Boot 3.2

# Repository structure
services/   bounded contexts - one service per domain
shared/     cross-cutting concerns - no domain logic here

# Architecture constraints
- No direct database access from handlers; all access through the repository layer
- All external calls go through a port interface; never instantiate adapters from handlers
- Payment processing is synchronous; fulfillment is always async via the event bus

# Test layout
src/test/unit/         fast, no I/O
src/test/integration/  requires running dependencies
Test class names mirror source class names with a Test suffix
{{< /tab >}}
{{< tab header="OpenAI Codex (AGENTS.md)" >}}
# Language and toolchain
Language: Java 21, Spring Boot 3.2

# Repository structure
services/   bounded contexts - one service per domain
shared/     cross-cutting concerns - no domain logic here

# Architecture constraints
- No direct database access from handlers; all access through the repository layer
- All external calls go through a port interface; never instantiate adapters from handlers
- Payment processing is synchronous; fulfillment is always async via the event bus

# Test layout
src/test/unit/         fast, no I/O
src/test/integration/  requires running dependencies
Test class names mirror source class names with a Test suffix
{{< /tab >}}
{{< tab header="GitHub Copilot (.github/copilot-instructions.md)" >}}
# Language and toolchain
Language: Java 21, Spring Boot 3.2

# Repository structure
services/   bounded contexts - one service per domain
shared/     cross-cutting concerns - no domain logic here

# Architecture constraints
- No direct database access from handlers; all access through the repository layer
- All external calls go through a port interface; never instantiate adapters from handlers
- Payment processing is synchronous; fulfillment is always async via the event bus

# Test layout
src/test/unit/         fast, no I/O
src/test/integration/  requires running dependencies
Test class names mirror source class names with a Test suffix
{{< /tab >}}
{{< /tabpane >}}

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

- Project facts - those go in the project context file
- Session-specific information - that is loaded dynamically by the [orchestrator](../glossary/#orchestrator)
- Multi-step procedures - those go in skills

Rules are placed first in every agent's context. This placement is a caching decision, not just convention. Stable content at the top of context allows the model's server to cache the rules prefix and reuse it across calls, which reduces the effective input cost of every invocation. See [Tokenomics](../tokenomics/) for how caching interacts with context order.

Rules are plain markdown, injected at session start. The content is the same regardless of tool; where it lives differs.

{{< tabpane lang="markdown" >}}
{{< tab header="Claude Code (CLAUDE.md)" >}}
## Implementation Rules

Implement exactly one BDD scenario per session.
Output: return code changes only. No explanation, no rationale, no alternatives.
Flag a concern as: CONCERN: [one sentence]. The orchestrator decides what to do with it.

Context: modify only files provided in your context.
If you need a file not provided, request it as:
  CONTEXT_NEEDED: [filename] - [one sentence why]
Do not infer or reproduce the contents of files not in your context.

Done when: the acceptance test for this scenario passes and all prior tests still pass.
{{< /tab >}}
{{< tab header="Gemini CLI (GEMINI.md)" >}}
## Implementation Rules

Implement exactly one BDD scenario per session.
Output: return code changes only. No explanation, no rationale, no alternatives.
Flag a concern as: CONCERN: [one sentence]. The orchestrator decides what to do with it.

Context: modify only files provided in your context.
If you need a file not provided, request it as:
  CONTEXT_NEEDED: [filename] - [one sentence why]
Do not infer or reproduce the contents of files not in your context.

Done when: the acceptance test for this scenario passes and all prior tests still pass.
{{< /tab >}}
{{< tab header="OpenAI Codex (AGENTS.md)" >}}
## Implementation Rules

Implement exactly one BDD scenario per session.
Output: return code changes only. No explanation, no rationale, no alternatives.
Flag a concern as: CONCERN: [one sentence]. The orchestrator decides what to do with it.

Context: modify only files provided in your context.
If you need a file not provided, request it as:
  CONTEXT_NEEDED: [filename] - [one sentence why]
Do not infer or reproduce the contents of files not in your context.

Done when: the acceptance test for this scenario passes and all prior tests still pass.
{{< /tab >}}
{{< tab header="GitHub Copilot (.github/copilot-instructions.md)" >}}
## Implementation Rules

Implement exactly one BDD scenario per session.
Output: return code changes only. No explanation, no rationale, no alternatives.
Flag a concern as: CONCERN: [one sentence]. The orchestrator decides what to do with it.

Context: modify only files provided in your context.
If you need a file not provided, request it as:
  CONTEXT_NEEDED: [filename] - [one sentence why]
Do not infer or reproduce the contents of files not in your context.

Done when: the acceptance test for this scenario passes and all prior tests still pass.
{{< /tab >}}
{{< /tabpane >}}

---

## Skills

A skill is a named session procedure - a markdown document describing a multi-step workflow that an agent invokes by name. The agent reads the skill document, follows its instructions, and returns a result. A skill has no runtime; it is pure specification in text. Claude Code calls these commands and stores them in `.claude/commands/`; Gemini CLI uses `.gemini/skills/`; OpenAI Codex supports procedure definitions in `AGENTS.md`; GitHub Copilot reads procedure markdown from `.github/`.

**Put in skills:**

- Session lifecycle procedures: how to start a session, how to run the pre-commit review gate, how to close a session and write the summary
- Pipeline-restore procedures for when the [pipeline](../glossary/#pipeline) fails mid-session
- Any multi-step workflow the agent should execute consistently and reproducibly

**Do not put in skills:**

- One-time instructions - write those inline
- Anything that should run automatically without agent involvement - that belongs in a hook
- Project facts - those go in the project context file
- Per-agent behavior constraints - those go in rules

Each skill should do one thing. A skill named `review-and-commit` is doing two things. Split it. When a procedure fails mid-execution, a single-responsibility skill makes it obvious which step failed and where to look.

{{< tabpane lang="markdown" >}}
{{< tab header="Claude Code (.claude/commands/)" >}}
## /start-session

Assemble context in this order (stable first - maximizes cache hits):
1. Implementation agent rules [stable - cached across all sessions]
2. Feature description [stable within a feature - often cached]
3. BDD scenario for this session only [changes per session]
4. Files the scenario will touch [changes per session]
5. Prior session summary if one exists [changes per session]

Omit any item where omitting it would not change what the agent produces.
Present the assembled context to the user, then invoke the implementation agent.
{{< /tab >}}
{{< tab header="Gemini CLI (.gemini/skills/)" >}}
## /start-session

Assemble context in this order (stable first - maximizes cache hits):
1. Implementation agent rules [stable - cached across all sessions]
2. Feature description [stable within a feature - often cached]
3. BDD scenario for this session only [changes per session]
4. Files the scenario will touch [changes per session]
5. Prior session summary if one exists [changes per session]

Omit any item where omitting it would not change what the agent produces.
Present the assembled context to the user, then invoke the implementation agent.
{{< /tab >}}
{{< tab header="OpenAI Codex (AGENTS.md section)" >}}
## /start-session

Assemble context in this order (stable first - maximizes cache hits):
1. Implementation agent rules [stable - cached across all sessions]
2. Feature description [stable within a feature - often cached]
3. BDD scenario for this session only [changes per session]
4. Files the scenario will touch [changes per session]
5. Prior session summary if one exists [changes per session]

Omit any item where omitting it would not change what the agent produces.
Present the assembled context to the user, then invoke the implementation agent.
{{< /tab >}}
{{< tab header="GitHub Copilot (.github/)" >}}
## /start-session

Assemble context in this order (stable first - maximizes cache hits):
1. Implementation agent rules [stable - cached across all sessions]
2. Feature description [stable within a feature - often cached]
3. BDD scenario for this session only [changes per session]
4. Files the scenario will touch [changes per session]
5. Prior session summary if one exists [changes per session]

Omit any item where omitting it would not change what the agent produces.
Present the assembled context to the user, then invoke the implementation agent.
{{< /tab >}}
{{< /tabpane >}}

A normal session runs three skills in sequence: `/start-session` (assembles context and prepares the implementation agent), `/review` (invokes the pre-commit review gate), and `/end-session` (validates all gates, writes the session summary, and commits). Add `/fix` for pipeline-restore mode. See [Coding Agent Configuration](../agent-configuration/#skills) for the complete definition of each skill.

---

## Commands

A command is a named invocation - it is how you or the agent triggers a skill. Skills define what to do; commands are how you call them. In Claude Code, a file named `start-session.md` in `.claude/commands/` creates the `/start-session` command automatically. In Gemini CLI, skills in `.gemini/skills/` are invoked by name in the same way. The command name and the skill document are one-to-one: one file, one command.

**Put in commands:**

- Short-form aliases for frequently used skills (example: `/review` instead of "run the pre-commit review gate")
- Direct one-line instructions that do not need a full skill document ("summarize the session", "list open scenarios")
- Agent actions you want to invoke consistently by name without retyping the instruction

**Do not put in commands:**

- Multi-step procedures - those belong in a skill document that the command references
- Anything that should run without being called - that belongs in a hook
- Project facts or behavior constraints - those go in the project context file or rules

A command that runs a multi-step procedure should invoke the skill document by name, not inline the steps. This keeps the command short and the procedure in one place.

{{< tabpane lang="markdown" >}}
{{< tab header="Claude Code (.claude/commands/)" >}}
# .claude/commands/review.md
# Invoked as: /review

Run the pre-commit review gate against all staged changes.
Pass staged diff, current BDD scenario, and feature description to the review orchestrator.
Parse the JSON result directly. If "decision" is "block", return findings to the implementation agent.
Do not commit until /review returns {"decision": "pass"}.
{{< /tab >}}
{{< tab header="Gemini CLI (.gemini/skills/)" >}}
# .gemini/skills/review.md
# Invoked as: /review

Run the pre-commit review gate against all staged changes.
Pass staged diff, current BDD scenario, and feature description to the review orchestrator.
Parse the JSON result directly. If "decision" is "block", return findings to the implementation agent.
Do not commit until /review returns {"decision": "pass"}.
{{< /tab >}}
{{< tab header="OpenAI Codex (AGENTS.md)" >}}
# Defined as a named task section in AGENTS.md
# Invoked by name in the session prompt

## Task: review

Run the pre-commit review gate against all staged changes.
Pass staged diff, current BDD scenario, and feature description to the review orchestrator.
Parse the JSON result directly. If "decision" is "block", return findings to the implementation agent.
Do not commit until review returns {"decision": "pass"}.
{{< /tab >}}
{{< tab header="GitHub Copilot (.github/)" >}}
# .github/review.md
# Referenced by name in the session prompt

Run the pre-commit review gate against all staged changes.
Pass staged diff, current BDD scenario, and feature description to the review orchestrator.
Parse the JSON result directly. If "decision" is "block", return findings to the implementation agent.
Do not commit until review returns {"decision": "pass"}.
{{< /tab >}}
{{< /tabpane >}}

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

Git pre-commit hooks are independent of the AI tool - they run via git regardless of which model you use. Claude Code and Gemini CLI additionally support tool-use hooks in their `settings.json`, which trigger shell commands in response to agent events (for example, running linters automatically when the agent stops). OpenAI Codex and GitHub Copilot do not have an equivalent built-in hook system; use git hooks directly with those tools.

{{< tabpane persist="disabled" >}}
{{< tab header="Git hooks (all tools)" lang="yaml" >}}
# .pre-commit-config.yaml - runs on git commit, before AI review
repos:
  - repo: local
    hooks:
      - id: lint
        name: Lint
        entry: npm run lint -- --check
        language: system
        pass_filenames: false

      - id: type-check
        name: Type check
        entry: npm run type-check
        language: system
        pass_filenames: false

      - id: secret-scan
        name: Secret scan
        entry: detect-secrets-hook
        language: system
        pass_filenames: false

      - id: sast
        name: Static analysis
        entry: semgrep --config auto
        language: system
        pass_filenames: false
{{< /tab >}}
{{< tab header="Claude Code (.claude/settings.json)" lang="json" >}}
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "npm run lint -- --check && npm run type-check"
          }
        ]
      }
    ]
  }
}
{{< /tab >}}
{{< tab header="Gemini CLI (.gemini/settings.json)" lang="json" >}}
{
  "hooks": {
    "afterResponse": [
      {
        "command": "npm run lint -- --check && npm run type-check"
      }
    ]
  }
}
{{< /tab >}}
{{< tab header="OpenAI Codex / GitHub Copilot" lang="text" >}}
No built-in tool-use hook system. Use git hooks (.pre-commit-config.yaml)
alongside these tools - see the "Git hooks (all tools)" tab.
{{< /tab >}}
{{< /tabpane >}}

The AI review step (`/review`) runs after these pass. It is invoked by the agent as part of the session workflow, not by the hook sequence directly.

---

## Decision Framework

For any piece of information or procedure, apply this sequence:

1. Does every agent always need this? - Project context file
2. Does this constrain how one specific agent behaves? - That agent's rules
3. Is this a multi-step procedure invoked by name? - A skill
4. Is this a short invocation that triggers a skill or a direct action? - A command
5. Should this run automatically without any agent decision? - A hook

---

## Context Loading Order

Within each agent invocation, load context in this order:

1. Agent rules (stable - cached across every invocation)
2. Project context file (stable - cached across every invocation)
3. Feature description (stable within a feature - often cached)
4. [BDD](../glossary/#bdd-behavior-driven-development) scenario for this session (changes per session)
5. Relevant existing files (changes per session)
6. Prior session summary (changes per session)
7. Staged diff or current task context (changes per invocation)

Stable content at the top. Volatile content at the bottom. Rules and the project context file belong at the top because they are constant across invocations and benefit from server-side caching. Staged diffs and current files change on every call and provide no caching benefit regardless of where they appear.

---

## File Layout

The examples below show how the configuration mechanisms map to Claude Code, Gemini CLI,
OpenAI Codex CLI, and GitHub Copilot. The file names and locations differ; the purpose
of each mechanism does not.

{{< tabpane lang="text" >}}
{{< tab header="Claude Code" >}}
.claude/
  agents/
    orchestrator.md     # sub-agent definition: system prompt + model for the orchestrator
    implementation.md   # sub-agent definition: system prompt + model for code generation
    review.md           # sub-agent definition: system prompt + model for review coordination
  commands/
    start-session.md    # skill + command: /start-session - session initialization
    review.md           # skill + command: /review - pre-commit gate
    end-session.md      # skill + command: /end-session - writes summary and commits
    fix.md              # skill + command: /fix - pipeline-restore mode
  settings.json         # hooks - tool-use event triggers (Stop, PreToolUse, etc.)
CLAUDE.md               # project context file - facts for all agents
{{< /tab >}}
{{< tab header="Gemini CLI" >}}
.gemini/
  skills/
    start-session.md   # skill document - invoked as /start-session
    review.md          # skill document - invoked as /review
    end-session.md     # skill document - invoked as /end-session
    fix.md             # skill document - invoked as /fix
  settings.json        # hooks - afterResponse and other event triggers
GEMINI.md              # project context file - facts for all agents
                       # agent configurations injected programmatically at session start
{{< /tab >}}
{{< tab header="OpenAI Codex" >}}
AGENTS.md   # project context file and named task definitions
            # skills and commands defined as ## Task: name sections
            # agent configurations injected programmatically at session start
            # git hooks handle pre-commit checks (.pre-commit-config.yaml)
{{< /tab >}}
{{< tab header="GitHub Copilot" >}}
.github/
  copilot-instructions.md   # project context file - facts for all agents
  start-session.md           # skill document - referenced by name in the session
  review.md                  # skill document - referenced by name in the session
  end-session.md             # skill document - referenced by name in the session
  fix.md                     # skill document - referenced by name in the session
                             # agent configurations injected via VS Code extension settings
                             # git hooks handle pre-commit checks (.pre-commit-config.yaml)
{{< /tab >}}
{{< /tabpane >}}

The skill and command documents are plain markdown in all cases - the same procedure
text works across tools because skills are specifications, not code. In Claude Code,
the commands directory unifies both: each file in `.claude/commands/` is a skill
document and creates a slash command of the same name. The `.claude/agents/` directory
is specific to Claude Code - it defines named [sub-agents](../glossary/#sub-agent) with their own system prompt
and model tier, invocable by the orchestrator. Other tools handle agent configuration
programmatically rather than via files. For multi-agent architectures and advanced
agent composition, see [Agentic Architecture Patterns](../agentic-architecture/).

---

## Decomposed Context by Code Area

A single project context file at the repo root works for small codebases. For larger
ones with distinct bounded contexts, split the project context file by code area.
Claude Code, Gemini CLI, and OpenAI Codex load context files hierarchically: when an
agent works in a subdirectory, it reads the context file there in addition to the
root-level file. Area-specific facts stay out of the root file and load only when
relevant, which reduces per-session token cost for agents working in unrelated areas.

{{< tabpane lang="text" >}}
{{< tab header="Claude Code" >}}
CLAUDE.md       # repo-wide: language, toolchain, top-level architecture
src/
  payments/
    CLAUDE.md   # payments context: domain rules, payment processor contracts
  inventory/
    CLAUDE.md   # inventory context: stock rules, warehouse integrations
  api/
    CLAUDE.md   # API layer: auth patterns, rate limiting conventions
{{< /tab >}}
{{< tab header="Gemini CLI" >}}
GEMINI.md       # repo-wide: language, toolchain, top-level architecture
src/
  payments/
    GEMINI.md   # payments context: domain rules, payment processor contracts
  inventory/
    GEMINI.md   # inventory context: stock rules, warehouse integrations
  api/
    GEMINI.md   # API layer: auth patterns, rate limiting conventions
{{< /tab >}}
{{< tab header="OpenAI Codex" >}}
AGENTS.md       # repo-wide: language, toolchain, top-level architecture
src/
  payments/
    AGENTS.md   # payments context: domain rules, payment processor contracts
  inventory/
    AGENTS.md   # inventory context: stock rules, warehouse integrations
  api/
    AGENTS.md   # API layer: auth patterns, rate limiting conventions
{{< /tab >}}
{{< tab header="GitHub Copilot" >}}
# GitHub Copilot uses a single .github/copilot-instructions.md
# Decompose by area using sections within that file

.github/
  copilot-instructions.md   # repo-wide facts at the top; area sections below

# Inside copilot-instructions.md:
#
# ## Payments
# Domain rules and payment processor contracts
#
# ## Inventory
# Stock rules and warehouse integrations
#
# ## API layer
# Auth patterns and rate limiting conventions
{{< /tab >}}
{{< /tabpane >}}

**What goes in area-specific files:** Facts that apply only to that area - domain rules,
local naming conventions, area-specific architecture constraints, and non-obvious
business rules that govern changes in that part of the codebase. Do not repeat content
already in the root file.

---

## Related Content

- [Agentic Architecture Patterns](../agentic-architecture/) - the design principles behind skills, agents, hooks, and multi-agent composition
- [Coding Agent Configuration](../agent-configuration/) - the complete rules, skills, and hooks for a coding and pre-commit review configuration
- [Small-Batch Sessions](../small-batch-sessions/) - how session discipline and context hygiene work together
- [Tokenomics](../tokenomics/) - the full optimization framework including prompt caching strategy and context order
