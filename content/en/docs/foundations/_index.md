---
title: "Phase 1: Foundations"
linkTitle: "1 - Foundations"
weight: 22
description: >
  Establish the essential practices for daily integration, testing, and small work decomposition.
aliases:
  - /docs/migrate-to-cd/foundations/
---

{{% pageinfo %}}
**Key question:** "Can we integrate safely every day?"

This phase establishes the development practices that make [continuous delivery]({{< relref "/docs/reference/glossary#cd-continuous-delivery" >}}) possible.
Without these foundations, [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}) automation speeds up a broken process.
{{% /pageinfo %}}

## What you'll do

1. **[Adopt trunk-based development]({{< relref "/docs/foundations/trunk-based-development" >}})** - Integrate to trunk at least daily
2. **[Build testing fundamentals]({{< relref "/docs/foundations/testing-fundamentals" >}})** - Create a fast, reliable test suite
3. **[Automate your build]({{< relref "/docs/foundations/build-automation" >}})** - One command to build, test, and package
4. **[Decompose work]({{< relref "/docs/foundations/work-decomposition" >}})** - Break features into small, deliverable increments
5. **[Streamline code review]({{< relref "/docs/foundations/code-review" >}})** - Fast, effective review that does not block flow
6. **[Establish working agreements]({{< relref "/docs/foundations/working-agreements" >}})** - Shared definitions of done and ready
7. **[Everything as code]({{< relref "/docs/foundations/everything-as-code" >}})** - Version-control everything that defines your system: infrastructure, pipelines, schemas, monitoring, and security policies

## Why this phase matters

Teams that skip these foundations end up automating a broken process. A pipeline that deploys untested code from long-lived branches does not improve delivery. It amplifies risk. These practices ensure that what enters the pipeline is already safe to ship.

## When you're ready to move on

Start investing in [Phase 2: Pipeline]({{< relref "/docs/pipeline" >}}) when you are making
consistent progress toward these - don't wait for every criterion to be perfect:

- All developers integrate to trunk at least once per day
- Your test suite catches real defects and runs in under 10 minutes
- You can build and package your application with a single command
- Most work items can be completed within 2 days

**Next:** [Phase 2 - Pipeline]({{< relref "/docs/pipeline" >}}) - build a single automated path from commit to production.

---

## Related content

- [Phase 0: Assess]({{< relref "/docs/assess" >}}) - The assessment phase that precedes Foundations
- [Phase 2: Pipeline]({{< relref "/docs/pipeline" >}}) - The next phase after establishing foundations
- [DORA Recommended Practices]({{< relref "/docs/reference/dora-capabilities" >}}) - Research-backed capabilities that drive delivery performance
- [No Fast Feedback]({{< relref "/docs/symptoms/flow/integration/no-fast-feedback" >}}) - Symptom that foundational practices address
- [Works on My Machine]({{< relref "/docs/symptoms/visibility/works-on-my-machine" >}}) - Symptom eliminated by build automation and testing foundations
- [Deployment Frequency]({{< relref "/docs/reference/metrics/release-frequency" >}}) - Key metric that improves as foundations mature
