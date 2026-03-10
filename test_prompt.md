# Update CD Testing Page

Review and update `content/en/docs/testing/_index.md` to correct and clarify the following:

## 1. Sort the testing matrix by determinism and highlight blocking tests

The testing matrix (line ~104) should be sorted so all deterministic tests appear first, then non-deterministic. Within each group, maintain the current speed ordering.

Tests that block production ("Blocks Deploy?" = Yes) need a more visible indicator than just the text "Yes". Use a warning icon shortcode.

## 2. Clarify what "acceptance test" means in CD

In CD, an acceptance test is not a single type of test. It is any test that runs after CI to validate that an artifact
is deliverable. The testing matrix and test architecture table should reflect this: acceptance testing is a pipeline
stage that can include component tests, load tests, chaos tests, resilience tests, and compliance tests. Make sure the
page communicates that the matrix is not meant to be a comprehensive list of all test types, but examples of how common
tests impact pipeline design decisions and how teams should structure their test suites. Refer to
`docs/reference/pipeline-reference-architecture/` for a more comprehensive list.

## 3. Highlight the post-merge failure rule

The sentence "If a post-merge failure occurs, the team fixes it immediately - trunk must always be releasable." (line ~98) needs to be visually highlighted. Use a blockquote, callout, or admonition to make it stand out as a critical rule, not just another sentence in a paragraph.

## 4. Emphasize that test changes must ship with code changes

Add or strengthen content making clear that test changes must be delivered concurrently with the production code they
validate. If tests are not updated alongside the code, the pipeline cannot fulfill its job of proving an artifact is
worthy of delivery. Without concurrent test changes, there is no CD pipeline - just a CI pipeline with a deploy step.
This needs to be part of the introduction.

## 5. Define regression testing

Add a clear definition: in CD, "regression testing" means re-running all previous tests against the current artifact. It is not a separate test type or a special suite. Every test in the pipeline is a regression test because it confirms that existing behavior still works after a change. Place this definition where it fits naturally - either in the "Pre-merge vs post-merge" section (since the post-merge re-run is the canonical regression test run) or as its own short subsection.

## Rules

- Follow all content style rules in CLAUDE.md (no endashes, no emdashes, no emojis, CD = continuous delivery).
- Validate the final page for prohibited characters before finishing.
- Do not add pages or change file structure - all changes go in `_index.md`.
- Validate internal consistency of terms, diagrams, and test types.
