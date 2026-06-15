---
title: "Use AI to Find Friction Before You Use It to Go Faster"
linkTitle: "AI as Diagnostic"
weight: 2
description: >
  The leadership stance for the new bottleneck. AI's first gift is visibility, not speed. Five properties name how AI removes a dependency.
---

{{% pageinfo %}}
The obvious use of AI is to generate more code. The bigger win is to remove the
dependencies that dominate lead time. This page covers the four principles a leader needs for that
to work, and the five properties that turn the [Golden Rule]({{< relref "/docs/agentic-cd/diagnose/coordination-costs#the-golden-rule" >}})
into specific moves.
{{% /pageinfo %}}

## Four Principles

### Principle 1: Treat AI as a Diagnostic Before an Accelerator

The first capability AI gives an enterprise is not speed; it's visibility. When an
[agent]({{< relref "/docs/reference/glossary#agent-ai" >}}) struggles to make a small change, it
reveals where the system depends on implicit knowledge, a dependency you could not see before. If
generated tests are brittle, behavior was never specified. And when code is ready but cannot move,
that constraint was downstream all along.

Read these as system signals, not "AI is the problem." Every place an agent stalls is a coordination
cost made visible, and the start of your improvement backlog.

This is the most honest feedback a delivery system can get, because an agent is a literal executor.
It cannot lean on tribal knowledge, read a hallway for context, or quietly work around a vague
requirement the way an experienced developer does. So where it stalls is **objective feedback on a
knowledge gap**: the system depended on something nobody wrote down, and now you know exactly where.
[Start Here]({{< relref "/docs/start-here" >}}) makes the same point - an agent exposing a gap "is
not a flaw in the agents, it is the diagnostic working as intended."

### Principle 2: Measure Dependencies Removed and Value Acceleration, Not Adoption

High usage is not high value. A team can roll out copilots to everyone and leave the delivery system
exactly as coupled as before. Two measures matter, and neither is adoption.

- **Leading: did a dependency leave the system?** This is the Golden Rule's test, visible in the
  time from idea to clear intent, the wait for a design decision, the share of changes validated
  automatically, and the number of controls moved from a meeting into the pipeline.
- **Outcome: is value actually moving faster?** Shorter
  [lead time]({{< relref "/docs/reference/glossary#lead-time-for-changes" >}}), more frequent safe
  delivery, less work aging in queues.

Count the dependencies you removed and the time saved. But judge yourself on whether the system got
faster at turning ideas into value. Output is abundant. Accelerated flow is scarce.

### Principle 3: Use the AI Enablement Properties to Accelerate

Once you have named the dependency, the [five properties](#the-five-ai-enablement-properties)
are how you remove it. Point them at Layers 2 and 3, the process and the organization, not just at
Layer 1, the code. That is AI Process Engineering: every property applied is a dependency removed,
and by the Golden Rule, your odds doubled.

But the payoff is lopsided, and a leader has to respect the limit. **AI can do the work, but it
cannot accept the work.** It can draft the requirement, the design, and the code, but only the real
user can confirm a change matches their job. When the same scarce expert both takes in the work and
signs it off, AI speeds up the front and leaves the back untouched, and the bottleneck just moves to
where automation cannot help. So the move has two halves: aim the properties at the dependencies they
can remove, and deliberately fund the human judgment they cannot.

### Principle 4: Build Intent, Safety, and Control Into the Flow

Agents are fast and literal. They act safely only inside boundaries they can see. Everything a
human used to carry in their head - the requirement's real intent, the architecture rule no one
wrote down, the security expectation, the unspoken fact that "done" includes an audit artifact - has
to become something the system can enforce: testable intent, constraints expressed as rules, checks
built into the pipeline, quality gates that encode real behavior. This is Coherence made executable.

The same logic governs controls. At human speed an organization survives late-stage gates. At agent
speed they become traffic jams, because every control outside the flow is a dependency, and
dependencies create queues. Security, audit, and quality matter more when AI accelerates
implementation, not less. What must change is their location.

> A control built into the path every change travels is an accelerator. The same control bolted on
> at the end is a bottleneck.

## The Five AI Enablement Properties

Five properties describe how AI removes a dependency. Each one, applied, is a dependency removed.

| Property | What it does | Dependency it removes |
|----------|--------------|-----------------------|
| **Knowledge** | Take in, manage, and reason over knowledge; share it widely and sharpen accuracy | "Wait for the person who knows" |
| **Capability** | Do the things you used to wait on others for; turn yourself into a team | "Wait for another role or skill" |
| **Capacity** | Do work faster and at volume; one person does the work of many | "Wait for more hands" |
| **Parallelism** | Act in many places at once: independence of action, self-service, decoupling | "Serialize through a shared resource" |
| **Optionality** | Experiment, work incrementally, and exploit options cheaply | "Commit early because exploring is expensive" |

The mechanism is simple. AI enables independence of action, and every removed dependency doubles
your odds.

Knowledge sits first for a reason. It is the [deepest of the three C's]({{< relref "/docs/agentic-cd/diagnose/coordination-costs#underneath-the-three-cs-knowledge" >}}),
and it is the one earlier automation could never touch. A script, a pipeline, a workflow engine can
only execute a process someone has already written down; it cannot supply knowledge that was never
captured. An agent can. It reads the codebase, the tickets, the chat history, and the runbooks and
**infers and extracts** the understanding that lived in someone's head - it discovers the process
rather than merely following one. That is why ACD does more than expose a knowledge gap: it can fill
it. The diagnostic that finds the missing knowledge and the tool that supplies it are the same tool.

The payoff is lopsided because the flow of work is dominated by wait time and coordination cost.
Pointing AI at that, rather than at the 12% that is coding, is what produces order-of-magnitude
improvements in lead time and quality. Applied to real coordination-heavy work, removing
dependencies has compressed multi-week analyses into days and lifted on-time odds from single digits
to coin-flip or better. Every win came from removing dependencies, not from typing faster.

## One Guardrail

AI Process Engineering is not permission to skip engineering discipline. Integrating AI **is**
software engineering. To be great at it you must be great at DevOps and
[CI]({{< relref "/docs/reference/practices/continuous-integration" >}}), because that is your safety
net. As the DORA 2025 *State of DevOps Report* found, "AI magnifies the strengths of high-performing
organizations and the dysfunctions of low-performing ones." The advance is augmentation, not
replacement. Keep your critical thinking.

This is the same point the [Agentic CD]({{< relref "/docs/agentic-cd" >}}) section makes from the
engineering side: an agent-generated change must meet or exceed the same quality bar as a
human-generated change. The pipeline does not care who wrote the code.

## Related Content

- [Why Coordination, Not Coding, Sets the Pace]({{< relref "/docs/agentic-cd/diagnose/coordination-costs" >}}) - the physics these principles act on
- [The Bottleneck Removal Loop]({{< relref "/docs/agentic-cd/diagnose/bottleneck-removal-loop" >}}) - where you apply the properties, repeatedly
- [Pitfalls and Metrics]({{< relref "/docs/agentic-cd/operations/pitfalls-and-metrics" >}}) - measuring value acceleration rather than adoption
- [Pipeline Enforcement and Expert Agents]({{< relref "/docs/agentic-cd/operations/pipeline-enforcement" >}}) - how controls move into the flow

---

Content contributed by {{% contributor-credit "bryan-finster" %}}.
