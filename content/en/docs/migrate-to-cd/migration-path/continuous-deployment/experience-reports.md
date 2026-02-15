---
title: "Experience Reports"
linkTitle: "Experience Reports"
weight: 4
description: >
  Real-world stories from teams that have made the journey to continuous deployment.
---

{{% pageinfo %}}
**Phase 4 - Deliver on Demand** | Adapted from [MinimumCD.org](https://minimumcd.org)

Theory is necessary but insufficient. This page collects experience reports from organizations that have adopted continuous deployment at scale, including the challenges they faced, the approaches they took, and the results they achieved. These reports demonstrate that CD is not limited to startups or greenfield projects - it works in large, complex, regulated environments.
{{% /pageinfo %}}

## Why Experience Reports Matter

Every team considering continuous deployment faces the same objection: "That works for [Google / Netflix / small startups], but our situation is different." Experience reports counter this objection with evidence. They show that organizations of every size, in every industry, with every kind of legacy system, have found a path to continuous deployment.

No experience report will match your situation exactly. That is not the point. The point is to extract patterns: what obstacles did these teams encounter, and how did they overcome them?

## Walmart: CD at Retail Scale

### Context

Walmart operates one of the world's largest e-commerce platforms alongside its massive physical retail infrastructure. Changes to the platform affect millions of transactions per day. The organization had a traditional release process with weekly deployment windows and multi-stage manual approval.

### The Challenge

- **Scale:** Thousands of developers across hundreds of teams
- **Risk tolerance:** Any outage affects revenue in real time
- **Legacy:** Decades of existing systems with deep interdependencies
- **Regulation:** PCI compliance requirements for payment processing

### What They Did

- Invested in a centralized deployment platform (OneOps, later Concord) that standardized the deployment pipeline across all teams
- Broke the monolithic release into independent service deployments
- Implemented automated canary analysis for every deployment
- Moved from weekly release trains to on-demand deployment per team

### Key Lessons

1. **Platform investment pays off.** Building a shared deployment platform let hundreds of teams adopt CD without each team solving the same infrastructure problems.
2. **Compliance and CD are compatible.** Automated pipelines with full audit trails satisfied PCI requirements more reliably than manual approval processes.
3. **Cultural change is harder than technical change.** Teams that had operated on weekly release cycles for years needed coaching and support to trust automated deployment.

## Microsoft: From Waterfall to Daily Deploys

### Context

Microsoft's Azure DevOps (formerly Visual Studio Team Services) team made a widely documented transformation from 3-year waterfall releases to deploying multiple times per day. This transformation happened within one of the largest software organizations in the world.

### The Challenge

- **History:** Decades of waterfall development culture
- **Product complexity:** A platform used by millions of developers
- **Organizational size:** Thousands of engineers across multiple time zones
- **Customer expectations:** Enterprise customers expected stability and predictability

### What They Did

- Broke the product into independently deployable services (ring-based deployment)
- Implemented a ring-based rollout: Ring 0 (team), Ring 1 (internal Microsoft users), Ring 2 (select external users), Ring 3 (all users)
- Invested heavily in automated testing, achieving thousands of tests running in minutes
- Moved from a fixed release cadence to continuous deployment with feature flags controlling release
- Used telemetry to detect issues in real-time and automated rollback when metrics degraded

### Key Lessons

1. **Ring-based deployment is progressive rollout.** Microsoft's ring model is an implementation of the [progressive rollout](../progressive-rollout/) strategies described in this guide.
2. **Feature flags enabled decoupling.** By deploying frequently but releasing features incrementally via flags, the team could deploy without worrying about feature completeness.
3. **The transformation took years, not months.** Moving from 3-year cycles to daily deployment was a multi-year journey with incremental progress at each step.

## Google: Engineering Productivity at Scale

### Context

Google is often cited as the canonical example of continuous deployment, deploying changes to production thousands of times per day across its vast service portfolio.

### The Challenge

- **Scale:** Billions of users, millions of servers
- **Monorepo:** Most of Google operates from a single repository with billions of lines of code
- **Interdependencies:** Changes in shared libraries can affect thousands of services
- **Velocity:** Thousands of engineers committing changes every day

### What They Did

- Built a culture of automated testing where tests are a first-class deliverable, not an afterthought
- Implemented a submit queue that runs automated tests on every change before it merges to the trunk
- Invested in build infrastructure (Blaze/Bazel) that can build and test only the affected portions of the codebase
- Used percentage-based rollout for user-facing changes
- Made rollback a one-click operation available to every team

### Key Lessons

1. **Test infrastructure is critical infrastructure.** Google's ability to deploy frequently depends entirely on its ability to test quickly and reliably.
2. **Monorepo and CD are compatible.** The common assumption that CD requires microservices with separate repos is false. Google deploys from a monorepo.
3. **Invest in tooling before process.** Google built the tooling (build systems, test infrastructure, deployment automation) that made good practices the path of least resistance.

## Amazon: Two-Pizza Teams and Ownership

### Context

Amazon's transformation to service-oriented architecture and team ownership is one of the most influential in the industry. The "two-pizza team" model and "you build it, you run it" philosophy directly enabled continuous deployment.

### The Challenge

- **Organizational size:** Hundreds of thousands of employees
- **System complexity:** Thousands of services powering amazon.com and AWS
- **Availability requirements:** Even brief outages are front-page news
- **Pace of innovation:** Competitive pressure demands rapid feature delivery

### What They Did

- Decomposed the system into independently deployable services, each owned by a small team
- Gave teams full ownership: build, test, deploy, operate, and support
- Built internal deployment tooling (Apollo) that automates canary analysis, rollback, and one-click deployment
- Established the practice of deploying every commit that passes the pipeline, with automated rollback on metric degradation

### Key Lessons

1. **Ownership drives quality.** When the team that writes the code also operates it in production, they write better code and build better monitoring.
2. **Small teams move faster.** Two-pizza teams (6-10 people) can make decisions without bureaucratic overhead.
3. **Automation eliminates toil.** Amazon's internal deployment tooling means that deploying is not a skilled activity - any team member can deploy (and the pipeline usually deploys automatically).

## HP: CD in Hardware-Adjacent Software

### Context

HP's LaserJet firmware team demonstrated that continuous delivery principles apply even to embedded software, a domain often considered incompatible with frequent deployment.

### The Challenge

- **Embedded software:** Firmware that runs on physical printers
- **Long development cycles:** Firmware releases had traditionally been annual
- **Quality requirements:** Firmware bugs require physical recalls or complex update procedures
- **Team size:** Large, distributed teams with varying skill levels

### What They Did

- Invested in automated testing infrastructure for firmware
- Reduced build times from days to under an hour
- Moved from annual releases to frequent incremental updates
- Implemented continuous integration with automated test suites running on simulator and hardware

### Key Lessons

1. **CD principles are universal.** Even embedded firmware can benefit from small batches, automated testing, and continuous integration.
2. **Build time is a critical constraint.** Reducing build time from days to under an hour unlocked the ability to test frequently, which enabled frequent integration, which enabled frequent delivery.
3. **Results were dramatic:** Development costs reduced by approximately 40%, programs delivered on schedule increased by roughly 140%.

## Flickr: "10+ Deploys Per Day"

### Context

Flickr's 2009 presentation "10+ Deploys Per Day: Dev and Ops Cooperation" is credited with helping launch the DevOps movement. At a time when most organizations deployed quarterly, Flickr was deploying more than ten times per day.

### The Challenge

- **Web-scale service:** Serving billions of photos to millions of users
- **Ops/Dev divide:** Traditional separation between development and operations teams
- **Fear of change:** Deployments were infrequent because they were risky

### What They Did

- Built automated infrastructure provisioning and deployment
- Implemented feature flags to decouple deployment from release
- Created a culture of shared responsibility between development and operations
- Made deployment a routine, low-ceremony event that anyone could trigger
- Used IRC bots (and later chat-based tools) to coordinate and log deployments

### Key Lessons

1. **Culture is the enabler.** Flickr's technical practices were important, but the cultural shift - developers and operations working together, shared responsibility, mutual respect - was what made frequent deployment possible.
2. **Tooling should reduce friction.** Flickr's deployment tools were designed to make deploying as easy as possible. The easier it is to deploy, the more often people deploy, and the smaller each deployment becomes.
3. **Transparency builds trust.** Logging every deployment in a shared channel let everyone see what was deploying, who deployed it, and whether it caused problems. This transparency built organizational trust in frequent deployment.

## Common Patterns Across Reports

Despite the diversity of these organizations, several patterns emerge consistently:

### 1. Investment in Automation Precedes Cultural Change

Every organization built the tooling first. Automated testing, automated deployment, automated rollback - these created the conditions where frequent deployment was possible. Cultural change followed when people saw that the automation worked.

### 2. Incremental Adoption, Not Big Bang

No organization switched to continuous deployment overnight. They all moved incrementally: shorter release cycles first, then weekly deploys, then daily, then on-demand. Each step built confidence for the next.

### 3. Team Ownership Is Essential

Organizations that gave teams ownership of their deployments (build it, run it) moved faster than those that kept deployment as a centralized function. Ownership creates accountability, which drives quality.

### 4. Feature Flags Are Universal

Every organization in these reports uses feature flags to decouple deployment from release. This is not optional for continuous deployment - it is foundational.

### 5. The Results Are Consistent

Regardless of industry, size, or starting point, organizations that adopt continuous deployment consistently report:

- **Higher deployment frequency** (daily or more)
- **Lower change failure rate** (small changes fail less)
- **Faster recovery** (automated rollback, small blast radius)
- **Higher developer satisfaction** (less toil, more impact)
- **Better business outcomes** (faster time to market, reduced costs)

## Applying These Lessons to Your Migration

You do not need to be Google-sized to benefit from these patterns. Extract what applies:

1. **Start with automation.** Build the pipeline, the tests, the rollback mechanism.
2. **Adopt incrementally.** Move from monthly to weekly to daily. Do not try to jump to 10 deploys per day on day one.
3. **Give teams ownership.** Let teams deploy their own services.
4. **Use feature flags.** Decouple deployment from release.
5. **Measure and improve.** Track DORA metrics. Run experiments. Use retrospectives.

These are the practices covered throughout this migration guide. The experience reports confirm that they work - not in theory, but in production, at scale, in the real world.

## Further Reading

For detailed experience reports and additional case studies, see:

- [MinimumCD.org Experience Reports](https://minimumcd.org) - Collected reports from organizations practicing minimum CD
- *Accelerate* by Nicole Forsgren, Jez Humble, and Gene Kim - The research behind DORA metrics, with extensive case study data
- *Continuous Delivery* by Jez Humble and David Farley - The foundational text, with detailed examples from multiple organizations
- *The DevOps Handbook* by Gene Kim, Jez Humble, Patrick Debois, and John Willis - Case studies from organizations across industries

---

> This content is adapted from [MinimumCD.org](https://minimumcd.org),
> licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

---

## Related Content

- [Retrospectives](../../optimize/retrospectives/) - the practice of learning from experience that these reports exemplify at an industry scale
- [Metrics-Driven Improvement](../../optimize/metrics-driven-improvement/) - the approach every experience report team used to guide their CD adoption
- [Feature Flags](../../optimize/feature-flags/) - a universal pattern across all experience reports for decoupling deployment from release
- [Progressive Rollout](../progressive-rollout/) - the rollout strategies (canary, ring-based, percentage) described in the Microsoft and Google reports
- [DORA Capabilities](../../../reference/dora-capabilities/) - the research-backed capabilities that these experience reports validate in practice
- [Coordinated Deployments](../../../symptoms/deployment/coordinated-deployments/) - a symptom every organization in these reports eliminated through independent service deployment
