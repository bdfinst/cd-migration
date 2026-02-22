---
title: "Learning Paths"
description: >
  Curated reading paths through the CD Migration Guide, organized by role and goal.
  Follow a path end-to-end or jump in at the step that matches where your team is today.
weight: 15
---

The [CD](glossary/#cd-continuous-delivery) Migration Guide covers a lot of ground. These paths cut through it by role and goal,
giving you a sequenced route from your current pain to a concrete improvement. Each path is
self-contained - you do not need to read the whole guide to follow one.

---

## Path 1: Fix our testing strategy

**Audience:** Developer | **Time investment:** 4-6 weeks of reading and practice

Your test suite is costing you more than it helps. Runs are slow, failures are random, and bugs
still reach production despite high coverage. This path takes you from recognizing the symptoms
to understanding the root causes, then gives you the fix guide and the structural changes that
prevent recurrence.

1. [Tests Randomly Pass or Fail](symptoms/testing/flaky-tests/) - confirm the symptom
2. [Slow Test Suites](symptoms/testing/slow-test-suites/) - related pain
3. [Inverted Test Pyramid](anti-patterns/testing/inverted-test-pyramid/) - root cause
4. [Manual Testing Only](anti-patterns/testing/manual-testing-only/) - root cause
5. [Testing Fundamentals](migrate-to-cd/migration-path/foundations/testing-fundamentals/) - fix guide
6. [Testing and Observability Gaps](defect-sources/testing-and-observability-gaps/) - prevent recurrence
7. [Pipeline Reference Architecture](pipeline-reference-architecture/) - quality gate placement

---

## Path 2: Build the case for CD adoption

**Audience:** Manager | **Time investment:** 1-2 hours

You suspect the team has a delivery problem but need to name it clearly and connect it to
evidence before proposing changes. This path helps you identify which symptoms apply to your
situation, attach a cost to them, find the root cause in your process, and then point to
research-backed capabilities and a concrete starting step.

1. [For Managers](symptoms/for-managers/) - identify your team's symptoms
2. [Infrequent Releases](symptoms/deployment/infrequent-releases/) - quantify the cost
3. [Missing Deployment Pipeline](anti-patterns/pipeline/missing-deployment-pipeline/) - name the root cause
4. [CAB Approval Gates](anti-patterns/organizational-cultural/cab-gates/) - address the process gap
5. [DORA Capabilities](dora-capabilities/) - the research backing
6. [Phase 0 - Assess](migrate-to-cd/migration-path/assess/) - start here with your team
7. [Baseline Metrics](migrate-to-cd/migration-path/assess/baseline-metrics/) - measure before you change

---

## Path 3: Migrate a struggling brownfield team

**Audience:** Tech Lead | **Time investment:** Ongoing over the migration

Your team has an existing system, existing habits, and real [constraints](glossary/#constraint). A greenfield guide
will not help you here. This path starts with diagnostic framing, walks through the full
phased migration from assess through optimize, and closes with the defect source catalog so
you understand what you are structurally preventing as you build each capability.

1. [Start Here](start-here/) - diagnostic framing
2. [Triage Your Symptoms](triage/) - interactive diagnostic
3. [Brownfield Migration](migrate-to-cd/brownfield/) - context for existing systems
4. [Phase 0 - Assess](migrate-to-cd/migration-path/assess/) - value stream and baselines
5. [Phase 1 - Foundations](migrate-to-cd/migration-path/foundations/) - trunk, tests, build
6. [Phase 2 - Pipeline](migrate-to-cd/migration-path/pipeline/) - automation path
7. [Phase 3 - Optimize](migrate-to-cd/migration-path/optimize/) - flow and metrics
8. [Systemic Defect Sources](defect-sources/) - understand what you are preventing

---

## Path 4: Adopt agentic CD practices

**Audience:** Developer or Tech Lead | **Time investment:** 2-4 hours of reading, then ongoing practice

AI [agents](glossary/#agent-ai) writing and submitting code are a new kind of contributor with a different failure
profile. This path explains what changes with agents in the loop, walks through the constraint
model and workflow architecture, and then covers the concrete setup, session discipline, and
quality gates needed to keep agent output safe to ship.

1. [Agentic CD Overview](agentic-cd/) - what changes with AI agents
2. [First-Class Artifacts](agentic-cd/first-class-artifacts/) - the constraint model
3. [Agentic Architecture](agentic-cd/agentic-architecture/) - skills, agents, hooks
4. [Agent Configuration](agentic-cd/agent-configuration/) - concrete setup
5. [Small-Batch Sessions](agentic-cd/small-batch-sessions/) - discipline for agent work
6. [Pipeline Enforcement](agentic-cd/pipeline-enforcement/) - quality gates for agent output
7. [Pitfalls and Metrics](agentic-cd/pitfalls-and-metrics/) - what goes wrong and how to measure

---

## Already in progress?

If your team is partway through a migration, jump in at the relevant phase:

- [Phase 0 - Assess](migrate-to-cd/migration-path/assess/) - you know something is wrong but have not measured it yet
- [Phase 1 - Foundations](migrate-to-cd/migration-path/foundations/) - you have committed to CD but lack the basics
- [Phase 2 - Pipeline](migrate-to-cd/migration-path/pipeline/) - you have basics in place and need a reliable automated path
- [Phase 3 - Optimize](migrate-to-cd/migration-path/optimize/) - your [pipeline](../glossary/#pipeline) works but flow is still slow or unreliable
- [Phase 4 - Continuous Deployment](migrate-to-cd/migration-path/continuous-deployment/) - you deploy frequently and want to remove the last manual gates
