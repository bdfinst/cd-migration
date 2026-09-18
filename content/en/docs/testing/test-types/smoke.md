---
title: "Smoke Tests"
linkTitle: "Smoke Tests"
weight: 8
description: A lightweight, automated verification run executed immediately after code is deployed
---

## Definition

A lightweight, automated verification run executed immediately after code is deployed to a live target environment (staging, pre-production, or production) to verify that the environment is healthy, operational, and capable of handling traffic before fully shifting user load.

## Scope & Boundaries

Strictly limited to high-level system vitality. It checks that critical infrastructure components (processes, routing, database connectivity, secret access, core endpoints) are alive and reachable. It explicitly avoids deep workflow testing, exhaustive edge-case permutations, or long-running operational flows.

## Core Characteristics

Fast (seconds to 2–3 minutes max), strictly non-destructive/read-only, high criticality, and directly tied to deployment orchestration (triggers immediate automated rollback or stops traffic migration if it fails).

## Examples

{{< card code=true header="**Python API Smoke Test Script**" lang="javascript" >}}
import requests
import sys

BASE_URL = "https://checkout.internal.net"

def run_smoke():
    # 1. Deep health check (probes DB connection, cache, and queue availability)
    health = requests.get(f"{BASE_URL}/healthz/ready", timeout=5)
    assert health.status_code == 200, f"Health check failed: {health.text}"
    assert health.json().get("database") == "UP"

    # 2. Key static config / version check
    version = requests.get(f"{BASE_URL}/version", timeout=3)
    assert version.status_code == 200
    assert version.json().get("commit_sha") == sys.argv[1]

    # 3. Non-destructive read query against a core endpoint
    catalog = requests.get(f"{BASE_URL}/api/v1/products/featured", timeout=5)
    assert catalog.status_code == 200
    assert len(catalog.json()) > 0

if __name__ == "__main__":
    run_smoke()

{{< /card >}}

A Java sociable unit test exercising real domain logic through its public interface. The
collaborators (the pricing policy and the order model) are real objects, not mocks, and the test
asserts on the observable outcome - the computed total - rather than on which methods were called:

{{< card code=true header="**Java sociable unit test for a bulk-discount pricing rule**" lang="java" >}}
@Test
public void appliesBulkDiscountWhenQuantityReachesThreshold() {
    // Arrange: real collaborators, no test doubles - this is pure in-process logic
    PricingPolicy pricing = new PricingPolicy(
        bulkThreshold(10), bulkDiscountRate(0.15));
    Order order = new Order(new LineItem("widget", money("20.00"), quantity(12)));

    // Act
    Money total = pricing.totalFor(order);

    // Assert: the observable result, not the sequence of internal calls
    // 12 * 20.00 = 240.00, less 15% = 204.00
    assertEquals(money("204.00"), total);
}

@Test
public void chargesFullPriceBelowTheThreshold() {
    PricingPolicy pricing = new PricingPolicy(
        bulkThreshold(10), bulkDiscountRate(0.15));
    Order order = new Order(new LineItem("widget", money("20.00"), quantity(9)));

    assertEquals(money("180.00"), pricing.totalFor(order));
}
{{< /card >}}

Good Practices
-	Design for idempotency and read-only behavior: Keep smoke tests non-destructive so they can run safely against live production environments without corrupting customer data, charging credit cards, or sending false operational emails.
-	Target deep health endpoints: Use application endpoints that actively verify connectivity to backend resources (database reads, Redis caches, downstream dependency reachability) rather than shallow /ping endpoints that only return 200 OK from the web server process.
-	Automate immediate rollback gates: Tie smoke test outcomes directly into your CD pipeline (e.g., progressive delivery, canary, or blue/green deployments). If the smoke suite fails, the deployment halts and rolls back automatically without human intervention.
-	Verify deployment identity: Assert that the deployed system is serving the exact build artifact, tag, or Git commit hash intended for the deployment to catch caching or orchestration misconfigurations.
Anti-Patterns
-	Mutating real production data: Creating synthetic test users, modifying real records, or generating phantom financial transactions without rigorous isolation or synthetic-data isolation strategies.
-	Bloating into a full regression suite: Packing dozens of detailed integration checks into the smoke run, slowing pipeline execution from seconds into tens of minutes and defeating the purpose of a fast sanity gate.
-	Ignoring downstream read timeouts: Setting long or infinite request timeouts that cause the deployment pipeline to hang indefinitely when an infrastructure route or firewall rule is misconfigured.
-	Running exclusively in staging: Skipping smoke tests in production under the false assumption that passing staging guarantees environment-specific configs, network policies, and IAM roles are correctly wired in production.
Weaknesses & Challenges
-	Coarse-Grained Blind Spots: Smoke tests only verify that the front door is open and core pipes are connected; they cannot catch subtle business regressions, boundary calculation errors, or minor UI rendering glitches.
-	Risk of Production State Side Effects: If write checks are included, synthetic data can leak into operational reports, analytics dashboards, or customer views, requiring custom clean-up routines that are prone to failure.
-	Permissions and Security Boundaries: Probing internal services and operational health endpoints in locked-down production environments often requires elevated network routes or secure service tokens that must be strictly audited and maintained.
-	Handling Transient Startup Latency: Newly launched containers, warm-up caches, or JIT compilation can cause false-positive smoke failures immediately following a rollout if proper readiness probes and retry loops are not configured.

## Connection to CD Pipeline

Smoke tests are run after every deploy to validate the deploy. They are also used to trigger auto-rollback in the pipeline if they don't pass.
