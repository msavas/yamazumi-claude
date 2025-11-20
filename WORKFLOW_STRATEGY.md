# Workflow Strategy - Yamazumi Development

## Overview

This document defines the complete development workflow for Yamazumi, including branching strategy, agent collaboration patterns, and parallel development approach.

---

## Branch Hierarchy

```
main (production)
│
├── epic/1-foundation-infrastructure
│   ├── story/1.1-project-setup
│   ├── story/1.2-supabase-setup
│   ├── story/1.3-authentication
│   ├── story/1.4-ui-framework
│   └── story/1.5-deployment-pipeline
│
├── epic/2-secure-video-management
│   ├── story/2.1-video-upload
│   ├── story/2.2-client-encryption
│   ├── story/2.3-encrypted-storage
│   └── story/2.4-video-organization
│
└── epic/N-feature-name
    └── story/N.M-story-name
```

### Branch Types

| Branch | Purpose | Lifespan | Created From | Merges To |
|--------|---------|----------|--------------|-----------|
| `main` | Production code | Permanent | N/A | N/A |
| `epic/N-name` | Epic integration | Epic duration | `main` | `main` |
| `story/N.M-name` | Story development | Story duration | `epic/N-name` | `epic/N-name` |

---

## Agent Workflow (ATDD Approach)

### Sequential Agent Pattern

Each story follows this sequence on its feature branch:

```
story/1.1-project-setup branch
│
├─ STEP 1: SM (Scrum Master)
│  │
│  ├─ Reads: docs/epics.md, previous story context
│  ├─ Creates: docs/stories/story-1.1.md
│  └─ Commits: Story document with acceptance criteria
│
├─ STEP 2: TEA (Test Engineer) - ATDD Phase
│  │
│  ├─ Reads: docs/stories/story-1.1.md (acceptance criteria)
│  ├─ Creates: tests/e2e/story-1.1.spec.ts (FAILING tests)
│  └─ Commits: Test suite (expected to FAIL)
│
├─ STEP 3: TEST-REVIEW (Optional)
│  │
│  ├─ Reviews: Test quality and AC coverage
│  └─ Decision: Approve or request test revisions
│
├─ STEP 4: DEV (Developer)
│  │
│  ├─ Reads:
│  │   - docs/stories/story-1.1.md (requirements)
│  │   - tests/e2e/story-1.1.spec.ts (definition of done)
│  ├─ Creates: Implementation (src/, app/, components/, etc.)
│  └─ Commits: Code that makes tests PASS
│
├─ STEP 5: TEA - Automate Phase
│  │
│  ├─ Runs: npm run test:e2e
│  ├─ Validates: All acceptance tests pass
│  └─ Confirms: Definition of Done met
│
└─ STEP 6: MERGE to epic/1-foundation-infrastructure
   │
   └─ Complete story unit (doc + tests + implementation)
```

### Key Principles

1. **Just-in-Time Story Creation**: SM creates detailed story doc on story branch (sees previous implementation context)
2. **Tests First (ATDD)**: TEA writes failing tests before DEV writes code
3. **Definition of Done**: Tests define "done" - DEV makes them pass
4. **Single Branch**: All agents work on same story branch sequentially
5. **Atomic Merge**: Story merges to epic as complete unit (doc + tests + code)

---

## Parallel Development Strategy

### Independence Check

Stories can be developed in parallel if they have:
- ✅ No code dependencies (different files/modules)
- ✅ No data dependencies (different database tables)
- ✅ No UI dependencies (different components/pages)

### Example: Epic 1 Parallel Stories

```
epic/1-foundation-infrastructure
│
├─ story/1.2-supabase-setup (Agent Team A)
│  │
│  ├─ SM: Creates story-1.2.md
│  ├─ TEA: Creates Supabase connection tests
│  ├─ DEV: Implements lib/supabase/, env config
│  └─ Files: lib/supabase/*, .env.example, docs/
│
└─ story/1.4-ui-framework (Agent Team B - PARALLEL)
   │
   ├─ SM: Creates story-1.4.md
   ├─ TEA: Creates component tests
   ├─ DEV: Implements components/ui/, Tailwind config
   └─ Files: components/ui/*, tailwind.config.ts, styles/
```

**Why parallel works:**
- Different file paths (no conflicts)
- No dependencies (1.4 doesn't need Supabase from 1.2)
- Both branch from same epic branch
- Both merge back independently

### Parallel Workflow

```bash
# Agent Team A: Story 1.2
git checkout epic/1-foundation-infrastructure
git checkout -b story/1.2-supabase-setup
# SM → TEA → DEV → TEA workflow
git push origin story/1.2-supabase-setup

# Agent Team B: Story 1.4 (SAME TIME)
git checkout epic/1-foundation-infrastructure
git checkout -b story/1.4-ui-framework
# SM → TEA → DEV → TEA workflow
git push origin story/1.4-ui-framework

# Merge (order doesn't matter)
git checkout epic/1-foundation-infrastructure
git merge --no-ff story/1.2-supabase-setup
git merge --no-ff story/1.4-ui-framework
```

### Merge Order

**For Independent Stories:**
- Merge in ANY order (no conflicts expected)
- If conflicts occur, they're simple (package.json, etc.)

**For Dependent Stories:**
- Merge prerequisite first
- Example: 1.2 (Supabase setup) before 1.3 (auth that uses Supabase)

---

## Complete Epic Workflow

### Phase 1: Epic Planning

```bash
# Create epic branch from main
git checkout main
git pull origin main
git checkout -b epic/1-foundation-infrastructure
git push -u origin epic/1-foundation-infrastructure
```

### Phase 2: Story Development (Repeated for Each Story)

```bash
# 1. Create story branch
git checkout epic/1-foundation-infrastructure
git pull origin epic/1-foundation-infrastructure
git checkout -b story/1.1-project-setup
git push -u origin story/1.1-project-setup

# 2. SM creates story document
# [SM agent runs /bmad:bmm:workflows:create-story]
git add docs/stories/story-1.1.md
git commit -m "docs: add story 1.1 specification

Story: 1.1"

# 3. TEA creates ATDD tests
# [TEA agent creates failing tests]
git add tests/e2e/story-1.1.spec.ts
git commit -m "test: add ATDD tests for story 1.1

Story: 1.1"

# 4. (Optional) Test review happens here

# 5. DEV implements
# [DEV agent runs /bmad:bmm:workflows:dev-story]
git add package.json tsconfig.json src/ app/ components/
git commit -m "feat: implement Next.js project setup

- Initialize Next.js 15 with App Router
- Configure TypeScript and ESLint
- Create folder structure (app/, components/, lib/, types/)
- Add README with setup instructions

Story: 1.1"

# 6. TEA validates
# [TEA agent runs tests, confirms DoD]
# Tests should now PASS

# 7. Push story branch
git push origin story/1.1-project-setup

# 8. Merge to epic
git checkout epic/1-foundation-infrastructure
git pull origin epic/1-foundation-infrastructure
git merge --no-ff story/1.1-project-setup
git push origin epic/1-foundation-infrastructure

# 9. Clean up
git branch -d story/1.1-project-setup
git push origin --delete story/1.1-project-setup
```

### Phase 3: Epic Completion

```bash
# After all stories merged to epic branch

# 1. Test entire epic integration
git checkout epic/1-foundation-infrastructure
npm run lint
npm run build
npm run test:e2e

# 2. Merge to main
git checkout main
git pull origin main
git merge --no-ff epic/1-foundation-infrastructure
git push origin main

# 3. Tag release
git tag -a v1.0-epic1 -m "Epic 1: Foundation & Infrastructure

Completed Stories:
- 1.1: Project Setup & Repository Structure
- 1.2: Supabase Project Setup & Configuration
- 1.3: Authentication Setup (Single User MVP)
- 1.4: Basic UI Framework & Design System
- 1.5: Deployment Pipeline Setup"

git push origin v1.0-epic1

# 4. Clean up epic branch
git branch -d epic/1-foundation-infrastructure
git push origin --delete epic/1-foundation-infrastructure
```

---

## Visual Timeline: Parallel Development

```
TIME →
═══════════════════════════════════════════════════════════════

epic/1-foundation-infrastructure
│
├─ story/1.1-project-setup
│  └─────┬─────┬─────┬─────┬───→ [MERGE]
│        SM    TEA   DEV   TEA
│
├─ story/1.2-supabase-setup
│        └─────┬─────┬─────┬───→ [MERGE]
│              SM    TEA   DEV   TEA
│
├─ story/1.3-authentication
│                    └─────┬─────┬─────┬───→ [MERGE]
│                          SM    TEA   DEV   TEA
│
├─ story/1.4-ui-framework (PARALLEL with 1.2)
│        └─────┬─────┬─────┬───→ [MERGE]
│              SM    TEA   DEV   TEA
│
└─ story/1.5-deployment-pipeline
                            └─────┬─────┬─────┬───→ [MERGE]
                                  SM    TEA   DEV   TEA

═══════════════════════════════════════════════════════════════
                                                    ↓
                                            EPIC COMPLETE
                                                    ↓
                                            MERGE TO MAIN
                                                    ↓
                                            TAG v1.0-epic1
```

**Key Observations:**
- 1.1 must complete first (foundation for all others)
- 1.2 and 1.4 run in parallel (no dependencies)
- 1.3 waits for 1.2 (needs Supabase from 1.2)
- 1.5 runs last (needs all previous stories' configs)

---

## Story Branch Contents (What Gets Committed)

### Typical Story Branch Structure

```
story/1.2-supabase-setup
│
├── docs/
│   └── stories/
│       └── story-1.2.md                    [SM commits]
│
├── tests/
│   └── e2e/
│       └── story-1.2.spec.ts               [TEA commits]
│
├── lib/
│   └── supabase/
│       ├── client.ts                       [DEV commits]
│       └── server.ts                       [DEV commits]
│
├── .env.example                            [DEV commits]
│
└── README.md (updated)                     [DEV commits]
```

When merged to epic branch, all of this becomes part of the epic.

---

## Conflict Resolution

### During Story Development

If epic branch updates while story is in progress:

```bash
# From story branch
git checkout story/1.2-supabase-setup
git fetch origin
git rebase origin/epic/1-foundation-infrastructure

# Resolve conflicts if any
git add <resolved-files>
git rebase --continue
git push origin story/1.2-supabase-setup --force-with-lease
```

### During Parallel Story Merges

If two parallel stories touch the same files (e.g., both update package.json):

```bash
# Merge first story (no conflicts)
git checkout epic/1-foundation-infrastructure
git merge --no-ff story/1.2-supabase-setup
git push origin epic/1-foundation-infrastructure

# Merge second story (may conflict on package.json)
git merge --no-ff story/1.4-ui-framework

# If conflicts:
# 1. Open package.json and resolve (usually just merging dependencies)
# 2. git add package.json
# 3. git commit (completes the merge)
# 4. git push origin epic/1-foundation-infrastructure
```

**Common Conflict Files in Parallel Development:**
- `package.json` (dependencies from multiple stories)
- `package-lock.json` (auto-generated, usually safe to regenerate)
- `README.md` (multiple stories updating setup instructions)

---

## Agent Decision Matrix

| Scenario | Agent | Action |
|----------|-------|--------|
| Story needs detailed planning | SM | Create story doc on story branch |
| Story ready for testing approach | TEA | Create ATDD tests (failing) |
| Tests need review | Manual/Agent | Review test quality and coverage |
| Implementation needed | DEV | Write code to make tests pass |
| Story implementation complete | TEA | Run tests, validate DoD |
| Story ready to merge | Manual | Merge story → epic |
| All epic stories complete | Manual | Merge epic → main, tag release |

---

## Quick Reference Commands

### Start New Epic
```bash
git checkout main && git pull
git checkout -b epic/N-name
git push -u origin epic/N-name
```

### Start New Story
```bash
git checkout epic/N-name && git pull
git checkout -b story/N.M-name
git push -u origin story/N.M-name
```

### Complete Story
```bash
git checkout epic/N-name
git merge --no-ff story/N.M-name
git push origin epic/N-name
git branch -d story/N.M-name
git push origin --delete story/N.M-name
```

### Complete Epic
```bash
git checkout main
git merge --no-ff epic/N-name
git push origin main
git tag -a vX.Y-epicN -m "Epic N: Description"
git push origin vX.Y-epicN
git branch -d epic/N-name
git push origin --delete epic/N-name
```

---

## Current Project Status

**Active Epic:** Epic 1 - Foundation & Infrastructure
**Current Branch:** `story/1.1-project-setup`
**Next Steps:**
1. SM creates `docs/stories/story-1.1.md`
2. TEA creates ATDD tests
3. DEV implements project setup
4. TEA validates tests pass
5. Merge to `epic/1-foundation-infrastructure`

---

## Benefits of This Workflow

### For Solo Developer
- ✅ Clear separation of planning, testing, implementation
- ✅ ATDD ensures quality and completeness
- ✅ Story branches keep work isolated
- ✅ Epic branches provide integration testing point

### For Parallel AI Agents
- ✅ Independent stories can run simultaneously
- ✅ Clear agent roles (SM → TEA → DEV → TEA)
- ✅ Minimal merge conflicts (different file paths)
- ✅ Epic branch integrates parallel work cleanly

### For Project Management
- ✅ Epic-level milestones for deployments
- ✅ Story-level granularity for tracking progress
- ✅ Clear rollback points (tags at epic completion)
- ✅ Traceability (story number in commits)

---

_For detailed branching rules and commit conventions, see [BRANCHING_STRATEGY.md](./BRANCHING_STRATEGY.md)_
