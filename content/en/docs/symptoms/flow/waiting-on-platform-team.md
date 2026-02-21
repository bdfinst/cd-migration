---
title: "Work Stalls Waiting for the Platform or Infrastructure Team"
linkTitle: "Waiting on platform team"
description: >
  Teams cannot provision environments, update configurations, or access infrastructure without filing a ticket and waiting for a separate platform or ops team to act.
tags:
  - team-dynamics
  - deployment-automation
---

## What you are seeing

A team needs a new environment for testing, a configuration value updated, a database instance
provisioned, or a new service account created. They file a ticket. The platform team has its own
backlog and prioritization process. The ticket sits for two days, then a week. The team's sprint
work is blocked until it is resolved. When the platform team delivers, there is a round of
back-and-forth because the request was not specific enough, and the team waits again.

This happens repeatedly across different types of requests: compute resources, network access,
environment variables, secrets, certificates, DNS entries. Each one is a separate ticket, a
separate queue, a separate wait. Developers learn to front-load requests at the beginning of
sprints to get ahead of the lead time, but the lead times shift and the requests still arrive
too late.

## Common causes

### Separate Ops/Release Team

When infrastructure and platform work is owned by a separate team, developers have no path to
self-service. Every infrastructure need becomes a cross-team request. The platform team is
optimizing its own backlog, which may not align with the delivery team's priorities. The
structural separation means that the team doing the work and the team enabling the work have
different schedules, different priorities, and different definitions of urgency.

**Read more:** [Separate Ops/Release Team](../../anti-patterns/organizational-cultural/separate-ops-team/)

### No On-Call or Operational Ownership

When delivery teams do not own their infrastructure and operational concerns, they have no
incentive or capability to build self-service tooling. The platform team owns the infrastructure
and therefore controls access to it. Teams that own their own operations build automation and
self-service interfaces because the cost of tickets falls on them. Teams that don't own operations
accept the ticket queue because there is no alternative.

**Read more:** [No On-Call or Operational Ownership](../../anti-patterns/organizational-cultural/no-operational-ownership/)

## How to narrow it down

1. **Does the team file tickets for infrastructure changes that should take minutes?** If
   provisioning a test environment or updating a config value requires a cross-team request and
   a multi-day wait, the team lacks self-service capability. Start with
   [Separate Ops/Release Team](../../anti-patterns/organizational-cultural/separate-ops-team/).
2. **Does the team own the operational concerns of what they build?** If another team manages
   production, monitoring, and infrastructure for the delivery team's services, the delivery team
   has no path to self-service. Start with
   [No On-Call or Operational Ownership](../../anti-patterns/organizational-cultural/no-operational-ownership/).

---

## Related Content

- [Lack of Self-Service Environments](../lack-of-self-service-environments/) - Environments that require tickets to provision
- [Pipeline Changes Require Another Team](../../symptoms/deployment/pipeline-changes-require-another-team/) - Pipeline config changes blocked by the same structural separation
- [Sprint Planning Is Dominated by Dependency Negotiation](../dependency-heavy-planning/) - Cross-team waits that dominate planning
- [Separate Ops/Release Team](../../anti-patterns/organizational-cultural/separate-ops-team/) - Structural separation that prevents self-service
- [No On-Call or Operational Ownership](../../anti-patterns/organizational-cultural/no-operational-ownership/) - Delivery teams without operational responsibility
