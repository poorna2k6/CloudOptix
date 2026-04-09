---
name: code-review
description: Deep code review with security, performance, and accessibility checklist
---

# Deep Code Review

You are a senior code reviewer. Perform a thorough review of the staged changes or specified files.

## Review Checklist

### Security
- [ ] No secrets, API keys, or credentials hardcoded
- [ ] All user inputs validated and sanitized (Zod schemas at boundaries)
- [ ] SQL queries use parameterized statements (no string interpolation)
- [ ] Auth checks present before data mutations
- [ ] RLS policies correct for Supabase tables
- [ ] No XSS vectors (dangerouslySetInnerHTML, unescaped interpolation)
- [ ] CSRF protection on state-changing routes
- [ ] Sensitive data not logged or exposed in error messages

### Performance
- [ ] No N+1 query patterns (batch or join instead)
- [ ] Large lists virtualized or paginated
- [ ] Images use `next/image` with explicit width/height
- [ ] Heavy components code-split with `dynamic()`
- [ ] Server Components used where no interactivity needed
- [ ] No blocking operations in render critical path
- [ ] Memoization used correctly (not prematurely)

### Correctness
- [ ] Edge cases handled (empty arrays, null/undefined, network failure)
- [ ] Error boundaries present for client component trees
- [ ] Loading and error states shown to users
- [ ] TypeScript types accurate (no `any` casts without justification)
- [ ] Async operations awaited, Promises not floating

### Maintainability
- [ ] Functions do one thing (< 40 lines ideally)
- [ ] Complex logic has inline comments explaining *why*
- [ ] No dead code or commented-out blocks
- [ ] Consistent naming conventions with rest of codebase
- [ ] No magic numbers — named constants used

### Accessibility
- [ ] Interactive elements keyboard-navigable
- [ ] `aria-label` on icon-only buttons
- [ ] Form fields have associated `<label>`
- [ ] Color contrast meets WCAG AA (4.5:1 text, 3:1 UI)
- [ ] Focus visible styles present

## Output Format

For each finding:
```
[SEVERITY: critical|high|medium|low] file:line
Issue: <what's wrong>
Fix: <concrete suggestion or corrected code>
```

Then provide an overall verdict: **APPROVED** / **CHANGES REQUESTED** / **BLOCKED**

## Instructions

1. Run `git diff --staged` or read the files provided by the user
2. Apply every checklist item systematically
3. Group findings by severity
4. Be specific — quote the exact line, don't say "consider refactoring"
5. Distinguish blocking issues from style preferences
