---
aliases:
  - /docs/symptoms/painful-local-development-setup/
title: "Setting Up a Development Environment Takes Days"
linkTitle: "Painful local development setup"
description: >
  New team members are unproductive for their first week. The setup guide is 50 steps long and always out of date.
tags:
  - environment-consistency
  - team-dynamics
---

## What you are seeing

A new developer spends two days troubleshooting before the system runs locally. The wiki setup page was last updated 18 months ago. Step 7 refers to a tool that has been replaced. Step 12 requires access to a system that needs a separate ticket to provision. Step 19 assumes an operating system version that is three versions behind. Getting unstuck requires finding a teammate who has memorized the real procedure from experience.

The setup problem is not just a new-hire experience. It affects the entire team whenever someone gets a new machine, switches between projects, or tries to set up a second environment for a specific debugging purpose. The environment is fragile because it was assembled by hand and the assembly process was never made reproducible.

The business cost is usually invisible. Two days of new-hire setup is charged to onboarding. Senior engineers spending half a day helping unblock new hires is charged to sprint work. Developers who avoid setting up new environments and work around the problem are charged to productivity. None of these costs appear on a dashboard that anyone monitors.

## Common causes

### Snowflake environments

When development environments are not reproducible from code, the assembly process exists only in documentation (which drifts) and in the heads of people who have done it before (who are not always available). Each environment is assembled slightly differently, which means the "how to set up a development environment" question has as many answers as there are developers on the team.

When the environment definition is versioned alongside the code, setup becomes a single command. A new developer who runs that command gets the same working environment as everyone else on the team - no 18-month-old wiki page, no tribal knowledge required, no two-day troubleshooting session. When the code changes in ways that require environment changes, the environment definition is updated at the same time.

**Read more:** [Snowflake environments]({{< relref "/docs/anti-patterns/pipeline/snowflake-environments" >}})

### Knowledge silos

The real setup procedure exists in the heads of specific team members who have run it enough times to know which steps to skip and which to do differently on which operating systems. When those people are unavailable, setup fails. The knowledge gap is only visible when someone needs it.

When environment setup is codified as runnable scripts and containers, the knowledge is distributed to everyone who can read the code. A new developer no longer has to find the one person who remembers which steps to skip - they run the script, and it works.

**Read more:** [Knowledge silos]({{< relref "/docs/anti-patterns/team-workflow/knowledge-silos" >}})

### Tightly coupled monolith

When running any part of the application requires the full monolith running - including all its dependencies, services, and backing infrastructure - local setup is inherently complex. A developer who only needs to work on the notification service must stand up the entire application, all its databases, and all the services the notification service depends on, which is everything.

Decomposed services with stable interfaces can be developed in isolation. A developer working on the notification service stubs the services it calls and focuses on the piece they are changing. Setup is proportional to scope.

**Read more:** [Tightly coupled monolith]({{< relref "/docs/anti-patterns/architecture/tightly-coupled-monolith" >}})

## How to narrow it down

1. **Can a new team member set up a working development environment without help?** If not, the setup process is not self-contained. Start with [Snowflake environments]({{< relref "/docs/anti-patterns/pipeline/snowflake-environments" >}}).
2. **Does setup require tribal knowledge that is not captured in the documented procedure?** If team members need to "fill in the gaps" from memory, that knowledge needs to be externalized. Start with [Knowledge silos]({{< relref "/docs/anti-patterns/team-workflow/knowledge-silos" >}}).
3. **Does running a single service require running the entire application?** If so, local development is inherently complex. Start with [Tightly coupled monolith]({{< relref "/docs/anti-patterns/architecture/tightly-coupled-monolith" >}}).

**Ready to fix this?** The most common cause is [Snowflake environments]({{< relref "/docs/anti-patterns/pipeline/snowflake-environments" >}}). Start with its [How to Fix It]({{< relref "/docs/anti-patterns/pipeline/snowflake-environments#how-to-fix-it" >}}) section for week-by-week steps.
