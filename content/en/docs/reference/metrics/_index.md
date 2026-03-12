---
title: "Metrics"
linkTitle: "Metrics"
weight: 11
description: >
  Detailed definitions for key delivery metrics. Understand what to measure and why.
---

These metrics help you assess your current delivery performance and track improvement
over time. Not all metrics are equally useful at every stage of a CD migration.

## Leading Indicators

Leading indicators reflect the current state of team behaviors. They move immediately
when those behaviors change, making them the most useful metrics for driving improvement
during a CD migration. When a leading indicator is unhealthy, the cause is visible and
addressable today.

| Metric | What It Measures |
|--------|------------------|
| [Integration Frequency]({{< relref "/docs/reference/metrics/integration-frequency" >}}) | How often code is integrated to trunk |
| [Build Duration]({{< relref "/docs/reference/metrics/build-duration" >}}) | Time from commit to artifact creation |
| [Development Cycle Time]({{< relref "/docs/reference/metrics/development-cycle-time" >}}) | Time from starting work to delivery |
| [Work in Progress]({{< relref "/docs/reference/metrics/work-in-progress" >}}) | Amount of started but unfinished work |

## DORA Outcome Metrics

The four DORA key metrics are lagging indicators drawn from the DORA research program.
They reflect the cumulative effect of many upstream behaviors and confirm that improvement
work is having the expected systemic effect. Because they are outcome measures, they move
slowly: changes in leading indicator behaviors take weeks or months to surface in these
numbers. Use them to validate the direction of improvement, not to drive it.

| Metric | What It Measures |
|--------|------------------|
| [Lead Time]({{< relref "/docs/reference/metrics/lead-time" >}}) | Time from commit to production |
| [Change Fail Rate]({{< relref "/docs/reference/metrics/change-fail-rate" >}}) | Percentage of changes requiring remediation |
| [Mean Time to Repair]({{< relref "/docs/reference/metrics/mean-time-to-repair" >}}) | Time to restore service after failure |
| [Release Frequency]({{< relref "/docs/reference/metrics/release-frequency" >}}) | How often releases reach production |
