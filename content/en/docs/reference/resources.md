---
title: "Resources"
draft: true
linkTitle: "Resources"
weight: 5
description: >
  Books, videos, and further reading on continuous delivery and deployment.
---

{{% pageinfo %}}
Adapted from [MinimumCD.org](https://minimumcd.org)
{{% /pageinfo %}}

This page collects the books, websites, and videos that inform the practices in this migration
guide. Resources are organized by topic and annotated with which migration phase they are most
relevant to.

## Books

### Continuous Delivery and Deployment

**Continuous Delivery Pipelines** by Dave Farley
: A practical, focused guide to building CD pipelines. Farley covers pipeline design, testing
  strategies, and deployment patterns in a direct, implementation-oriented style. Start here
  if you want a concise guide to the pipeline practices in Phase 2.
: *Most relevant to: [Phase 2 -- Pipeline](../../migration-path/pipeline/)*

**Continuous Delivery** by Jez Humble and Dave Farley
: The foundational text on CD. Published in 2010, it remains the most comprehensive treatment
  of the principles and practices that make continuous delivery work. Covers version control
  patterns, build automation, testing strategies, deployment pipelines, and release management.
  If you read one book before starting your migration, read this one.
: *Most relevant to: All phases*

**Accelerate** by Nicole Forsgren, Jez Humble, and Gene Kim
: Presents the DORA research findings that link technical practices to organizational
  performance. Covers the four key metrics (deployment frequency, lead time, change failure
  rate, MTTR) and the capabilities that predict high performance. Essential reading for anyone
  who needs to make the business case for a CD migration.
: *Most relevant to: [Phase 0 -- Assess](../../migration-path/assess/) and [Phase 3 -- Metrics-Driven Improvement](../../migration-path/optimize/metrics-driven-improvement/)*

**Engineering the Digital Transformation** by Gary Gruver
: Addresses the organizational and leadership challenges of large-scale delivery
  transformation. Gruver draws on his experience leading transformations at HP and other large
  enterprises. Particularly valuable for leaders sponsoring a migration who need to understand
  the change management, communication, and sequencing challenges ahead.
: *Most relevant to: Organizational leadership across all phases*

**Release It!** by Michael T. Nygard
: Covers the design and architecture patterns that make production systems resilient. Topics
  include stability patterns (circuit breakers, bulkheads, timeouts), deployment patterns, and
  the operational realities of running software at scale. Essential reading before entering
  Phase 4, where every change deploys to production automatically.
: *Most relevant to: [Phase 4 -- Continuous Deployment](../../migration-path/continuous-deployment/) and [Phase 2 -- Rollback](../../migration-path/pipeline/rollback/)*

**The DevOps Handbook** by Gene Kim, Jez Humble, Patrick Debois, and John Willis
: A practical companion to *The Phoenix Project*. Covers the Three Ways (flow, feedback, and
  continuous learning) and provides detailed guidance on implementing DevOps practices. Useful
  as a reference throughout the migration.
: *Most relevant to: All phases*

**The Phoenix Project** by Gene Kim, Kevin Behr, and George Spafford
: A novel that illustrates DevOps principles through the story of a fictional IT organization
  in crisis. Useful for building organizational understanding of why delivery improvement
  matters, especially for stakeholders who will not read a technical book.
: *Most relevant to: Building organizational buy-in during [Phase 0](../../migration-path/assess/)*

### Testing

**Growing Object-Oriented Software, Guided by Tests** by Steve Freeman and Nat Pryce
: The definitive guide to test-driven development in practice. Goes beyond unit testing to
  cover acceptance testing, test doubles, and how TDD drives design. Essential reading for
  Phase 1 testing fundamentals.
: *Most relevant to: [Phase 1 -- Testing Fundamentals](../../migration-path/foundations/testing-fundamentals/)*

**Working Effectively with Legacy Code** by Michael Feathers
: Practical techniques for adding tests to untested code, breaking dependencies, and
  incrementally improving code that was not designed for testability. Indispensable if your
  migration starts with a codebase that has little or no automated testing.
: *Most relevant to: [Phase 1 -- Testing Fundamentals](../../migration-path/foundations/testing-fundamentals/)*

### Work Decomposition and Flow

**User Story Mapping** by Jeff Patton
: A practical guide to breaking features into deliverable increments using story maps. Patton's
  approach directly supports the vertical slicing discipline required for small batch delivery.
: *Most relevant to: [Phase 1 -- Work Decomposition](../../migration-path/foundations/work-decomposition/)*

**The Principles of Product Development Flow** by Donald Reinertsen
: A rigorous treatment of flow economics in product development. Covers queue theory, batch
  size economics, WIP limits, and the cost of delay. Dense but transformative. Reading this
  book will change how you think about every aspect of your delivery process.
: *Most relevant to: [Phase 3 -- Optimize](../../migration-path/optimize/)*

**Making Work Visible** by Dominica DeGrandis
: Focuses on identifying and eliminating the "time thieves" that steal productivity: too much
  WIP, unknown dependencies, unplanned work, conflicting priorities, and neglected work. A
  practical companion to the WIP limiting practices in Phase 3.
: *Most relevant to: [Phase 3 -- Limiting WIP](../../migration-path/optimize/limiting-wip/)*

### Architecture

**Building Microservices** by Sam Newman
: Covers the architectural patterns that enable independent deployment, including service
  boundaries, API design, data management, and testing strategies for distributed systems.
: *Most relevant to: [Phase 3 -- Architecture Decoupling](../../migration-path/optimize/architecture-decoupling/)*

**Team Topologies** by Matthew Skelton and Manuel Pais
: Addresses the relationship between team structure and software architecture (Conway's Law in
  practice). Covers team types, interaction modes, and how to evolve team structures to support
  fast flow. Valuable for addressing the organizational blockers that surface throughout the
  migration.
: *Most relevant to: Organizational design across all phases*

## Websites

**[MinimumCD.org](https://minimumcd.org)**
: Defines the minimum set of practices required to claim you are doing continuous delivery.
  This migration guide uses the MinimumCD definition as its target state. Start here to
  understand what CD actually requires.

**[Dojo Consortium](https://dojoconsortium.org)**
: A community-maintained collection of CD practices, metrics definitions, and improvement
  patterns. Many of the definitions and frameworks in this guide are adapted from the Dojo
  Consortium's work.

**[DORA (dora.dev)](https://dora.dev)**
: The DevOps Research and Assessment site, which publishes the annual State of DevOps report
  and provides resources for measuring and improving delivery performance.

**[Trunk-Based Development](https://trunkbaseddevelopment.com)**
: The comprehensive reference for trunk-based development patterns. Covers short-lived
  feature branches, feature flags, branch by abstraction, and release branching strategies.

**[Martin Fowler's blog (martinfowler.com)](https://martinfowler.com)**
: Martin Fowler's site contains authoritative articles on continuous integration, continuous
  delivery, microservices, refactoring, and software design. Key articles include
  "Continuous Integration" and "Continuous Delivery."

**[Google Cloud Architecture Center -- DevOps](https://cloud.google.com/architecture/devops)**
: Google's public documentation of the DORA capabilities, including self-assessment tools and
  implementation guidance.

## Videos

**"Continuous Delivery" by Dave Farley (YouTube channel)**
: Dave Farley's YouTube channel provides weekly videos covering CD practices, pipeline design,
  testing strategies, and software engineering principles. Accessible and practical.
: *Most relevant to: All phases*

**"Continuous Delivery" by Jez Humble (various conference talks)**
: Jez Humble's conference presentations cover the principles and research behind CD. His talk
  "Why Continuous Delivery?" is an excellent introduction for teams and stakeholders who are
  new to the concept.
: *Most relevant to: Building understanding during [Phase 0](../../migration-path/assess/)*

**"Refactoring" and "TDD" talks by Martin Fowler and Kent Beck**
: Foundational talks on the development practices that support CD. Understanding TDD and
  refactoring is essential for Phase 1 testing fundamentals.
: *Most relevant to: [Phase 1 -- Foundations](../../migration-path/foundations/)*

**"The Smallest Thing That Could Possibly Work" by Bryan Finster**
: Covers the work decomposition and small batch delivery practices that are central to this
  migration guide. Focuses on practical techniques for breaking work into vertical slices.
: *Most relevant to: [Phase 1 -- Work Decomposition](../../migration-path/foundations/work-decomposition/) and [Phase 3 -- Small Batches](../../migration-path/optimize/small-batches/)*

## Recommended Reading Order

If you are starting your migration and want to read in the most useful order:

1. **Accelerate** -- to understand the research and build the business case
2. **Continuous Delivery** (Humble & Farley) -- to understand the full picture
3. **Continuous Delivery Pipelines** (Farley) -- for practical pipeline implementation
4. **Working Effectively with Legacy Code** -- if your codebase lacks tests
5. **The Principles of Product Development Flow** -- to understand flow optimization
6. **Release It!** -- before moving to continuous deployment

{{% alert title="Migration Tip" %}}
You do not need to read all of these before starting your migration. Start with the practices
in Phase 1, read *Accelerate* for the business case, and refer to the other resources as you
reach the relevant migration phase. The most important thing is to start delivering
improvements, not to finish a reading list.
{{% /alert %}}

---

> This content is adapted from [MinimumCD.org](https://minimumcd.org),
> licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
