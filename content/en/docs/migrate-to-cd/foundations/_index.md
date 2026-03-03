---
title: "Phase 1: Foundations"
linkTitle: "1 - Foundations"
weight: 2
description: >
  Establish the essential practices for daily integration, testing, and small work decomposition.
---

{{% pageinfo %}}
**Key question:** "Can we integrate safely every day?"

This phase establishes the development practices that make [continuous delivery]({{< relref "/docs/reference/glossary#cd-continuous-delivery" >}}) possible.
Without these foundations, [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}) automation just speeds up a broken process.
{{% /pageinfo %}}

## What You'll Do

1. **[Adopt trunk-based development]({{< relref "/docs/migrate-to-cd/foundations/trunk-based-development" >}})** - Integrate to trunk at least daily
2. **[Build testing fundamentals]({{< relref "/docs/migrate-to-cd/foundations/testing-fundamentals" >}})** - Create a fast, reliable test suite
3. **[Automate your build]({{< relref "/docs/migrate-to-cd/foundations/build-automation" >}})** - One command to build, test, and package
4. **[Decompose work]({{< relref "/docs/migrate-to-cd/foundations/work-decomposition" >}})** - Break features into small, deliverable increments
5. **[Streamline code review]({{< relref "/docs/migrate-to-cd/foundations/code-review" >}})** - Fast, effective review that doesn't block flow
6. **[Establish working agreements]({{< relref "/docs/migrate-to-cd/foundations/working-agreements" >}})** - Shared definitions of done and ready
7. **[Everything as code]({{< relref "/docs/migrate-to-cd/foundations/everything-as-code" >}})** - Infrastructure, pipelines, schemas, monitoring, and security policies in version control, delivered through pipelines

## Why This Phase Matters

These practices are the prerequisites for everything that follows. [Trunk-based development]({{< relref "/docs/reference/glossary#tbd-trunk-based-development" >}})
eliminates merge hell. Testing fundamentals give you the confidence to deploy frequently.
Small work decomposition reduces risk per change. Together, they create the feedback loops
that drive continuous improvement.

## When You're Ready to Move On

You're ready for [Phase 2: Pipeline]({{< relref "/docs/migrate-to-cd/pipeline" >}}) when:

- All developers integrate to trunk at least once per day
- Your test suite catches real defects and runs in under 10 minutes
- You can build and package your application with a single command
- Most work items are completable within 2 days

**Next:** [Phase 2 - Pipeline]({{< relref "/docs/migrate-to-cd/pipeline" >}}) - build a single automated path from commit to production.

---

## Related Content

- [Phase 0: Assess]({{< relref "/docs/migrate-to-cd/assess" >}}) - The assessment phase that precedes Foundations
- [Phase 2: Pipeline]({{< relref "/docs/migrate-to-cd/pipeline" >}}) - The next phase after establishing foundations
- [DORA Recommended Practices]({{< relref "/docs/reference/dora-capabilities" >}}) - Research-backed capabilities that drive delivery performance
- [No Fast Feedback]({{< relref "/docs/symptoms/flow/integration/no-fast-feedback" >}}) - Symptom that foundational practices address
- [Works on My Machine]({{< relref "/docs/symptoms/visibility/works-on-my-machine" >}}) - Symptom eliminated by build automation and testing foundations
- [Deployment Frequency]({{< relref "/docs/reference/metrics/release-frequency" >}}) - Key metric that improves as foundations mature
