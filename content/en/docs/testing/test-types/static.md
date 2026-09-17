---
title: "Static Analysis"
linkTitle: "Static Analysis"
weight: 6
aliases:
  - /docs/reference/testing/static/
  - /docs/testing/static/
description: >
  Code analysis tools that evaluate non-running code for security vulnerabilities, complexity, and best practice violations.
---

## Definition

Static analysis (also called static testing) evaluates non-running code against rules for known good practices, inspecting source, configuration, and [dependency]({{< relref "/docs/reference/glossary#dependency" >}}) manifests to catch errors, complexity, and security issues before the code ever runs.

## Scope & Boundaries

Analysis runs against source code, configuration files, and dependency manifests at rest - no application starts and no [test doubles]({{< relref "/docs/testing/glossary#test-double" >}}) are needed. Scope is the entire codebase, not a single unit, component, or transaction.

## Characteristics

Seconds-scale execution (the fastest test category), fully deterministic, and codebase-wide scope, with no external dependencies except the network calls a dependency scanner makes to a vulnerability database.

## Good Practices

- Run it everywhere feedback is possible: IDE plugins, pre-commit hooks, and CI each catch issues before the next stage makes them more expensive to fix.
- Customize the ruleset: default rules are a starting point; add rules for patterns that keep coming up in code review.
- Enforce it as a gate: treat lint, type, and security findings as build-breaking, the same as a failing test.

## Anti-Patterns

- Disabling rules instead of fixing code: suppressing linter warnings or ignoring security findings erodes the value of static analysis over time.
- Skipping ruleset customization: default rules are a starting point, not a ceiling, for patterns specific to the codebase.
- Running static analysis only in CI: by the time CI reports a formatting error, the developer has context-switched; IDE and pre-commit feedback catch it sooner.
- Ignoring dependency vulnerabilities: known CVEs in dependencies are a direct attack vector and should break the build.
- Treating static analysis as optional: if developers can bypass the checks, they will.

## When to Run It

- **In the IDE**: real-time feedback as developers type, via editor plugins and language
  server integrations.
- **On save**: format-on-save and lint-on-save catch issues immediately.
- **Pre-commit**: hooks prevent problematic code from entering version control.
- **In [CI]({{< relref "/docs/reference/glossary#ci-continuous-integration" >}})**: the full suite of static checks runs on every PR and on the trunk after
  merge, verifying that earlier local checks were not bypassed.

Static analysis is always applicable. Every project, regardless of language or platform,
benefits from linting, formatting, and dependency scanning.

## Examples

### Linting

A `.eslintrc.json` configuration enforcing test quality rules:

{{< card code=true header="**Linter configuration for test quality rules**" lang="json" >}}
{
  "rules": {
    "no-disabled-tests": "warn",
    "require-assertions": "error",
    "no-commented-out-tests": "error",
    "valid-assertions": "error",
    "no-unused-vars": "error",
    "no-console": "warn"
  }
}
{{< /card >}}

### Type Checking

Statically typed languages catch type mismatches at compile time, eliminating entire classes
of runtime errors. Java, for example, rejects incompatible argument types before the code runs:

{{< card code=true header="**Java type checking example**" lang="java" >}}
public static double calculateTotal(double price, int quantity) {
    return price * quantity;
}

// Compiler error: incompatible types: String cannot be converted to double
calculateTotal("19.99", 3);
{{< /card >}}

### Dependency Scanning

Dependency scanning tools scan for known vulnerabilities:

{{< card code=true header="**npm audit output example**" lang="bash" >}}
$ npm audit
found 2 vulnerabilities (1 moderate, 1 high)
  moderate: Prototype Pollution in lodash < 4.17.21
  high:     Remote Code Execution in log4j < 2.17.1
{{< /card >}}

### Types of Static Analysis

| Type                    | Purpose                                                      |
|-------------------------|--------------------------------------------------------------|
| **Linting**             | Catches common errors and enforces good practices            |
| **Formatting**          | Enforces consistent code style, removing subjective debates  |
| **Complexity analysis** | Flags overly deep or long code blocks that breed defects     |
| **Type checking**       | Prevents type-related bugs, replacing some unit tests        |
| **Security scanning**   | Detects known vulnerabilities and dangerous coding patterns  |
| **Dependency scanning** | Checks for outdated, hijacked, or insecurely licensed deps   |
| **Accessibility linting**| Detects missing alt text, ARIA violations, contrast failures, semantic HTML issues |

### Accessibility Linting

Accessibility linting catches deterministic WCAG violations the same way a security scanner
catches known vulnerability patterns. Automated checks cover structural issues (missing alt
text, invalid ARIA attributes, insufficient contrast ratios, broken heading hierarchy) while
manual review covers subjective aspects like whether alt text is actually meaningful.

Linting is the first of three tiers. For how it fits with component-test DOM scans and manual
audits across the pipeline - and the caveat that automated checks catch only a fraction of WCAG
criteria - see [Accessibility testing]({{< relref "/docs/testing/applied-testing-strategies/cross-cutting-concerns#accessibility-testing" >}}).

An accessibility checker configuration running WCAG 2.1 AA checks against rendered pages:

{{< card code=true header="**Accessibility checker configuration for WCAG 2.1 AA**" lang="json" >}}
{
  "defaults": {
    "standard": "WCAG2AA",
    "timeout": 10000,
    "wait": 1000
  },
  "urls": [
    "http://localhost:1313/docs/",
    "http://localhost:1313/docs/testing/"
  ]
}
{{< /card >}}

An accessibility scanner test asserting that a rendered component has no violations:

{{< card code=true header="**Accessibility scanner test verifying no WCAG violations**" lang="javascript" >}}
// accessibility scanner setup (e.g. import scanner and extend assertions)

it("should have no accessibility violations", async () => {
  const { container } = render(<LoginForm />);
  const results = await accessibilityScanner(container);
  expect(results).toHaveNoViolations();
});
{{< /card >}}

## Connection to CD Pipeline

Static analysis is the **first gate** in the [CD]({{< relref "/docs/reference/glossary#cd-continuous-delivery" >}}) [pipeline]({{< relref "/docs/reference/glossary#pipeline" >}}), providing the fastest feedback:

1. **IDE / local development**: plugins run in real time as code is written.
2. **Pre-commit**: hooks run linters, formatters, and accessibility checks on changed
   components, blocking commits that violate rules.
3. **PR verification**: CI runs the full static analysis suite (linting, type checking,
   security scanning, dependency auditing, accessibility linting) and blocks merge on
   failure.
4. **Trunk verification**: the same checks re-run on the merged HEAD to catch anything
   missed.
5. **Scheduled scans**: dependency and security scanners run on a schedule to catch newly
   disclosed vulnerabilities in existing dependencies.

Because it requires no running code and no [external dependencies]({{< relref "/docs/reference/glossary#external-dependency" >}}), static analysis is the cheapest, fastest gate. A mature CD pipeline treats its failures like any other test failure: they break the build.
