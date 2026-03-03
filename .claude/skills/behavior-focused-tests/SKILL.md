---
name: behavior-focused-tests
description: Review tests to ensure they validate behavior and outcomes rather than implementation details, making them more maintainable and resilient to refactoring
---

# Behavior-Focused Test Review

Role: worker. This skill reviews test files and produces actionable
recommendations. It does not modify files.

Review tests to ensure they follow behavior-driven principles and remain implementation agnostic.

## Constraints

1. **Read-only.** Do not modify test files. Report findings only.
2. **Be concise.** A few high-impact findings beat an exhaustive list.
3. **Follow the output format.** Use the structured format below for every review.

## Core Principles

**Test WHAT, not HOW:**
- Tests should verify outcomes and behavior
- Tests should not depend on internal implementation details
- Tests should survive refactoring when behavior remains unchanged

## Review Checklist

When reviewing test code, check for these anti-patterns:

### 1. **Testing Private/Internal Implementation**
❌ Bad: Testing private methods, internal state, or implementation details
✅ Good: Testing public API and observable behavior

### 2. **Over-Mocking**
❌ Bad: Mocking everything, verifying mock call counts/arguments
✅ Good: Mock external dependencies only, assert on outcomes

### 3. **Brittle Selectors/Identifiers**
❌ Bad: CSS class names, DOM structure, internal IDs
✅ Good: Semantic attributes (data-testid, aria-labels), user-facing text

### 4. **Testing Framework Internals**
❌ Bad: Testing component lifecycle, framework-specific details
✅ Good: Testing user-visible behavior and state changes

### 5. **Coupling to Code Structure**
❌ Bad: Tests that break when code is reorganized but behavior unchanged
✅ Good: Tests that describe requirements and expected behavior

## Review Process

1. **Identify the Test Subject**: What is being tested?

2. **Analyze Test Dependencies**:
   - What does the test import/require?
   - What is being mocked?
   - Are mocks necessary or could real implementations work?

3. **Check Assertions**:
   - Do assertions verify outcomes or implementation?
   - Are we asserting "that X happened" or "how X happened"?
   - Could this assertion pass with different implementation?

4. **Evaluate Brittleness**:
   - Would refactoring break this test?
   - Does the test know too much about internals?
   - Is it testing through the public interface?

5. **Provide Specific Feedback**:
   - Point to exact lines with issues
   - Explain why it's implementation-focused
   - Suggest behavior-focused alternatives
   - Show concrete refactored examples

## Examples

### Example 1: Over-Mocking

❌ **Implementation-Focused:**
```javascript
test('getUserData calls API with correct params', () => {
  const mockFetch = jest.fn();
  getUserData(mockFetch, 123);
  expect(mockFetch).toHaveBeenCalledWith('/api/users/123');
});
```

✅ **Behavior-Focused:**
```javascript
test('getUserData returns user information', async () => {
  const userData = await getUserData(123);
  expect(userData).toMatchObject({
    id: 123,
    name: expect.any(String),
    email: expect.any(String)
  });
});
```

### Example 2: Testing Internal State

❌ **Implementation-Focused:**
```javascript
test('Counter increments internal state', () => {
  const counter = new Counter();
  counter.increment();
  expect(counter._value).toBe(1); // Testing private field
});
```

✅ **Behavior-Focused:**
```javascript
test('Counter displays incremented value', () => {
  const counter = new Counter();
  counter.increment();
  expect(counter.getValue()).toBe(1); // Testing public API
});
```

### Example 3: UI Testing

❌ **Implementation-Focused:**
```javascript
test('button has correct class', () => {
  render(<LoginButton />);
  expect(screen.getByRole('button')).toHaveClass('btn-primary');
});
```

✅ **Behavior-Focused:**
```javascript
test('clicking login button navigates to dashboard', async () => {
  const user = userEvent.setup();
  render(<LoginButton />);
  await user.click(screen.getByRole('button', { name: /login/i }));
  expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
});
```

## Red Flags

Look for these patterns that often indicate implementation coupling:

- Accessing private fields/methods (e.g., `_internal`, `#private`)
- Mocking with call count verification (`toHaveBeenCalledTimes`)
- Testing in terms of "calls X then Y then Z"
- CSS class assertions unrelated to behavior
- Testing framework lifecycle methods
- Relying on code structure (file paths, module structure)
- Snapshot tests of implementation details

## Output Format

For each test file reviewed, provide:

1. **Summary**: Overall assessment of behavior vs implementation focus
2. **Issues Found**: Specific lines with problems
3. **Recommendations**: Concrete suggestions with code examples
4. **Refactored Example**: Show at least one fully refactored test

## Arguments

Accept file paths as arguments. If no arguments are given, ask which files to review.

## Instructions

When this skill is invoked:

1. **Parse arguments.** Use provided file paths or ask user which test file(s) to review.
2. Read the test file(s)
3. Analyze each test case against the checklist
4. Identify implementation-focused patterns
5. Provide detailed, actionable feedback
6. Offer to refactor specific tests
7. Explain the "why" behind each recommendation

Remember: The goal is tests that document requirements and survive refactoring.
