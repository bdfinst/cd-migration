---
title: "Agent Delivery Contract"
linkTitle: "Agent Delivery Contract"
weight: 5
description: >
  Detailed definitions and examples for the six artifacts that agents and humans must maintain in an ACD pipeline.
---

{{% pageinfo %}}
Each [artifact](../glossary/#artifact) has a defined authority. When an [agent](../glossary/#agent-ai) detects a conflict between artifacts, it cannot resolve that conflict by modifying the artifact it does not own. The feature description wins over the implementation. The intent description wins over the feature description.

For the framework overview and the eight constraints, see [ACD](../).
{{% /pageinfo %}}

## 1. Intent Description

**What it is:** A self-contained problem statement, written by a human, that defines what the change should accomplish and why.

An agent (or a new team member) receiving only this document should understand the problem without asking clarifying questions. It defines what the change should accomplish, not how. Without a clear intent description, the agent may generate technically correct code that does not match what was needed. See the [self-containment test](../prompting-disciplines/#the-self-containment-test) for how to verify completeness.

**Example:**

{{< code-collapse title="Intent description: add rate limiting to /api/search" lang="markdown" >}}
## Intent: Add rate limiting to the /api/search endpoint

We are receiving complaints about slow response times during peak hours.
Analysis shows that a small number of clients are making thousands of
requests per minute. We need to limit each authenticated client to 100
requests per minute on the /api/search endpoint. Requests that exceed
the limit should receive a 429 response with a Retry-After header.
{{< /code-collapse >}}

**Key property:** The intent description is authored and owned by a human. The agent does not write or modify it.

## 2. User-Facing Behavior

**What it is:** A description of how the system should behave from the user's perspective, expressed as observable outcomes.

Agents can generate code that satisfies tests but does not produce the expected user experience. User-facing behavior descriptions bridge the gap between technical correctness and user value. [BDD](../glossary/#bdd-behavior-driven-development) scenarios work well here:

{{< code-collapse title="BDD scenarios: rate limit user-facing behavior" lang="gherkin" >}}
Scenario: Client exceeds rate limit
  Given an authenticated client
  And the client has made 100 requests in the current minute
  When the client makes another request to /api/search
  Then the response status should be 429
  And the response should include a Retry-After header
  And the Retry-After value should indicate when the limit resets

Scenario: Client within rate limit
  Given an authenticated client
  And the client has made 50 requests in the current minute
  When the client makes a request to /api/search
  Then the request should be processed normally
  And the response should include rate limit headers showing remaining quota
{{< /code-collapse >}}

**Key property:** Humans define the scenarios. The agent generates code to satisfy them but does not decide what scenarios to include.

## 3. Feature Description (Constraint Architecture)

**What it is:** The architectural constraints, dependencies, and trade-off boundaries that govern the implementation.

Agents need explicit architectural context that human developers often carry in their heads. The feature description tells the agent where the change fits in the system, what components it touches, and what constraints apply. It separates hard boundaries (musts, must nots) from soft preferences and escalation triggers so the agent knows which constraints are non-negotiable.

**Example:**

{{< code-collapse title="Feature description: rate limiting constraint architecture" lang="markdown" >}}
## Feature: Rate Limiting for Search API

### Musts
- Rate limit middleware sits between authentication and the search handler
- Rate limit state is stored in Redis (shared across application instances)
- Rate limit configuration is read from the application config, not hardcoded
- Must work correctly with horizontal scaling (3-12 instances)
- Must be configurable per-endpoint (other endpoints may have different limits later)

### Must Nots
- Must not add more than 5ms of latency to the request path
- Must not introduce new external dependencies (Redis client library already in use for session storage)

### Preferences
- Prefer middleware pattern over decorator pattern for request interception
- Prefer sliding window counter over fixed window for smoother rate distribution

### Escalation Triggers
- If Redis is unavailable, stop and ask whether to fail open (allow all requests) or fail closed (reject all requests)
- If the existing auth middleware does not expose the client ID, stop and ask rather than modifying the auth layer
{{< /code-collapse >}}

**Key property:** Engineering owns the architectural decisions. The agent implements within these constraints but does not change them. When the agent encounters a condition listed as an escalation trigger, it must stop and ask rather than deciding autonomously.

## 4. Acceptance Criteria

**What it is:** Concrete expectations that can be executed as deterministic tests or evaluated by review [agents](../glossary/#agent-ai). These are the authoritative source of truth for what the code should do.

This artifact has two parts: the **done definition** (observable outcomes an independent observer could verify) and the **evaluation design** (test cases with known-good outputs that catch regressions). Together they **constrain** the agent. If the criteria are comprehensive, the agent cannot generate incorrect code that passes. If the criteria are shallow, the agent can generate code that passes tests but does not satisfy the intent.

### Acceptance criteria

Write acceptance criteria as observable outcomes, not internal implementation details. Each criterion should be verifiable by someone who has never seen the code:

{{< code-collapse title="Acceptance criteria: rate limiting done definition" lang="markdown" >}}
1. An authenticated client making 100 requests in one minute receives normal
   responses with rate limit headers showing remaining quota
2. An authenticated client making a 101st request in the same minute receives
   a 429 response with a Retry-After header indicating when the limit resets
3. After the rate limit window expires, the previously limited client can make
   requests again normally
4. A different authenticated client is unaffected by another client's rate
   limit status
5. The rate limit middleware adds less than 5ms to p99 request latency
{{< /code-collapse >}}

### Evaluation design

Define test cases with known-good outputs so the agent (and the [pipeline](../glossary/#pipeline)) can verify correctness mechanically:

{{< code-collapse title="Evaluation design: rate limiting test cases" lang="markdown" >}}
**Test Case 1 (Happy Path):** Client sends 50 requests in one minute.
Result: All return 200 with X-RateLimit-Remaining headers counting down.

**Test Case 2 (Limit Exceeded):** Client sends 101 requests in one minute.
Result: Request 101 returns 429 with Retry-After header.

**Test Case 3 (Window Reset):** Client exceeds limit, then the window expires.
Result: Next request returns 200.

**Test Case 4 (Per-Client Isolation):** Client A exceeds limit. Client B sends
a request. Result: Client B receives 200.

**Test Case 5 (Latency Budget):** Single request with rate limit check.
Result: Middleware adds less than 5ms.
{{< /code-collapse >}}

Humans define the done definition and evaluation design. An agent can generate the test code, but the resulting tests must be **decoupled from implementation** (verify observable behavior, not internal details) and **faithful to the specification** (actually exercise what the human defined, without quietly omitting edge cases or weakening assertions). The [test fidelity and implementation coupling agents](../pipeline-enforcement/) enforce these two properties at pipeline speed.

**Key property:** The [pipeline](../glossary/#pipeline) enforces these tests on every commit. If they fail, the agent's implementation is rejected regardless of how plausible the code looks.

## 5. Implementation

**What it is:** The actual code that implements the feature. In [ACD](../glossary/#acd-agentic-continuous-delivery), this may be generated entirely by the agent, co-authored by agent and human, or authored by a human with agent assistance.

The implementation is the artifact most likely to be agent-generated. It must satisfy the acceptance criteria (tests), conform to the feature description (architecture), and achieve the intent description (purpose).

**Example** - agent-generated rate limiting middleware that satisfies the acceptance criteria above:

{{< code-collapse title="Implementation: agent-generated rate limiting middleware" lang="javascript" >}}
function rateLimitMiddleware(redisClient, config) {
  return async function (req, res, next) {
    if (!req.user) {
      return next();
    }

    const limit = config.getLimit(req.path);
    if (!limit) {
      return next();
    }

    const key = `rate_limit:${req.user.id}:${req.path}`;
    const current = await redisClient.incr(key);
    if (current === 1) {
      await redisClient.expire(key, 60);
    }

    const ttl = await redisClient.ttl(key);
    if (current > limit) {
      res.set("Retry-After", String(ttl));
      return res.status(429).end();
    }

    res.set("X-RateLimit-Remaining", String(limit - current));
    next();
  };
}
{{< /code-collapse >}}

**Review requirements:** Agent-generated implementation must be reviewed by a human before merging to trunk. The review focuses on:

- Does the implementation match the intent? (Not just "does it pass tests?")
- Does it follow the architectural constraints in the feature description?
- Does it introduce unnecessary complexity, dependencies, or security risks?
- Would a human developer on the team understand and maintain this code?

**Key property:** The implementation has the lowest authority of any artifact. When it conflicts with the feature description, tests, or intent, the implementation changes.

## 6. System Constraints

**What it is:** Non-functional requirements, security policies, performance budgets, and organizational rules that apply to all changes. Agents need these stated explicitly because they cannot infer organizational norms from context.

**Example:**

{{< code-collapse title="System constraints: global non-functional requirements" lang="yaml" >}}
system_constraints:
  security:
    - No secrets in source code
    - All user input must be sanitized
    - Authentication required for all API endpoints
  performance:
    - API p99 latency < 500ms
    - No N+1 query patterns
    - Database queries must use indexes
  architecture:
    - No circular dependencies between modules
    - External service calls must use circuit breakers
    - All new dependencies require team approval
  operations:
    - All new features must have monitoring dashboards
    - Log structured data, not strings
    - Feature flags required for user-visible changes
{{< /code-collapse >}}

**Key property:** System constraints apply globally. Unlike other artifacts that are per-change, these rules apply to every change in the system.

## Artifact Authority Hierarchy

When an agent detects a conflict between artifacts, it must know which one wins. The hierarchy below defines precedence. A higher-priority artifact overrides a lower-priority one:

| Priority | Artifact | Authority |
|----------|----------|-----------|
| 1 (highest) | Intent Description | Defines the why; all other artifacts conform to it |
| 2 | User-Facing Behavior | Defines observable outcomes from the user's perspective; feeds into Acceptance Criteria |
| 3 | Feature Description (Constraint Architecture) | Defines architectural constraints; implementation must conform |
| 4 | Acceptance Criteria | Pipeline-enforced; implementation must pass. Derived from User-Facing Behavior (functional) and Feature Description (non-functional requirements stated as architectural constraints) |
| 5 | System Constraints | Global; applies to every change in the system |
| 6 (lowest) | Implementation | Must satisfy all other artifacts |

**Acceptance Criteria are derived from two sources.** User-Facing Behavior defines the functional expectations (BDD scenarios). Non-functional requirements (latency budgets, resilience, security) must be stated explicitly as architectural constraints in the Feature Description. Both feed into Acceptance Criteria, which the pipeline enforces.

## These Artifacts Are Pipeline Inputs, Not Reference Documents

**The pipeline and agents consume these artifacts as inputs. They are not outputs for humans to read after the fact.**

Without them, an agent that detects a conflict between what the acceptance criteria expect and what the feature description says has no way to determine which is authoritative. It guesses, and it guesses wrong. With explicit authority on each artifact, the agent knows which artifact wins.

These artifacts are valuable in any project. In [ACD](../glossary/#acd-agentic-continuous-delivery), they become mandatory because the pipeline and agents consume them as inputs, not just as reference for humans.

With the six artifacts defined, the next question is how the pipeline enforces consistency between them. See [Pipeline Enforcement and Expert Agents](../pipeline-enforcement/).

## Related Content

- [ACD](../) - the framework overview, eight constraints, and workflow
- [Pipeline Enforcement and Expert Agents](../pipeline-enforcement/) - how the pipeline enforces artifact consistency
- [Pitfalls and Metrics](../pitfalls-and-metrics/) - common failure modes when artifacts are incomplete
- [AI Adoption Roadmap](../adoption-roadmap/) - the prerequisite sequence before adopting artifact-driven workflows
- [Agent-Assisted Specification](../agent-assisted-specification/) - how to write clear intent descriptions and BDD scenarios that agents can implement reliably
- [The Four Prompting Disciplines](../prompting-disciplines/) - the skills that produce these artifacts
- [Testing](../../testing/) - testing strategies that inform acceptance criteria
