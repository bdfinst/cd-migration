---
title: "Phase 1: Foundations"
linkTitle: "1 - Foundations"
weight: 2
description: >
  Establish the essential practices for daily integration, testing, and small work decomposition.
---

{{% pageinfo %}}
**Key question:** "Can we integrate safely every day?"

This phase establishes the development practices that make continuous delivery possible.
Without these foundations, pipeline automation just speeds up a broken process.
{{% /pageinfo %}}

## What You'll Do

1. **[Adopt trunk-based development](trunk-based-development/)** - Integrate to trunk at least daily
2. **[Build testing fundamentals](testing-fundamentals/)** - Create a fast, reliable test suite
3. **[Automate your build](build-automation/)** - One command to build, test, and package
4. **[Decompose work](work-decomposition/)** - Break features into small, deliverable increments
5. **[Streamline code review](code-review/)** - Fast, effective review that doesn't block flow
6. **[Establish working agreements](working-agreements/)** - Shared definitions of done and ready
7. **[Everything as code](everything-as-code/)** - Infrastructure, pipelines, schemas, monitoring, and security policies in version control, delivered through pipelines

## Why This Phase Matters

These practices are the prerequisites for everything that follows. Trunk-based development
eliminates merge hell. Testing fundamentals give you the confidence to deploy frequently.
Small work decomposition reduces risk per change. Together, they create the feedback loops
that drive continuous improvement.

## When You're Ready to Move On

You're ready for [Phase 2: Pipeline](../pipeline/) when:

- All developers integrate to trunk at least once per day
- Your test suite catches real defects and runs in under 10 minutes
- You can build and package your application with a single command
- Most work items are completable within 2 days

---

## Related Content

- [Phase 0: Assess](../assess/) - The assessment phase that precedes Foundations
- [Phase 2: Pipeline](../pipeline/) - The next phase after establishing foundations
- [DORA Capabilities](../../../reference/dora-capabilities/) - Research-backed capabilities that drive delivery performance
- [No Fast Feedback](../../../symptoms/flow/no-fast-feedback/) - Symptom that foundational practices address
- [Works on My Machine](../../../symptoms/visibility/works-on-my-machine/) - Symptom eliminated by build automation and testing foundations
- [Deployment Frequency](../../../reference/metrics/release-frequency/) - Key metric that improves as foundations mature
