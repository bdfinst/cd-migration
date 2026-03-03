---
title: "Security scanning not in the pipeline"
linkTitle: "Security scanning not in the pipeline"
weight: 71
category: "Organizational & Cultural"
risk_level: high
description: >
  Security reviews happen at the end of development if at all, making vulnerabilities expensive to fix and prone to blocking releases.
tags:
  - process-gates
  - deployment-automation
---

{{% pageinfo %}}
**Category:** {{< param category >}} | {{% risk-indicator level="high" %}}
{{% /pageinfo %}}

## What This Looks Like

A feature is developed, tested, and declared ready for release. Then someone files a security review request. The security team - typically a small, centralized group - reviews the change against their checklist, finds a SQL injection risk, two outdated dependencies with known CVEs, and a hardcoded credential that appears to have been committed six months ago and forgotten. The release is blocked. The developer who added the injection risk has moved on to a different team. The credential has been in the codebase long enough that no one is sure what it accesses.

This is the most common version of security as an afterthought: a gate at the end of the process that catches real problems too late. The security team is perpetually understaffed relative to the volume of changes flowing through the gate. They develop reputations as blockers. Developers learn to minimize what they surface in security reviews and treat findings as negotiations rather than directives. The security team hardens their stance. Both sides entrench.

In less formal organizations the problem appears differently: there is no security gate at all. Vulnerabilities are discovered in production by external researchers, by customers, or by attackers. The security practice is entirely reactive, operating after exploitation rather than before.

Common variations:

- **Annual penetration test.** Security testing happens once a year, providing a point-in-time assessment of a codebase that changes daily.
- **Compliance-driven security.** Security reviews are triggered by regulatory requirements, not by risk. Changes that are not in scope for compliance receive no security review.
- **Dependency scanning as a quarterly report.** Known vulnerable dependencies are reported periodically rather than flagged at the moment they are introduced or when a new CVE is published.

The telltale sign: the security team learns about new features from the release request, not from early design conversations or automated pipeline reports.

## Why This Is a Problem

Security vulnerabilities follow the same cost curve as other defects: they are cheapest to fix when they are newest. A vulnerability caught at code commit takes minutes to fix. The same vulnerability caught at release takes hours - and sometimes weeks if the fix requires architectural changes. A vulnerability caught in production may never be fully fixed.

### It reduces quality

When security is a gate at the end rather than a property of the development process, developers do not learn to write secure code. They write code, hand it to security, and receive a list of problems to fix. The feedback is too late and too abstract to change habits: "use parameterized queries" in a security review means something different to a developer who has never seen a SQL injection attack than "this specific query on line 47 allows an attacker to do X."

Security findings that arrive at release time are frequently fixed incorrectly because the developer who fixed them is under time pressure and does not fully understand the attack vector. A superficial fix that resolves the specific finding without addressing the underlying pattern introduces the same vulnerability in a different form. The next release, the same finding reappears in a different location.

Dependency vulnerabilities compound over time. A team that does not continuously monitor and update dependencies accumulates technical debt in the form of known-vulnerable libraries. The longer a vulnerable dependency sits in the codebase, the harder it is to upgrade: it has more dependents, more integration points, and more behavioral assumptions built on top of it. What would have been a 30-minute upgrade at introduction becomes a week-long project two years later.

### It increases rework

Late-discovered security issues are expensive to remediate. A cross-site scripting vulnerability found in a release review requires not just fixing the specific instance but auditing the entire codebase for the same pattern. An authentication flaw found at the end of a six-month project may require rearchitecting a component that was built with the flawed assumption as its foundation.

The rework overhead is not limited to the development team. Security findings found at release time require security engineers to re-review the fix, project managers to reschedule release dates, and sometimes legal or compliance teams to assess exposure. A finding that takes two hours to fix may require 10 hours of coordination overhead.

The batching effect amplifies rework. Teams that do security review at release time tend to release infrequently in order to minimize the number of security review cycles. Infrequent releases mean large batches. Large batches mean more findings per review. More findings mean longer delays. The delay causes more batching. The cycle is self-reinforcing.

### It makes delivery timelines unpredictable

Security review is a gate with unpredictable duration. The time to review depends on the complexity of the changes, the security team's workload, the severity of the findings, and the negotiation over which findings must be fixed before release. None of these are visible to the development team until the review begins.

This unpredictability makes release date commitments unreliable. A release that is ready from the development team's perspective may sit in the security queue for a week and then be sent back with findings that require three more days of work. The stakeholder who expected the release last Thursday receives no delivery and no reliable new date.

Development teams respond to this unpredictability by buffering: they declare features complete earlier than they actually are and use the buffer to absorb security review delays. This is a reasonable adaptation to an unpredictable system, but it means development metrics overstate velocity. The team appears faster than it is.

### Impact on continuous delivery

CD requires that every change be production-ready when it exits the pipeline. A change that has not been security-reviewed is not production-ready. If security review happens at release time rather than at commit time, no individual commit is ever production-ready - which means the CD precondition is never met.

Moving security left - making it a property of every commit rather than a gate at release - is a prerequisite for CD in any codebase that handles sensitive data, processes payments, or must meet compliance requirements. Automated security scanning in the pipeline is how you achieve security verification at the speed CD requires.

The cultural shift matters as much as the technical one. Security must be a shared responsibility - every developer must understand the classes of vulnerability relevant to their domain and feel accountable for preventing them. A team that treats security as "the security team's job" cannot build secure software at CD pace, regardless of how good the automated tools are.

## How to Fix It

### Step 1: Inventory your current security posture and tooling

1. List all the security checks currently performed and when in the process they occur.
2. Identify the three most common finding types from your last 12 months of security reviews and look up automated tools that detect each type.
3. Audit your dependency management: how old is your oldest dependency? Do you have any dependencies with published CVEs? Use a tool like OWASP Dependency-Check or Snyk to generate a current inventory.
4. Identify your highest-risk code surfaces: authentication, authorization, data validation, cryptography, external API calls. These are where automated scanning generates the most value.
5. Survey the development team on security awareness: do developers know what OWASP Top 10 is? Could they recognize a common injection vulnerability in code review?

Expect pushback and address it directly:

| Objection | Response |
|-----------|----------|
| "We already do security reviews. This isn't a problem." | The question is not whether you do security reviews but when. Pull the last six months of security findings and check how many were discovered after development was complete. That number is your baseline cost. |
| "Our security team is responsible for this, not us." | Security outcomes are a shared responsibility. Automated scanning that runs in the developer's pipeline gives developers the feedback they need to improve, without adding burden to a centralized security team. |

### Step 2: Add automated security scanning to the pipeline (Weeks 2-6)

1. Add Static Application Security Testing (SAST) to the CI pipeline - tools like Semgrep, CodeQL, or Checkmarx scan code for common vulnerability patterns on every commit.
2. Add Software Composition Analysis (SCA) to scan dependencies for known CVEs on every build. Configure alerts when new CVEs are published for dependencies already in use.
3. Add secret scanning to the pipeline to detect committed credentials, API keys, and tokens before they reach the main branch.
4. Configure the pipeline to fail on high-severity findings. Start with "break the build on critical CVEs" and expand scope over time as the team develops capacity to respond.
5. Make scan results visible in the pull request review interface so developers see findings in context, not as a separate report.
6. Create a triage process for existing findings in legacy code: tag them as accepted risk with justification, assign them to a remediation backlog, or fix them immediately based on severity.

Expect pushback and address it directly:

| Objection | Response |
|-----------|----------|
| "Automated scanners have too many false positives." | Tune the scanner to your codebase. Start by suppressing known false positives and focus on finding categories with high true-positive rates. An imperfect scanner that runs on every commit is more effective than a perfect scanner that runs once a year. |
| "This will slow down the pipeline." | Most SAST scans complete in under 5 minutes. SCA checks are even faster. This is acceptable overhead for the risk reduction provided. Parallelize security stages with test stages to minimize total pipeline time. |

### Step 3: Shift security left into development (Weeks 6-12)

1. Run security training focused on the finding categories your team most frequently produces. Skip generic security awareness modules; use targeted instruction on the specific vulnerability patterns your automated scanners catch.
2. Create secure coding guidelines tailored to your technology stack - specific patterns to use and avoid, with code examples.
3. Add security criteria to the definition of done: no high or critical findings in the pipeline scan, no new vulnerable dependencies added, secrets management handled through the approved secrets store.
4. Embed security engineers in sprint ceremonies - not as reviewers, but as resources. A security engineer available during design and development catches architectural problems before they become code-level vulnerabilities.
5. Conduct threat modeling for new features that involve authentication, authorization, or sensitive data handling. A 30-minute threat modeling session during feature planning prevents far more vulnerabilities than a post-development review.

Expect pushback and address it directly:

| Objection | Response |
|-----------|----------|
| "Security engineers don't have time to be embedded in every team." | They do not need to be in every sprint ceremony. Regular office hours, on-demand consultation, and automated scanning cover most of the ground. |
| "Developers resist security requirements as scope creep." | Frame security as a quality property like performance or reliability - not an external imposition but a component of the feature being done correctly. |

## Measuring Progress

| Metric | What to look for |
|--------|-----------------|
| [Change fail rate](../../../metrics/change-fail-rate/) | Should improve as security defects are caught earlier and fixed before deployment |
| [Lead time](../../../metrics/lead-time/) | Reduction in time lost to late-stage security review blocking releases |
| [Release frequency](../../../metrics/release-frequency/) | Increase as security review is no longer a manual gate that delays deployments |
| [Build duration](../../../metrics/build-duration/) | Monitor the overhead of security scanning stages; optimize if they become a bottleneck |
| [Development cycle time](../../../metrics/development-cycle-time/) | Reduction as security rework from late findings decreases |
| [Mean time to repair](../../../metrics/mean-time-to-repair/) | Improvement as security issues are caught close to introduction rather than after deployment |

## Related Content

- [Pipeline architecture](../../../migrate-to-cd/migration-path/pipeline/pipeline-architecture/) - design the pipeline stages that include security scanning
- [Deterministic pipeline](../../../migrate-to-cd/migration-path/pipeline/deterministic-pipeline/) - security scans must produce reliable, repeatable results to be trusted
- [Compliance interpreted as manual approval](../compliance-manual-approval/) - automated security controls support the case for replacing manual compliance gates
- [Separation of duties as separate teams](../separation-of-duties-antipattern/) - related pattern where security review creates organizational walls
- [Single path to production](../../../migrate-to-cd/migration-path/pipeline/single-path-to-production/) - security scanning in the single path ensures every change is verified
