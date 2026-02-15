---
title: "Deterministic Pipeline"
linkTitle: "Deterministic Pipeline"
weight: 4
description: >
  The same inputs to the pipeline always produce the same outputs.
---

## Definition

A deterministic pipeline produces consistent, repeatable results. Given the same inputs (code, configuration, dependencies), the pipeline will always produce the same outputs and reach the same pass/fail verdict. The pipeline's decision on whether a change is releasable is definitive - if it passes, deploy it; if it fails, fix it.

## Key Principles

1. **Repeatable**: Running the pipeline twice with identical inputs produces identical results
2. **Authoritative**: The pipeline is the final arbiter of quality, not humans
3. **Immutable**: No manual changes to artifacts or environments between pipeline stages
4. **Trustworthy**: Teams trust the pipeline's verdict without second-guessing

## What Makes a Pipeline Deterministic

- **Version control everything**: Source code, IaC, pipeline definitions, test data, dependency lockfiles, tool versions
- **Lock dependency versions**: Always use lockfiles. Never rely on `latest` or version ranges.
- **Eliminate environmental variance**: Containerize builds, pin image tags, install exact tool versions
- **Remove human intervention**: No manual approvals in the critical path, no manual environment setup
- **Fix flaky tests immediately**: Quarantine, fix, or delete. Never allow a "just re-run it" culture.

## What Is Improved

- **Quality increases**: Real issues are never dismissed as "flaky tests"
- **Speed increases**: No time wasted on test reruns or manual verification
- **Trust increases**: Teams rely on the pipeline instead of adding manual gates
- **Debugging improves**: Failures are reproducible, making root cause analysis easier
- **Delivery improves**: Faster, more reliable path from commit to production

## Migration Guidance

For detailed guidance on building a deterministic pipeline, see:

- [Deterministic Pipeline](../../migrate-to-cd/migration-path/pipeline/deterministic-pipeline/) - Phase 2 pipeline practice with anti-pattern/good-pattern examples and getting started steps

## Additional Resources

- [Martin Fowler: Eradicating Non-Determinism in Tests](https://martinfowler.com/articles/nonDeterminism.html)
- [Google Testing Blog: Just Say No to More End-to-End Tests](https://testing.googleblog.com/2015/04/just-say-no-to-more-end-to-end-tests.html)
- [Continuous Delivery: Deployment Pipeline Best Practices](https://continuousdelivery.com/foundations/test-automation/)
