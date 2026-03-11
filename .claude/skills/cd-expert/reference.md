# CD Expert Reference Material

Authoritative principles and practices from continuousdelivery.com and minimumcd.org.
Use this reference to evaluate documentation accuracy and completeness.

---

## Source: continuousdelivery.com

### Definition of Continuous Delivery

"The ability to get changes of all types - including new features, configuration changes, bug fixes and experiments - into production, or into the hands of users, safely and quickly in a sustainable way."

The goal is making deployments routine and predictable by maintaining code in a constantly deployable state, eliminating traditional integration and testing phases.

### Five Principles

#### 1. Build Quality In

Cease dependence on inspection to achieve quality. Fix problems immediately rather than through downstream testing. Finding defects early - ideally before version control check-in through automated tests - is far more cost-effective than manual inspection. Continuous feedback loops detect issues as early as possible.

#### 2. Work in Small Batches

Rather than large handoffs of months-long releases, get every change toward production as quickly as possible with rapid feedback. This reduces feedback time, simplifies problem remediation, improves efficiency and morale, and avoids sunk cost fallacy.

#### 3. Computers Perform Repetitive Tasks, People Solve Problems

Inspired by Toyota's jidoka philosophy, automation should handle routine work like regression testing while humans focus on problem-solving. This frees people from mundane tasks to pursue higher-value activities.

#### 4. Relentlessly Pursue Continuous Improvement

Treat improvement as ongoing daily work, not a completed project. As Taiichi Ohno noted, "Kaizen opportunities are infinite." Avoid complacency.

#### 5. Everyone is Responsible

High-performing organizations eliminate "somebody else's problem" thinking. Developers own software quality; operations helps build quality in. Alignment across departments toward organizational goals matters more than local team optimization.

### Primary Benefits

1. **Low-risk releases** - Deployment patterns like blue-green deployments enable zero-downtime updates.
2. **Faster time to market** - Automating build, deployment, and testing eliminates weeks or months of integration phases.
3. **Higher quality** - Automated regression detection allows focus on advanced testing like exploratory and security testing.
4. **Lower costs** - Build and deployment automation reduces expenses for incremental software changes.
5. **Better products** - Small-batch work enables hypothesis-driven development using A/B testing.
6. **Happier teams** - Research demonstrates reduced burnout and greater engagement through frequent releases.

### Three Foundations

#### Configuration Management

**Core goals:** Reproducibility and traceability.

- Version control everything: source code, test scripts, deployment scripts, infrastructure configuration, and dependencies.
- Automate repetitive processes: build, deployment, regression testing, infrastructure provisioning.
- Query environment state: view current and historical environment conditions.
- Benefits: disaster recovery, auditability, quality improvement, capacity management, defect response.
- Technology alone (containers, cloud, virtualization) is not sufficient - disciplined version control and deployment pipelines remain essential.

#### Continuous Integration

**Core practices:**
- Developers integrate work into trunk/master at least daily.
- A set of automated tests runs both before and after merge to validate no regressions.
- When the build is broken, it is typically fixed within 10 minutes.

**Prerequisites:**
- Small, incremental changes: features broken into 1-3 day stories.
- Comprehensive test suite with maintainable automated unit tests.
- API-first development: build APIs before UIs, deploy in "dark" mode.

**Success criteria:**
- All engineers push code to trunk/master daily.
- Every commit triggers automated unit test execution.
- Build failures are resolved within 10 minutes.

#### Continuous Testing

**Core philosophy:** Obtain fast feedback on the impact of changes rather than relying on phase-gate manual testing.

**Deployment pipeline pattern:**
1. Build stage: creates deployable packages and runs unit tests within minutes.
2. Acceptance testing: comprehensive automated tests on passing packages.
3. Manual activities: exploratory testing, usability testing, and release preparation.

Every change is a "release candidate" with the pipeline catching known issues before production.

**Key principles:**
- Run many different types of tests - both manual and automated - continually throughout delivery.
- Parallelization: run activities concurrently to minimize lead time.
- Feedback loops: bugs found in exploratory testing should trigger improved automated tests.
- Incremental adoption: start with one unit test, one acceptance test, and an automated deployment script.
- "20 tests that run quickly and are trusted" outperform "2,000 tests that are flaky."

**Team responsibilities:**
- Developers create and maintain automated tests, stopping to fix failures immediately.
- Testers perform exploratory testing continuously and pair with developers.
- CD does not eliminate testers; it transforms their role.

### Key Implementation Mistakes

1. Treating CD as an end-state rather than a continuous process.
2. Over-focusing on tool selection instead of foundational practices.

### Major Impediments

- Enterprise architecture constraints.
- Organizational culture challenges.

---

## Source: minimumcd.org

### Definition

"Continuous delivery improves both delivery performance and quality, and also helps improve culture and reduce burnout." (Accelerate)

### Minimum CD Requirements

1. **Use continuous integration** (as defined below).
2. **Single application pipeline** - The only deployment method to any environment.
3. **Deterministic pipeline** - Pipeline verdict on releasability is definitive.
4. **Definition of deployable** - Artifacts consistently meet organizational standards.
5. **Immutable artifacts** - No human modifications after code commit.
6. **Red pipeline protocol** - All feature work stops when main pipeline fails.
7. **Production-like environments** - Testing occurs in realistic settings.
8. **Rollback capability** - On-demand rollback functionality required.
9. **Configuration with artifacts** - Application configuration deploys alongside artifacts.

### Minimum CI Requirements

1. **Trunk-based development** (as defined below).
2. **Daily integration minimum** - Work integrates to trunk at least daily.
3. **Automated testing** - Testing required before trunk merge.
4. **Integration testing** - Work tested automatically with other work upon merge.
5. **Red build protocol** - All feature work halts when main build fails.
6. **No breakage** - New work preserves delivered work functionality.

### Minimum Trunk-Based Development Requirements

1. **All changes integrate to trunk.**
2. **Branch discipline** - If branches are used, they must:
   - Originate from trunk.
   - Re-integrate to trunk.
   - Be short-lived and removed post-merge.

---

## Common Misconceptions to Flag

When reviewing documentation, watch for these common misunderstandings:

1. **CD means continuous deployment.** CD is continuous delivery. Continuous deployment (auto-deploying every commit) is a valid practice but is not what CD means in general usage.
2. **CI is a tool.** CI is a practice (integrating to trunk daily with automated tests), not a tool like Jenkins or GitHub Actions.
3. **Feature branches are CI.** Long-lived feature branches are the opposite of CI. Branches must be short-lived (< 1 day) and integrate to trunk.
4. **You need all the tools first.** Start with practices. Tools support practices, not the other way around.
5. **Testing is a phase.** Testing is continuous, not a gate between development and deployment.
6. **CD eliminates testers.** CD transforms the tester role from manual regression to exploratory and usability testing.
7. **You need 100% test coverage.** Quality of tests matters more than quantity. A small suite of trusted, fast tests outperforms a large flaky suite.
8. **CD is only for greenfield projects.** Incremental adoption works: start with one test, one deployment script, and grow from there.
9. **Rollback means failure.** Rollback capability is a minimum requirement, not an admission of defeat.
10. **GitFlow is compatible with CD.** GitFlow's long-lived branches contradict trunk-based development and daily integration.
