---
title: "Untestable Architecture"
linkTitle: "Untestable Architecture"
weight: 24
category: "Architecture"
risk_level: critical
description: >
  Tightly coupled code with no dependency injection or seams makes writing tests require major
  refactoring first.
tags:
  - architecture
  - test-strategy
---

{{% pageinfo %}}
**Category:** {{< param category >}} | {{% risk-indicator level="critical" %}}
{{% /pageinfo %}}

## What This Looks Like

A developer wants to write a unit test for a business rule in the order processing module. They open
the class and find that it instantiates a database connection directly in the constructor, calls an
external payment service with a hardcoded URL, and writes to a global logger that connects to
a cloud logging service. There is no way to run this class in a test without a database, a payment
sandbox account, and a live logging endpoint. Writing a test for the 10-line discount calculation
buried inside this class requires either setting up all of that infrastructure or doing major
surgery on the code first.

The team has tried. Some tests exist, but they are integration tests that depend on a shared test
database. When the database is unavailable, the tests fail. When two developers run the suite
simultaneously, tests interfere with each other. The suite is slow - 40 minutes for a full run -
because every test touches real infrastructure. Developers have learned to run only the tests
related to their specific change, because running the full suite is impractical. That selection is
also unreliable, because they cannot know which tests cover the code they are changing.

Common variations:

- **Constructor-injected globals.** Classes that call `new DatabaseConnection()`, `new
  HttpClient()`, or `new Logger()` inside constructors or methods. There is no way to substitute a
  test double without modifying the production code.
- **Static method chains.** Business logic that calls static utility methods, which call other
  static methods, which eventually call external services. Static calls cannot be intercepted or
  mocked without bytecode manipulation.
- **Hardcoded external dependencies.** Service URLs, API keys, and connection strings baked into
  source code rather than injected as configuration. The code is not just untestable - it is also
  not configurable across environments.
- **God classes with mixed concerns.** A class that handles HTTP request parsing, business
  logic, database writes, and email sending in the same methods. You cannot test the business logic
  without triggering all the other concerns.
- **Framework entanglement.** Business logic written directly inside framework callbacks or
  lifecycle hooks - a Rails `before_action`, a Spring `@Scheduled` method, a serverless function
  handler - with no extraction into a callable function or class.

The telltale sign: when a developer asks "how do I write a test for this?" and the honest answer
is "you would have to refactor it first."

## Why This Is a Problem

Untestable architecture does not just make tests hard to write. It is a symptom that business logic
is entangled with infrastructure, which makes every change harder and every defect costlier.

### It reduces quality

A bug caught in a 30-second unit test costs minutes to fix. The same bug caught in production costs hours of debugging, a support incident, and a postmortem. Untestable code shifts that cost toward production. When code cannot be tested in isolation, the only way to verify behavior is end-to-end. End-to-end
tests run slowly, are sensitive to environmental conditions, and often cannot cover all the
branches and edge cases in business logic. A developer who cannot write a fast, isolated test for
a discount calculation instead relies on deploying to a staging environment and manually walking
through a checkout. This is slow, incomplete, and rarely catches all the edge cases.

The quality impact compounds over time. Without a fast test suite, developers do not run tests
frequently. Without frequent test runs, bugs survive for longer before being caught. The further a
bug travels from the code that caused it, the more expensive it is to diagnose and fix.

In testable code, dependencies are injected. The payment service is an interface. The database
connection is passed in. A test can substitute a fast, predictable in-memory double for every
external dependency. The business logic runs in milliseconds, covers every branch, and gives
immediate feedback every time the code is changed.

### It increases rework

A developer who cannot safely verify a change ships it and hopes. Bugs discovered later require returning to code the developer thought was done - often days or weeks after the context is gone. When a developer needs to
modify behavior in a class that has no tests and cannot easily be tested, they make the change and
then verify it by running the application manually or relying on end-to-end tests. They cannot be
confident that the change did not break a code path they did not exercise.

Refactoring untestable code is doubly expensive. To refactor safely, you need tests. To write
tests, you need to refactor. Teams caught in this loop often choose not to refactor at all, because
both paths carry high risk. Complexity accumulates. Workarounds are added rather than fixing
the underlying structure. The codebase grows harder to change with every feature added.

When dependencies are injected, refactoring is safe. Write the tests first, or write them alongside
the refactor, or write them immediately after. Either way, the ability to substitute doubles means
the refactor can be verified quickly and cheaply.

### It makes delivery timelines unpredictable

A three-day estimate becomes seven when the module turns out to have no tests and deep coupling to external services. That hidden cost is structural, not exceptional. Every change carries
unknown risk. The response is more process: more manual QA cycles, more sign-off steps, more
careful coordination before releases. All of that process adds time, and the amount of time added
is unpredictable because it depends on how many issues the manual process finds.

Testable code makes delivery predictable. The test suite tells you quickly whether a change is
safe. Estimates can be more reliable because the cost of a change is proportional to its size, not
to the hidden coupling in the code.

### Impact on continuous delivery

[Continuous delivery](../../glossary/#cd-continuous-delivery) depends on a fast, reliable automated test suite. Without that suite, the
[pipeline](../../glossary/#pipeline) cannot provide the safety signal that makes frequent deployment safe. If tests cannot run
in isolation, the pipeline either skips them (dangerous) or depends on heavyweight infrastructure
(slow and fragile). Either outcome makes continuous delivery impractical.

CD pipelines are designed to provide feedback in minutes, not hours. A test suite that requires a
live database, external APIs, and environmental setup to run is incompatible with that requirement.
The pipeline becomes the bottleneck that limits [deployment frequency](../../glossary/#deployment-frequency), rather than the automation
that enables it. Teams cannot confidently deploy multiple times per day when every test run requires
30 minutes and a set of live external services.

Untestable architecture is often the root cause when teams say "we can't go faster - we need more
QA time." The real [constraint](../../glossary/#constraint) is not QA capacity. It is the absence of a test suite that can verify
changes quickly and automatically.

## How to Fix It

Making an untestable codebase testable is an incremental process. The goal is not to rewrite
everything before writing the first test. The goal is to create seams - places where test doubles
can be inserted - module by module, as code is touched.

### Step 1: Identify the most-changed untestable code (Week 1)

Do not try to fix the entire codebase. Start where the pain is highest.

1. Use version control history to identify the files changed most frequently in the last six months.
   High-change files with no test coverage are the highest priority.
2. For each high-change file, answer: can I write a test for the core business logic without a
   running database or external service? If the answer is no, it is a candidate.
3. Rank candidates by frequency of change and business criticality. The goal is to find the code
   where test coverage will prevent the most real bugs.

Document the list. It is your refactoring backlog. Treat each item as a first-class task, not
something that happens "when we have time."

### Step 2: Introduce dependency injection at the seam (Weeks 2-3)

For each candidate class, apply the simplest refactor that creates a testable seam without
changing behavior.

In Java:

{{% code-collapse title="OrderService before and after dependency injection (Java)" lang="java" %}}
// Before: untestable - constructs dependency internally
public class OrderService {
    public void processOrder(Order order) {
        DatabaseConnection db = new DatabaseConnection();
        PaymentGateway pg = new PaymentGateway("https://payments.example.com");
        // business logic
    }
}

// After: testable - dependencies injected
public class OrderService {
    private final OrderRepository repository;
    private final PaymentGateway paymentGateway;

    public OrderService(OrderRepository repository, PaymentGateway paymentGateway) {
        this.repository = repository;
        this.paymentGateway = paymentGateway;
    }
}
{{% /code-collapse %}}

In JavaScript:

{{% code-collapse title="processOrder before and after dependency injection (JavaScript)" lang="javascript" %}}
// Before: untestable
function processOrder(order) {
  const db = new DatabaseConnection();
  const pg = new PaymentGateway(process.env.PAYMENT_URL);
  // business logic
}

// After: testable
function processOrder(order, { repository, paymentGateway }) {
  // business logic using injected dependencies
}
{{% /code-collapse %}}

The interface or abstraction is the key. Production code passes real implementations. Tests pass
fast, in-memory doubles that return predictable results.

### Step 3: Write the tests that are now possible (Weeks 2-3)

Immediately after creating a seam, write tests for the business logic that is now accessible.
Do not defer this step.

1. Write one test for the happy path.
2. Write tests for the main error conditions.
3. Write tests for the edge cases and branches that are hard to exercise end-to-end.

Use fast doubles - in-memory fakes or simple stubs - for every external dependency. The tests
should run in milliseconds without any network or database access. If a test requires more than
a second to run, something is still coupling it to real infrastructure.

### Step 4: Extract business logic from framework boundaries (Weeks 3-5)

Framework entanglement requires a different approach. The fix is extraction: move business logic
out of framework callbacks and into plain functions or classes that can be called from anywhere,
including tests.

A serverless handler that does everything:

{{% code-collapse title="Extracting business logic from a serverless handler (JavaScript)" lang="javascript" %}}
// Before: untestable
exports.handler = async (event) => {
  const db = new Database();
  const order = await db.getOrder(event.orderId);
  const discount = order.total > 100 ? order.total * 0.1 : 0;
  await db.updateOrder({ ...order, discount });
  return { statusCode: 200 };
};

// After: business logic is testable independently
function calculateDiscount(orderTotal) {
  return orderTotal > 100 ? orderTotal * 0.1 : 0;
}

exports.handler = async (event, { db } = { db: new Database() }) => {
  const order = await db.getOrder(event.orderId);
  const discount = calculateDiscount(order.total);
  await db.updateOrder({ ...order, discount });
  return { statusCode: 200 };
};
{{% /code-collapse %}}

The `calculateDiscount` function is now testable in complete isolation. The handler is thin and can
be tested with a mock database.

### Step 5: Add the linting and architectural rules that prevent backsliding (Week 4+)

Once a module is testable, add controls that prevent it from becoming untestable again.

1. Add a coverage threshold for testable modules. If coverage drops below the threshold, the build
   fails.
2. Add an architectural fitness function - a test or lint rule that verifies no direct
   infrastructure instantiation appears in business logic classes.
3. In code review, treat "this code is not testable" as a blocking issue, not a preference.

Apply the same process to each new module as it is touched. Over time, the proportion of testable
code grows without requiring a big-bang rewrite.

### Step 6: Track and retire the integration test workarounds (Ongoing)

As business logic becomes unit-testable, the integration tests that were previously the only
coverage can be simplified or removed. Integration tests that verify business logic are slow and
brittle - now that the logic has fast unit tests, the integration test can focus on the seam
between components, not the business rules inside each one.

| Objection | Response |
|-----------|----------|
| "Refactoring for testability is risky - we might break things" | The refactor is a structural change, not a behavior change. Apply it in tiny steps, verify with the application running, and add tests as soon as each seam is created. The risk of not refactoring is ongoing: every untested change is a bet on nothing being broken. |
| "We don't have time to refactor while delivering features" | Apply the refactor as you touch code for feature work. The boy scout rule: leave code more testable than you found it. Over six months, the most-changed code becomes testable without a dedicated refactoring project. |
| "Dependency injection adds complexity" | A constructor that accepts interfaces is not complex. The complexity it removes - hidden coupling to external systems, inability to test in isolation, cascading failures from unavailable services - far exceeds the added boilerplate. |
| "Our framework doesn't support dependency injection" | Every mainstream framework supports some form of injection. The extraction technique (move logic into plain functions) works for any framework. The framework boundary becomes a thin shell around testable business logic. |

## Measuring Progress

| Metric | What to look for |
|--------|-----------------|
| Unit test count | Should increase as seams are created; more tests without infrastructure dependencies |
| [Build duration](../../../metrics/build-duration/) | Should decrease as infrastructure-dependent tests are replaced with fast unit tests |
| Test suite pass rate | Should increase as flaky infrastructure-dependent tests are replaced with deterministic doubles |
| [Change fail rate](../../../metrics/change-fail-rate/) | Should decrease as test coverage catches regressions before deployment |
| [Development cycle time](../../../metrics/development-cycle-time/) | Should decrease as developers get faster feedback from the test suite |
| Files with test coverage | Should increase as refactoring progresses; track by module |

## Related Content

- [Testing Fundamentals](../../../migrate-to-cd/migration-path/foundations/testing-fundamentals/) - Building the test suite that testable architecture enables
- [Architecture Decoupling](../../../migrate-to-cd/migration-path/optimize/architecture-decoupling/) - Module boundaries that make injection points natural
- [Build Automation](../../../migrate-to-cd/migration-path/foundations/build-automation/) - Integrating the test suite into every build
- [Identify Constraints](../../../migrate-to-cd/migration-path/assess/identify-constraints/) - Finding the untestable modules that cause the most pain
- [Deterministic Pipeline](../../../migrate-to-cd/migration-path/pipeline/deterministic-pipeline/) - Why a reliable pipeline requires fast, isolated tests
