---
aliases:
  - /docs/symptoms/logs-without-insight/
title: "Logs Exist but Cannot Be Searched or Correlated"
linkTitle: "Logs without insight"
description: >
  Every service writes logs, but they are not aggregated or queryable. Debugging requires SSH access to individual servers.
tags:
  - observability
---

## What you are seeing

Debugging a production problem requires SSH access to individual servers and manual correlation across log files. An engineer SSHes into the production server, navigates to the log directory, and greps through gigabytes of log files looking for error messages. The logs from three services involved in the failing request are on three different servers with three different log formats. Correlating events into a coherent timeline requires copying relevant lines into a document and sorting by timestamp manually.

Log rotation has pruned most of what might be relevant from two weeks ago when the issue likely started. The logs that exist are unstructured text mixed with stack traces. Field names differ between services: one logs `user_id`, another logs `userId`, a third logs `uid`. A query to find all errors from a specific user in the past hour would take thirty minutes to run manually across all servers.

The team knows this is a problem but treats it as "we need to add a log aggregation system eventually." Eventually has not arrived. In the meantime, debugging production issues is slow, often incomplete, and dependent on whoever has the institutional knowledge to navigate the logging infrastructure.

## Common causes

### Blind operations

Unstructured, unaggregated logs are one form of not having instrumented a system for observability. Logs that cannot be searched or correlated are only marginally more useful than no logs at all. Observability requires structured logs with consistent field names, aggregated into a searchable store, with the ability to correlate log events across services by request ID or trace context.

Structured logging requires deliberate adoption: a standard log format, consistent field names, correlation identifiers on every log entry. When these are in place, a query that previously required thirty minutes of manual grepping across servers runs in seconds from a single interface.

**Read more:** [Blind operations](../../anti-patterns/monitoring-observability/blind-operations/)

### Knowledge silos

Understanding how to navigate the logging infrastructure - which servers hold which logs, what the rotation schedule is, which grep patterns produce useful results - is knowledge that concentrates in the people who have done enough debugging to learn it. New team members cannot effectively debug production issues independently because they do not know the informal map of where things are.

When logs are aggregated into a centralized, searchable system, the knowledge of where to look is built into the tooling. Any team member can write a query without knowing the physical location of log files.

**Read more:** [Knowledge silos](../../anti-patterns/team-workflow/knowledge-silos/)

## How to narrow it down

1. **Can the team search logs across all services from a single interface?** If debugging requires SSH access to individual servers, logs are not aggregated. Start with [Blind operations](../../anti-patterns/monitoring-observability/blind-operations/).
2. **Can the team trace a single request across multiple services using a shared correlation ID?** If not, distributed debugging is manual assembly work. Start with [Blind operations](../../anti-patterns/monitoring-observability/blind-operations/).
3. **Can new team members debug production issues independently, without help from senior engineers?** If debugging requires knowing the informal map of log locations and formats, the knowledge is siloed. Start with [Knowledge silos](../../anti-patterns/team-workflow/knowledge-silos/).
