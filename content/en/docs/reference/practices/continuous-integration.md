---
title: "Continuous Integration"
linkTitle: "Continuous Integration"
weight: 1
description: >
  Integrate work to trunk at least daily with automated testing to maintain a releasable codebase.
---

## Definition

Continuous Integration (CI) is the activity of each developer integrating work to the trunk of version control at least daily and verifying that the work is, to the best of our knowledge, releasable.

CI is not just about tooling - it is fundamentally about team workflow and working agreements.

## Minimum Activities Required

1. [Trunk-based development]({{< relref "/docs/reference/practices/trunk-based-development" >}}) - all work integrates to trunk
2. Work integrates to trunk at a minimum daily (each developer, every day)
3. Work has automated testing before merge to trunk
4. Work is tested with other work automatically on merge
5. All feature work stops when the build is red
6. New work does not break delivered work

## Why This Matters

### Without CI, Teams Experience

- **Integration hell**: Weeks or months of painful merge conflicts
- **Late defect detection**: Bugs found after they are expensive to fix
- **Reduced collaboration**: Developers work in isolation, losing context
- **Deployment fear**: Large batches of untested changes create risk
- **Slower delivery**: Time wasted on merge conflicts and rework
- **Quality erosion**: Without rapid feedback, technical debt accumulates

### With CI, Teams Achieve

- **Rapid feedback**: Know within minutes if changes broke something
- **Smaller changes**: Daily integration forces better work breakdown
- **Better collaboration**: Team shares ownership of the codebase
- **Lower risk**: Small, tested changes are easier to diagnose and fix
- **Faster delivery**: No integration delays blocking deployment
- **Higher quality**: Continuous testing catches issues early

## What Is Improved

### Teamwork

CI requires strong teamwork to function correctly. Key improvements:

- **Pull workflow**: Team picks next important work instead of working from assignments
- **Code review cadence**: Quick reviews (< 4 hours) keep work flowing
- **Pair programming**: Real-time collaboration eliminates review delays
- **Shared ownership**: Everyone maintains the codebase together
- **Team goals over individual tasks**: Focus shifts from "my work" to "our progress"

### Work Breakdown

CI forces better work decomposition:

- **Definition of Ready**: Every story has testable acceptance criteria before work starts
- **Small batches**: If the team can complete work in < 2 days, it is refined enough
- **Vertical slicing**: Each change delivers a thin, tested slice of functionality
- **Incremental delivery**: Features built incrementally, each step integrated daily

### Testing

CI requires a shift in testing approach:

- **From** writing tests after code is "complete" **to** writing tests before/during coding (TDD/BDD)
- **From** testing implementation details **to** testing behavior and outcomes
- **From** manual testing before deployment **to** automated testing on every commit
- **From** separate QA phase **to** quality built into development

## Migration Guidance

For detailed guidance on adopting CI practices during your CD migration, see:

- [Trunk-Based Development]({{< relref "/docs/migrate-to-cd/foundations/trunk-based-development" >}}) - Phase 1 foundation
- [Testing Fundamentals]({{< relref "/docs/migrate-to-cd/foundations/testing-fundamentals" >}}) - Phase 1 testing architecture
- [Working Agreements]({{< relref "/docs/migrate-to-cd/foundations/working-agreements" >}}) - Phase 1 team commitments

## Additional Resources

- [Continuous Integration on Martin Fowler's site](https://martinfowler.com/articles/continuousIntegration.html)
- [Accelerate](https://itrevolution.com/product/accelerate/) - Nicole Forsgren, Jez Humble, Gene Kim
- [The Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html) - Martin Fowler
- [Branch By Abstraction](https://www.branchbyabstraction.com/)
- [Feature Toggles](https://martinfowler.com/articles/feature-toggles.html) - Martin Fowler
