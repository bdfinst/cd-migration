---
title: "Static Analysis"
linkTitle: "Static Analysis"
weight: 6
aliases:
  - /docs/reference/testing/static/
description: >
  Code analysis tools that evaluate non-running code for security vulnerabilities, complexity, and best practice violations.
---

## Definition

Static analysis (also called static testing) evaluates **non-running code** against rules for
known good practices. Unlike other test types that execute code and observe behavior, static
analysis inspects source code, configuration files, and dependency manifests to detect
problems before the code ever runs.

Static analysis serves several key purposes:

- **Catches errors** that would otherwise surface at runtime.
- **Warns of excessive complexity** that degrades the ability to change code safely.
- **Identifies security vulnerabilities** and coding patterns that provide attack vectors.
- **Enforces coding standards** by removing subjective style debates from code reviews.
- **Alerts to dependency issues** such as outdated packages, known CVEs, license
  incompatibilities, or supply-chain compromises.

## When to Use

Static analysis should run **continuously**, at every stage where feedback is possible:

- **In the IDE**: real-time feedback as developers type, via editor plugins and language
  server integrations.
- **On save**: format-on-save and lint-on-save catch issues immediately.
- **Pre-commit**: hooks prevent problematic code from entering version control.
- **In [CI]({{< relref "/docs/reference/glossary#ci-continuous-integration" >}})**: the full suite of static checks runs on every PR and on the trunk after merge,
  verifying that earlier local checks were not bypassed.

Static analysis is always applicable. Every project, regardless of language or platform,
benefits from linting, formatting, and dependency scanning.

## Characteristics

| Property        | Value                                         |
|-----------------|-----------------------------------------------|
| **Speed**       | Seconds (typically the fastest test category) |
| **Determinism** | Always deterministic                          |
| **Scope**       | Entire codebase (source, config, dependencies)|
| **Dependencies**| None (analyzes code at rest)                  |
| **Network**     | None (except dependency scanners)             |
| **Database**    | None                                          |
| **Breaks build**| Yes                                           |

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
| **Linting**             | Catches common errors and enforces best practices            |
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

## Anti-Patterns

- **Disabling rules instead of fixing code**: suppressing linter warnings or ignoring
  security findings erodes the value of static analysis over time.
- **Not customizing rules**: default rulesets are a starting point. Write custom rules for
  patterns that come up repeatedly in code reviews.
- **Running static analysis only in CI**: by the time CI reports a formatting error, the
  developer has context-switched. IDE plugins and pre-commit hooks provide immediate feedback.
- **Ignoring dependency vulnerabilities**: known CVEs in dependencies are a direct attack
  vector. Treat high-severity findings as build-breaking.
- **Treating static analysis as optional**: static checks should be mandatory and enforced.
  If developers can bypass them, they will.

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

Because static analysis requires no running code, no test environment, and no external
dependencies, it is the cheapest and fastest form of quality verification. A mature CD
pipeline treats static analysis failures the same as test failures: they break the build.
