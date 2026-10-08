---
title: "The Bottleneck Removal Loop"
linkTitle: "Removal Loop"
weight: 4
description: >
  The repeatable method. Walk the value stream and harvest the process exhaust to find the constraint, re-engineer it, share the pattern, then iterate to the next one.
---

{{% pageinfo %}}
The principles describe how to think. The loop describes what to do, repeatedly. Like the delivery
lifecycle itself, bottleneck removal is not a project with an end state. It is a cycle you run, and
keep running, because every constraint you remove exposes the next one. This page is the playbook.
{{% /pageinfo %}}

## The loop

```mermaid
graph LR
    P1["1. Identify<br/>& Diagnose"] --> P2["2. Re-engineer<br/>the Bottleneck"]
    P2 --> P3["3. Document<br/>& Share"]
    P3 --> P4["4. Iterate to<br/>the Next Constraint"]
    P4 -.-> P1

    style P1 fill:#e8f4fd,stroke:#1a73e8
    style P2 fill:#fce8e6,stroke:#d93025
    style P3 fill:#e6f4ea,stroke:#137333
    style P4 fill:#fff4e5,stroke:#e8710a
```

Use AI in every phase, not only to write code, but to solve old coordination problems in new ways.

## Phase 1: Identify and diagnose

You cannot remove a bottleneck you have not named. This phase produces a bottleneck map and a
[classification]({{< relref "/docs/agentic-cd/diagnose/bottleneck-taxonomy" >}}), and it starts with
the real system rather than a maturity model. Use two techniques that work together.

### Technique 1: Walk the value stream (the litmus test)

Take something from your backlog that is small, predictable, and meaningful enough to touch the
real delivery system. Observe a developer, and where appropriate an agent, work the change from idea
to production readiness, and record four things:

- **Steps and elapsed time** - where the work actually went.
- **Developer interventions** - every moment a human must supply context, make a judgment, execute a
  manual step, recover from tool friction, or interpret unclear feedback.
- **Handoffs and approvals** - how many people must touch or sign off on the change.
- **Agentic friction** - the quieter signal: where an agent can act, but not efficiently or safely.
  The agent searches for knowledge that should be discoverable or writes a test that does not reflect
  business behavior. It waits on an environment that is hard to start, or makes a plausible change
  that violates an implicit standard.

The walk is not a performance review of the developer or the agent. It is a performance review of the
system. Ask where the work waited, where it required tribal knowledge, and where safety depended on
manual judgment. Ask where security or compliance entered too late, and where the pipeline gave a clear
next action instead of only saying no. The output is a map of exactly where the value stream stops.

### Technique 2: Context harvesting (read the process exhaust with AI)

Walking the value stream shows you where work stops; context harvesting shows you why. Most of the
knowledge about how work really flows is not in a process diagram. It is scattered across emails,
chat threads, wiki pages, tickets, runbooks, meeting transcripts, and architecture decision records.
People navigate it by knowing whom to ask. An agent cannot, and neither can a new teammate.

Point AI at that exhaust. Have it read the chat history around a stuck request and the wikis and
runbooks for a service. Add the ticket trail of a recurring delay and the transcripts of the meetings
where decisions were actually made.

Then ask it to piece together the real process. Who is involved,
and what does each handoff wait on? Where do the same questions get re-asked, and which knowledge lives in a
single person's head? What once took weeks of interviews now takes an agent a few hours.

Context harvesting does double duty. It speeds up the diagnosis. It also produces the first durable
artifact for Phase 3 to build on: a written account of how the process actually works. In the
agent era, the context you harvest here becomes infrastructure later.

The output of Phase 1 is a named, classified constraint, mapped to where it lives in the lifecycle.

## Phase 2: Re-engineer the bottleneck

Once the constraint is named, resist the reflex to add another meeting, dashboard, or escalation
path. Those preserve the underlying dependency. The better question is: what dependency can we
remove?

- If audit evidence requires ten follow-ups, the answer is not a better follow-up tracker. It is an
  evidence system with clear ownership, known sources, and automated collection.
- If capacity requests wait for months, the answer is not a more urgent email. It is a self-service
  workflow with decision rights, budget rules, and provisioning paths.
- If every design waits on the same architect, the answer is not more architect hours. It is
  architecture guidance teams and agents can apply without waiting.

Re-engineer by applying the
[five AI Enablement Properties]({{< relref "/docs/agentic-cd/diagnose/ai-as-diagnostic#the-five-ai-enablement-properties" >}}).
Aim them at Layers 2 and 3, the process and the organization, not only Layer 1, the code.
Rewire the architecture with the three levers from *Wiring the Winning Organization*:

- **Slowification** - slow down to design the work before you run it.
- **Simplification** - break the work into smaller, independent, more linear steps.
- **Amplification** - make problems visible the moment they appear.

The leadership move is choosing which dependency to remove. AI is how you remove it.

**Put safety and security on the same path as speed.** Re-engineering is not a permission slip for
uncontrolled change. It is the opposite. If agents produce more change, the organization needs
stronger proof that change is acceptable. That proof must live in the path every change travels,
not in late human review.

A re-engineered bottleneck carries its safety with it:

- Clear intent and acceptance criteria
- Behavioral tests tied to outcomes
- Security and policy checks in the pipeline
- Architecture constraints as enforceable rules
- Traceability from request to deployment
- Observable production behavior and rollback
- A named owner for every service and evidence source

See [Pipeline Enforcement and Expert Agents]({{< relref "/docs/agentic-cd/operations/pipeline-enforcement" >}}).

## Phase 3: Document and share

A local improvement no one else can find becomes another silo. The work is not done when the
bottleneck is gone. It is done when the next team, and the next agent, can remove the same class of
constraint without rediscovering how.

The best operators do not only solve problems where they occur. They deliberately spread the
knowledge throughout the organization. One without the other stalls.

- **Local learning** - capture the solution in durable form where the work happened. Use a prompt, a
  runbook, a pipeline check, an architecture decision record, a service-ownership record, a
  test-generator pattern, an evidence template. The test is simple: can the next team apply this
  without asking the original team to explain it?
- **Global learning** - make the pattern travel. Publish the pattern where humans and agents discover it in
  the flow of work. Build a living system of examples, prompts, artifacts, and outcomes, not a portal of
  stale documents. The question shifts from "did one team improve?" to "can the improvement move
  across the org?"

In the agent era, context is infrastructure. Documentation is not the tax at the end of the work. It
is the mechanism that converts a one-time fix into organizational capability, readable by the next
teammate and the next agent alike.

## Phase 4: Iterate to the next constraint

Removing one constraint does not finish the system. It reveals the next one. That is not failure. It
is the loop working as designed.

This is where the physics pays off. The
[Golden Rule]({{< relref "/docs/agentic-cd/diagnose/coordination-costs#the-golden-rule" >}}) holds
that removing a dependency roughly doubles your odds, so each turn of the loop compounds the last.
The goal is not to declare the system transformed. It is to build the reflex - identify,
re-engineer, document and share, iterate - until removing bottlenecks is the team's operating rhythm
rather than a one-time initiative. When the whole organization runs the loop, coordination costs
compound downward: every dependency removed improves the odds for every team that touches the same
flow.

## What to do next

Start small, but start with the real system. Choose one backlog item, one audit evidence flow, one
capacity request, one design approval, or one deployment gate. Then:

1. Run the litmus walk.
2. Name the bottleneck and classify it.
3. Identify which dependency must be removed.
4. Use AI to help re-engineer the work.
5. Move safety and security into the flow.
6. Document the pattern and share it.

Then repeat. Do not wait for an enterprise AI operating model to be perfect. Do not wait for every
team to agree on a maturity framework. Do not measure success by adoption alone.

Measure whether
work moves faster because the system has become clearer, safer, more automated, and less dependent
on hidden human coordination. The teams that become fast will not be the teams that chase speed
directly. They will be the teams that remove friction, improve quality, and make safety executable.

## Related content

- [Where the Bottleneck Moves]({{< relref "/docs/agentic-cd/diagnose/bottleneck-taxonomy" >}}) - the classification Phase 1 produces
- [Use AI to Find Friction Before You Use It to Go Faster]({{< relref "/docs/agentic-cd/diagnose/ai-as-diagnostic" >}}) - the properties you apply in Phase 2
- [AI Adoption Roadmap]({{< relref "/docs/agentic-cd/getting-started/adoption-roadmap" >}}) - one full pass of this loop, sequenced for practitioners
- [Replacing Manual Validations]({{< relref "/docs/brownfield/replacing-manual-validations" >}}) - the mechanical cycle for moving controls into the pipeline

---

Content contributed by {{% contributor-credit "bryan-finster" %}}.
