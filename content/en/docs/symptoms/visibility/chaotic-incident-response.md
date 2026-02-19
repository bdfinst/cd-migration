---
aliases:
  - /docs/symptoms/chaotic-incident-response/
title: "When Something Breaks, Nobody Knows What to Do"
linkTitle: "Chaotic incident response"
description: >
  There are no documented response procedures. Critical knowledge lives in one person's head. Incidents are improvised every time.
tags:
  - observability
  - team-dynamics
---

## What you are seeing

An alert fires at 2 AM. The on-call engineer looks at the dashboard and sees something is wrong with the payment service, but they have never been involved in a payment service incident before. They know the service is critical. They do not know the recovery procedure, the escalation path, the safe restart sequence, or the architectural context needed to diagnose the problem.

They wake up the one person who knows the payment service. That person is on vacation in a different time zone. They respond and start walking through the steps over a video call, explaining the system while simultaneously trying to diagnose the problem. The incident takes four hours to resolve, two of which were spent on knowledge transfer that should have been documented.

The team conducts a post-mortem. The action item is "document the payment service runbook." The action item is added to the backlog. It does not get prioritized. Three months later, there is another 2 AM incident and the same knowledge transfer happens again.

## Common causes

### Knowledge silos

When system knowledge is not externalized into runbooks, architectural documentation, and operational procedures, it disappears when the person who holds it is unavailable. Incident response is the most time-pressured context in which to rediscover missing knowledge. The gap between "what we know collectively" and "what is documented" only becomes visible when the person who fills that gap is not present.

Teams that treat runbook maintenance as part of incident response - updating documentation immediately after resolving an incident, while the context is fresh - gradually close the gap. The runbook improves with every incident rather than remaining stale between rare documentation efforts.

**Read more:** [Knowledge silos](../../anti-patterns/team-workflow/knowledge-silos/)

### Blind operations

Without adequate observability, diagnosing the cause of an incident requires deep system knowledge rather than reading dashboards. An on-call engineer with good observability can often identify the root cause of an incident from metrics, logs, and traces without needing the one person who understands the system internals. An on-call engineer without observability is flying blind, dependent on tribal knowledge.

Good observability turns incident response from an expert-only activity into something any trained engineer can do from a dashboard. The runbook points at the right metrics; the metrics tell the story.

**Read more:** [Blind operations](../../anti-patterns/monitoring-observability/blind-operations/)

### Manual deployments

Systems deployed manually often have complex, undocumented operational characteristics. The manual deployment knowledge and the incident response knowledge are often held by the same person - because the person who knows how to deploy a service also knows how it behaves and how to recover it. This concentration of knowledge is a single point of failure.

**Read more:** [Manual deployments](../../anti-patterns/pipeline/manual-deployments/)

## How to narrow it down

1. **Does every service have a runbook that an on-call engineer unfamiliar with the service could follow?** If not, incident response requires specific people. Start with [Knowledge silos](../../anti-patterns/team-workflow/knowledge-silos/).
2. **Can the on-call engineer determine the likely cause of an incident from dashboards alone?** If diagnosing incidents requires deep system knowledge, observability is insufficient. Start with [Blind operations](../../anti-patterns/monitoring-observability/blind-operations/).
3. **Is there a single person whose absence would make incident response significantly harder for multiple services?** That person is a single point of failure. Start with [Knowledge silos](../../anti-patterns/team-workflow/knowledge-silos/).
