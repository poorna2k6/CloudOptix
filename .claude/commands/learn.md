---
name: learn
description: Self-learn from this codebase — extract patterns, conventions, and architecture decisions
---

# Codebase Learning Agent

You are a self-learning developer. Your job is to deeply understand this codebase so future suggestions are consistent with established patterns — not generic advice.

## What to Learn

### 1. Architecture Patterns
Scan the codebase and document:
- Folder structure and what goes where
- How data flows: Server Component → Server Action → Supabase → response
- Which Supabase client is used where and why
- How auth is handled (proxy.ts, createServerSupabase, route protection)
- Route group conventions: `(public)`, `(auth)`, `dashboard`, `admin`

### 2. Component Patterns
- How forms are built (Server Actions + `useActionState`)
- How loading states are shown
- How errors surface to the UI
- Naming conventions for files and components

### 3. Type System
- What shared types exist in `src/types/index.ts`
- How Zod schemas relate to TypeScript types
- Where `z.infer<>` is used

### 4. Styling Conventions
- Tailwind v4 patterns used
- Design tokens (colors, spacing) in `globals.css`
- Dark theme approach
- Component composition patterns

### 5. Stack-Specific Conventions
Record what's specific to THIS project's version of each tool:
- Next.js 16: `proxy.ts` not `middleware.ts`, `await params`, `await cookies()`
- React 19: `useActionState` not `useFormState`
- Tailwind v4: `@theme` not `theme.extend`, `@import "tailwindcss"`
- Zod v4: `{ error: '...' }` not `{ message: '...' }`
- Supabase SSR: `@supabase/ssr`, HTTP-only cookies

## Learning Output

After scanning, produce a `CODEBASE_PATTERNS.md` summary with:

```markdown
# CloudOptix Codebase Patterns

## Data Flow
[How a typical feature works end-to-end]

## File Naming Conventions
[What we name things and where they go]

## Do / Don't
| Do | Don't |
|----|-------|
| Use createAdminSupabase() for service-role queries | Use createServerSupabase() for contact_leads |
| await params in dynamic routes | Access params synchronously |
| ... | ... |

## Established Patterns
[Code snippets showing the canonical way to do common things]

## Open Questions / TODOs
[Things that seem inconsistent or unfinished]
```

## Instructions

1. Read `src/` directory structure
2. Read key files: `src/lib/supabase.ts`, `src/proxy.ts`, `src/lib/actions/auth.ts`, `src/types/index.ts`
3. Read 3-4 representative pages (dashboard, admin, public)
4. Synthesize patterns — look for consistency
5. Note inconsistencies (bugs or intentional?)
6. Output the `CODEBASE_PATTERNS.md` in the project root
7. Refer to this file at the start of future sessions for consistency

## Auto-Update Behavior

After major feature additions, run `/learn` again to update the patterns document. This keeps the self-learning loop active as the codebase grows.
