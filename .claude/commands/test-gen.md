---
name: test-gen
description: Generate comprehensive tests — unit, integration, and E2E
---

# Test Generator

You are a testing expert. Generate tests that catch real bugs, not tests that just achieve coverage metrics.

## Test Stack for this Project
- **Unit/Integration**: Vitest + React Testing Library
- **E2E**: Playwright
- **API**: Vitest with mock Supabase client

## Test Writing Principles

1. **Test behavior, not implementation** — don't test internal state, test what users/callers see
2. **Arrange-Act-Assert** — clear setup, single action, explicit assertion
3. **One assertion per test** (or closely related assertions)
4. **Descriptive names**: `it('shows error message when email is invalid')` not `it('works')`
5. **Test the unhappy path** — empty states, errors, edge cases matter more than the happy path

## What to Generate

Given a file or feature, generate:

### Unit Tests (functions/hooks)
```typescript
import { describe, it, expect, vi } from 'vitest'
import { functionUnderTest } from './module'

describe('functionUnderTest', () => {
  it('returns X when given Y', () => {
    // Arrange
    const input = ...
    // Act  
    const result = functionUnderTest(input)
    // Assert
    expect(result).toBe(...)
  })

  it('throws when input is invalid', () => {
    expect(() => functionUnderTest(null)).toThrow('expected error message')
  })
})
```

### Component Tests
```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('ComponentName', () => {
  it('renders label and input', () => {
    render(<ComponentName label="Email" />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('calls onSubmit with form data when submitted', async () => {
    const onSubmit = vi.fn()
    render(<ComponentName onSubmit={onSubmit} />)
    await userEvent.type(screen.getByLabelText('Email'), 'test@example.com')
    await userEvent.click(screen.getByRole('button', { name: /submit/i }))
    expect(onSubmit).toHaveBeenCalledWith({ email: 'test@example.com' })
  })

  it('shows validation error when email is empty', async () => {
    render(<ComponentName />)
    await userEvent.click(screen.getByRole('button', { name: /submit/i }))
    expect(screen.getByText(/email is required/i)).toBeInTheDocument()
  })
})
```

### Server Action Tests
```typescript
import { vi } from 'vitest'

vi.mock('@/lib/supabase', () => ({
  createAdminSupabase: vi.fn(() => ({
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockResolvedValue({ data: [...], error: null })
  }))
}))
```

### E2E Tests (Playwright)
```typescript
import { test, expect } from '@playwright/test'

test('user can log in and see dashboard', async ({ page }) => {
  await page.goto('/login')
  await page.fill('[name="email"]', 'test@example.com')
  await page.fill('[name="password"]', 'password123')
  await page.click('button[type="submit"]')
  await expect(page).toHaveURL('/dashboard')
  await expect(page.getByText('Welcome back')).toBeVisible()
})
```

## Instructions

1. Read the file the user specifies
2. Identify: pure functions, hooks, components, server actions, API routes
3. For each, generate tests covering: happy path, error cases, edge cases
4. Include setup/teardown if needed (database seeding, mocks)
5. Output ready-to-run test files with correct import paths
