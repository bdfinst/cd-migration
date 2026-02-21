---
title: "Teams Cannot Change Their Own Pipeline Without Another Team"
linkTitle: "Pipeline changes blocked by another team"
description: >
  Adding a build step, updating a deployment config, or changing an environment variable requires filing a ticket with a platform or DevOps team and waiting.
tags:
  - deployment-automation
  - process-gates
---

## What you are seeing

A developer needs to add a security scan to the [pipeline](../../glossary/#pipeline). They open the pipeline configuration
and find it lives in a repository they do not have write access to, managed by the platform
team. They file a ticket describing the change. The platform team reviews it, asks clarifying
questions, schedules it for next sprint. The change ships two weeks later.

The same pattern repeats for every pipeline modification: adding a new test stage, updating a
deployment timeout, rotating a secret, enabling a [feature flag](../../glossary/#feature-flag) in the pipeline. Each change is
a ticket, a queue, a wait. Teams learn to live with suboptimal pipeline configurations rather
than pay the cost of requesting every improvement. The pipeline calcifies - nobody changes it
because changing it is expensive, so problems accumulate and are worked around rather than
fixed.

## Common causes

### Separate Ops/Release Team

When a dedicated team owns the pipeline infrastructure, delivery teams have no path to change
it themselves. The platform team controls who can modify pipeline definitions, which environments
are available, and how deployments are structured. This separation was often put in place for
consistency or security reasons, but the effect is that the teams doing the work cannot improve
the process supporting that work. Every pipeline improvement requires cross-team coordination,
which means most improvements never happen.

**Read more:** [Separate Ops/Release Team](../../anti-patterns/organizational-cultural/separate-ops-team/)

### Pipeline Definitions Not in Version Control

When pipeline configurations are managed through a GUI, a proprietary tool, or some other
mechanism outside version control, delivery teams cannot own them in the same way they own their
application code. There is no pull request process for pipeline changes, no way to review or
roll back, and no natural path for the delivery team to make changes. The configuration lives
in a system controlled by whoever administers the pipeline tool, which is typically not the
delivery team.

**Read more:** [Pipeline Definitions Not in Version Control](../../anti-patterns/pipeline/pipeline-not-versioned/)

### No Infrastructure as Code

When infrastructure is configured manually rather than defined as code, changes require access
to systems and knowledge that delivery teams typically do not have. A delivery team cannot
self-service a new environment or update a deployment target without someone who has access
to the infrastructure tooling. Infrastructure as code puts the configuration in files the
delivery team can read, propose changes to, and own, removing the dependency on the platform
team for every modification.

**Read more:** [No Infrastructure as Code](../../anti-patterns/pipeline/no-infrastructure-as-code/)

## How to narrow it down

1. **Do delivery teams have write access to their own pipeline configuration?** If the pipeline
   lives in a repository or system the team cannot modify, they cannot own their delivery
   process. Start with [Separate Ops/Release Team](../../anti-patterns/organizational-cultural/separate-ops-team/).
2. **Is the pipeline defined in version-controlled files?** If pipeline configuration lives in
   a GUI or proprietary system rather than code, there is no natural path for team ownership.
   Start with [Pipeline Definitions Not in Version Control](../../anti-patterns/pipeline/pipeline-not-versioned/).
3. **Is infrastructure defined as code that the delivery team can read and propose changes to?**
   If infrastructure is managed manually by another team, self-service is not possible. Start
   with [No Infrastructure as Code](../../anti-patterns/pipeline/no-infrastructure-as-code/).

---

## Related Content

- [Waiting on Platform Team](../../symptoms/flow/waiting-on-platform-team/) - Broader pattern of infrastructure blocked by a separate team
- [Change Management Overhead](../change-management-overhead/) - Approval processes that slow pipeline changes further
- [Separate Ops/Release Team](../../anti-patterns/organizational-cultural/separate-ops-team/) - Structural separation that prevents pipeline ownership
- [Pipeline Definitions Not in Version Control](../../anti-patterns/pipeline/pipeline-not-versioned/) - Pipeline config outside team control
- [No Infrastructure as Code](../../anti-patterns/pipeline/no-infrastructure-as-code/) - Manual infrastructure that requires another team's involvement
