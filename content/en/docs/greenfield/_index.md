---
title: "CD for Greenfield Projects"
draft: true
linkTitle: "Greenfield CD"
weight: 99
description: >
  Starting a new project? Build continuous delivery in from day one instead of retrofitting it later.
---

{{% pageinfo %}}
Starting with CD is dramatically easier than migrating to it. When there is no legacy process,
no existing test suite to fix, and no entrenched habits to change, you can build the right
practices from the first commit. This section shows you how.
{{% /pageinfo %}}

## Why Start with CD

Teams that build CD into a new project from the beginning avoid the most painful parts of the
migration journey. There is no test suite to rewrite, no branching strategy to unwind, no
deployment process to automate after the fact. Every practice described in this guide can be
adopted on day one when there is no existing codebase to constrain you.

The cost of adopting CD practices in a greenfield project is near zero. The cost of retrofitting
them into a mature codebase can be months of work. The earlier you start, the less it costs.

## What to Build from Day One

### Pipeline first

Before writing application code, set up your delivery pipeline. The pipeline is feature zero.
Your first commit should include:

- A build script that compiles, tests, and packages the application
- A CI configuration that runs on every push to trunk
- A deployment mechanism (even if the first "deployment" is to a local environment)
- **Every validation you know you will need from the start**

The validations you put in the pipeline on day one define the quality standard for the
application. They are not overhead you add later - they are the mold that shapes every line of
code that follows. If you add linting after 10,000 lines of code, you are fixing 10,000 lines of
code. If you add it before the first line, every line is written to the standard.

**Feature zero validations:**

- **Code style and formatting** - Enforce a formatter (Prettier, Black, gofmt) so style is
  never a code review conversation. The pipeline rejects code that is not formatted.
- **Linting** - Static analysis rules for your language (ESLint, pylint, golangci-lint). Catches
  bugs, enforces idioms, and prevents anti-patterns before review.
- **Type checking** - If your language supports static types (TypeScript, mypy, Java), enable
  strict mode from the start. Relaxing later is easy. Tightening later is painful.
- **Test framework** - The test runner is configured and a first test exists, even if it only
  asserts that the application starts. The team should never have to set up testing
  infrastructure - it is already there.
- **Security scanning** - Dependency vulnerability scanning (Dependabot, Snyk, Trivy) and basic
  SAST rules. Security findings block the build from day one, so the team never accumulates a
  backlog of vulnerabilities.
- **Commit message or PR conventions** - If you enforce conventional commits, changelog
  generation, or PR title formats, add the check now.

Every one of these is trivial to add to an empty project and expensive to retrofit into a mature
codebase. The pipeline enforces them automatically, so the team never has to argue about them in
review. The conversation shifts from "should we fix this?" to "the pipeline already enforces
this."

The pipeline should exist before the first feature. Every feature you build will flow through it
and meet every standard you defined on day one.

### Deploy "hello world" to production

Your first deployment should happen before your first feature. Deploy the simplest possible
application - a health check endpoint, a static page, a "hello world" - all the way to
production through your pipeline. This is the single most important validation you can do early
because it proves the entire path works: build, test, package, deploy, verify.

**Why production, not staging:** The goal is to prove the full path works end-to-end. If you
deploy only to a staging environment, you have proven that the pipeline works up to staging. You
have not proven that production credentials, network routes, DNS, load balancers, permissions,
and deployment targets are correctly configured. Every gap between your test environment and
production is an assumption that will be tested for the first time under pressure, when it
matters most.

Deploy "hello world" to production on day one, and you will discover:

- Whether the team has the access and permissions to deploy
- Whether the infrastructure provisioning actually works
- Whether the deployment mechanism handles a real production environment
- Whether monitoring and health checks are wired up correctly
- Whether rollback works before you need it in an emergency

All of these are problems you want to find with a "hello world," not with a real feature under
a deadline.

{{% alert title="Warning: deploying only to lower environments" %}}
If organizational constraints prevent you from deploying to production immediately, deploy as
close to production as you can. But be explicit about what this means: **every environment that
is not production is an approximation.** Lower environments may differ in network topology,
security policies, resource capacity, data volume, and third-party integrations. Each difference
is a gap in your confidence.

Track these gaps. Document every known difference between your deployment target and production.
Treat closing each gap as a priority, because until you have deployed to production through your
pipeline, you have not fully validated the path. The longer you wait, the more assumptions
accumulate, and the riskier the first real production deployment becomes.
{{% /alert %}}

### Trunk-based development from the start

There is no reason to start with long-lived branches. From commit one:

- All work happens on trunk (or short-lived branches that merge to trunk within a day)
- The pipeline runs on every integration to trunk
- Trunk is always in a deployable state

See [Trunk-Based Development](../foundations/trunk-based-development/) for the practices.

### Test architecture from the start

Design your test architecture before you have tests to migrate. Establish:

- Unit tests for all business logic
- Integration tests for every external boundary (databases, APIs, message queues)
- Functional tests that exercise your service in isolation with test doubles for dependencies
- Contract tests for every external dependency
- A clear rule: everything that blocks deployment is deterministic

See [Testing Fundamentals](../foundations/testing-fundamentals/) for the full test architecture.

### Small, vertical slices from the start

Decompose the first features into small, independently deployable increments. Establish the habit
of delivering thin vertical slices before the team has a chance to develop a batch mindset.

See [Work Decomposition](../foundations/work-decomposition/) for slicing techniques.

## Greenfield Checklist

Use this checklist to verify your new project is set up for CD from the start.

### Week 1

- [ ] CI pipeline runs on every push to trunk
- [ ] Build, test, and package happen with a single command
- [ ] First unit test exists and passes
- [ ] All work integrates to trunk at least daily
- [ ] Deployment to at least one environment is automated

### Month 1

- [ ] Test architecture established (unit, integration, functional layers)
- [ ] External dependencies use test doubles in the deterministic test suite
- [ ] Contract tests exist for at least one external dependency
- [ ] Pipeline deploys to a production-like environment
- [ ] Rollback is tested and works
- [ ] Application configuration is externalized
- [ ] Artifacts are immutable (build once, deploy everywhere)

### Month 3

- [ ] Pipeline deploys to production
- [ ] Every commit that passes the pipeline is a deployment candidate
- [ ] Deployment is a routine, low-risk event
- [ ] Feature flags decouple deployment from release
- [ ] DORA metrics are tracked (deployment frequency, lead time, change failure rate, MTTR)

## Common Mistakes in Greenfield Projects

| Mistake | Why it happens | What to do instead |
|---------|---------------|-------------------|
| "We'll add tests later" | Pressure to show progress on features | Write the first test before the first feature. TDD from day one. |
| "We'll set up the pipeline later" | Pipeline feels like overhead when there's little code | The pipeline is the first thing you build. Features flow through it. |
| Starting with feature branches | Habit from previous projects | Trunk-based development from commit one. No reason to start with branches. |
| Designing for scale before you have users | Over-engineering from the start | Build the simplest thing that works. Deploy frequently. Evolve the architecture based on real feedback. |
| Skipping contract tests because "we own both services" | Feels redundant when one team owns everything | You will not own everything forever. Contract tests are cheap to add early and expensive to add later. |

## Related Content

- [Testing Fundamentals](../foundations/testing-fundamentals/) - Build the right test architecture from the start
- [Trunk-Based Development](../foundations/trunk-based-development/) - The branching model for CD
- [Pipeline Architecture](../pipeline/pipeline-architecture/) - Design your pipeline structure
- [Work Decomposition](../foundations/work-decomposition/) - Deliver in small, vertical slices
- [Feature Flags](../optimize/feature-flags/) - Decouple deployment from release
