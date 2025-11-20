# Branching Strategy - Yamazumi

## Overview

This document defines the Git branching strategy for Yamazumi development, optimized for solo development with parallel AI agent execution.

## Branch Structure

```
main
├── epic/1-foundation-infrastructure
│   ├── story/1.1-project-setup
│   ├── story/1.2-supabase-setup
│   ├── story/1.3-authentication
│   ├── story/1.4-ui-framework
│   └── story/1.5-deployment-pipeline
├── epic/2-secure-video-management
│   ├── story/2.1-video-upload
│   ├── story/2.2-client-encryption
│   └── ...
└── ...
```

## Branch Types

### `main`
- **Purpose:** Production-ready code only
- **Protection:** Protected branch, requires PR approval
- **Deployment:** Auto-deploys to production (configured in Story 1.5)
- **Merge Source:** Epic branches only (after epic completion)

### `epic/{number}-{epic-name}`
- **Purpose:** Integration branch for all stories within an epic
- **Naming:** `epic/1-foundation-infrastructure`, `epic/2-secure-video-management`
- **Lifecycle:** Created at epic start, deleted after merge to main
- **Branch From:** `main`
- **Merge To:** `main` (after epic completion and testing)

### `story/{number}-{story-name}`
- **Purpose:** Feature development for individual stories
- **Naming:** `story/1.1-project-setup`, `story/2.3-encrypted-storage`
- **Lifecycle:** Created at story start, deleted after merge to epic
- **Branch From:** Corresponding epic branch
- **Merge To:** Corresponding epic branch (after story completion)

## Workflow

### Starting an Epic

```bash
# From main branch
git checkout main
git pull origin main

# Create epic branch
git checkout -b epic/1-foundation-infrastructure
git push -u origin epic/1-foundation-infrastructure
```

### Working on a Story

```bash
# From epic branch
git checkout epic/1-foundation-infrastructure
git pull origin epic/1-foundation-infrastructure

# Create story branch
git checkout -b story/1.1-project-setup
git push -u origin story/1.1-project-setup

# Work on story...
git add .
git commit -m "feat: add Next.js project setup with TypeScript

- Initialize Next.js 15 with App Router
- Configure TypeScript and ESLint
- Set up basic folder structure
- Add README with setup instructions

Story: 1.1"

git push origin story/1.1-project-setup
```

### Completing a Story

```bash
# From story branch - ensure all changes committed
git checkout story/1.1-project-setup
git push origin story/1.1-project-setup

# Switch to epic branch and merge
git checkout epic/1-foundation-infrastructure
git pull origin epic/1-foundation-infrastructure
git merge --no-ff story/1.1-project-setup
git push origin epic/1-foundation-infrastructure

# Delete story branch (locally and remotely)
git branch -d story/1.1-project-setup
git push origin --delete story/1.1-project-setup
```

### Parallel Story Development

When working on multiple stories in parallel (e.g., 1.2 and 1.4 have no dependencies):

```bash
# Agent 1: Story 1.2
git checkout epic/1-foundation-infrastructure
git checkout -b story/1.2-supabase-setup
# ... work on story 1.2 ...

# Agent 2: Story 1.4 (in parallel)
git checkout epic/1-foundation-infrastructure
git checkout -b story/1.4-ui-framework
# ... work on story 1.4 ...

# Both merge back to epic branch independently
# Merge order doesn't matter since there are no dependencies
```

### Completing an Epic

```bash
# From epic branch - ensure all stories merged
git checkout epic/1-foundation-infrastructure
git pull origin epic/1-foundation-infrastructure

# Run full test suite and validation
npm run lint
npm run build
npm run test:e2e  # (when tests are configured)

# Switch to main and merge epic
git checkout main
git pull origin main
git merge --no-ff epic/1-foundation-infrastructure
git push origin main

# Tag the epic release
git tag -a v1.0-epic1 -m "Epic 1: Foundation & Infrastructure"
git push origin v1.0-epic1

# Delete epic branch
git branch -d epic/1-foundation-infrastructure
git push origin --delete epic/1-foundation-infrastructure
```

## Commit Message Convention

Follow conventional commits format:

```
<type>: <short description>

<longer description (optional)>

Story: <story-number>
```

### Types:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Formatting, missing semicolons, etc.
- `refactor:` Code restructuring
- `test:` Adding tests
- `chore:` Maintenance tasks

### Examples:

```
feat: add video upload with drag-and-drop

- Implement drag-and-drop interface
- Add file validation for MP4/MOV
- Show upload progress indicator

Story: 2.1
```

```
fix: correct encryption key generation

- Use crypto.getRandomValues for secure key gen
- Add error handling for unsupported browsers

Story: 2.2
```

## Deployment Strategy

- **main branch:** Auto-deploys to production (Vercel)
- **epic branches:** Can be deployed to preview environments for testing
- **story branches:** Local development only (no deployment)

## Rollback Strategy

### Story-Level Rollback
If a story causes issues after merging to epic:

```bash
# Revert the merge commit on epic branch
git checkout epic/1-foundation-infrastructure
git revert -m 1 <merge-commit-hash>
git push origin epic/1-foundation-infrastructure
```

### Epic-Level Rollback
If an epic causes issues after merging to main:

```bash
# Revert the merge commit on main
git checkout main
git revert -m 1 <merge-commit-hash>
git push origin main

# Or rollback to previous tag
git checkout v1.0-epic1^
git tag -a v1.1-rollback -m "Rollback from Epic 2"
git push origin v1.1-rollback
```

## Conflict Resolution

### During Story Development
If epic branch updates while story is in progress:

```bash
# From story branch
git checkout story/1.1-project-setup
git fetch origin
git rebase origin/epic/1-foundation-infrastructure

# Resolve conflicts, then:
git add .
git rebase --continue
git push origin story/1.1-project-setup --force-with-lease
```

### During Parallel Story Merges
If two parallel stories conflict when merging to epic:

```bash
# Merge first story normally
git merge --no-ff story/1.2-supabase-setup

# Merge second story - conflicts may occur
git merge --no-ff story/1.4-ui-framework

# Resolve conflicts:
# 1. Edit conflicting files
# 2. git add <resolved-files>
# 3. git commit (complete the merge)
# 4. git push origin epic/1-foundation-infrastructure
```

## Protection Rules (GitHub)

Configure these protection rules on GitHub:

### `main` branch:
- ✅ Require pull request reviews (optional for solo dev)
- ✅ Require status checks to pass (when CI/CD configured)
- ✅ Require branches to be up to date
- ✅ Include administrators (prevents accidental force push)

### `epic/*` branches:
- ⚠️ No protection (allows flexible merging)
- Manual testing before merging to main

## Best Practices

1. **Always branch from epic, not from other stories**
2. **Merge stories to epic frequently** (don't let stories diverge)
3. **Test epic branch thoroughly before merging to main**
4. **Use `--no-ff`** for all merges (preserves branch history)
5. **Delete branches after merging** (keeps repo clean)
6. **Tag epic completions** (easy rollback reference)
7. **Commit message includes story number** (traceability)

## Current Status

**Active Epic:** Epic 1 - Foundation & Infrastructure
**Active Stories:** Story 1.1 - Project Setup & Repository Structure
**Main Branch:** Production-ready (empty, starting development)

---

**Next Steps:**
1. Create `epic/1-foundation-infrastructure` branch
2. Create `story/1.1-project-setup` branch
3. Begin Story 1.1 development
