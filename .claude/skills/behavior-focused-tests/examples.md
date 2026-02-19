# Behavior-Focused Testing Examples

## Quick Reference: Implementation vs Behavior

| Implementation-Focused ❌ | Behavior-Focused ✅ |
|---|---|
| Tests private methods | Tests public API |
| Verifies mock calls | Asserts outcomes |
| Checks CSS classes | Checks user-visible results |
| Tests "how it works" | Tests "what it does" |
| Breaks on refactoring | Survives refactoring |

## Language-Specific Examples

### JavaScript/TypeScript

#### React Component Testing

❌ **Implementation:**
```typescript
test('LoginForm renders with correct state', () => {
  const wrapper = mount(<LoginForm />);
  expect(wrapper.state('isLoading')).toBe(false);
  expect(wrapper.find('input').length).toBe(2);
});
```

✅ **Behavior:**
```typescript
test('user can log in with valid credentials', async () => {
  render(<LoginForm />);
  await userEvent.type(screen.getByLabelText(/username/i), 'john@example.com');
  await userEvent.type(screen.getByLabelText(/password/i), 'password123');
  await userEvent.click(screen.getByRole('button', { name: /log in/i }));

  expect(await screen.findByText(/welcome/i)).toBeInTheDocument();
});
```

#### Service/Business Logic

❌ **Implementation:**
```typescript
test('processOrder calls validatePayment then saveOrder', async () => {
  const validateSpy = jest.spyOn(orderService, 'validatePayment');
  const saveSpy = jest.spyOn(orderService, 'saveOrder');

  await orderService.processOrder(order);

  expect(validateSpy).toHaveBeenCalledBefore(saveSpy);
});
```

✅ **Behavior:**
```typescript
test('processOrder completes successfully with valid payment', async () => {
  const order = { id: '123', amount: 99.99, paymentMethod: 'credit_card' };

  const result = await orderService.processOrder(order);

  expect(result.status).toBe('completed');
  expect(result.orderId).toBeDefined();
});

test('processOrder fails with invalid payment', async () => {
  const order = { id: '123', amount: 99.99, paymentMethod: 'invalid' };

  await expect(orderService.processOrder(order))
    .rejects.toThrow('Payment validation failed');
});
```

### Python

#### Class Testing

❌ **Implementation:**
```python
def test_shopping_cart_internal_state():
    cart = ShoppingCart()
    cart.add_item("apple", 1.99)
    assert len(cart._items) == 1  # Testing private attribute
    assert cart._total == 1.99     # Testing private attribute
```

✅ **Behavior:**
```python
def test_shopping_cart_calculates_total():
    cart = ShoppingCart()
    cart.add_item("apple", 1.99)
    cart.add_item("banana", 0.99)

    assert cart.get_total() == 2.98
    assert cart.get_item_count() == 2
```

#### API Testing

❌ **Implementation:**
```python
def test_api_calls_correct_endpoint(mock_requests):
    client = APIClient()
    client.get_user(123)

    mock_requests.get.assert_called_once_with(
        'https://api.example.com/users/123',
        headers={'Authorization': 'Bearer token'}
    )
```

✅ **Behavior:**
```python
def test_api_returns_user_data():
    client = APIClient()
    user = client.get_user(123)

    assert user['id'] == 123
    assert 'name' in user
    assert 'email' in user

def test_api_handles_user_not_found():
    client = APIClient()

    with pytest.raises(UserNotFoundError):
        client.get_user(99999)
```

### Java

#### Service Testing

❌ **Implementation:**
```java
@Test
void testUserServiceCallsRepository() {
    UserRepository mockRepo = mock(UserRepository.class);
    UserService service = new UserService(mockRepo);

    service.createUser("John", "john@example.com");

    verify(mockRepo, times(1)).save(any(User.class));
}
```

✅ **Behavior:**
```java
@Test
void testCreateUserReturnsUserWithId() {
    UserService service = new UserService(userRepository);

    User user = service.createUser("John", "john@example.com");

    assertNotNull(user.getId());
    assertEquals("John", user.getName());
    assertEquals("john@example.com", user.getEmail());
}

@Test
void testCreateUserThrowsExceptionForDuplicateEmail() {
    UserService service = new UserService(userRepository);
    service.createUser("John", "john@example.com");

    assertThrows(DuplicateEmailException.class, () -> {
        service.createUser("Jane", "john@example.com");
    });
}
```

## Common Anti-Patterns and Fixes

### Anti-Pattern 1: Testing Framework Internals

❌ **Wrong:**
```typescript
test('component lifecycle', () => {
  const wrapper = shallow(<MyComponent />);
  expect(wrapper.instance().componentDidMount).toHaveBeenCalled();
});
```

✅ **Right:**
```typescript
test('component loads data on mount', async () => {
  render(<MyComponent />);
  expect(await screen.findByText(/data loaded/i)).toBeInTheDocument();
});
```

### Anti-Pattern 2: Snapshot Testing Implementation Details

❌ **Wrong:**
```typescript
test('component structure', () => {
  const { container } = render(<UserCard user={user} />);
  expect(container.firstChild).toMatchSnapshot();
});
```

✅ **Right:**
```typescript
test('displays user information', () => {
  render(<UserCard user={user} />);
  expect(screen.getByText(user.name)).toBeInTheDocument();
  expect(screen.getByText(user.email)).toBeInTheDocument();
  expect(screen.getByRole('img', { name: user.name })).toHaveAttribute('src', user.avatar);
});
```

### Anti-Pattern 3: Testing Property Assignment

❌ **Wrong:**
```python
def test_user_sets_properties():
    user = User()
    user.set_name("John")
    user.set_email("john@example.com")

    assert user.name == "John"
    assert user.email == "john@example.com"
```

✅ **Right:**
```python
def test_user_validates_before_save():
    user = User()
    user.set_name("John")
    user.set_email("invalid-email")

    with pytest.raises(ValidationError):
        user.save()

def test_user_saves_successfully_with_valid_data():
    user = User()
    user.set_name("John")
    user.set_email("john@example.com")

    user_id = user.save()
    assert user_id is not None
```

## Decision Framework

Ask these questions when writing tests:

1. **Can I refactor the implementation without changing this test?**
   - Yes → Behavior-focused ✅
   - No → Implementation-focused ❌

2. **Does this test describe a requirement or use case?**
   - Yes → Behavior-focused ✅
   - No → Implementation-focused ❌

3. **Would a non-programmer understand what this test verifies?**
   - Yes → Behavior-focused ✅
   - No → Implementation-focused ❌

4. **Am I testing through the public interface?**
   - Yes → Behavior-focused ✅
   - No → Implementation-focused ❌

5. **Would this test still pass if I used a different library/approach?**
   - Yes → Behavior-focused ✅
   - No → Implementation-focused ❌
