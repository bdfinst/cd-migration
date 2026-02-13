---
title: "Pull Request Review Bottlenecks"
linkTitle: "PR Review Bottlenecks"
weight: 14
description: >
  Pull requests sit for days waiting for review. Reviews happen in large batches. Authors have
  moved on by the time feedback arrives.
---

## What This Looks Like

A developer opens a pull request and waits. Hours pass. A day passes. They ping someone in chat.
The reviewer is busy with their own work. Eventually, late in the afternoon or the next morning,
comments arrive. The author has moved on to something else and has to reload context to respond.
Another round of comments. Another wait. The PR finally merges two or three days after it was
opened.

Common variations:

- **The aging PR queue.** The team has five or more open PRs at any given time. Some are days old.
  Developers start new work while they wait, which creates more PRs, which creates more review
  load, which slows reviews further.
- **The designated reviewer.** One or two senior developers review everything. They are
  overwhelmed. Their review queue is a bottleneck that the rest of the team works around by
  starting more work while they wait.
- **The drive-by approval.** Reviews are so slow that the team starts rubber-stamping PRs to
  unblock each other. The review step exists in name only. Quality drops, but at least things
  merge.
- **The nitpick spiral.** Reviewers leave dozens of style comments on formatting, naming, and
  conventions that could be caught by a linter. Each round triggers another round. A 50-line
  change accumulates 30 comments across three review cycles.
- **The "I'll get to it" pattern.** When asked about a pending review, the answer is always "I'll
  look at it after I finish this." But they never finish "this" because they have their own work,
  and reviewing someone else's code is never the priority.

The telltale sign: the team tracks PR age and the average is measured in days, not hours.

## Why This Is a Problem

Slow code review is not just an inconvenience. It is a systemic bottleneck that undermines
continuous integration, inflates cycle time, and degrades the quality it is supposed to protect.

### It blocks continuous integration

Trunk-based development requires integrating to trunk at least once per day. A PR that sits for
two days makes daily integration impossible. The branch diverges from trunk while it waits. Other
developers make changes to the same files. By the time the review is done, the PR has merge
conflicts that require additional work to resolve.

This is a compounding problem. Slow reviews cause longer-lived branches. Longer-lived branches
cause larger merge conflicts. Larger merge conflicts make integration painful. Painful integration
makes the team dread merging, which makes them delay opening PRs until the work is "complete,"
which makes PRs larger, which makes reviews take longer.

In teams where reviews complete within hours, branches rarely live longer than a day. Merge
conflicts are rare because changes are small and trunk has not moved far since the branch was
created.

### It inflates cycle time

Every hour a PR waits for review is an hour added to cycle time. For a story that takes four hours
to code, a two-day review wait means the review step dominates the total cycle time. The coding
was fast. The pipeline is fast. But the work sits idle for days because a human has not looked at
it yet.

This wait time is pure waste. Nothing is happening to the code while it waits. No value is being
delivered. The change is done but not integrated, tested in the full pipeline, or deployed. It is
inventory sitting on the shelf.

When reviews happen within two hours, the review step nearly disappears from the cycle time
measurement. Code flows from development to trunk to production with minimal idle time.

### It degrades the review quality it is supposed to protect

Slow reviews produce worse reviews, not better ones. When a reviewer sits down to review a PR that
was opened two days ago, they have no context on the author's thinking. They review the code cold,
missing the intent behind decisions. They leave comments that the author already considered and
rejected, triggering unnecessary back-and-forth.

Large PRs make this worse. When a review has been delayed, the author often keeps working on the
same branch, adding more changes to avoid opening a second PR while the first one waits. What
started as a 50-line change becomes a 300-line change. Research consistently shows that reviewer
effectiveness drops sharply after 200 lines. Large PRs get superficial reviews - the reviewer
skims the diff, leaves a few surface-level comments, and approves because they do not have time
to review it thoroughly.

Fast reviews are better reviews. A reviewer who looks at a 50-line change within an hour of it
being opened has full context on what the team is working on, can ask the author questions in real
time, and can give focused attention to a small, digestible change.

### It creates hidden WIP

Every open PR is work in progress. The code is written but not integrated. The developer who
authored it has moved on to something new, but their previous work is still "in progress" from the
team's perspective. A team of five with eight open PRs has eight items of hidden WIP that do not
appear on the sprint board as "in progress" but consume the same attention.

This hidden WIP interacts badly with explicit WIP. A developer who has one story "in progress" on
the board but three PRs waiting for review is actually juggling four streams of work. Each PR that
gets comments requires a context switch back to code they wrote days ago. The cognitive overhead is
real even if the board does not show it.

### Impact on continuous delivery

Continuous delivery requires that every change move from commit to production quickly and
predictably. Review bottlenecks create an unpredictable queue between "code complete" and
"integrated." The queue length varies based on reviewer availability, competing priorities, and
team habits. Some PRs merge in hours, others take days. This variability makes delivery timelines
unpredictable and prevents the steady flow of small changes that CD depends on.

The bottleneck also discourages the small, frequent changes that make CD safe. Developers learn
that every PR costs a multi-day wait, so they batch changes into larger PRs to reduce the number
of times they pay that cost. Larger PRs are riskier, harder to review, and more likely to cause
problems - exactly the opposite of what CD requires.

## How to Fix It

### Step 1: Measure review turnaround time (Week 1)

You cannot fix what you do not measure. Start tracking two numbers:

- **Time to first review:** elapsed time from PR opened to first reviewer comment or approval.
- **PR age at merge:** elapsed time from PR opened to PR merged.

Most teams discover their average is far worse than they assumed. Developers think reviews happen
in a few hours. The data shows days.

### Step 2: Set a team review SLA (Week 1)

Agree as a team on a review turnaround target. A reasonable starting point:

- **Reviews within 2 hours** during working hours.
- **PR age at merge under 24 hours.**

Write this down as a working agreement. Post it on the board. This is not a suggestion - it is a
team commitment.

### Step 3: Make reviews a first-class activity (Week 2)

The core behavior change: reviewing code is not something you do when you have spare time. It is
the highest-priority activity after your current task reaches a natural stopping point.

Concrete practices:

- **Check for open PRs before starting new work.** When a developer finishes a task or hits a
  natural pause, their first action is to check for pending reviews, not to pull a new story.
- **Auto-assign reviewers.** Do not wait for someone to volunteer. Configure your tools to
  assign a reviewer automatically when a PR is opened.
- **Rotate reviewers.** Do not let one or two people carry all the review load. Any team member
  should be able to review any PR. This spreads knowledge and distributes the work.
- **Keep PRs small.** Target under 200 lines of changed code. Small PRs get reviewed faster and
  more thoroughly. If a developer says their PR is "too large to split," that is a work
  decomposition problem.

### Step 4: Consider synchronous review (Week 3+)

The fastest review is one that happens in real time. If async review consistently exceeds the
team's SLA, move toward synchronous alternatives:

| Method | How it works | Review wait time |
|--------|-------------|-----------------|
| Pair programming | Two developers write the code together. Review is continuous. | Zero |
| Over-the-shoulder | Author walks reviewer through the change on a call. | Minutes |
| Rapid async | PR opened, reviewer notified, review within 2 hours. | Under 2 hours |
| Traditional async | PR opened, reviewer gets to it when they can. | Hours to days |

Pair programming eliminates the review bottleneck entirely. The code is reviewed as it is written.
There is no PR, no queue, and no wait. For teams that struggle with review latency, pairing is
often the most effective solution.

### Step 5: Address the objections

| Objection | Response |
|-----------|----------|
| "I can't drop what I'm doing to review" | You are not dropping everything. You are checking for reviews at natural stopping points: after a commit, after a test passes, after a meeting. Reviews that take 10 minutes should not require "dropping" anything. |
| "Reviews take too long because the PRs are too big" | Then the PRs need to be smaller. A 50-line change takes 5-10 minutes to review. The review is not the bottleneck - the PR size is. |
| "Only senior developers can review this code" | That is a knowledge silo. Rotate reviewers so that everyone builds familiarity with every part of the codebase. Junior developers reviewing senior code is learning. Senior developers reviewing junior code is mentoring. Both are valuable. |
| "We need two reviewers for compliance" | Check whether your compliance framework actually requires two human reviewers, or whether it requires two sets of eyes on the code. Pair programming satisfies most separation-of-duties requirements while eliminating review latency. |
| "We tried faster reviews and quality dropped" | Fast does not mean careless. Automate style checks so reviewers focus on logic, correctness, and design. Small PRs get better reviews than large ones regardless of speed. |

## Measuring Progress

| Metric | What to look for |
|--------|-----------------|
| Time to first review | Should drop below 2 hours |
| PR age at merge | Should drop below 24 hours |
| Open PR count | Should stay low - ideally fewer than the number of team members |
| PR size (lines changed) | Should trend below 200 lines |
| Review rework cycles | Should stay under 2 rounds per PR |
| [Development cycle time](../../../under-construction/) <!-- target: reference/metrics/development-cycle-time --> | Should decrease as review wait time drops |

## Related Content

- [Code Review](../../../under-construction/) <!-- target: foundations/code-review --> - The practice guide for CD-compatible review techniques
- [Trunk-Based Development](../../../under-construction/) <!-- target: foundations/trunk-based-development --> - Daily integration requires fast reviews
- [Push-Based Work Assignment](../push-based-work-assignment/) - Push assignment makes reviews feel like a distraction from "my work"
- [Too Much Work in Progress](../too-much-wip/) - Slow reviews create hidden WIP as PRs queue up
- [Work Decomposition](../../../under-construction/) <!-- target: foundations/work-decomposition --> - Small PRs start with small stories
