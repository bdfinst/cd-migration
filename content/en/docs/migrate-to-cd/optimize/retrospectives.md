---
title: "Retrospectives"
linkTitle: "Retrospectives"
weight: 5
description: >
  Continuously improve the delivery process through structured reflection.
---

{{% pageinfo %}}
**Phase 3 - Optimize**

A retrospective is the team's primary mechanism for turning observations into improvements. Without effective retrospectives, [WIP]({{< relref "/docs/reference/glossary#wip-work-in-progress" >}}) limits expose problems that nobody addresses, metrics trend in the wrong direction with no response, and the [CD]({{< relref "/docs/reference/glossary#cd-continuous-delivery" >}}) migration stalls.
{{% /pageinfo %}}

## Why Retrospectives Matter for CD Migration

Every practice in this guide - [trunk-based development]({{< relref "/docs/reference/glossary#tbd-trunk-based-development" >}}), small batches, WIP limits, metrics-driven improvement - generates signals about what is working and what is not. Retrospectives are where the team processes those signals and decides what to change.

Teams that skip retrospectives or treat them as a checkbox exercise consistently stall at whatever maturity level they first reach. Teams that run effective retrospectives continuously improve, week after week, month after month.

## The Five-Part Structure

An effective retrospective follows a structured format that prevents it from devolving into a venting session or a status meeting. This five-part structure ensures the team moves from observation to action.

### Part 1: Review the Mission (5 minutes)

Start by reminding the team of the larger goal. In the context of a CD migration, this might be:

- "Our mission this quarter is to deploy to production at least once per day."
- "We are working toward eliminating manual gates in our [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}})."
- "Our goal is to reduce [lead time]({{< relref "/docs/reference/glossary#lead-time-for-changes" >}}) from 3 days to under 1 day."

This grounding prevents the retrospective from focusing on minor irritations and keeps the conversation aligned with what matters.

### Part 2: Review the KPIs (10 minutes)

Present the team's current metrics. For a CD migration, these are typically the [DORA metrics]({{< relref "/docs/reference/glossary#dora-metrics" >}}) plus any team-specific measures from [Metrics-Driven Improvement]({{< relref "/docs/migrate-to-cd/optimize/metrics-driven-improvement" >}}).

| Metric | Last Period | This Period | Trend |
|--------|------------|-------------|-------|
| [Deployment frequency]({{< relref "/docs/reference/glossary#deployment-frequency" >}}) | 3/week | 4/week | Improving |
| Lead time (median) | 2.5 days | 2.1 days | Improving |
| [Change failure rate]({{< relref "/docs/reference/glossary#change-failure-rate-cfr" >}}) | 22% | 18% | Improving |
| [MTTR]({{< relref "/docs/reference/glossary#mean-time-to-restore-mttr" >}}) | 3 hours | 3.5 hours | Declining |
| WIP (average) | 8 items | 6 items | Improving |

**Do not skip this step.** Without data, the retrospective becomes a subjective debate where the loudest voice wins. With data, the conversation focuses on what the numbers show and what to do about them.

### Part 3: Review Experiments (10 minutes)

Review the outcomes of any experiments the team ran since the last retrospective.

For each experiment:

1. **What was the hypothesis?** Remind the team what you were testing.
2. **What happened?** Present the data.
3. **What did you learn?** Even failed experiments teach you something.
4. **What is the decision?** Keep, modify, or abandon.

**Example:**

> *Experiment: Parallelize the integration test suite to reduce lead time.*
>
> Hypothesis: Lead time would drop from 2.5 days to under 2 days.
>
> Result: Lead time dropped to 2.1 days. The parallelization worked, but environment setup time is now the bottleneck.
>
> Decision: Keep the parallelization. New experiment: investigate self-service test environments.

### Part 4: Check Goals (10 minutes)

Review any improvement goals or action items from the previous retrospective.

- **Completed:** Acknowledge and celebrate. This is important - it reinforces that improvement work matters.
- **In progress:** Check for blockers. Does the team need to adjust the approach?
- **Not started:** Why not? Was it deprioritized, blocked, or forgotten? If improvement work is consistently not started, the team is not treating improvement as a deliverable (see below).

### Part 5: Open Conversation (25 minutes)

This is the core of the retrospective. The team discusses:

- What is working well that we should keep doing?
- What is not working that we should change?
- What new problems or opportunities have we noticed?

**Facilitation techniques for this section:**

| Technique | How It Works | Best For |
|-----------|-------------|----------|
| **Start/Stop/Continue** | Each person writes items in three categories | Quick, structured, works with any team |
| **4Ls (Liked, Learned, Lacked, Longed For)** | Broader categories that capture emotional responses | Teams that need to process frustration or celebrate wins |
| **Timeline** | Plot events on a timeline and discuss turning points | After a particularly eventful sprint or incident |
| **Dot voting** | Everyone gets 3 votes to prioritize discussion topics | When there are many items and limited time |

### From Conversation to Commitment

The open conversation must produce concrete action items. Vague commitments like "we should communicate better" are worthless. Good action items are:

- **Specific:** "Add a Slack notification when the build breaks" (not "improve communication")
- **Owned:** "Alex will set this up by Wednesday" (not "someone should do this")
- **Measurable:** "We will know this worked if build break response time drops below 10 minutes"
- **Time-bound:** "We will review the result at the next retrospective"

**Limit action items to 1-3 per retrospective.** More than three means nothing gets done. One well-executed improvement is worth more than five abandoned ones.

## Psychological Safety Is a Prerequisite

A retrospective only works if team members feel safe to speak honestly about what is not working. Without psychological safety, retrospectives produce sanitized, non-actionable discussion.

### Signs of Low Psychological Safety

- Only senior team members speak
- Nobody mentions problems - everything is "fine"
- Issues that everyone knows about are never raised
- Team members vent privately after the retrospective instead of during it
- Action items are always about tools or processes, never about behaviors

### Building Psychological Safety

| Practice | Why It Helps |
|----------|-------------|
| **Leader speaks last** | Prevents the leader's opinion from anchoring the discussion |
| **Anonymous input** | Use sticky notes or digital tools where input is anonymous initially |
| **Blame-free language** | "The deploy failed" not "You broke the deploy" |
| **Follow through on raised issues** | Nothing destroys safety faster than raising a concern and having it ignored |
| **Acknowledge mistakes openly** | Leaders who admit their own mistakes make it safe for others to do the same |
| **Separate retrospective from performance review** | If retro content affects reviews, people will not be honest |

## Treat Improvement as a Deliverable

The most common failure mode for retrospectives is producing action items that never get done. This happens when improvement work is treated as something to do "when we have time" - which means never.

### Make Improvement Visible

- Add improvement items to the same board as feature work
- Include improvement items in WIP limits
- Track improvement items through the same workflow as any other deliverable

### Allocate Capacity

Reserve a percentage of team capacity for improvement work. Common allocations:

| Allocation | Approach |
|------------|----------|
| **20% continuous** | One day per week (or equivalent) dedicated to improvement, tooling, and tech debt |
| **Dedicated improvement sprint** | Every 4th sprint is entirely improvement-focused |
| **Improvement as first pull** | When someone finishes work and the WIP limit allows, the first option is an improvement item |

The specific allocation matters less than having one. A team that explicitly budgets 10% for improvement will improve more than a team that aspires to 20% but never protects the time.

## Retrospective Cadence

| Cadence | Best For | Caution |
|---------|----------|---------|
| Weekly | Teams in active CD migration, teams working through major changes | Can feel like too many meetings if not well-facilitated |
| Bi-weekly | Teams in steady state with ongoing improvement | Most common cadence |
| After incidents | Any team | Incident retrospectives (postmortems) are separate from regular retrospectives |
| Monthly | Mature teams with well-established improvement habits | Too infrequent for teams early in their migration |

During active phases of a CD migration (Phases 1-3), weekly retrospectives are recommended. Once the team reaches Phase 4, bi-weekly is usually sufficient.

## Running Your First CD Migration Retrospective

If your team has not been running effective retrospectives, start here:

### Before the Retrospective

1. Collect your DORA metrics for the past two weeks
2. Review any action items from the previous retrospective (if applicable)
3. Prepare a shared document or board with the five-part structure

### During the Retrospective (60 minutes)

1. **Review mission** (5 min): State your CD migration goal for this phase
2. **Review KPIs** (10 min): Present the DORA metrics. Ask: "What do you notice?"
3. **Review experiments** (10 min): Discuss any experiments that were run
4. **Check goals** (10 min): Review action items from last time
5. **Open conversation** (25 min): Use Start/Stop/Continue for the first time - it is the simplest format

### After the Retrospective

1. Publish the action items where the team will see them daily
2. Assign owners and due dates
3. Add improvement items to the team board
4. Schedule the next retrospective

## Key Pitfalls

### 1. "Our retrospectives always produce the same complaints"

If the same issues surface repeatedly, the team is not executing on its action items. Check whether improvement work is being prioritized alongside feature work. If it is not, no amount of retrospective technique will help.

### 2. "People don't want to attend because nothing changes"

This is a symptom of the same problem - action items are not executed. The fix is to start small: commit to one action item per retrospective, execute it completely, and demonstrate the result at the next retrospective. Success builds momentum.

### 3. "The retrospective turns into a blame session"

The facilitator must enforce blame-free language. Redirect "You did X wrong" to "When X happened, the impact was Y. How can we prevent Y?" If blame is persistent, the team has a psychological safety problem that needs to be addressed separately.

### 4. "We don't have time for retrospectives"

A team that does not have time to improve will never improve. A 60-minute retrospective that produces one executed improvement is the highest-leverage hour of the entire sprint.

## Measuring Success

| Indicator | Target | Why It Matters |
|-----------|--------|----------------|
| Retrospective attendance | 100% of team | Confirms the team values the practice |
| Action items completed | > 80% completion rate | Confirms improvement is treated as a deliverable |
| DORA metrics trend | Improving quarter over quarter | Confirms retrospectives lead to real improvement |
| Team engagement | Voluntary contributions increasing | Confirms psychological safety is present |

## Next Step

With metrics-driven improvement and effective retrospectives, you have the engine for continuous improvement. The final optimization step is [Architecture Decoupling]({{< relref "/docs/migrate-to-cd/optimize/architecture-decoupling" >}}) - ensuring your system's architecture does not prevent you from deploying independently.

---

## Related Content

- [Team Burnout]({{< relref "/docs/symptoms/visibility/team-burnout" >}}) - a symptom that effective retrospectives help detect and address early
- [Deadline-Driven Development]({{< relref "/docs/anti-patterns/organizational-cultural/planning/deadline-driven-development" >}}) - an anti-pattern that retrospectives can surface and challenge
- [Velocity as Individual Metric]({{< relref "/docs/anti-patterns/organizational-cultural/planning/velocity-as-individual-metric" >}}) - an anti-pattern that undermines the psychological safety retrospectives require
- [Metrics-Driven Improvement]({{< relref "/docs/migrate-to-cd/optimize/metrics-driven-improvement" >}}) - provides the data that retrospectives use to drive decisions
- [Limiting WIP]({{< relref "/docs/migrate-to-cd/optimize/limiting-wip" >}}) - WIP limits expose problems that retrospectives turn into action items
- [DORA Recommended Practices]({{< relref "/docs/reference/dora-capabilities" >}}) - the capability framework that informs improvement priorities
