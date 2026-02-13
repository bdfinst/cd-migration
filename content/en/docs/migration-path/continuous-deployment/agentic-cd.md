---
title: "Agentic CD"
linkTitle: "Agentic CD"
weight: 3
description: >
  Extend continuous deployment with constraints and practices for AI agent-generated changes.
---

{{% pageinfo %}}
**Phase 4 - Continuous Deployment** | Adapted from [MinimumCD.org](https://minimumcd.org)

As AI coding agents become capable of generating production-ready code changes, the continuous deployment pipeline must evolve to handle agent-generated work with the same rigor applied to human-generated work - and in some cases, more rigor. Agentic CD defines the additional constraints and artifacts needed when agents contribute to the delivery pipeline.
{{% /pageinfo %}}

## What Is Agentic CD?

Agentic CD extends the Minimum CD framework to address a new category of contributor: AI agents that can generate, test, and propose code changes. These agents may operate autonomously (generating changes without human prompting) or collaboratively (assisting a human developer).

The core principle is simple: **an agent-generated change must meet or exceed the same quality bar as a human-generated change.** The pipeline does not care who wrote the code. It cares whether the code is correct, tested, and safe to deploy.

But agents introduce unique challenges that require additional constraints:

- Agents can generate changes faster than humans can review them
- Agents may lack context about organizational norms, business rules, or unstated constraints
- Agents cannot currently exercise judgment about risk in the same way humans can
- Agents may introduce subtle correctness issues that pass automated tests but violate intent

## The Six First-Class Artifacts

Agentic CD defines six artifacts that must be explicitly maintained in a delivery pipeline that includes AI agents. These artifacts exist in human-driven CD as well, but they are often implicit. When agents are involved, they must be explicit.

### 1. Intent Description

**What it is:** A human-readable description of the desired change, written by a human.

**Why it matters for agentic CD:** The intent description is the agent's "prompt" in the broadest sense. It defines what the change should accomplish, not how. Without a clear intent description, the agent may generate technically correct code that does not match what was needed.

**Example:**

```markdown
## Intent: Add rate limiting to the /api/search endpoint

We are receiving complaints about slow response times during peak hours.
Analysis shows that a small number of clients are making thousands of
requests per minute. We need to limit each authenticated client to 100
requests per minute on the /api/search endpoint. Requests that exceed
the limit should receive a 429 response with a Retry-After header.
```

**Key property:** The intent description is authored by a human. It is the human's specification of what the agent should achieve. The agent does not write or modify the intent description.

### 2. User-Facing Behavior

**What it is:** A description of how the system should behave from the user's perspective, expressed as observable outcomes.

**Why it matters for agentic CD:** Agents can generate code that satisfies tests but does not produce the expected user experience. User-facing behavior descriptions bridge the gap between technical correctness and user value.

**Format:** BDD scenarios work well here (see [Small Batches](../../optimize/small-batches/)):

```gherkin
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
```

### 3. Feature Description

**What it is:** A technical description of the feature's architecture, dependencies, and integration points.

**Why it matters for agentic CD:** Agents need explicit architectural context that human developers often carry in their heads. The feature description tells the agent where the change fits in the system, what components it touches, and what constraints apply.

**Example:**

```markdown
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
```

### 4. Executable Truth

**What it is:** Automated tests that define the correct behavior of the system. These tests are the authoritative source of truth for what the code should do.

**Why it matters for agentic CD:** For human developers, tests verify the code. For agent-generated code, tests also **constrain** the agent. If the tests are comprehensive, the agent cannot generate incorrect code that passes. If the tests are shallow, the agent can generate code that passes tests but does not satisfy the intent.

**Key principle:** Executable truth must be written or reviewed by a human before the agent generates the implementation. This inverts the common practice of writing tests after code. In agentic CD, the tests come first because they are the specification.

```python
class TestRateLimiting:
    def test_allows_requests_within_limit(self, client, redis):
        for _ in range(100):
            response = client.get("/api/search", headers=auth_headers)
            assert response.status_code == 200

    def test_blocks_requests_exceeding_limit(self, client, redis):
        for _ in range(100):
            client.get("/api/search", headers=auth_headers)
        response = client.get("/api/search", headers=auth_headers)
        assert response.status_code == 429
        assert "Retry-After" in response.headers

    def test_limit_resets_after_window(self, client, redis, time_machine):
        for _ in range(100):
            client.get("/api/search", headers=auth_headers)
        time_machine.advance(seconds=61)
        response = client.get("/api/search", headers=auth_headers)
        assert response.status_code == 200

    def test_limits_are_per_client(self, client, redis):
        for _ in range(100):
            client.get("/api/search", headers=auth_headers_client_a)
        response = client.get("/api/search", headers=auth_headers_client_b)
        assert response.status_code == 200

    def test_latency_overhead_within_budget(self, client, redis, benchmark):
        result = benchmark(lambda: client.get("/api/search", headers=auth_headers))
        assert result.mean < 0.005  # 5ms budget
```

### 5. Implementation

**What it is:** The actual code that implements the feature. In agentic CD, this may be generated entirely by the agent, co-authored by agent and human, or authored by a human with agent assistance.

**Why it matters for agentic CD:** The implementation is the artifact most likely to be agent-generated. The key requirement is that it must satisfy the executable truth (tests), conform to the feature description (architecture), and achieve the intent description (purpose).

**Review requirements:** Agent-generated implementation must be reviewed by a human before merging to trunk. The review focuses on:

- Does the implementation match the intent? (Not just "does it pass tests?")
- Does it follow the architectural constraints in the feature description?
- Does it introduce unnecessary complexity, dependencies, or security risks?
- Would a human developer on the team understand and maintain this code?

### 6. System Constraints

**What it is:** Non-functional requirements, security policies, performance budgets, and organizational rules that apply to all changes.

**Why it matters for agentic CD:** Human developers internalize system constraints through experience and team norms. Agents need these constraints stated explicitly.

**Examples:**

```yaml
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
```

## The Agentic CD Workflow

When an AI agent contributes to a CD pipeline, the workflow extends the standard CD pipeline:

```
1. HUMAN writes Intent Description
2. HUMAN writes or reviews User-Facing Behavior (BDD scenarios)
3. HUMAN writes or reviews Feature Description (architecture)
4. HUMAN writes or reviews Executable Truth (tests)
5. AGENT generates Implementation (code)
6. PIPELINE validates Implementation against Executable Truth (automated tests)
7. HUMAN reviews Implementation (code review)
8. PIPELINE deploys (same pipeline as any other change)
```

**Key differences from standard CD:**

- Steps 1-4 happen before the agent generates code (test-first is mandatory, not optional)
- Step 7 (human review) is mandatory for agent-generated code
- System constraints are checked automatically in the pipeline (Step 6)

## Constraints for Agent-Generated Changes

Beyond the six artifacts, agentic CD imposes additional constraints on agent-generated changes:

### Change Size Limits

Agent-generated changes must be small. Large agent-generated changes are harder to review and more likely to contain subtle issues.

**Guideline:** An agent-generated change should modify no more files and no more lines than a human would in a single commit. If the change is larger, break it into multiple sequential changes.

### Mandatory Human Review

Every agent-generated change must be reviewed by a human before merging to trunk. This is a non-negotiable constraint. The purpose is not to check the agent's "work" in a supervisory sense - it is to verify that the change matches the intent and fits the system.

### Comprehensive Test Coverage

Agent-generated code must have higher test coverage than the team's baseline. If the team's baseline is 80% coverage, agent-generated code should target 90%+. This compensates for the reduced human oversight of the implementation details.

### Provenance Tracking

The pipeline must record which changes were agent-generated, which agent generated them, and what prompt or intent description was used. This supports audit, debugging, and learning.

## Getting Started with Agentic CD

Before jumping into agentic workflows, ensure your team has the prerequisite delivery practices
in place. The [AI Adoption Roadmap](../../../ai-adoption-roadmap/) provides a
step-by-step sequence: quality tools, clear requirements, hardened guardrails, and reduced
delivery friction - all before accelerating with AI coding.

### Phase 1: Agent as Assistant

The agent helps human developers write code, but the human makes all decisions and commits all changes. The pipeline does not know or care about agent involvement.

**This is where most teams are today.** It requires no pipeline changes.

### Phase 2: Agent as Contributor

The agent generates complete changes based on intent descriptions and executable truth. A human reviews and merges. The pipeline validates.

**Requires:** Explicit intent descriptions, test-first workflow, human review gate.

### Phase 3: Agent as Autonomous Contributor

The agent generates, tests, and proposes changes with minimal human involvement. Human review is still mandatory, but the agent handles the full cycle from intent to implementation.

**Requires:** All six first-class artifacts, comprehensive system constraints, provenance tracking, and high confidence in the executable truth.

## Key Pitfalls

### 1. "We let the agent generate tests and code together"

If the agent writes both the tests and the code, the tests may be designed to pass the code rather than to verify the intent. Tests must be written or reviewed by a human before the agent generates the implementation. This is the most important constraint in agentic CD.

### 2. "The agent generates changes faster than we can review them"

This is a feature, not a bug - but only if you have the discipline to not merge unreviewed changes. The agent's speed should not pressure humans to review faster. WIP limits apply: if the review queue is full, the agent stops generating new changes.

### 3. "We trust the agent because it passed the tests"

Passing tests is necessary but not sufficient. Tests cannot verify intent, architectural fitness, or maintainability. Human review remains mandatory.

### 4. "We don't track which changes are agent-generated"

Without provenance tracking, you cannot learn from agent-generated failures, audit agent behavior, or improve the agent's constraints over time. Track provenance from the start.

## Measuring Success

| Metric | Target | Why It Matters |
|--------|--------|----------------|
| Agent-generated change failure rate | Equal to or lower than human-generated | Confirms agent changes meet the same quality bar |
| Review time for agent-generated changes | Comparable to human-generated changes | Confirms changes are reviewable, not rubber-stamped |
| Test coverage for agent-generated code | Higher than baseline | Confirms the additional coverage constraint is met |
| Agent-generated changes with complete artifacts | 100% | Confirms the six-artifact workflow is being followed |

## Next Step

For real-world examples of teams that have made the full journey to continuous deployment, see [Experience Reports](../experience-reports/).

---

> This content is adapted from [MinimumCD.org](https://minimumcd.org),
> licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
