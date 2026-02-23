---
title: "The Six First-Class Artifacts"
linkTitle: "First-Class Artifacts"
weight: 4
description: >
  Detailed definitions and examples for the six artifacts that agents and humans must maintain in an ACD pipeline.
---

{{% pageinfo %}}
Each [artifact](../glossary/#artifact) has a defined authority. When an [agent](../glossary/#agent-ai) detects a conflict between artifacts, it cannot resolve that conflict by modifying the artifact it does not own. The feature description wins over the implementation. The intent description wins over the feature description.

For the framework overview and the eight constraints, see [ACD](../).
{{% /pageinfo %}}

## 1. Intent Description

**What it is:** A human-readable description of the desired change, written by a human.

The intent description is the agent's [prompt](../glossary/#prompt) in the broadest sense. It defines what the change should accomplish, not how. Without a clear intent description, the agent may generate technically correct code that does not match what was needed.

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

## 3. Feature Description

**What it is:** A technical description of the feature's architecture, dependencies, and integration points.

Agents need explicit architectural context that human developers often carry in their heads. The feature description tells the agent where the change fits in the system, what components it touches, and what constraints apply.

**Example:**

{{< code-collapse title="Feature description: rate limiting architecture and constraints" lang="markdown" >}}
## Feature: Rate Limiting for Search API

### Architecture
- Rate limit middleware sits between authentication and the search handler
- Rate limit state is stored in Redis (shared across application instances)
- Rate limit configuration is read from the application config, not hardcoded

### Dependencies
- Redis client library (already in use for session storage)
- No new external dependencies should be introduced

### Constraints
- Must not add more than 5ms of latency to the request path
- Must work correctly with our horizontal scaling (3-12 instances)
- Must be configurable per-endpoint (other endpoints may have different limits later)
{{< /code-collapse >}}

**Key property:** Engineering owns the architectural decisions. The agent implements within these constraints but does not change them.

## 4. Executable Truth

**What it is:** Automated tests that define the correct behavior of the system. These tests are the authoritative source of truth for what the code should do.

For human developers, tests verify the code. For agent-generated code, tests also **constrain** the agent. If the tests are comprehensive, the agent cannot generate incorrect code that passes. If the tests are shallow, the agent can generate code that passes tests but does not satisfy the intent.

### Defining tests vs. writing test code

Humans define what the tests must verify before the agent generates the implementation. This means specifying the test scenarios, edge cases, and acceptance criteria, not necessarily writing every line of test code.

An agent can generate test code from human-defined specifications, but the resulting test code must be validated for two properties:

1. **Decoupled from implementation.** Tests verify observable behavior and outcomes, not internal implementation details. Tests coupled to implementation become worthless when the agent refactors, because they pass regardless of whether the behavior is correct.
2. **Faithful to the specification.** The generated test code actually exercises the scenarios the human defined. An agent can produce test code that looks comprehensive but quietly omits edge cases or weakens assertions.

Human review of agent-generated test code focuses on these two properties. The human does not need to write the test code, but must confirm it tests what was specified and does not depend on how the implementation works internally.

**Example** - these tests verify rate limiting behavior through observable HTTP responses, not through internal method calls:

{{< code-collapse title="Executable truth: rate limiting tests verifying observable behavior" lang="javascript" >}}
describe("Rate Limiting", () => {
  it("allows requests within limit", async () => {
    for (let i = 0; i < 100; i++) {
      const res = await request(app)
        .get("/api/search")
        .set("Authorization", authTokenA);
      expect(res.status).toBe(200);
    }
  });

  it("blocks requests exceeding limit", async () => {
    for (let i = 0; i < 100; i++) {
      await request(app)
        .get("/api/search")
        .set("Authorization", authTokenA);
    }
    const res = await request(app)
      .get("/api/search")
      .set("Authorization", authTokenA);
    expect(res.status).toBe(429);
    expect(res.headers["retry-after"]).toBeDefined();
  });

  it("resets limit after window expires", async () => {
    for (let i = 0; i < 100; i++) {
      await request(app)
        .get("/api/search")
        .set("Authorization", authTokenA);
    }
    jest.advanceTimersByTime(61000);
    const res = await request(app)
      .get("/api/search")
      .set("Authorization", authTokenA);
    expect(res.status).toBe(200);
  });

  it("enforces limits per client", async () => {
    for (let i = 0; i < 100; i++) {
      await request(app)
        .get("/api/search")
        .set("Authorization", authTokenA);
    }
    const res = await request(app)
      .get("/api/search")
      .set("Authorization", authTokenB);
    expect(res.status).toBe(200);
  });

  it("adds less than 5ms latency", async () => {
    const start = performance.now();
    await request(app)
      .get("/api/search")
      .set("Authorization", authTokenA);
    const elapsed = performance.now() - start;
    expect(elapsed).toBeLessThan(5);
  });
});
{{< /code-collapse >}}

**Key property:** The [pipeline](../glossary/#pipeline) enforces these tests on every commit. If they fail, the agent's implementation is rejected regardless of how plausible the code looks.

## 5. Implementation

**What it is:** The actual code that implements the feature. In [ACD](../glossary/#acd-agentic-continuous-delivery), this may be generated entirely by the agent, co-authored by agent and human, or authored by a human with agent assistance.

The implementation is the artifact most likely to be agent-generated. It must satisfy the executable truth (tests), conform to the feature description (architecture), and achieve the intent description (purpose).

**Example** - agent-generated rate limiting middleware that satisfies the executable truth above:

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

**What it is:** Non-functional requirements, security policies, performance budgets, and organizational rules that apply to all changes.

Agents need system constraints stated explicitly.

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

When an agent detects a conflict between artifacts, it must know which one wins. The hierarchy below defines precedence. A lower-numbered artifact overrides a higher-numbered one:

| Priority | Artifact | Authority |
|----------|----------|-----------|
| 1 (highest) | Intent Description | Defines the why; all other artifacts conform to it |
| 2 | Feature Description | Defines architectural constraints; implementation must conform |
| 3 | Executable Truth | Pipeline-enforced; implementation must pass |
| 4 | System Constraints | Global; applies to every change in the system |
| 5 (lowest) | Implementation | Must satisfy all other artifacts |

User-Facing Behavior feeds into Executable Truth. It does not hold separate authority.

## These Artifacts Are Pipeline Inputs, Not Reference Documents

**The pipeline and agents consume these artifacts as inputs. They are not outputs for humans to read after the fact.**

Without them, an agent that detects a conflict between what the tests expect and what the feature description says has no way to determine which is authoritative. It guesses, and it guesses wrong. With explicit authority on each artifact, the agent knows which artifact wins.

These artifacts are valuable in any project. In [ACD](../glossary/#acd-agentic-continuous-delivery), they become mandatory because the pipeline and agents consume them as inputs, not just as reference for humans.

With the six artifacts defined, the next question is how the pipeline enforces consistency between them. See [Pipeline Enforcement and Expert Agents](../pipeline-enforcement/).

## Related Content

- [ACD](../) - the framework overview, eight constraints, and workflow
- [Pipeline Enforcement and Expert Agents](../pipeline-enforcement/) - how the pipeline enforces artifact consistency
- [Pitfalls and Metrics](../pitfalls-and-metrics/) - common failure modes when artifacts are incomplete
- [AI Adoption Roadmap](../adoption-roadmap/) - the prerequisite sequence before adopting artifact-driven workflows
- [Agent-Assisted Specification](../agent-assisted-specification/) - how to write clear intent descriptions and BDD scenarios that agents can implement reliably
- [Testing](../../testing/) - testing strategies that inform the executable truth artifact
