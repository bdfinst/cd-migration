---
title: "Trunk-Based Development"
linkTitle: "Trunk-Based Development"
weight: 2
description: >
  All changes integrate into a single shared trunk with no intermediate branches.
---

> "Trunk-based development has been shown to be a predictor of high performance in software development and delivery. It is characterized by fewer than three active branches in a code repository; branches and forks having very short lifetimes (e.g., less than a day) before being merged; and application teams rarely or never having 'code lock' periods when no one can check in code or do pull requests due to merging conflicts, code freezes, or stabilization phases."
>
> - _Accelerate_ by Nicole Forsgren Ph.D., Jez Humble & Gene Kim

## Definition

Trunk-based development (TBD) is a team workflow where changes are integrated into the trunk with no intermediate integration (develop, test, etc.) branch. The two common workflows are [making changes directly to the trunk](https://trunkbaseddevelopment.com/#trunk-based-development-for-smaller-teams) or using [very short-lived branches](https://trunkbaseddevelopment.com/#scaled-trunk-based-development) that branch from the trunk and integrate back into the trunk.

Release branches are an intermediate step that some choose on their path to continuous delivery while improving their quality processes in the pipeline. True CD releases from the trunk.

## Minimum Activities Required

- All changes integrate into the trunk
- If branches from the trunk are used:
  - They originate from the trunk
  - They re-integrate to the trunk
  - They are short-lived and removed after the merge

## What Is Improved

- **Smaller changes**: TBD emphasizes small, frequent changes that are easier for the team to review and more resistant to impactful merge conflicts. Conflicts become rare and trivial.
- **We must test**: TBD requires us to implement tests as part of the development process.
- **Better teamwork**: We need to work more closely as a team. This has many positive impacts, not least we will be more focused on getting the team's highest priority done.
- **Better work definition**: Small changes require us to decompose the work into a level of detail that helps uncover things that lack clarity or do not make sense. This provides much earlier feedback on potential quality issues.
- **Replaces process with engineering**: Instead of creating a process where we control the release of features with branches, we can control the release of features with engineering techniques called evolutionary coding methods. These techniques have additional benefits related to stability that cannot be found when replaced by process.
- **Reduces risk**: Long-lived branches carry two common risks. First, the change will not integrate cleanly and the merge conflicts result in broken or lost features. Second, the branch will be abandoned, usually because of the first reason.

## Migration Guidance

For detailed guidance on adopting TBD during your CD migration, see:

- [Trunk-Based Development](../migrate-to-cd/migration-path/foundations/trunk-based-development/) - Phase 1 foundation with two migration paths
- [TBD Migration Guide](../migrate-to-cd/migration-path/foundations/trunk-based-development/tbd-migration/) - Detailed tactical guide for moving from [GitFlow](../glossary/#gitflow) to TBD

## Additional Resources

- [trunkbaseddevelopment.com](https://trunkbaseddevelopment.com/) - Comprehensive reference by Paul Hammant
- [Continuous Delivery](https://continuousdelivery.com) - Jez Humble and David Farley
- [Feature Toggles](https://martinfowler.com/articles/feature-toggles.html) - Martin Fowler
