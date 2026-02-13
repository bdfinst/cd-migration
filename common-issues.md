# Common Issues Teams Face Migrating to CD

Working document for deciding which problems to address and mapping them to solutions.

## Delivery Speed & Frequency

1. **Infrequent releases** - Deploying monthly, quarterly, or less. Releases are large, risky
   events that require war rooms and weekend work.

2. **Hardening/stabilization sprints** - Dedicating one or more sprints after "feature complete"
   to stabilize code before release. Bug-fixing phases disguised as sprints.

3. **Release trains** - Changes wait for the next scheduled release window regardless of
   readiness. A change finished on Monday waits until the Thursday release train.

4. **Coordinated releases across teams** - "We can't deploy until Team X is ready." Multiple
   teams must release together because of tight coupling, creating multi-team release ceremonies.

5. **Deploy only at sprint boundaries** - All stories bundled into a single end-of-sprint
   release. Two-week batch releases wearing Agile clothing.

6. **Slow pipelines** - CI/CD pipelines that take 30+ minutes (or hours). Developers stop
   waiting for results, context-switch, and lose feedback loops.

7. **Deployment windows** - Production changes only allowed during specific hours (e.g.,
   Tuesday 2-4 AM). Creates artificial queuing and batching.

8. **Release manager bottleneck** - A single person or role responsible for coordinating and
   executing releases. Deployments stop when that person is unavailable.

## Branching & Integration

9. **Long-lived feature branches** - Branches that live for weeks or months. Merging becomes a
   project in itself. The longer the branch, the bigger the risk.

10. **Painful merges** - Integration is a dreaded, multi-day event. Teams delay merging because
    it's painful, which makes the next merge even more painful.

11. **No continuous integration** - The build has been red for weeks and nobody cares. "CI" means
    a build server exists, not that anyone actually integrates continuously.

12. **Cherry-pick releases** - Hand-selecting specific commits for release instead of deploying
    trunk. Indicates trunk isn't trusted to be deployable at all times.

13. **Release branches with extensive backporting** - Maintaining multiple release branches and
    manually backporting fixes. Exponential overhead as branches multiply.

14. **Pull request review bottlenecks** - PRs sit for days waiting for review. Reviews happen in
    large batches. Authors have moved on by the time feedback arrives.

15. **"Don't merge, I'm about to deploy"** - Developers announcing merge freezes because the
    integration process is fragile. Deploying requires coordination in chat.

## Testing & Quality

16. **No test automation** - Zero automated tests. The team has no idea where to start and the
    codebase wasn't designed for testability.

17. **Manual regression testing gates** - Every release requires days or weeks of manual testing.
    Testers execute scripted test cases. Test effort scales linearly with app size.

18. **Flaky/unreliable test suites** - Tests that randomly pass or fail. Developers re-run the
    pipeline until it goes green. "Oh that test always fails, just ignore it."

19. **Slow test suites** - Test suites that take 30+ minutes. Developers don't run them locally.
    Feedback is so delayed it's nearly useless.

20. **Testing only at the end** - QA as a phase after development. Testers are downstream
    consumers of developer output rather than integrated team members.

21. **Inverted test pyramid** - Most tests are slow end-to-end/UI tests. Few unit tests. The
    test suite is slow, brittle, and expensive to maintain.

22. **No testing in production** - No smoke tests, no synthetic monitoring, no canary analysis.
    The team only discovers production issues when users report them.

23. **Environment-dependent test failures** - "Works on my machine." Tests pass locally but fail
    in CI due to environment differences, timing, or external dependencies.

24. **Untestable architecture** - Tightly coupled code with no dependency injection, no
    interfaces, no seams. Writing tests requires major refactoring first.

25. **QA signoff as a gate** - A specific person must manually approve each release based on
    exploratory testing. That person becomes a bottleneck.

26. **No contract testing** - Services test in isolation but break when integrated because
    there's no agreement on API contracts between teams.

27. **Test data management chaos** - No strategy for test data. Tests depend on shared mutable
    state in a shared database. Tests interfere with each other.

## Work Decomposition & Planning

28. **Stories too large** - User stories regularly take more than a week. Developers work on a
    single story for days without integrating.

29. **No vertical slicing** - Stories organized by technical layer ("build the API," "build the
    UI") rather than by user-visible behavior. Nothing is deployable until all layers are done.

30. **Too much work in progress** - Every developer on a different story. 8 items in progress, 0
    done. Nothing gets the focused attention needed to finish.

31. **Distant date commitments** - Fixed scope committed to months in advance. Pressure to cut
    corners when the deadline approaches. Scope is locked, quality flexes.

32. **Velocity used as productivity metric** - Story points as a management KPI. Teams inflate
    estimates. Incentive is to maximize points, not to deliver value.

33. **Big-bang feature delivery** - Features designed and built as large monolithic units.
    No incremental delivery. Either the whole feature ships or nothing does.

34. **Estimation theater** - Hours spent estimating work that changes as soon as development
    starts. Precision estimates for inherently uncertain work.

35. **Dependency-heavy planning** - Teams can't start work until another team finishes something.
    Sprint planning is dominated by cross-team dependency negotiation.

## Pipeline & Infrastructure

36. **No pipeline exists** - Builds and deployments are manual processes. Someone runs a script
    on their laptop. There is no automated path from commit to production.

37. **Manual deployments** - SSH into servers and run scripts by hand. Deployments are an art
    form that only certain people know how to do.

38. **Snowflake environments** - Each environment is hand-configured and unique. Nobody knows
    exactly what's running where. Configuration drift is constant.

39. **No infrastructure as code** - Servers provisioned manually through UIs. Environment
    creation takes days or weeks and requires tickets to another team.

40. **Config embedded in artifacts** - Connection strings, API URLs, and feature flags baked into
    the build. Must rebuild per environment. The tested artifact isn't what gets deployed.

41. **No environment parity** - Dev, staging, and production are wildly different. "Passed in
    staging" provides little confidence about production behavior.

42. **Shared test environments** - Multiple teams share a single staging environment. Contention,
    broken shared state, and "who deployed to staging?" are daily problems.

43. **No artifact registry** - No centralized storage for build outputs. Artifacts are rebuilt
    for each environment or exist only on the build server that created them.

44. **Pipeline as code isn't versioned** - Pipeline definitions maintained through a UI rather
    than in source control. No review process, no history, no reproducibility.

45. **No rollback capability** - Deployments are one-way doors. If something breaks, the only
    option is to rush a forward fix. Nobody practices or tests rollback.

46. **Database migrations block deploys** - Schema changes require downtime. Migrations run
    during deployment and lock the database. Failed migrations leave the DB in an unknown state.

47. **Secret management is ad-hoc** - Credentials in config files, environment variables set
    manually, secrets shared in Slack. No vault, no rotation, no audit trail.

48. **No build caching or optimization** - Every build starts from scratch. Dependencies are
    downloaded on every run. Builds are slow because nobody has invested in making them fast.

## Monitoring & Observability

49. **No observability** - Can't tell if a deployment is healthy after it goes out. No metrics,
    no logs aggregation, no tracing. Issues are discovered when customers call support.

50. **Alert fatigue** - So many noisy alerts that the team ignores them all. Pages fire for
    non-issues. Real problems are lost in the noise.

51. **No deployment health checks** - After deploying, there is no automated verification that
    the new version is working. The team "waits and watches" for a while and hopes for the best.

52. **Mean time to detect is hours or days** - Problems in production aren't discovered until
    users report them. No synthetic monitoring, no anomaly detection.

53. **Logs but no insight** - Logs exist but aren't aggregated, searchable, or correlated.
    Debugging production issues requires SSH-ing into individual servers and grepping log files.

54. **No runbooks or incident response process** - When something breaks, it's chaos. No
    documented procedures. Knowledge lives in one person's head.

## Organizational & Cultural

55. **Change Advisory Board (CAB) gates** - Manual committee approval required for every
    production change. Meetings are weekly. One-line changes wait alongside major migrations.

56. **Separate ops/release team** - Developers throw code over the wall. A different team is
    responsible for deploying it. Feedback loops between dev and ops are long or nonexistent.

57. **Siloed QA team** - Testing is "someone else's job." Developers write code, throw it to
    QA, and move to the next story. QA finds bugs days later, developer has lost context.

58. **Fear of deploying** - Production deployments cause anxiety because they frequently fail.
    Teams delay deployments to avoid risk, which increases batch size, which increases risk.

59. **"We're different" mindset** - Belief that CD works for others but not here. "We're
    regulated." "We're too big." "Our technology is too old." Used to justify not starting.

60. **No leadership buy-in** - Management doesn't understand why CD matters. No budget for
    tooling. No time allocated for improvement. "Just ship features."

61. **Team instability** - Members frequently reassigned. No shared context or working
    agreements. Constantly restarting the journey.

62. **Meaningless retrospectives** - Same problems surface every sprint. Action items are never
    completed. The team has stopped believing improvement is possible.

63. **Hero culture** - Certain individuals are relied upon for critical deployments and
    firefighting. Knowledge is hoarded. The bus factor is 1.

64. **Blame culture after incidents** - Post-mortems focus on who caused the problem rather than
    what systemic issues allowed it. People hide mistakes instead of learning from them.

65. **Misaligned incentives** - Teams rewarded for shipping features, not for stability or
    delivery speed. Nobody's OKR includes "reduce lead time" or "increase deploy frequency."

66. **Resistance to trunk-based development** - Developers feel unsafe without feature branches.
    "What if my incomplete code breaks something?" Deeply ingrained branch-based workflows.

67. **"Move fast and break things" vs. "don't break anything"** - Cultural split between
    shipping speed and production stability. Neither side sees how CD solves both.

68. **Knowledge silos** - Only one person understands the build, the deployment, the database,
    or a critical service. That person is a bottleneck and a single point of failure.

69. **Outsourced or offshore development with handoffs** - Code written by one team, tested by
    another, deployed by a third. Handoffs add days of latency and lose context.

## Compliance & Security

70. **Compliance requires manual approval** - SOX, HIPAA, PCI, or other regulations interpreted
    as requiring human review of every change. Audit evidence is manual documentation.

71. **Security scanning not in the pipeline** - Security reviews happen at the end, if at all.
    Vulnerabilities discovered late are expensive to fix and block releases.

72. **Separation of duties interpreted as separate teams** - Compliance requirement for
    separation of duties implemented as "developers can't deploy." Instead of automated controls,
    organizational walls are erected.

73. **No audit trail for deployments** - Can't prove what was deployed when, by whom, or what
    tests it passed. Auditors require manual evidence collection.

74. **Change management overhead** - Every change requires a change ticket, impact assessment,
    rollback plan document, and approval chain. Overhead is the same for a one-line fix and a
    major rewrite.

75. **Security review bottleneck** - A central security team must review changes. The queue is
    weeks long. Security becomes a gate rather than a guardrail.

## Architecture

76. **Tightly coupled monolith** - Changing one module breaks others. No clear boundaries. Every
    change is high-risk because blast radius is unpredictable.

77. **Shared database across services** - Multiple services read and write the same tables.
    Schema changes require coordinating across all consumers. Migrations are multi-team events.

78. **No API versioning** - Breaking changes to APIs impact all consumers simultaneously. Teams
    are afraid to change APIs because they don't know who depends on them.

79. **Distributed monolith** - "Microservices" that must be deployed together. All the
    complexity of distributed systems with none of the independence benefits.

80. **No feature flags** - Can't deploy incomplete features. Can't do dark launches. Can't
    decouple deploy from release. Every deploy is a release.

81. **Hard-coded environment assumptions** - Code that behaves differently based on which
    environment it's running in. "if (env == 'production')" scattered throughout the codebase.

82. **Third-party/vendor dependencies with their own release cycles** - Upstream systems that
    deploy quarterly. Downstream consumers that require advance notice. External constraints on
    deployment frequency.

83. **Stateful services without deployment strategy** - Deploying services that hold in-memory
    state (caches, sessions, websockets) requires drain and migration logic that doesn't exist.

## Developer Experience

84. **Painful local development setup** - Setting up a dev environment takes days. A 50-step
    wiki page that's always outdated. New team members are unproductive for their first week.

85. **"It works on my machine"** - No containerized or reproducible development environments.
    Developers have different OS versions, dependency versions, and tool versions.

86. **No local pipeline execution** - Developers can't run the pipeline locally. They push a
    commit and wait 30 minutes to find out they missed a linting rule.

87. **Inadequate tooling** - Underpowered CI servers, no IDE integration, poor CLI tools. The
    development workflow has unnecessary friction at every step.

88. **Lack of self-service environments** - Developers must file tickets to get a test
    environment. Provisioning takes days. Environments are a scarce, contended resource.

89. **No fast feedback loops** - The time from "I made a change" to "I know if it works" is
    measured in hours, not seconds. Developers batch up changes to avoid waiting.

90. **Documentation is outdated or missing** - Deployment procedures, architecture decisions, and
    operational runbooks are either nonexistent or haven't been updated in years.

## Legacy & Migration-Specific

91. **"We'll do it after the rewrite"** - Deferring CD adoption until a mythical rewrite that
    may never happen. Meanwhile, the existing system continues to be painful to deploy.

92. **Legacy system with no tests** - A large codebase with zero test coverage. Nobody is
    confident enough to refactor because there's no safety net.

93. **Mainframe or proprietary platform constraints** - The deployment target doesn't support
    modern CI/CD tooling natively. Requires custom integration or wrapper tooling.

94. **Multiple applications with different maturity levels** - The team owns five services.
    Two have pipelines, one has tests, two have neither. No consistent baseline.

95. **Data pipeline and ML model deployment gaps** - CI/CD practices understood for application
    code but not for data pipelines, ML models, or infrastructure definitions.

96. **Monorepo without proper tooling** - A single repository with multiple applications but no
    build tool support for selective builds. Every change triggers a full rebuild of everything.

97. **Polyglot stack without unified pipeline patterns** - Services in five different languages
    with five different build tools. No shared pipeline patterns or standards.

## Missing Practices

98. **No definition of "done" that includes deployment** - "Done" means code review approved,
    not deployed and validated in production. Stories pile up as "done" but not shipped.

99. **No working agreements** - Team has no explicit agreements on branch lifetime, review
    turnaround, WIP limits, or coding standards. Everyone does their own thing.

100. **No improvement time budgeted** - 100% of capacity allocated to feature delivery. No time
     for pipeline improvements, test automation, or addressing tech debt. The team is trapped
     on the feature treadmill.

101. **No production readiness criteria** - No clear checklist for what a service needs before it
     can be deployed to production (health checks, logging, alerting, runbooks).

102. **No on-call or operational ownership** - The team builds it but doesn't run it. There's no
     feedback loop from production issues back to the development team.

103. **Irregular or absent demos** - Stakeholders don't see working software until release.
     No cadence for showing incremental progress. Feedback is delayed by months.

104. **Push-based work assignment** - Work is assigned to individuals by a manager or lead
     rather than team members pulling the next highest-priority item. Creates uneven workloads,
     hides bottlenecks, and removes team ownership of flow. When work is pushed, individuals
     optimize locally instead of collaborating to finish what matters most. WIP limits become
     meaningless because the person assigning work doesn't see the full picture.

105. **Distributed team without sufficient timezone overlap** - Team members spread across
     timezones with little or no shared working hours. Code reviews wait overnight. Questions
     block for 12+ hours. Pairing and swarming are impossible. Handoffs replace collaboration,
     and async communication adds days of latency to work that should take hours. Trunk-based
     development is especially difficult because integration conflicts can't be resolved in
     real time.

---

## Summary by Category

| Category | Count | Issues |
|----------|-------|--------|
| Delivery Speed & Frequency | 8 | 1-8 |
| Branching & Integration | 7 | 9-15 |
| Testing & Quality | 12 | 16-27 |
| Work Decomposition & Planning | 8 | 28-35 |
| Pipeline & Infrastructure | 13 | 36-48 |
| Monitoring & Observability | 6 | 49-54 |
| Organizational & Cultural | 15 | 55-69 |
| Compliance & Security | 6 | 70-75 |
| Architecture | 8 | 76-83 |
| Developer Experience | 7 | 84-90 |
| Legacy & Migration-Specific | 7 | 91-97 |
| Missing Practices | 8 | 98-105 |
| **Total** | **105** | |
