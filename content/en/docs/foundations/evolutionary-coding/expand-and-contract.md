---
title: "Expand and Contract"
linkTitle: "Expand and Contract"
weight: 4
description: >
  Evolve a shared database schema or API contract across non-breaking phases instead of mutating it in place.
---

{{% pageinfo %}}
**Phase 1 - Foundations** | {{< scope-label "team" >}}

Expand and contract, also called parallel change, replaces a single breaking schema or contract change with a sequence of small, backward-compatible deployments. Nothing outside your team has to be redeployed in lockstep.
{{% /pageinfo %}}

## What Is Expand and Contract?

Expand and contract evolves a shared contract, a database schema, an event schema, or an API, without ever mutating it in place. Instead of replacing the old shape with the new one in a single change, you add the new shape alongside the old one, migrate consumers over incrementally, and only remove the old shape once nothing depends on it.

The name comes from the two ends of the sequence: you expand the contract to support both shapes at once, then contract it back down to only the new shape.

### What Expand and Contract Is Not

- It is not a single migration script run during a deployment window. Each phase is its own independent, reversible deployment.
- It is not limited to databases. The same four phases apply to API fields, event schemas, and message formats: anything with more than one reader or writer.
- It is not optional for shared contracts. [Branch by abstraction]({{< relref "/docs/foundations/evolutionary-coding/branch-by-abstraction" >}}) is enough when only your own code depends on the thing you're changing. Once another service, another team, or stored data depends on it, use expand and contract instead.

## What Expand and Contract Improves

| Problem | How Expand and Contract Helps |
|---------|--------------------------------|
| Coordinated multi-service deployments for a schema change | Each phase deploys independently; producers and consumers never need to deploy at the same instant |
| Downtime during database migrations | The schema is never in a state where old and new code can't both function |
| No rollback path for a breaking change | Every phase is reversible on its own; you can pause or back out at any step |
| Consumers of an API broken by a field change | Old and new fields coexist until every consumer has migrated |

## The Four Phases

### Phase 1: Expand

Add the new shape alongside the old one. Nothing reads from it yet, and nothing that currently works stops working.

{{< card code=true header="**Phase 1: add new columns alongside the old one**" lang="sql" >}}
ALTER TABLE users ADD COLUMN first_name VARCHAR(255);
ALTER TABLE users ADD COLUMN last_name VARCHAR(255);
{{< /card >}}

Deploy this on its own. The application still reads and writes the `name` column exclusively. There is no behavior change.

For an API, the equivalent is adding a new field or a new endpoint version without removing the old one.

### Phase 2: Dual-write and backfill

Update the write path to populate both the old and new shapes at once, then backfill existing data in the background.

{{< card code=true header="**Phase 2: write to both old and new columns**" lang="javascript" >}}
async function createUser(name) {
  const [firstName, lastName] = name.split(' ');
  await db.query(
    'INSERT INTO users (name, first_name, last_name) VALUES (?, ?, ?)',
    [name, firstName, lastName]
  );
}
{{< /card >}}

{{< card code=true header="**Phase 2: backfill existing rows in the background**" lang="javascript" >}}
async function backfillNames() {
  const users = await db.query('SELECT id, name FROM users WHERE first_name IS NULL');
  for (const user of users) {
    const [firstName, lastName] = user.name.split(' ');
    await db.query(
      'UPDATE users SET first_name = ?, last_name = ? WHERE id = ?',
      [firstName, lastName, user.id]
    );
  }
}
{{< /card >}}

Deploy the dual-write change, then run the backfill as its own job. Both are independently reversible: if the backfill has a problem, the application still works off the old column.

For an API, this phase is a tolerant reader: consumers ignore fields they don't recognize, and producers populate both the old and new field until every consumer has moved.

### Phase 3: Dual-read and cutover

Switch reads to consume the new shape, one caller at a time.

{{< card code=true header="**Phase 3: switch reads to the new columns**" lang="javascript" >}}
async function getUser(id) {
  const user = await db.query('SELECT * FROM users WHERE id = ?', [id]);
  return {
    firstName: user.first_name,
    lastName: user.last_name,
  };
}
{{< /card >}}

Because Phase 2 guarantees the new columns are always populated, this switch has nothing to migrate; it's a straightforward read-path change deployed independently of the write-path change that came before it.

### Phase 4: Contract

Once every reader and writer uses the new shape exclusively, remove the old one.

{{< card code=true header="**Phase 4: drop the old column**" lang="sql" >}}
ALTER TABLE users DROP COLUMN name;
{{< /card >}}

For an API, this phase is deprecating and eventually removing the old field or version, once telemetry confirms no consumer still calls it.

**Result:** four independent deployments instead of one big-bang change. Each one is reversible on its own, and none of them requires another team or service to redeploy in the same window.

## When Expand and Contract Is Not Enough

If the two shapes cannot coexist even briefly, for example a uniqueness constraint that the old and new schema can't both satisfy, you need a more deliberate migration plan with an explicit maintenance window. That is the exception, not the default: most schema and contract changes can be expressed as expand and contract if you're willing to take more, smaller steps.

## Key Pitfalls

### 1. "We skipped the backfill and just changed the read path"

Reads that assume the new column is populated will fail or return nulls for any row that predates the change. Backfill before cutting over reads, not after.

### 2. "We dropped the old column right after the dual-write phase"

The contract phase must wait until every writer and every reader has confirmed to use the new shape only. Removing the old column while any code, including code outside your immediate deploy, still references it turns a safe migration into an outage.

### 3. "We coordinated the four phases into one deployment"

Collapsing the phases back into a single deployment defeats the purpose. Each phase exists so it can be deployed, verified, and rolled back independently.

## Measuring Success

| Metric | Target | Why It Matters |
|--------|--------|----------------|
| Deployments per contract change | Four independent, small deployments | Confirms the migration stayed incremental |
| Downtime during migration | Zero | Confirms no phase required a maintenance window |
| Time from expand to contract | Weeks, bounded by an agreed deadline | Confirms the old shape doesn't linger indefinitely |
| Consumers still on the old shape at contract time | Zero | Confirms the contract phase is actually safe to run |

## Next Step

Return to [Evolutionary Coding Techniques]({{< relref "/docs/foundations/evolutionary-coding" >}}) to see when a broader [strangler fig]({{< relref "/docs/optimize/architecture-decoupling#strategy-2-strangler-fig-pattern" >}}) migration, or a [feature flag]({{< relref "/docs/optimize/feature-flags" >}}) for business release timing, is the more appropriate tool.

## Related Content

- [Evolutionary Coding Techniques]({{< relref "/docs/foundations/evolutionary-coding" >}}) - the full decision hierarchy
- [Branch by Abstraction]({{< relref "/docs/foundations/evolutionary-coding/branch-by-abstraction" >}}) - the equivalent technique for implementations with no shared contract
- [TBD Migration Guide]({{< relref "/docs/foundations/trunk-based-development/tbd-migration#scenario-2-database-schema-change" >}}) - a full worked scenario of expand and contract on a database schema
- [Application Configuration]({{< relref "/docs/pipeline/application-config" >}}) - keeping environment-specific values out of the artifacts this pattern deploys
- [Rollback]({{< relref "/docs/pipeline/rollback" >}}) - why each phase of expand and contract must be independently reversible
