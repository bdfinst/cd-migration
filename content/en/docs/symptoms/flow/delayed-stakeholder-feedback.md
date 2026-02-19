---
aliases:
  - /docs/symptoms/delayed-stakeholder-feedback/
title: "Stakeholders See Working Software Only at Release Time"
linkTitle: "Delayed stakeholder feedback"
description: >
  There is no cadence for incremental demos. Feedback on what was built arrives months after decisions were made.
tags:
  - batch-size
  - work-decomposition
---

## What you are seeing

Stakeholders do not see working software until a feature is finished. The team works for six weeks on a new feature, demonstrates it at the sprint review, and the response is: "This is good, but what we actually needed was slightly different. Can we change the navigation so it does X? And actually, we do not need this section at all." Six weeks of work needs significant rethinking. The changes are scoped as follow-on work for the next planning cycle.

The problem is not that stakeholders gave bad requirements. It is that requirements look different when demonstrated as working software rather than described in user stories. Stakeholders genuinely did not know what they wanted until they saw what they said they wanted. This is normal and expected. The system that would make this feedback cheap - frequent demonstrations of small working increments - is not in place.

When stakeholder feedback arrives months after decisions, course corrections are expensive. Architecture that needs to change has been built on top of for months. The initial decisions have become load-bearing walls. Rework is disproportionate to the insight that triggered it.

## Common causes

### Monolithic work items

Large work items are not demonstrable until they are complete. A feature that takes six weeks cannot be shown incrementally because it is not useful in partial form. Stakeholders see nothing for six weeks and then see everything at once.

Small vertical slices can be demonstrated as soon as they are done - sometimes multiple times per week. Each slice is a unit of working, demonstrable software that stakeholders can evaluate and respond to while the team is still in the context of that work.

**Read more:** [Monolithic work items](../../anti-patterns/team-workflow/monolithic-work-items/)

### Horizontal slicing

When work is organized by technical layer, nothing is demonstrable until all layers are complete. An API layer with no UI and a UI component that calls no API are both invisible to stakeholders. The feature exists in pieces that stakeholders cannot evaluate individually.

Vertical slices deliver thin but complete functionality that stakeholders can actually use. Each slice has a visible outcome rather than a technical contribution to a future visible outcome.

**Read more:** [Horizontal slicing](../../anti-patterns/team-workflow/horizontal-slicing/)

### Undone work

When the definition of "done" does not include deployed and available for stakeholder review, work piles up as "done but not shown." The sprint review demonstrates a batch of completed work rather than continuously integrated increments. The delay between completion and review is the source of the feedback lag.

When done means deployed - and the team can demonstrate software in a production-like environment at any sprint review - the feedback loop tightens to the sprint cadence rather than the release cadence.

**Read more:** [Undone work](../../anti-patterns/team-workflow/undone-work/)

### Deadline-driven development

When delivery is organized around fixed dates rather than continuous value delivery, stakeholder checkpoints are scheduled at release boundaries. The mid-quarter check-in is a status update, not a demonstration of working software. Stakeholders' ability to redirect the team's work is limited to the brief window around each release.

**Read more:** [Deadline-driven development](../../anti-patterns/organizational-cultural/deadline-driven-development/)

## How to narrow it down

1. **Can the team demonstrate working software every sprint, not just at release?** If demos require a release, work is batched too long. Start with [Undone work](../../anti-patterns/team-workflow/undone-work/).
2. **Do stories regularly take more than one sprint to complete?** If features are too large to show incrementally, start with [Monolithic work items](../../anti-patterns/team-workflow/monolithic-work-items/).
3. **Are stories organized by technical layer?** If the UI team and the API team must both finish before anything can be demonstrated, start with [Horizontal slicing](../../anti-patterns/team-workflow/horizontal-slicing/).
