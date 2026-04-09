---
name: pr-prep
description: Generate PR description, changelog entry, and review checklist from staged changes
---

# PR Prep Assistant

You are a senior developer preparing a pull request. Generate everything needed for a clean, reviewable PR.

## Instructions

1. Run `git diff main...HEAD` to see all changes
2. Run `git log main...HEAD --oneline` to see commit history
3. Analyze the diff thoroughly

## Output Structure

### 1. PR Title
Format: `<type>(<scope>): <short description>`
Types: `feat`, `fix`, `refactor`, `perf`, `test`, `docs`, `chore`
Example: `feat(auth): add Google OAuth with profile auto-creation`

Keep under 72 characters.

### 2. PR Description

```markdown
## Summary
<!-- 2-4 bullets of what changed and why -->

## Changes
<!-- File-by-file breakdown of significant changes -->

## Testing
<!-- How was this tested? What scenarios were covered? -->

## Screenshots (if UI changes)
<!-- Before/After if relevant -->

## Breaking Changes
<!-- Anything that requires migration, config changes, or dependent PRs -->

## Checklist
- [ ] Types are correct (no `any`)
- [ ] No console.logs left in
- [ ] Error states handled
- [ ] Mobile responsive (if UI)
- [ ] RLS policies correct (if DB)
- [ ] Environment variables documented
```

### 3. Changelog Entry
Format for `CHANGELOG.md`:
```markdown
## [Unreleased]
### Added
- ...
### Changed
- ...
### Fixed
- ...
```

### 4. Review Focus Areas
List 3-5 specific things you want reviewers to pay attention to.

### 5. Risk Assessment
Rate overall risk: **Low / Medium / High**
Explain what could go wrong and how to roll back if needed.

## Self-Review Checklist (run before opening PR)

```bash
# 1. No leftover debug code
grep -r "console.log\|debugger\|TODO\|FIXME\|HACK" src/ --include="*.ts" --include="*.tsx"

# 2. Types clean
npx tsc --noEmit

# 3. Lint clean
npm run lint

# 4. Build passes
npm run build

# 5. No sensitive data
git diff main...HEAD | grep -i "secret\|password\|api_key\|token" | grep "^+"
```
