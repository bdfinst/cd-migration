---
title: "Static Analysis"
linkTitle: "Static Analysis"
weight: 6
description: >
  Code analysis tools that evaluate non-running code for security vulnerabilities, complexity, and best practice violations.
---

{{% pageinfo %}}
Adapted from [Dojo Consortium](https://dojoconsortium.org)
{{% /pageinfo %}}

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
- **In CI**: the full suite of static checks runs on every PR and on the trunk after merge,
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

```json
{
  "rules": {
    "jest/no-disabled-tests": "warn",
    "jest/expect-expect": "error",
    "jest/no-commented-out-tests": "error",
    "jest/valid-expect": "error",
    "no-unused-vars": "error",
    "no-console": "warn"
  }
}
```

### Type Checking

TypeScript catches type mismatches at compile time, eliminating entire classes of runtime
errors:

```typescript
function calculateTotal(price: number, quantity: number): number {
  return price * quantity;
}

// Static analysis error: Argument of type 'string' is not assignable
// to parameter of type 'number'.
calculateTotal("19.99", 3);
```

### Dependency Scanning

Tools like `npm audit`, Snyk, or Dependabot scan for known vulnerabilities:

```bash
$ npm audit
found 2 vulnerabilities (1 moderate, 1 high)
  moderate: Prototype Pollution in lodash < 4.17.21
  high:     Remote Code Execution in log4j < 2.17.1
```

### Types of Static Analysis

| Type                    | Purpose                                                      |
|-------------------------|--------------------------------------------------------------|
| **Linting**             | Catches common errors and enforces best practices            |
| **Formatting**          | Enforces consistent code style, removing subjective debates  |
| **Complexity analysis** | Flags overly deep or long code blocks that breed defects     |
| **Type checking**       | Prevents type-related bugs, replacing some unit tests        |
| **Security scanning**   | Detects known vulnerabilities and dangerous coding patterns  |
| **Dependency scanning** | Checks for outdated, hijacked, or insecurely licensed deps   |

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

Static analysis is the **first gate** in the CD pipeline, providing the fastest feedback:

1. **IDE / local development**: plugins run in real time as code is written.
2. **Pre-commit**: hooks run linters and formatters, blocking commits that violate rules.
3. **PR verification**: CI runs the full static analysis suite (linting, type checking,
   security scanning, dependency auditing) and blocks merge on failure.
4. **Trunk verification**: the same checks re-run on the merged HEAD to catch anything
   missed.
5. **Scheduled scans**: dependency and security scanners run on a schedule to catch newly
   disclosed vulnerabilities in existing dependencies.

Because static analysis requires no running code, no test environment, and no external
dependencies, it is the cheapest and fastest form of quality verification. A mature CD
pipeline treats static analysis failures the same as test failures: they break the build.

---

> This content is adapted from the [Dojo Consortium](https://dojoconsortium.org),
> licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
