---
title: "Small-Batch Agent Sessions"
linkTitle: "Small-Batch Sessions"
weight: 7
description: >
  How to structure agent sessions so context stays manageable, commits stay small, and the pipeline stays green.
---

{{% pageinfo %}}
One [BDD](../../glossary/#bdd-behavior-driven-development) scenario. One [agent](../../glossary/#agent-ai) session. One commit. This is the same discipline [CI](../../glossary/#ci-continuous-integration) demands of humans, applied to agents. The broad understanding of the feature is established before any session begins. Each session implements exactly one behavior from that understanding.
{{% /pageinfo %}}

**Stop optimizing your [prompts](../../glossary/#prompt). Start optimizing your decomposition.** The biggest variable in agentic development is not model selection or prompt quality. It is decomposition discipline. An agent given a well-scoped, ordered scenario with clear acceptance criteria will outperform a better model given a vague, large-scope instruction.

## Establish the Broad Understanding First

Before any implementation session begins, establish the complete understanding of the feature:

1. **Intent description** - why the change exists and what problem it solves
2. **All BDD scenarios** - every behavior to implement, validated by the [specification review](../agent-assisted-specification/#validating-the-complete-specification-set) before any code is written
3. **Feature description** - architectural constraints, performance budgets, integration boundaries
4. **Scenario order** - the sequence in which you will implement the scenarios

The [agent-assisted specification](../agent-assisted-specification/) workflow is the right tool here - use the agent to sharpen intent, surface missing scenarios, identify architectural gaps, and validate consistency across all four [artifacts](../../glossary/#artifact) before any code is written.

**Scenario ordering is not optional.** Each scenario builds on the state left by the previous one. An agent implementing Scenario 3 depends on the contracts and data structures Scenario 1 and 2 established. Order scenarios so that each one can be implemented cleanly given what came before. Use an agent for this too: give it your complete scenario list and ask it to suggest an implementation order that minimizes the rework cost of each step.

This ordering step also has a human gate. Review the proposed slice sequence before any implementation begins. The ordering determines the shape of every session that follows.

The broad understanding is not in the implementation agent's [context](../../glossary/#context-llm). Each implementation session receives the relevant subset. The full feature scope lives in the artifacts, not in any single session.

**This is not big upfront design.** The feature scope is a small batch: one story, one thin [vertical slice](../../glossary/#vertical-sliced-story), completable in a day or two. What constitutes a complete slice depends on your team structure - see [Work Decomposition](../../migrate-to-cd/migration-path/foundations/work-decomposition/#vertical-slicing-in-distributed-systems) for full-stack versus subdomain teams.

## Session Structure

Each session follows the same structure:

| Step | What happens |
|------|-------------|
| **Context load** | Assemble the session context: intent summary, feature description, the one scenario for this session, the relevant existing code, and a brief summary of completed sessions |
| **Implementation** | Agent generates test code and production code to satisfy the scenario |
| **Validation** | [Pipeline](../../glossary/#pipeline) runs - all scenarios implemented so far must pass |
| **Commit** | Change committed; commit message references the scenario |
| **Context summary** | Write a one-paragraph summary of what this session built, for use in the next session |

The session ends at the commit. The next session starts fresh.

### What to include in the context load

Include only what the agent needs to implement this specific scenario:

- **Intent description summary** - one or two sentences on the why. Not the full artifact, not the conversation that produced it.
- **Feature description** - the constraints and architectural boundaries that apply to this session's work
- **The scenario being implemented** - just this one, not all scenarios
- **Relevant existing code** - the files the agent will read or modify. Not the entire codebase.
- **Session summary** - a brief factual summary of what previous sessions built: what files exist, what they do, what tests cover them

Exclude:

- Full conversation history from previous sessions
- Scenarios not being implemented in this session
- Unrelated system context
- Verbose examples or rationale that does not change what the agent will do

### The context summary

At the end of each session, write a summary that future sessions can use. The summary replaces the session's full conversation history in subsequent contexts. Keep it factual and brief:

{{< code-collapse title="Context summary template: factual session handoff" >}}
Session 1 implemented Scenario 1 (client exceeds rate limit returns 429).

Files created:
- src/redis.ts - Redis client with connection pooling
- src/middleware/rate-limit.ts - middleware that checks request count
  against Redis and returns 429 with Retry-After header when exceeded

Tests added:
- src/middleware/rate-limit.test.ts - covers Scenario 1

All pipeline checks pass.
{{< /code-collapse >}}

This summary is the complete handoff from one session to the next. The next agent starts with this summary plus its own scenario - not with the full conversation that produced the code.

## The Parallel with CI

In continuous integration, the commit is the unit of integration. A developer does not write an entire feature and commit at the end. They write one small piece of tested functionality that can be deployed, commit to the trunk, then repeat. The commit creates a checkpoint: the pipeline is green, the change is reviewable, and the next unit can start cleanly.

Agent sessions follow the same discipline. The session is the unit of context. An agent does not implement an entire feature in one session - context accumulates, performance degrades, and the scope of any failure grows. Each session implements one behavior, ends with a commit, and resets context before the next session begins.

The mechanics differ. The principle is identical: small batches, frequent integration, green pipeline as the definition of done.

## Worked Example: Rate Limiting

The [first-class artifacts](../first-class-artifacts/) page establishes an intent description and two BDD scenarios for rate limiting the `/api/search` endpoint. Here is what the full session sequence looks like.

### Broad understanding (established before any session)

**Intent summary:**

> Limit authenticated clients to 100 requests per minute on `/api/search`. Requests exceeding the limit receive 429 with a Retry-After header. Unauthenticated requests are not limited.

**All BDD scenarios, in implementation order:**

{{< code-collapse title="BDD scenarios: rate limiting in implementation order" lang="gherkin" >}}
Scenario 1: Client within rate limit
  Given an authenticated client with 50 requests in the current minute
  When the client makes a request to /api/search
  Then the request is processed normally
  And the response includes rate limit headers showing remaining quota

Scenario 2: Client exceeds rate limit
  Given an authenticated client with 100 requests in the current minute
  When the client makes another request to /api/search
  Then the response status is 429
  And the response includes a Retry-After header indicating when the limit resets

Scenario 3: Rate limit window resets
  Given an authenticated client who received a 429 response
  When the rate limit window expires
  Then the client can make requests again normally

Scenario 4: Unauthenticated requests bypass rate limiting
  Given an unauthenticated request to /api/search
  When the request is made regardless of recent request volume
  Then the request is processed normally without rate limit checks
{{< /code-collapse >}}

**Feature description (excerpt):**

> Use Redis as the rate limit store with a sliding window counter. The middleware runs after auth and reads the client ID from the JWT. The rate limit key format is `rate_limit:{client_id}:{window_start_minute}`. Performance budget: middleware must add less than 5ms to p99 latency.

---

### Session 1 - Scenario 1 (client within rate limit)

**Context loaded:**

- Intent summary (2 sentences)
- Feature description
- Scenario 1 only
- Existing middleware directory structure

**What the agent implements:**

- Redis client at `src/redis.ts`
- Rate limit middleware at `src/middleware/rate-limit.ts` that increments the counter and sets quota headers on successful requests
- Acceptance test for Scenario 1

**Commit:** `feat: add rate limit quota headers for requests within limit`

**Context summary written:**

{{< code-collapse title="Session 1 context summary: quota headers for requests within limit" >}}
Session 1 implemented Scenario 1 (client within rate limit).

Files created:
- src/redis.ts - Redis client, connection pooling, configured from env
- src/middleware/rate-limit.ts - reads client ID from JWT, increments
  Redis counter for current window, sets X-RateLimit-Remaining header

Tests added:
- src/middleware/rate-limit.test.ts - covers Scenario 1

Pipeline is green.
{{< /code-collapse >}}

---

### Session 2 - Scenario 2 (client exceeds rate limit)

**Context loaded:**

- Intent summary (2 sentences)
- Feature description
- Scenario 2 only
- Session 1 summary
- `src/middleware/rate-limit.ts` (the file being extended)

**What the agent implements:**

- Branch in the middleware that returns 429 and sets Retry-After when the counter exceeds 100
- Acceptance test for Scenario 2
- Scenario 1 test continues to pass

**Commit:** `feat: return 429 with Retry-After when rate limit exceeded`

**Context summary written:**

{{< code-collapse title="Sessions 1-2 context summary: rate limit enforcement with 429 response" >}}
Sessions 1-2 implemented Scenarios 1 and 2.

Files:
- src/redis.ts - Redis client (unchanged from Session 1)
- src/middleware/rate-limit.ts - checks counter against limit of 100;
  returns 429 with Retry-After header when exceeded, quota headers when
  within limit

Tests:
- src/middleware/rate-limit.test.ts - covers Scenarios 1 and 2

Pipeline is green.
{{< /code-collapse >}}

---

### Session 3 - Scenario 3 (window reset)

**Context loaded:**

- Intent summary (2 sentences)
- Feature description
- Scenario 3 only
- Sessions 1-2 summary
- `src/middleware/rate-limit.ts`

**What the agent implements:**

- TTL set on the Redis key so the counter expires at the window boundary
- Retry-After value calculated from window boundary
- Acceptance test for Scenario 3

**Commit:** `feat: expire rate limit counter at window boundary`

---

### Session 4 - Scenario 4 (unauthenticated bypass)

**Context loaded:**

- Intent summary (2 sentences)
- Feature description
- Scenario 4 only
- Sessions 1-3 summary
- `src/middleware/rate-limit.ts`

**What the agent implements:**

- Early return in the middleware when no authenticated client ID is present
- Acceptance test for Scenario 4

**Commit:** `feat: bypass rate limiting for unauthenticated requests`

---

### What the session sequence produces

Four commits, each independently reviewable. Each commit corresponds to a named, human-defined behavior. The pipeline is green after every commit. The context in each session was small: intent summary, one scenario, one file, a brief summary of prior work.

A reviewer can look at Session 2's commit and understand exactly what it does and why without reading the full feature history. That is the same property CI produces for human-written code.

## The Commit as Context Boundary

The commit is not just a version control operation. In an agent workflow, it is the context boundary.

Before the commit: the agent is building toward a green state. The session context is open.

After the commit: the state is known, captured, and stable. The next session starts from this stable state - not from the middle of an in-progress conversation.

This has a practical implication: **do not let an agent session span a commit boundary**. A session that starts implementing Scenario 1 and then continues into Scenario 2 accumulates context from both, mixes the conversation history of two distinct units, and produces a commit that cannot be reviewed cleanly. Stop the session at the commit. Start a new session for the next scenario.

## When the Pipeline Fails

If the pipeline fails mid-session, the session is not done. Do not summarize completed work and do not start a new session. The agent's job in this session is to get the pipeline green.

If the pipeline fails in a later session (a prior scenario breaks), the agent must restore the passing state before implementing the new scenario. This is the same discipline as the CI rule: while the pipeline is red, the only valid work is restoring green. See [ACD constraint 8](../).

## Related Content

- [ACD Workflow](../) - the full workflow these sessions implement, including constraint 8 (pipeline red means restore-only work)
- [Agent-Assisted Specification](../agent-assisted-specification/) - how to establish the broad understanding before sessions begin
- [Small Batches](../../migrate-to-cd/migration-path/optimize/small-batches/) - the same discipline applied to human-authored work
- [Work Decomposition](../../migrate-to-cd/migration-path/foundations/work-decomposition/#vertical-slicing-in-distributed-systems) - vertical slicing defined for both full-stack product teams and subdomain product teams in distributed systems
- [Horizontal Slicing](../../anti-patterns/team-workflow/horizontal-slicing/) - the anti-pattern that emerges when distributed teams split work by layer instead of by behavior within their domain
- [Tokenomics](../tokenomics/) - why context size matters and how to control it
- [The Six First-Class Artifacts](../first-class-artifacts/) - the artifacts that anchor each session's context
- [Pitfalls and Metrics](../pitfalls-and-metrics/) - failure modes including the review queue backup that small sessions prevent
