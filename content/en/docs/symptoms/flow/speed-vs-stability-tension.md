---
aliases:
  - /docs/symptoms/speed-vs-stability-tension/
title: "The Team Is Caught Between Shipping Fast and Not Breaking Things"
linkTitle: "Speed vs. stability tension"
description: >
  A cultural split between shipping speed and production stability. Neither side sees how CD resolves the tension.
tags:
  - team-dynamics
  - deployment-automation
---

## What you are seeing

The team is divided. Developers want to ship often and trust that fast feedback will catch problems. Operations and on-call engineers want stability and fewer changes to reason about during incidents. Both positions are defensible. The conflict is real and recurs in every conversation about deployment frequency, change windows, and testing requirements.

The team has reached an uncomfortable equilibrium. Developers batch changes to deploy less often, which partially satisfies the stability concern but creates larger, riskier releases. Operations accepts the change window constraints, which gives them predictability but means the team cannot respond quickly to urgent fixes. Nobody is getting what they actually want.

What neither side sees is that the conflict is a symptom of the current deployment system, not an inherent tradeoff. Deployments are risky because they are large and infrequent. They are large and infrequent because of the process and tooling around them. A system that makes deployments small, fast, automated, and reversible changes the equation: frequent small changes are less risky than infrequent large ones.

## Common causes

### Manual deployments

Manual deployments are slow and error-prone, which makes the stability concern rational. When deployments require hours of careful manual execution, limiting their frequency does reduce overall human error exposure. The stability faction's instinct is correct given the current deployment mechanism.

Automated deployments that execute the same steps identically every time eliminate most human error from the deployment process. When the deployment mechanism is no longer a variable, the speed-vs-stability argument shifts from "how often should we deploy" to "how good is the code we are deploying" - a question both sides can agree on.

**Read more:** [Manual deployments](../../anti-patterns/pipeline/manual-deployments/)

### Missing deployment pipeline

Without a pipeline with automated tests, health checks, and rollback capability, the stability concern is valid. Each deployment is a manual, unverified process that could go wrong in novel ways. A pipeline that enforces quality gates before production and detects problems immediately after deployment changes the risk profile of frequent deployments fundamentally.

When the team can deploy with high confidence and roll back automatically if something goes wrong, the frequency of deployments stops being a risk factor. The risk per deployment is low when each deployment is small, tested, and reversible.

**Read more:** [Missing deployment pipeline](../../anti-patterns/pipeline/missing-deployment-pipeline/)

### Pressure to skip testing

When testing is perceived as an obstacle to shipping speed, teams cut tests to go faster. This worsens stability, which intensifies the stability faction's resistance to more frequent deployments. The speed-vs-stability tension is partly created by the belief that quality and speed are in opposition - a belief reinforced by the experience of shipping faster by skipping tests and then dealing with the resulting production incidents.

**Read more:** [Pressure to skip testing](../../anti-patterns/organizational-cultural/pressure-to-skip-testing/)

### Deadline-driven development

When velocity is measured by features shipped to a deadline, every hour spent on test infrastructure, deployment automation, or operational excellence is an hour not spent on the deadline. The incentive structure creates the tension by rewarding speed while penalizing the investment that would make speed safe.

**Read more:** [Deadline-driven development](../../anti-patterns/organizational-cultural/deadline-driven-development/)

## How to narrow it down

1. **Is the deployment process automated and consistent?** If deployments are manual and variable, the stability concern is about process risk, not just code risk. Start with [Manual deployments](../../anti-patterns/pipeline/manual-deployments/).
2. **Does the team have automated testing and fast rollback?** Without these, deploying frequently is genuinely riskier than deploying infrequently. Start with [Missing deployment pipeline](../../anti-patterns/pipeline/missing-deployment-pipeline/).
3. **Does management pressure the team to ship faster by cutting testing?** If yes, the tension is being created from above rather than within the team. Start with [Pressure to skip testing](../../anti-patterns/organizational-cultural/pressure-to-skip-testing/).
