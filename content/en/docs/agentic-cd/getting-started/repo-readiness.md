---
title: "Repository Readiness for Agentic Development"
linkTitle: "Repository Readiness"
weight: 3
description: >
  How to assess and upgrade a repository so AI agents can clone, build, test, and iterate without human intervention - and why that readiness directly affects agent accuracy and cost.
---

{{% pageinfo %}}
[Agents](../../reference/glossary/#agent-ai) operate on feedback loops: propose a change, run the build, read the output, iterate. Every gap in repository readiness - broken builds, flaky tests, unclear output, manual setup steps - widens the loop, wastes [tokens](../../reference/glossary/#token), and degrades accuracy. This page provides a scoring rubric, a prioritized upgrade sequence, and concrete guidance for making a repository agent-ready.
{{% /pageinfo %}}

## Readiness Scoring

Use this rubric to assess how ready a repository is for agentic workflows. Score each criterion independently. A repository does not need a perfect score to start using agents, but anything scored 0 or 1 blocks agents entirely or makes them unreliable.

| Criterion | 0 - Blocks agents | 1 - Unreliable | 2 - Usable | 3 - Optimized |
|-----------|-------------------|----------------|------------|---------------|
| **Build reproducibility** | Build does not run without manual steps | Build works but requires environment-specific setup | Build runs from a single documented command | Build runs in any clean environment with no pre-configuration |
| **Test coverage and quality** | No automated tests | Tests exist but are flaky or require manual setup | Tests run reliably with clear pass/fail output | Fast unit tests with clear failure messages, contract tests at boundaries, build verification tests |
| **[CI](../../reference/glossary/#ci-continuous-integration) [pipeline](../../reference/glossary/#pipeline) clarity** | No CI pipeline | Pipeline exists but fails intermittently or has unclear stages | Pipeline runs on every commit with clear stage names | Pipeline runs in under ten minutes with deterministic results |
| **Documentation of entry points** | No README or build instructions | README exists but is outdated or incomplete | Single documented build command and single documented test command | Entry points documented in the project context file (CLAUDE.md, GEMINI.md, or equivalent) |
| **Dependency hygiene** | Broken or missing dependency resolution | Dependencies resolve but require manual intervention (system packages, credentials) | Dependencies resolve from a single install command | Dependencies pinned, lockfile committed, no external credential required for build |
| **Code modularity** | God classes or files with thousands of lines; no discernible module boundaries | Modules exist but are tightly coupled; changing one requires loading many others | Modules have clear boundaries; most changes touch one or two modules | Explicit interfaces at module boundaries; each module can be understood and tested in isolation |
| **Naming and domain language** | Inconsistent terminology; same concept has different names across files | Some naming conventions but not enforced; generic names common | Consistent naming within modules; domain terms recognizable | Ubiquitous language used uniformly across code, tests, and documentation |
| **Formatting and style enforcement** | No formatter or linter; inconsistent style across files | Formatter exists but not enforced automatically | Formatter runs on pre-commit; style is consistent | Formatter and linter enforced in CI; zero-tolerance for style violations |
| **Dead code and noise** | Large amounts of commented-out code, unused imports, abandoned modules | Some dead code; developers aware but no systematic removal | Dead code removed periodically; unused imports caught by linter | Automated dead code detection in CI; no commented-out code in the codebase |
| **Type safety** | No type annotations; function signatures reveal nothing about expected inputs or outputs | Partial type coverage; critical paths untyped | Core business logic typed; external boundaries have type definitions | Full type coverage enforced; compiler or type checker catches contract violations before tests run |
| **Error handling consistency** | Multiple conflicting patterns; some errors swallowed silently | Dominant pattern exists but exceptions scattered throughout | Single documented pattern used in most code; deviations are rare | One error handling pattern enforced by linter rules; agents never have to guess which pattern to follow |

**Interpreting scores:**

- **Any criterion at 0:** Agents cannot work in this repository. Fix these first.
- **Any criterion at 1:** Agents will produce unreliable results. Expect high retry rates and wasted tokens.
- **All criteria at 2 or above:** Agents can work effectively. Improvements from 2 to 3 reduce token cost and increase accuracy.

## Recommended Order of Operations

Upgrade the repository in this order. Each step unblocks the next. Skipping ahead creates problems that are harder to diagnose because earlier foundations are missing.

### Step 1: Make the build runnable

{{% alert title="Impact: Critical" color="danger" %}}
Without a runnable build, agents cannot verify any change. This is a hard blocker - no other improvement matters until the build works.
{{% /alert %}}

**What blocks agents entirely:** no runnable build, broken [dependency](../../reference/glossary/#dependency) resolution, build requires credentials or manual environment setup.

- Ensure a single command (e.g., `make build`, `./gradlew build`, `npm run build`) works in a clean checkout with no prior setup beyond dependency installation
- Pin all dependencies with a committed lockfile
- Remove any requirement for environment variables that do not have documented defaults
- Document the build command in the README and in the project context file

An agent that cannot build the project cannot verify any change it makes. Every other improvement depends on this.

**How AI can help:** Use an agent to audit the build process. Point it at the repository and ask it to clone, install dependencies, and build from scratch. Every failure it encounters is a gap that will block future agentic work. Agents can also generate missing build scripts, create Dockerfiles for reproducible build environments, and identify undeclared dependencies by analyzing import statements against the dependency manifest.

### Step 2: Make tests reliable

{{% alert title="Impact: Critical" color="danger" %}}
Unreliable tests destroy the agent's feedback loop. An agent that cannot trust test results cannot distinguish between its own mistakes and test noise, producing incorrect fixes at scale.
{{% /alert %}}

**What makes agents unreliable:** flaky tests, tests that require manual setup, tests that depend on external services without mocking, tests that pass in one environment but fail in another.

- Fix or quarantine flaky tests. A test suite that randomly fails teaches agents to ignore failures.
- Remove external service dependencies from unit tests. Use [test doubles]({{< relref "/docs/testing/glossary#test-double" >}}) for anything outside the process boundary.
- Ensure tests run from a single command with no manual pre-steps
- Make test output deterministic: same inputs, same results, every time

See [Testing Fundamentals]({{< relref "/docs/migrate-to-cd/foundations/testing-fundamentals" >}}) for the test architecture that supports this.

**How AI can help:** Use an agent to run the test suite repeatedly and flag tests that produce different results across runs. Agents can also analyze test code to identify external service calls that should be replaced with test doubles, find shared mutable state between tests, and generate the stub or mock implementations needed to isolate unit tests from external dependencies.

### Step 3: Improve feedback signal quality

{{% alert title="Impact: High" color="warning" %}}
Clear, fast feedback is the difference between an agent that self-corrects on the first retry and one that burns tokens guessing. This step directly reduces correction loop frequency and cost.
{{% /alert %}}

**What makes agents less effective:** broad integration tests with ambiguous failure messages, tests that report "assertion failed" without indicating what was expected versus what was received, slow test suites that delay feedback.

- Ensure every test failure message includes what was expected, what was received, and where the failure occurred
- Separate fast unit tests (seconds) from slower integration tests (minutes). Agents should be able to run the fast suite on every iteration.
- Reduce total test suite time. Agents iterate faster with faster feedback. A ten-minute suite means ten minutes per attempt; a thirty-second unit suite means thirty seconds.
- Structure test output so pass/fail is unambiguous. A test runner that exits with code 0 on success and non-zero on failure, with failure details on stdout, gives agents a clear signal.

**How AI can help:** Use an agent to scan test assertions and rewrite bare assertions (e.g., `assertTrue(result)`) into descriptive ones that include expected and actual values. Agents can also analyze test suite timing to identify the slowest tests, suggest which integration tests can be replaced with faster unit tests, and split a monolithic test suite into fast and slow tiers with separate run commands.

### Step 4: Document for agents

{{% alert title="Impact: High" color="warning" %}}
Undocumented conventions force agents to infer intent from code patterns, which works until the patterns are inconsistent. Explicit documentation eliminates an entire class of agent errors for minimal effort.
{{% /alert %}}

**What reduces agent effectiveness:** undocumented conventions, implicit setup steps, architecture decisions that exist only in developers' heads.

- Create or update the project context file ([Configuration Quick Start]({{< relref "/docs/agentic-cd/getting-started/agent-setup" >}}) covers where to put what)
- Document the build command, test command, and any non-obvious conventions
- Document architecture constraints that affect how changes should be made
- Document test file naming conventions and directory structure

**How AI can help:** Use an agent to generate the initial project context file. Point it at the codebase and ask it to document the build command, test command, directory structure, key conventions, and architecture constraints it can infer from the code. Have a developer review and correct the output. An agent reading the codebase will miss implicit knowledge that lives only in developers' heads, but it will capture the structural facts accurately and surface gaps where documentation is needed.

### Step 5: Improve code modularity

{{% alert title="Impact: High" color="warning" %}}
Modularity controls how much code an agent must load to make a single change. Tightly coupled code forces agents to consume context budget on unrelated files, reducing both accuracy and the complexity of tasks they can handle.
{{% /alert %}}

**What increases token cost and reduces accuracy:** large files that mix multiple concerns, tight coupling between modules, no clear boundaries between components.

Modularity determines how much code an agent must load into context to make a single change. A loosely coupled module with an explicit interface can be passed to an agent as self-contained context. A tightly coupled module forces the agent to load its dependencies, their dependencies, and so on until the context budget is consumed by code unrelated to the task.

- Extract large files into smaller, single-responsibility modules. A file an agent can read in full is a file it can reason about completely.
- Define explicit interfaces at module boundaries. An agent working inside a module needs only the interface contract for its dependencies, not the implementation.
- Reduce coupling between modules. When a change to module A requires loading modules B, C, and D to understand the impact, the agent's effective context budget for the actual task shrinks with every additional file.
- Consolidate duplicate logic. One definition is one context load; ten scattered copies are ten opportunities for the agent to produce inconsistent changes.

See [Tokenomics: Code Quality as a Token Cost Driver]({{< relref "/docs/agentic-cd/operations/tokenomics#8-code-quality-as-a-token-cost-driver" >}}) for how naming, structure, and coupling compound into token cost.

**How AI can help:** Use an agent to identify high-coupling hotspots - files with the most inbound and outbound dependencies. Agents can extract interfaces from concrete implementations, move scattered logic into a single authoritative location, and split large files into cohesive modules. Prioritize refactoring by code churn: files that change most often deliver the highest return on modularity investment because agents will load them most frequently.

### Step 6: Establish consistent naming and domain language

{{% alert title="Impact: High" color="warning" %}}
Naming inconsistency is one of the largest hidden costs in agentic development. Every synonym an agent must reconcile is context budget spent on vocabulary instead of the task.
{{% /alert %}}

**What degrades agent comprehension:** the same concept called `user` in one file, `account` in another, and `member` in a third. Generic names like `processData`, `temp`, `result` that require surrounding code to understand. Inconsistent terminology between code, tests, and documentation.

- Establish a ubiquitous language - a glossary of domain terms used uniformly across code, tests, tickets, and documentation
- Replace generic function names with domain-specific ones. `calculateOrderTax` is self-documenting; `processData` requires the agent to load callers and callees to understand its purpose.
- Use the same term for the same concept everywhere. If the business calls it a "policy," the code should not call it a "plan" or "contract."
- Name test files and test cases using the same domain language. An agent looking for tests related to "premium calculation" should find files and functions that use those words.

See [Tokenomics: Code Quality as a Token Cost Driver]({{< relref "/docs/agentic-cd/operations/tokenomics#8-code-quality-as-a-token-cost-driver" >}}) for the full analysis of how naming compounds into token cost.

**How AI can help:** Use an agent to scan the codebase for terminology inconsistencies - the same concept referred to by different names across files. Agents can generate a draft domain glossary by extracting class names, method names, and variable names, then clustering them by semantic similarity. They can also batch-rename identifiers to align with the agreed terminology once the glossary is established. Start with the most frequently referenced concepts: fixing naming for the ten most-used domain terms delivers outsized returns.

### Step 7: Enforce formatting and style automatically

{{% alert title="Impact: Medium" color="info" %}}
Formatting issues do not block agents, but they create noise in every diff and waste review cycles on style instead of logic.
{{% /alert %}}

**What creates unnecessary friction:** inconsistent indentation, spacing, and style across the codebase. Agent-generated code formatted differently from the surrounding code. Reviewers spending time on style instead of correctness.

- Configure a formatter (Prettier, google-java-format, Black, gofmt, or equivalent) and run it on pre-commit
- Add the formatter to CI so unformatted code cannot merge
- Run the formatter across the entire codebase once to establish a consistent baseline

When formatting is automated, agents produce code that matches the surrounding style without any per-task instruction. Diffs contain only logic changes, making review faster and more accurate.

**How AI can help:** Use an agent to configure the formatter and linter for the project, generate the pre-commit hook configuration, and run the initial full-codebase format pass. Agents can also identify files where formatting is most inconsistent to prioritize the rollout if a full-codebase pass is too large for a single change.

### Step 8: Remove dead code and noise

{{% alert title="Impact: Medium" color="info" %}}
Dead code misleads agents. They cannot distinguish active patterns from abandoned ones, so they model new code after whatever they find - including code that was left behind intentionally.
{{% /alert %}}

**What confuses agents:** commented-out code blocks that look like alternative implementations, unused functions that appear to be part of the active API, abandoned modules that still import and export, unused imports that suggest dependencies that do not actually exist.

- Remove commented-out code. If it is needed later, it is in version control history.
- Delete unused functions, classes, and modules. An agent that encounters an unused function may call it, extend it, or model new code after it.
- Clean up unused imports. They signal dependencies that do not exist and pollute the agent's understanding of module relationships.
- Remove abandoned [feature flags](../../reference/glossary/#feature-flag) and their associated code paths

**How AI can help:** Use an agent to scan for dead code - unused exports, unreachable functions, commented-out blocks, and imports with no references. Agents can also trace feature flags to determine which are still active and which can be removed along with their code paths. Run this as a periodic cleanup task: dead code accumulates continuously, especially in codebases where agents are generating changes at high volume.

### Step 9: Strengthen type safety

{{% alert title="Impact: Medium-High" color="info" %}}
Types are machine-readable documentation. They tell agents what a function expects and returns without requiring the agent to load callers and infer contracts from usage.
{{% /alert %}}

**What forces agents to guess:** untyped function parameters where the agent must read multiple call sites to determine what types are expected. Return values that could be anything - a result, null, an error, or a different type depending on conditions. Implicit contracts between modules that are not expressed in code.

- Add type annotations to public function signatures, especially at module boundaries
- Define types for data structures that cross module boundaries. An agent receiving a typed interface contract can generate conforming code without loading the implementation.
- Enable strict type checking where the language supports it. Compiler-caught type errors are faster and cheaper than test-caught type errors.
- Prioritize typing at the boundaries agents interact with most: service interfaces, repository methods, and API contracts

**How AI can help:** Use an agent to add type annotations incrementally, starting with public interfaces and working inward. Agents can infer types from usage patterns across the codebase and generate type definitions that a developer reviews and approves. Prioritize by module boundary: typing the interfaces between modules gives agents the most value per annotation because those are the contracts agents must understand to work in any module that depends on them.

### Step 10: Standardize error handling

{{% alert title="Impact: Low-Medium" color="info" %}}
Inconsistent error handling is a slow leak. It does not block agents, but it causes agent-generated code to handle errors differently every time, gradually fragmenting the codebase.
{{% /alert %}}

**What produces inconsistent agent output:** a codebase that uses exceptions in some modules, result types in others, and error codes in a third. Error handling that varies by developer rather than by architectural decision. Silently swallowed errors that agents cannot detect or learn from.

- Choose one error handling pattern for the codebase and document it in the project context file
- Apply the pattern consistently in new code. Enforce it with linter rules where possible.
- Refactor the most frequently changed modules to use the chosen pattern first
- Document where exceptions to the pattern are intentional (e.g., a different pattern at the framework boundary)

**How AI can help:** Use an agent to survey the codebase and categorize the error handling patterns in use, including how many files use each pattern. This gives you a data-driven baseline for choosing the dominant pattern. Agents can then refactor modules to the chosen pattern incrementally, starting with the highest-churn files. They can also generate linter rules that flag deviations from the chosen pattern in new code.

## Test Structure for Agentic Workflows

Agents rely most on tests that are fast, deterministic, and produce clear failure messages. The test architecture that supports human-driven [CD](../../reference/glossary/#cd-continuous-delivery) also supports agentic development, but some patterns matter more when agents are the primary consumer of test output.

**What agents rely on most:**

- **Fast unit tests with clear failure messages.** Agents iterate by running tests after each change. A unit suite that runs in seconds and reports exactly what failed enables tight feedback loops.
- **Contract tests at service boundaries.** Agents generating code in one service need a fast way to verify they have not broken the contract with consumers. Contract tests provide this without requiring a full integration environment.
- **Build verification tests.** A small suite that confirms the application starts and responds to a health check. This catches configuration errors and missing dependencies that unit tests miss.

**What makes tests hard for agents to use:**

- **Broad integration tests with ambiguous failures.** A test that spins up three services, runs a scenario, and reports "connection refused" gives the agent no actionable signal about what to fix.
- **Tests that require manual setup.** Seeding a database, starting a Docker container, or configuring a VPN before tests run breaks the agent's feedback loop.
- **Tests with shared mutable state.** Tests that interfere with each other produce different results depending on execution order. Agents cannot distinguish between "my change broke this" and "this test is order-dependent."
- **Slow test suites used as the primary feedback mechanism.** If the only way to verify a change is a twenty-minute end-to-end suite, agents either skip verification or consume excessive tokens waiting and retrying.

**How to refactor toward agent-friendly test design:**

1. Separate tests by feedback speed: seconds (unit), minutes (integration), and longer (end-to-end)
2. Make the fast suite the default. The command an agent runs after every change should execute the fast suite, not the full suite.
3. Ensure every test is independent. No shared state, no required execution order, no external service dependencies in the fast suite.
4. Write failure messages that answer three questions: what was expected, what happened, and where in the code the failure occurred.

## Build and Validation Ergonomics

A repository ready for agentic development has two commands an agent needs to know:

1. **Build:** a single command that installs dependencies and compiles the project (e.g., `make build`, `./gradlew build`, `npm run build`)
2. **Test:** a single command that runs the test suite (e.g., `make test`, `./gradlew test`, `npm test`)

An agent should be able to clone the repository, run the build command, run the test command, and see a clear pass/fail result without any human intervention. Everything between "clone" and "tests pass" must be automated.

**Dependency installation:** All dependencies must resolve from the install command. No manual downloads, no system-level package installations, no credentials required for the build itself.

**Environment variable defaults:** If the application requires environment variables, provide defaults that work for local development and testing. An agent that encounters `DATABASE_URL is not set` with no guidance on what to set it to cannot proceed.

**Test runner output clarity:** The test runner should exit with code 0 on success and non-zero on failure. Failure output should go to stdout or stderr in a parseable format. A test runner that exits 0 with warnings buried in the output trains agents to treat success as ambiguous.

See [Build Automation]({{< relref "/docs/migrate-to-cd/foundations/build-automation" >}}) for the broader build automation practices this builds on.

## Why This Matters for Agent Accuracy and Token Efficiency

Agents operate on feedback loops: they propose a change, run the build or tests, read the output, and iterate. The quality of each loop iteration determines both the accuracy of the final result and the total cost to reach it.

**Tight feedback loops improve accuracy.** When tests run in seconds, produce clear pass/fail signals, and report exactly what failed, agents correct errors on the first retry. The agent reads the failure, understands what went wrong, and generates a targeted fix.

**Loose feedback loops degrade accuracy and multiply cost.** When tests are slow, noisy, or require manual steps:

- Agents fail silently because they cannot run the verification step
- Agents produce incorrect fixes because failure messages do not indicate the root cause
- Agents consume excessive tokens retrying and re-reading unclear output
- Each retry iteration costs tokens for both the re-read (input) and the new attempt (output)

**The cost multiplier is real.** A correction loop where the agent's first output is wrong, reviewed, and re-prompted uses roughly three times the tokens of a successful first attempt (see [Tokenomics]({{< relref "/docs/agentic-cd/operations/tokenomics#8-code-quality-as-a-token-cost-driver" >}})). A repository with flaky tests, ambiguous failure messages, or manual setup steps increases the probability of entering correction loops on every task the agent attempts.

**Poorly structured repositories shift the cost of ambiguity from the developer to the agent, multiplying it across every task.** A developer encountering a flaky test knows to re-run it. A developer seeing "assertion failed" checks the test code to understand the expectation. An agent does not have this implicit knowledge. It treats every failure as a signal that its change was wrong and attempts to fix code that was never broken, generating incorrect changes that require further correction.

Investing in repository readiness is not just preparation for agentic development. It is the single highest-leverage action for reducing ongoing agent cost and improving agent output quality.

## Related Content

- [Configuration Quick Start]({{< relref "/docs/agentic-cd/getting-started/agent-setup" >}}) - where to put project facts, rules, skills, and hooks so agents can find them
- [AI Adoption Roadmap]({{< relref "/docs/agentic-cd/getting-started/adoption-roadmap" >}}) - the organizational prerequisite sequence, especially [Harden Guardrails]({{< relref "/docs/agentic-cd/getting-started/adoption-roadmap#harden-guardrails" >}}) and [Reduce Delivery Friction]({{< relref "/docs/agentic-cd/getting-started/adoption-roadmap#reduce-delivery-friction" >}}), which this page makes concrete at the repository level
- [Tokenomics]({{< relref "/docs/agentic-cd/operations/tokenomics" >}}) - the full token optimization framework, including how code quality drives token cost
- [Testing Fundamentals]({{< relref "/docs/migrate-to-cd/foundations/testing-fundamentals" >}}) - the test architecture foundations this page builds on
- [Build Automation]({{< relref "/docs/migrate-to-cd/foundations/build-automation" >}}) - the build automation practices that make "single command to build" possible
