# Common Issues Teams Face Migrating to CD

Working document for deciding which problems to address and mapping them to solutions.

**Symptoms** are observable outcomes. Teams point to these and say "this is happening to us."
They become symptom pages on the site.

**Anti-patterns** are practices, structural choices, or organizational patterns that cause
symptoms. Teams are doing (or not doing) these. They become anti-pattern pages on the site.

**Criticality** reflects how directly the issue blocks continuous delivery:
- **Critical** - directly prevents CI or CD; must be addressed to make progress
- **High** - significantly slows adoption or makes CD fragile
- **Medium** - reduces CD benefits but can be worked around
- **Low** - real problem but peripheral to the CD journey

---

# Symptoms

Observable outcomes that teams experience. The starting point for diagnosis.

## Critical

~~1. **Infrequent releases**~~ **DONE** - Deploying monthly, quarterly, or less. Releases are large, risky
   events that require war rooms and weekend work.

~~6. **Slow pipelines**~~ **DONE** - CI/CD pipelines that take 30+ minutes (or hours). Developers stop
   waiting for results, context-switch, and lose feedback loops.

~~10. **Painful merges**~~ **DONE** - Integration is a dreaded, multi-day event. Teams delay merging because
    it's painful, which makes the next merge even more painful.

~~45. **No rollback capability**~~ **DONE** - Deployments are one-way doors. If something breaks, the only
    option is to rush a forward fix. Nobody practices or tests rollback.

~~58. **Fear of deploying**~~ **DONE** - Production deployments cause anxiety because they frequently fail.
    Teams delay deployments to avoid risk, which increases batch size, which increases risk.

~~89. **No fast feedback loops**~~ **DONE** - The time from "I made a change" to "I know if it works" is
    measured in hours, not seconds. Developers batch up changes to avoid waiting.

## High

~~4. **Coordinated releases across teams**~~ **DONE** - "We can't deploy until Team X is ready." Multiple
   teams must release together because of tight coupling, creating multi-team release ceremonies.

~~8. **Release manager bottleneck**~~ **DONE** - A single person or role responsible for coordinating and
   executing releases. Deployments stop when that person is unavailable.

~~14. **Pull request review bottlenecks**~~ **DONE** - PRs sit for days waiting for review.
    Reviews happen in large batches. Authors have moved on by the time feedback arrives.

~~15. **"Don't merge, I'm about to deploy"**~~ **DONE** - Developers announcing merge freezes because the
    integration process is fragile. Deploying requires coordination in chat.

~~18. **Flaky/unreliable test suites**~~ **DONE** - Tests that randomly pass or fail. Developers
    re-run the pipeline until it goes green. "Oh that test always fails, just ignore it."

~~19. **Slow test suites**~~ **DONE** - Test suites that take 30+ minutes. Developers don't run them locally.
    Feedback is so delayed it's nearly useless.

~~22. **No testing in production**~~ **DONE** - No smoke tests, no synthetic monitoring, no canary analysis.
    The team only discovers production issues when users report them.

~~23. **Environment-dependent test failures**~~ **DONE** - "Works on my machine." Tests pass locally but fail
    in CI due to environment differences, timing, or external dependencies.

~~27. **Test data management chaos**~~ **DONE** - No strategy for test data. Tests depend on shared mutable
    state in a shared database. Tests interfere with each other.

~~35. **Dependency-heavy planning**~~ **DONE** - Teams can't start work until another team finishes something.
    Sprint planning is dominated by cross-team dependency negotiation.

~~46. **Database migrations block deploys**~~ **DONE** - Schema changes require downtime. Migrations run
    during deployment and lock the database. Failed migrations leave the DB in an unknown state.

~~50. **Alert fatigue**~~ **DONE** - So many noisy alerts that the team ignores them all. Pages fire for
    non-issues. Real problems are lost in the noise.

~~52. **Mean time to detect is hours or days**~~ **DONE** - Problems in production aren't discovered until
    users report them. No synthetic monitoring, no anomaly detection.

~~53. **Logs but no insight**~~ **DONE** - Logs exist but aren't aggregated, searchable, or correlated.
    Debugging production issues requires SSH-ing into individual servers and grepping log files.

~~60. **No leadership buy-in**~~ **DONE** - Management doesn't understand why CD matters. No budget for
    tooling. No time allocated for improvement. "Just ship features."

~~66. **Resistance to trunk-based development**~~ **DONE** - Developers feel unsafe without feature branches.
    "What if my incomplete code breaks something?" Deeply ingrained branch-based workflows.

~~74. **Change management overhead**~~ **DONE** - Every change requires a change ticket, impact assessment,
    rollback plan document, and approval chain. Overhead is the same for a one-line fix and a
    major rewrite.

~~75. **Security review bottleneck**~~ **DONE** - A central security team must review changes. The queue is
    weeks long. Security becomes a gate rather than a guardrail.

~~92. **Legacy system with no tests**~~ **DONE** - A large codebase with zero test coverage. Nobody is
    confident enough to refactor because there's no safety net.

## Medium

~~61. **Team instability**~~ **DONE** - Members frequently reassigned. No shared context or working
    agreements. Constantly restarting the journey.

~~62. **Meaningless retrospectives**~~ **DONE** - Same problems surface every sprint. Action items are never
    completed. The team has stopped believing improvement is possible.

~~67. **"Move fast and break things" vs. "don't break anything"**~~ **DONE** - Cultural split between
    shipping speed and production stability. Neither side sees how CD solves both.

~~82. **Third-party/vendor dependencies with their own release cycles**~~ **DONE** - Upstream systems that
    deploy quarterly. Downstream consumers that require advance notice. External constraints on
    deployment frequency.

~~84. **Painful local development setup**~~ **DONE** - Setting up a dev environment takes days. A 50-step
    wiki page that's always outdated. New team members are unproductive for their first week.

~~85. **"It works on my machine"**~~ **DONE** - No containerized or reproducible development environments.
    Developers have different OS versions, dependency versions, and tool versions.

~~86. **No local pipeline execution**~~ **DONE** - Developers can't run the pipeline locally. They push a
    commit and wait 30 minutes to find out they missed a linting rule.

~~87. **Inadequate tooling**~~ **DONE** - Underpowered CI servers, no IDE integration, poor CLI tools. The
    development workflow has unnecessary friction at every step.

~~88. **Lack of self-service environments**~~ **DONE** - Developers must file tickets to get a test
    environment. Provisioning takes days. Environments are a scarce, contended resource.

~~90. **Documentation is outdated or missing**~~ **DONE** - Deployment procedures, architecture decisions, and
    operational runbooks are either nonexistent or haven't been updated in years.

~~94. **Multiple applications with different maturity levels**~~ **DONE** - The team owns five services.
    Two have pipelines, one has tests, two have neither. No consistent baseline.

~~43. **Artifacts rebuilt per environment**~~ **DONE** - No centralized storage for build outputs. Artifacts
    are rebuilt for each environment or exist only on the build server that created them.

~~54. **Incident response is chaotic**~~ **DONE** - When something breaks, there are no documented procedures.
    Knowledge lives in one person's head. Not every service needs runbooks, but critical paths
    need a plan.

~~73. **Cannot prove what was deployed when**~~ **DONE** - Auditors require evidence of what was deployed, by
    whom, and what tests it passed. Relevant in regulated environments; not all teams need
    formal audit trails.

~~78. **API changes break consumers**~~ **DONE** - Breaking changes to APIs impact all consumers
    simultaneously. Teams are afraid to change APIs because they don't know who depends on them.
    Formal versioning is one solution but not required when you control both sides.

~~99. **Team has no shared expectations on workflow**~~ **DONE** - No explicit agreements on branch lifetime,
    review turnaround, WIP limits, or coding standards. Everyone does their own thing. Small
    co-located teams may operate on implicit norms; distributed or growing teams cannot.

~~101. **Services reach production without health checks or alerting**~~ **DONE** - No clear criteria for what
     a service needs before it can be deployed to production. Matters most when you have many
     services or on-call rotations.

~~103. **Stakeholder feedback delayed by months**~~ **DONE** - Stakeholders don't see working software until
     release. No cadence for showing incremental progress. Not all work benefits from demo
     cadence; infrastructure teams may use different feedback mechanisms.

## Low

~~93. **Mainframe or proprietary platform constraints**~~ **DONE** - The deployment target doesn't support
    modern CI/CD tooling natively. Requires custom integration or wrapper tooling.

~~95. **Data pipeline and ML model deployment gaps**~~ **DONE** - CI/CD practices understood for application
    code but not for data pipelines, ML models, or infrastructure definitions.

~~96. **Monorepo without proper tooling**~~ **DONE** - A single repository with multiple applications but no
    build tool support for selective builds. Every change triggers a full rebuild of everything.

~~97. **Polyglot stack without unified pipeline patterns**~~ **DONE** - Services in five different languages
    with five different build tools. No shared pipeline patterns or standards.

~~80. **Deploy and release are coupled**~~ **DONE** - Every deployment is visible to users immediately. No
    mechanism to deploy code without activating it. Feature flags are one solution but not
    required for every component. Matters when you need incremental delivery or controlled
    rollout.

~~83. **Deploying stateful services causes outages**~~ **DONE** - Services that hold in-memory state (caches,
    sessions, websockets) require drain and migration logic that doesn't exist. Only relevant
    to stateful services.

~~105. **Distributed team without sufficient timezone overlap**~~ **DONE** - Team members spread across
     timezones with little or no shared working hours. Code reviews wait overnight. Questions
     block for 12+ hours. Pairing and swarming are impossible. Handoffs replace collaboration,
     and async communication adds days of latency to work that should take hours. Trunk-based
     development is especially difficult because integration conflicts can't be resolved in
     real time.

---

# Anti-Patterns

Practices, structural choices, or organizational patterns that cause the symptoms above.

## Critical

~~9. **Long-lived feature branches**~~ **DONE** - Branches that live for weeks or months. Merging
   becomes a project in itself. The longer the branch, the bigger the risk.

~~11. **No continuous integration**~~ **DONE** - The build has been red for weeks and nobody cares.
    "CI" means a build server exists, not that anyone actually integrates continuously.

~~16. **No test automation**~~ **DONE** - Zero automated tests. The team has no idea where to
    start and the codebase wasn't designed for testability.

~~17. **Manual regression testing gates**~~ **DONE** - Every release requires days or weeks of
    manual testing. Testers execute scripted test cases. Test effort scales linearly with app size.

~~24. **Untestable architecture**~~ **DONE** - Tightly coupled code with no dependency injection, no
    interfaces, no seams. Writing tests requires major refactoring first.

~~36. **No pipeline exists**~~ **DONE** - Builds and deployments are manual processes. Someone
    runs a script on their laptop. There is no automated path from commit to production.

~~37. **Manual deployments**~~ **DONE** - SSH into servers and run scripts by hand. Deployments
    are an art form that only certain people know how to do.

~~76. **Tightly coupled monolith**~~ **DONE** - Changing one module breaks others. No clear
    boundaries. Every change is high-risk because blast radius is unpredictable.

## High

~~2. **Hardening/stabilization sprints**~~ **DONE** - Dedicating one or more sprints after "feature complete"
   to stabilize code before release. Bug-fixing phases disguised as sprints.

~~3. **Release trains**~~ **DONE** - Changes wait for the next scheduled release window regardless of
   readiness. A change finished on Monday waits until the Thursday release train.

~~5. **Deploy only at sprint boundaries**~~ **DONE** - All stories bundled into a single end-of-sprint
   release. Two-week batch releases wearing Agile clothing.

~~7. **Deployment windows**~~ **DONE** - Production changes only allowed during specific hours (e.g.,
   Tuesday 2-4 AM). Creates artificial queuing and batching.

~~12. **Cherry-pick releases**~~ **DONE** - Hand-selecting specific commits for release instead of deploying
    trunk. Indicates trunk isn't trusted to be deployable at all times.

~~13. **Release branches with extensive backporting**~~ **DONE** - Maintaining multiple release branches and
    manually backporting fixes. Exponential overhead as branches multiply.

~~20. **Testing only at the end**~~ **DONE** - QA as a phase after development. Testers are downstream
    consumers of developer output rather than integrated team members.

~~21. **Inverted test pyramid**~~ **DONE** - Most tests are slow end-to-end/UI tests. Few unit
    tests. The test suite is slow, brittle, and expensive to maintain.

~~25. **QA signoff as a gate**~~ **DONE** - A specific person must manually approve each release based on
    exploratory testing. That person becomes a bottleneck.

~~26. **No contract testing**~~ **DONE** - Services test in isolation but break when integrated because
    there's no agreement on API contracts between teams.

~~28. **Stories too large**~~ **DONE** (as "Work Items Too Large") - User stories regularly take
    more than a week. Developers work on a single story for days without integrating.

~~29. **No vertical slicing**~~ **DONE** - Stories organized by technical layer ("build the API,"
    "build the UI") rather than by user-visible behavior. Nothing is deployable until all layers
    are done.

~~33. **Big-bang feature delivery**~~ **DONE** - Features designed and built as large monolithic units.
    No incremental delivery. Either the whole feature ships or nothing does.

~~38. **Snowflake environments**~~ **DONE** - Each environment is hand-configured and unique.
    Nobody knows exactly what's running where. Configuration drift is constant.

~~39. **No infrastructure as code**~~ **DONE** - Servers provisioned manually through UIs. Environment
    creation takes days or weeks and requires tickets to another team.

~~40. **Config embedded in artifacts**~~ **DONE** - Connection strings, API URLs, and feature flags baked into
    the build. Must rebuild per environment. The tested artifact isn't what gets deployed.

~~41. **No environment parity**~~ **DONE** - Dev, staging, and production are wildly different. "Passed in
    staging" provides little confidence about production behavior.

~~42. **Shared test environments**~~ **DONE** - Multiple teams share a single staging environment. Contention,
    broken shared state, and "who deployed to staging?" are daily problems.

~~47. **Secret management is ad-hoc**~~ **DONE** - Credentials in config files, environment variables set
    manually, secrets shared in Slack. No vault, no rotation, no audit trail.

~~51. **No deployment health checks**~~ **DONE** - After deploying, there is no automated verification that
    the new version is working. The team "waits and watches" for a while and hopes for the best.

~~55. **Change Advisory Board (CAB) gates**~~ **DONE** - Manual committee approval required for
    every production change. Meetings are weekly. One-line changes wait alongside major migrations.

~~56. **Separate ops/release team**~~ **DONE** - Developers throw code over the wall. A different team is
    responsible for deploying it. Feedback loops between dev and ops are long or nonexistent.

~~57. **Siloed QA team**~~ **DONE** - Testing is "someone else's job." Developers write code, throw it to
    QA, and move to the next story. QA finds bugs days later, developer has lost context.

~~63. **Hero culture**~~ **DONE** - Certain individuals are relied upon for critical deployments and
    firefighting. Knowledge is hoarded. The bus factor is 1.

~~64. **Blame culture after incidents**~~ **DONE** - Post-mortems focus on who caused the problem rather than
    what systemic issues allowed it. People hide mistakes instead of learning from them.

~~68. **Knowledge silos**~~ **DONE** - Only one person understands the build, the deployment, the database,
    or a critical service. That person is a bottleneck and a single point of failure.

~~70. **Compliance requires manual approval**~~ **DONE** - SOX, HIPAA, PCI, or other regulations interpreted
    as requiring human review of every change. Audit evidence is manual documentation.

~~71. **Security scanning not in the pipeline**~~ **DONE** - Security reviews happen at the end, if at all.
    Vulnerabilities discovered late are expensive to fix and block releases.

~~72. **Separation of duties interpreted as separate teams**~~ **DONE** - Compliance requirement for
    separation of duties implemented as "developers can't deploy." Instead of automated controls,
    organizational walls are erected.

~~79. **Distributed monolith**~~ **DONE** - "Microservices" that must be deployed together. All the
    complexity of distributed systems with none of the independence benefits.

~~98. **No definition of "done" that includes deployment**~~ **DONE** - "Done" means code review approved,
    not deployed and validated in production. Stories pile up as "done" but not shipped.

~~100. **No improvement time budgeted**~~ **DONE** - 100% of capacity allocated to feature delivery. No time
     for pipeline improvements, test automation, or addressing tech debt. The team is trapped
     on the feature treadmill.

~~104. **Push-based work assignment**~~ **DONE** - Work is assigned to individuals by a manager
     or lead rather than team members pulling the next highest-priority item. Creates uneven
     workloads, hides bottlenecks, and removes team ownership of flow.

~~106. **Manually triggered tests**~~ **DONE** - Tests exist but are not run automatically. Developers must
     remember to run them locally before pushing, or someone must manually kick off the CI suite.
     Tests that depend on a human remembering to run them do not get run consistently.

~~107. **Pressure to skip testing**~~ **DONE** - Management pressures developers to skip or
     shortcut testing to meet deadlines. Tests are deferred, then forgotten. Coverage erodes
     sprint by sprint.

## Medium

~~31. **Distant date commitments**~~ **DONE** - Fixed scope committed to months in advance. Pressure to cut
    corners when the deadline approaches. Scope is locked, quality flexes.

~~32. **Velocity used as productivity metric**~~ **DONE** - Story points as a management KPI. Teams inflate
    estimates. Incentive is to maximize points, not to deliver value.

~~34. **Estimation theater**~~ **DONE** - Hours spent estimating work that changes as soon as development
    starts. Precision estimates for inherently uncertain work.

~~44. **Pipeline as code isn't versioned**~~ **DONE** - Pipeline definitions maintained through a UI rather
    than in source control. No review process, no history, no reproducibility.

~~48. **No build caching or optimization**~~ **DONE** - Every build starts from scratch. Dependencies are
    downloaded on every run. Builds are slow because nobody has invested in making them fast.

~~49. **No observability**~~ **DONE** - Can't tell if a deployment is healthy after it goes out.
    No metrics, no logs aggregation, no tracing.

~~59. **"We're different" mindset**~~ **DONE** - Belief that CD works for others but not here. "We're
    regulated." "We're too big." "Our technology is too old." Used to justify not starting.

~~65. **Misaligned incentives**~~ **DONE** - Teams rewarded for shipping features, not for stability or
    delivery speed. Nobody's OKR includes "reduce lead time" or "increase deploy frequency."

~~69. **Outsourced or offshore development with handoffs**~~ **DONE** - Code written by one team, tested by
    another, deployed by a third. Handoffs add days of latency and lose context.

~~77. **Shared database across services**~~ **DONE** - Multiple services read and write the same tables.
    Schema changes require coordinating across all consumers. Migrations are multi-team events.

~~81. **Hard-coded environment assumptions**~~ **DONE** - Code that behaves differently based on which
    environment it's running in. "if (env == 'production')" scattered throughout the codebase.

~~91. **"We'll do it after the rewrite"**~~ **DONE** - Deferring CD adoption until a mythical rewrite that
    may never happen. Meanwhile, the existing system continues to be painful to deploy.

~~102. **No on-call or operational ownership**~~ **DONE** - The team builds it but doesn't run it. There's no
     feedback loop from production issues back to the development team.

---

## Summary

| Type | Critical | High | Medium | Low | Total | Done |
|------|----------|------|--------|-----|-------|------|
| Symptoms | 6 | 20 | 18 | 7 | 51 | 51 |
| Anti-Patterns | 8 | 35 | 13 | 0 | 56 | 56 |
| **Total** | **14** | **55** | **31** | **7** | **107** | **107** |

### Done (66 total)

| # | Issue | Type | Site Page |
|---|-------|------|-----------|
| 1 | Infrequent releases | Symptom | Symptoms: Releases Are Infrequent and Painful |
| 4 | Coordinated releases across teams | Symptom | Symptoms: Coordinated Deployments |
| 6 | Slow pipelines | Symptom | Symptoms: Slow Pipelines |
| 8 | Release manager bottleneck | Symptom | Symptoms: Releases Depend on One Person |
| 9 | Long-lived feature branches | Anti-Pattern | Anti-Patterns: Long-Lived Feature Branches |
| 10 | Painful merges | Symptom | Symptoms: Painful Merges |
| 11 | No continuous integration | Anti-Pattern | Anti-Patterns: Integration Deferred |
| 14 | Pull request review bottlenecks | Symptom | Symptoms: PRs Waiting for Review |
| 15 | "Don't merge, I'm about to deploy" | Symptom | Symptoms: Merge Freezes Before Deployments |
| 16 | No test automation | Anti-Pattern | Anti-Patterns: Manual Testing Only |
| 17 | Manual regression testing gates | Anti-Pattern | Anti-Patterns: Manual Regression Testing Gates |
| 18 | Flaky/unreliable test suites | Symptom | Symptoms: Flaky Tests |
| 19 | Slow test suites | Symptom | Symptoms: Slow Test Suites |
| 21 | Inverted test pyramid | Anti-Pattern | Anti-Patterns: Inverted Test Pyramid |
| 22 | No testing in production | Symptom | Symptoms: Production Issues Discovered by Customers |
| 23 | Environment-dependent test failures | Symptom | Symptoms: Environment-Dependent Failures |
| 27 | Test data management chaos | Symptom | Symptoms: Tests Interfere with Each Other Through Shared Data |
| 28 | Stories too large | Anti-Pattern | Anti-Patterns: Monolithic Work Items |
| 29 | No vertical slicing | Anti-Pattern | Anti-Patterns: Horizontal Slicing |
| 30 | Too much work in progress | Symptom | Symptoms: Too Much WIP |
| 35 | Dependency-heavy planning | Symptom | Symptoms: Sprint Planning Is Dominated by Dependency Negotiation |
| 36 | No pipeline exists | Anti-Pattern | Anti-Patterns: Missing Deployment Pipeline |
| 37 | Manual deployments | Anti-Pattern | Anti-Patterns: Manual Deployments |
| 38 | Snowflake environments | Anti-Pattern | Anti-Patterns: Snowflake Environments |
| 43 | Artifacts rebuilt per environment | Symptom | Symptoms: The Build Runs Again for Every Environment |
| 45 | No rollback capability | Symptom | Symptoms: Deployments Are One-Way Doors |
| 46 | Database migrations block deploys | Symptom | Symptoms: Database Migrations Block or Break Deployments |
| 49 | No observability | Anti-Pattern | Anti-Patterns: Blind Operations |
| 50 | Alert fatigue | Symptom | Symptoms: The Team Ignores Alerts Because There Are Too Many |
| 52 | Mean time to detect is hours or days | Symptom | Symptoms: Mean Time to Detect Is Too Long |
| 53 | Logs but no insight | Symptom | Symptoms: Logs Exist but Cannot Be Searched or Correlated |
| 54 | Incident response is chaotic | Symptom | Symptoms: When Something Breaks, Nobody Knows What to Do |
| 55 | CAB gates | Anti-Pattern | Anti-Patterns: Change Advisory Board Gates |
| 58 | Fear of deploying | Symptom | Symptoms: The Team Is Afraid to Deploy |
| 60 | No leadership buy-in | Symptom | Symptoms: Leadership Sees CD as a Technical Nice-to-Have |
| 61 | Team instability | Symptom | Symptoms: Team Membership Changes Constantly |
| 62 | Meaningless retrospectives | Symptom | Symptoms: Retrospectives Produce No Real Change |
| 66 | Resistance to trunk-based development | Symptom | Symptoms: The Team Resists Merging to the Main Branch |
| 67 | Speed vs. stability tension | Symptom | Symptoms: The Team Is Caught Between Shipping Fast and Not Breaking Things |
| 73 | Cannot prove what was deployed when | Symptom | Symptoms: No Evidence of What Was Deployed or When |
| 74 | Change management overhead | Symptom | Symptoms: Every Change Requires a Ticket and Approval Chain |
| 75 | Security review bottleneck | Symptom | Symptoms: Security Review Is a Gate, Not a Guardrail |
| 76 | Tightly coupled monolith | Anti-Pattern | Anti-Patterns: Tightly Coupled Monolith |
| 78 | API changes break consumers | Symptom | Symptoms: API Changes Break Consumers Without Warning |
| 80 | Deploy and release are coupled | Symptom | Symptoms: Every Deployment Is Immediately Visible to All Users |
| 82 | Third-party/vendor dependency constraints | Symptom | Symptoms: Vendor Release Cycles Constrain the Team's Deployment Frequency |
| 83 | Deploying stateful services causes outages | Symptom | Symptoms: Deploying Stateful Services Causes Outages |
| 84 | Painful local development setup | Symptom | Symptoms: Setting Up a Development Environment Takes Days |
| 85 | "It works on my machine" | Symptom | Symptoms: Works on My Machine |
| 86 | No local pipeline execution | Symptom | Symptoms: Developers Cannot Run the Pipeline Locally |
| 87 | Inadequate tooling | Symptom | Symptoms: The Development Workflow Has Friction at Every Step |
| 88 | Lack of self-service environments | Symptom | Symptoms: Getting a Test Environment Requires Filing a Ticket |
| 89 | No fast feedback loops | Symptom | Symptoms: No Fast Feedback |
| 90 | Documentation is outdated or missing | Symptom | Symptoms: Runbooks and Architecture Docs Are Years Out of Date |
| 92 | Legacy system with no tests | Symptom | Symptoms: A Large Codebase Has No Automated Tests |
| 93 | Mainframe or proprietary platform constraints | Symptom | Symptoms: The Deployment Target Does Not Support Modern CI/CD Tooling |
| 94 | Multiple applications with different maturity levels | Symptom | Symptoms: Services in the Same Portfolio Have Wildly Different Maturity Levels |
| 95 | Data pipeline and ML model deployment gaps | Symptom | Symptoms: Data Pipelines and ML Models Have No Deployment Automation |
| 96 | Monorepo without proper tooling | Symptom | Symptoms: Every Change Rebuilds the Entire Repository |
| 97 | Polyglot stack without unified pipeline patterns | Symptom | Symptoms: Each Language Has Its Own Ad Hoc Pipeline |
| 99 | Team has no shared expectations on workflow | Symptom | Symptoms: The Team Has No Shared Agreements About How to Work |
| 101 | Services reach production without health checks | Symptom | Symptoms: Services Reach Production with No Health Checks or Alerting |
| 103 | Stakeholder feedback delayed by months | Symptom | Symptoms: Stakeholders See Working Software Only at Release Time |
| 104 | Push-based work assignment | Anti-Pattern | Anti-Patterns: Push-Based Work Assignment |
| 105 | Distributed team without sufficient timezone overlap | Symptom | Symptoms: The Team Has No Shared Working Hours Across Time Zones |
| 107 | Pressure to skip testing | Anti-Pattern | Anti-Patterns: Pressure to Skip Testing |
| 2 | Hardening/stabilization sprints | Anti-Pattern | Anti-Patterns: Hardening and Stabilization Sprints |
| 3 | Release trains | Anti-Pattern | Anti-Patterns: Release Trains |
| 5 | Deploy only at sprint boundaries | Anti-Pattern | Anti-Patterns: Deploying Only at Sprint Boundaries |
| 7 | Deployment windows | Anti-Pattern | Anti-Patterns: Deployment Windows |
| 12 | Cherry-pick releases | Anti-Pattern | Anti-Patterns: Cherry-Pick Releases |
| 13 | Release branches with extensive backporting | Anti-Pattern | Anti-Patterns: Release Branches with Extensive Backporting |
| 20 | Testing only at the end | Anti-Pattern | Anti-Patterns: Testing Only at the End |
| 24 | Untestable architecture | Anti-Pattern | Anti-Patterns: Untestable Architecture |
| 25 | QA signoff as a gate | Anti-Pattern | Anti-Patterns: QA Signoff as a Release Gate |
| 26 | No contract testing | Anti-Pattern | Anti-Patterns: No Contract Testing Between Services |
| 31 | Distant date commitments | Anti-Pattern | Anti-Patterns: Distant Date Commitments |
| 32 | Velocity used as productivity metric | Anti-Pattern | Anti-Patterns: Velocity as a Team Productivity Metric |
| 33 | Big-bang feature delivery | Anti-Pattern | Anti-Patterns: Big-Bang Feature Delivery |
| 34 | Estimation theater | Anti-Pattern | Anti-Patterns: Estimation Theater |
| 39 | No infrastructure as code | Anti-Pattern | Anti-Patterns: No Infrastructure as Code |
| 40 | Config embedded in artifacts | Anti-Pattern | Anti-Patterns: Configuration Embedded in Artifacts |
| 41 | No environment parity | Anti-Pattern | Anti-Patterns: No Environment Parity |
| 42 | Shared test environments | Anti-Pattern | Anti-Patterns: Shared Test Environments |
| 44 | Pipeline as code isn't versioned | Anti-Pattern | Anti-Patterns: Pipeline Definitions Not in Version Control |
| 47 | Secret management is ad-hoc | Anti-Pattern | Anti-Patterns: Ad Hoc Secret Management |
| 48 | No build caching or optimization | Anti-Pattern | Anti-Patterns: No Build Caching or Optimization |
| 51 | No deployment health checks | Anti-Pattern | Anti-Patterns: No Deployment Health Checks |
| 56 | Separate ops/release team | Anti-Pattern | Anti-Patterns: Separate Ops/Release Team |
| 57 | Siloed QA team | Anti-Pattern | Anti-Patterns: Siloed QA Team |
| 59 | "We're different" mindset | Anti-Pattern | Anti-Patterns: The "We're Different" Mindset |
| 63 | Hero culture | Anti-Pattern | Anti-Patterns: Hero Culture |
| 64 | Blame culture after incidents | Anti-Pattern | Anti-Patterns: Blame Culture After Incidents |
| 65 | Misaligned incentives | Anti-Pattern | Anti-Patterns: Misaligned Incentives |
| 68 | Knowledge silos | Anti-Pattern | Anti-Patterns: Knowledge Silos |
| 69 | Outsourced or offshore development with handoffs | Anti-Pattern | Anti-Patterns: Outsourced Development with Handoffs |
| 70 | Compliance requires manual approval | Anti-Pattern | Anti-Patterns: Compliance Interpreted as Manual Approval |
| 71 | Security scanning not in the pipeline | Anti-Pattern | Anti-Patterns: Security Scanning Not in the Pipeline |
| 72 | Separation of duties interpreted as separate teams | Anti-Pattern | Anti-Patterns: Separation of Duties as Separate Teams |
| 77 | Shared database across services | Anti-Pattern | Anti-Patterns: Shared Database Across Services |
| 79 | Distributed monolith | Anti-Pattern | Anti-Patterns: Distributed Monolith |
| 81 | Hard-coded environment assumptions | Anti-Pattern | Anti-Patterns: Hard-Coded Environment Assumptions |
| 91 | "We'll do it after the rewrite" | Anti-Pattern | Anti-Patterns: Deferring CD Until After the Rewrite |
| 98 | No definition of "done" that includes deployment | Anti-Pattern | Anti-Patterns: Undone Work |
| 100 | No improvement time budgeted | Anti-Pattern | Anti-Patterns: No Improvement Time Budgeted |
| 102 | No on-call or operational ownership | Anti-Pattern | Anti-Patterns: No On-Call or Operational Ownership |
| 106 | Manually triggered tests | Anti-Pattern | Anti-Patterns: Manually Triggered Tests |
