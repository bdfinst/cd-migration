---
aliases:
  - /docs/symptoms/outdated-documentation/
title: "Runbooks and Architecture Docs Are Years Out of Date"
linkTitle: "Outdated documentation"
description: >
  Deployment procedures, architecture diagrams, and operational runbooks describe a system that no longer matches reality.
tags:
  - observability
  - team-dynamics
---

## What you are seeing

The runbook for the API service describes a deployment process involving a tool the team migrated away from two years ago. The architecture diagram shows four services; there are now eleven. The "how to add a new service" guide assumes a project structure that was refactored in the last rewrite. The documents are not wrong - they were accurate when written - but nobody updated them as the system evolved.

The team has learned to use documentation as a rough starting point and rely on tribal knowledge for the details. Senior engineers know which documents are outdated and which are still accurate. Newer team members cannot make this distinction and waste time following outdated procedures. Incidents that could be resolved in minutes take hours because the runbook does not match the system the on-call engineer is looking at.

The documentation gap compounds over time. Each change that is not documented increases the gap between documentation and reality. Eventually the gap is so large that nobody trusts any documentation, and all knowledge defaults to person-to-person transfer.

## Common causes

### Knowledge silos

When documentation is the only path from tribal knowledge to shared knowledge, and the team does not value documentation as a practice, knowledge accumulates in people rather than in records. The runbook written under pressure during an incident is the only runbook that gets written. Day-to-day changes that affect operations never get documented because the documentation habit is not part of the development workflow.

Teams that treat documentation as part of the definition of done - the change is not done until it is documented - produce documentation that stays current. Each change author updates the relevant runbooks and architectural records as part of completing the work.

**Read more:** [Knowledge silos](../../anti-patterns/team-workflow/knowledge-silos/)

### Manual deployments

Systems deployed manually have deployment procedures that are highly contextual, learned by doing, and resistant to documentation. The deployment is a craft practice: the person executing it knows which steps to skip in which situations, which warnings to ignore, and which undocumented behaviors to watch for. Documenting this craft knowledge is difficult because it is tacit.

Automating the deployment process forces documentation into code. The [pipeline](../../glossary/#pipeline) definition is the authoritative deployment procedure. When the deployment changes, the pipeline definition changes. The code is always current because the code is the process.

**Read more:** [Manual deployments](../../anti-patterns/pipeline/manual-deployments/)

### Snowflake environments

When environments evolve by hand, the gap between documented architecture and the actual running architecture grows with every undocumented change. An architecture diagram drawn at the last major redesign does not show the database added directly to production for a performance fix, the caching layer added informally, or the service split that happened in a hackathon. Infrastructure as code makes the infrastructure itself the documentation.

**Read more:** [Snowflake environments](../../anti-patterns/pipeline/snowflake-environments/)

## How to narrow it down

1. **Can the on-call engineer follow the runbook for a critical service without help from someone who knows the service?** If not, the runbook is out of date. Start with [Knowledge silos](../../anti-patterns/team-workflow/knowledge-silos/).
2. **Is the deployment procedure defined as pipeline code or as written documentation?** Written documentation drifts; pipeline code is the process itself. Start with [Manual deployments](../../anti-patterns/pipeline/manual-deployments/).
3. **Does the architecture documentation match the current production system?** If the diagram and the reality diverge, the environments were changed without corresponding documentation. Start with [Snowflake environments](../../anti-patterns/pipeline/snowflake-environments/).

**Ready to fix this?** The most common cause is [Knowledge silos](../../anti-patterns/team-workflow/knowledge-silos/). Start with its [How to Fix It](../../anti-patterns/team-workflow/knowledge-silos/#how-to-fix-it) section for week-by-week steps.
