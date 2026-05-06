---
title: "CLI Tool or Library"
linkTitle: "CLI / Library"
weight: 7
description: >
  A binary or package consumed by other developers. The public interface is the CLI invocation surface or the library's exported API. Brief sketch.
---

A binary (CLI) or package (library) consumed by other developers. The "public interface" is the CLI invocation surface (argv, stdin, stdout, stderr, exit code) or the library's exported API.

The pattern is different because the consumer is a developer or another program, not a user clicking a button. Cross-platform behavior, semantic versioning, and backward compatibility matter more than they do for a service.

## What needs covered

| Layer | Concern | Test type |
| --- | --- | --- |
| Pure logic | Functions, classes, parsers | [Solitary unit tests]({{< relref "/docs/testing/glossary#solitary-unit-test" >}}) |
| CLI invocation | Argument parsing, exit codes, output streams | [Component tests]({{< relref "/docs/testing/glossary#component-test" >}}) through the CLI entrypoint |
| Cross-platform | Path separators, line endings, signal handling | [Cross-OS test matrix]({{< relref "/docs/testing/glossary#cross-os-test-matrix" >}}) running the suite on every supported OS in [CI]({{< relref "/docs/reference/glossary#ci-continuous-integration" >}}) |
| Public API surface | Library's exported types and functions | [API surface tests]({{< relref "/docs/testing/glossary#api-surface-test" >}}) (snapshot of the public API; diff fails the build) |
| Documented examples | The README examples actually work | [Doctests]({{< relref "/docs/testing/glossary#doctest" >}}) / executable docs |

{{< inline-svg src="/images/testing/patterns/cli-library-coverage.svg" alt="Layered diagram of a CLI tool or library with five architectural layers. The first four (pure logic and parsing, CLI invocation surface or library API, file system and subprocess adapter, documented README examples) are inside the component boundary. Below the dashed boundary, the real OS, file system, and subprocess are drawn with a dashed border. Solitary unit tests cover pure logic and parsing. Component tests cover invocation through the entrypoint. Adapter integration tests cover the file system and subprocess against the real OS in a temp directory. The API surface diff catches removal or rename of any public symbol. Doctests verify README examples run against the real binary or library. The cross-OS CI matrix runs the suite on every supported OS to catch platform-specific bugs." >}}

## Positive test cases

Common cases to consider, not an exhaustive list. Drop items that don't apply and add ones the pattern doesn't mention but your component needs.

- **Valid arguments**: produce documented stdout output, no stderr, and exit code 0.
- **Pipe-friendly mode**: produces machine-readable output (JSON/NDJSON) when stdout is not a TTY.
- **Library API**: returns documented values for valid input.

## Negative test cases

Common cases to consider, not an exhaustive list. Drop items that don't apply and add ones the pattern doesn't mention but your component needs.

- **Bad arguments**: exit with the documented non-zero code and structured stderr.
- **Help text**: reachable via `--help`.
- **Large input**: does not OOM.
- **Interrupt** (Ctrl-C, SIGTERM): runs cleanup and flushes or rolls back partial output.
- **Invalid arguments to the library**: throws the documented error type.
- **Public symbol removed or renamed**: the API-surface test fails the build.

## Test double validation and pipeline placement

File system doubles validated by integration tests against the real FS in a temp directory. Subprocess doubles validated by tests that actually spawn the subprocess on each supported OS. Doctests validate README examples against the real binary or library on every build.

Unit and component tests run in CI Stage 1 on every supported OS; API surface diff and doctests in CI Stage 1; cross-platform integration tests in CI Stage 2 if slow.
