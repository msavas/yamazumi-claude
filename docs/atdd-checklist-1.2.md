# ATDD Checklist - Epic 1, Story 1.2: Supabase Project Setup & Configuration

**Date:** 2025-11-20
**Author:** Matt
**Primary Test Level:** E2E (Infrastructure Validation)

---

## Story Summary

Configure Supabase project with database and storage buckets for secure video and work element data storage. This story establishes the backend infrastructure foundation for authentication, encrypted video storage, and PostgreSQL database access.

**As a** developer
**I want** Supabase project configured with database and storage buckets
**So that** I can store encrypted videos and work element data securely

---

## Acceptance Criteria

1. PostgreSQL database initialized
2. Storage bucket created for encrypted videos
3. Environment variables configured (.env.local)
4. Supabase client library installed and configured
5. Connection tested and verified
6. Environment variables properly secured (not committed to git)
7. .env.example file documents required variables
8. Database connection can be established from the application

---

## Failing Tests Created (RED Phase)

### E2E Tests (21 tests)

**File:** `tests/e2e/1-2-supabase-setup.spec.ts` (335 lines)

All tests follow Given-When-Then format and verify infrastructure configuration.

**AC1: Supabase client library installed**

- ✅ **Test:** should have @supabase/supabase-js in dependencies
  - **Status:** RED - Package not installed yet
  - **Verifies:** Supabase client library listed in package.json dependencies

- ✅ **Test:** should have @supabase/ssr in dependencies for server-side auth
  - **Status:** RED - Package not installed yet
  - **Verifies:** Supabase SSR library for cookie-based auth (per architecture)

**AC2: Supabase client utility configured**

- ✅ **Test:** should have lib/supabase/client.ts for browser client
  - **Status:** RED - File doesn't exist yet
  - **Verifies:** Browser-side Supabase client utility exists

- ✅ **Test:** should have lib/supabase/server.ts for server-side client
  - **Status:** RED - File doesn't exist yet
  - **Verifies:** Server-side Supabase client utility exists (using @supabase/ssr)

- ✅ **Test:** should export createClient function from lib/supabase/client.ts
  - **Status:** RED - File doesn't exist yet
  - **Verifies:** Client utility exports createClient function

- ✅ **Test:** should export createClient function from lib/supabase/server.ts
  - **Status:** RED - File doesn't exist yet
  - **Verifies:** Server utility exports createClient function

**AC3: Environment variables configured**

- ✅ **Test:** should have .env.local file in project root
  - **Status:** RED - File doesn't exist yet
  - **Verifies:** Local environment configuration file exists

- ✅ **Test:** should have NEXT_PUBLIC_SUPABASE_URL in .env.local
  - **Status:** RED - Environment variable not configured
  - **Verifies:** Supabase project URL configured

- ✅ **Test:** should have NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local
  - **Status:** RED - Environment variable not configured
  - **Verifies:** Supabase anonymous key configured

- ✅ **Test:** should have SUPABASE_SERVICE_ROLE_KEY in .env.local for admin operations
  - **Status:** RED - Environment variable not configured
  - **Verifies:** Supabase service role key for admin operations

**AC4: Environment variables properly secured**

- ✅ **Test:** should have .env.local in .gitignore
  - **Status:** RED - .gitignore might not include .env.local yet
  - **Verifies:** Environment secrets not committed to git

- ✅ **Test:** should have .env*.local in .gitignore to prevent accidental commits
  - **Status:** RED - Pattern might not be in .gitignore
  - **Verifies:** All local environment files ignored by git

**AC5: .env.example file documents required variables**

- ✅ **Test:** should have .env.example file in project root
  - **Status:** RED - File doesn't exist yet
  - **Verifies:** Example environment file for documentation

- ✅ **Test:** should have NEXT_PUBLIC_SUPABASE_URL documented in .env.example
  - **Status:** RED - Variable not documented
  - **Verifies:** URL variable documented for developers

- ✅ **Test:** should have NEXT_PUBLIC_SUPABASE_ANON_KEY documented in .env.example
  - **Status:** RED - Variable not documented
  - **Verifies:** Anon key variable documented for developers

- ✅ **Test:** should have SUPABASE_SERVICE_ROLE_KEY documented in .env.example
  - **Status:** RED - Variable not documented
  - **Verifies:** Service role key variable documented for developers

- ✅ **Test:** should NOT contain actual secrets in .env.example
  - **Status:** RED - File doesn't exist yet
  - **Verifies:** Example file contains placeholders, not real secrets

**AC6: Database connection can be established**

- ✅ **Test:** should be able to import Supabase client without errors
  - **Status:** RED - Module doesn't exist yet
  - **Verifies:** Client utility can be imported

- ✅ **Test:** should be able to create Supabase client instance
  - **Status:** RED - Client utility not implemented
  - **Verifies:** Supabase client instance creation succeeds

- ✅ **Test:** should have valid Supabase URL format in environment
  - **Status:** RED - Environment variable not configured
  - **Verifies:** URL follows format: https://<project-id>.supabase.co

- ✅ **Test:** should have non-empty Supabase anon key in environment
  - **Status:** RED - Environment variable not configured
  - **Verifies:** Anon key is valid JWT format

**AC7: Storage bucket created for encrypted videos**

- ✅ **Test:** should have storage bucket configuration documented in README or docs
  - **Status:** RED - Storage setup not documented yet
  - **Verifies:** Storage bucket setup instructions available

---

## Data Factories Created

**None required for this story.**

Story 1.2 focuses on infrastructure setup (packages, configuration files, environment variables). No user data or complex test data generation needed.

---

## Fixtures Created

**None required for this story.**

Story 1.2 validates configuration and file structure. No auth fixtures or data setup needed at this stage. Fixtures will be created in Story 1.3 (Authentication Setup).

---

## Mock Requirements

**None required for this story.**

Story 1.2 tests Supabase client instantiation and configuration validation. No external service mocks needed. Actual Supabase API integration testing will occur in later stories after auth is implemented.

---

## Required data-testid Attributes

**None required for this story.**

Story 1.2 is infrastructure-only (no UI components). data-testid attributes will be required starting in Story 1.3 (Authentication Setup) for login/signup forms.

---

## Implementation Checklist

### Prerequisite: Create Supabase Project

**Before starting implementation, create Supabase project:**

- [ ] Go to https://supabase.com and sign in
- [ ] Create new project: "yamazumi-dev"
- [ ] Select region closest to you
- [ ] Set strong database password (save securely)
- [ ] Wait for project to finish provisioning (~2 minutes)
- [ ] Note down project URL and anon key from Settings > API

---

### Test: Supabase client library installed

**File:** `tests/e2e/1-2-supabase-setup.spec.ts:16-29`

**Tasks to make this test pass:**

- [ ] Run `npm install @supabase/supabase-js`
- [ ] Run `npm install @supabase/ssr` (for server-side auth)
- [ ] Verify packages appear in package.json dependencies
- [ ] Run test: `npm run test:e2e -- 1-2-supabase-setup.spec.ts -g "AC1"`
- [ ] ✅ Tests pass (green phase)

**Estimated Effort:** 0.25 hours

---

### Test: Supabase client utility configured

**File:** `tests/e2e/1-2-supabase-setup.spec.ts:49-82`

**Tasks to make this test pass:**

- [ ] Create directory: `lib/supabase/`
- [ ] Create file: `lib/supabase/client.ts`
- [ ] Implement browser-side createClient function:
  ```typescript
  import { createClient as createSupabaseClient } from '@supabase/supabase-js';

  export const createClient = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    return createSupabaseClient(supabaseUrl, supabaseAnonKey);
  };
  ```
- [ ] Create file: `lib/supabase/server.ts`
- [ ] Implement server-side createClient function using @supabase/ssr:
  ```typescript
  import { createServerClient } from '@supabase/ssr';
  import { cookies } from 'next/headers';

  export const createClient = () => {
    const cookieStore = cookies();

    return createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );
  };
  ```
- [ ] Run test: `npm run test:e2e -- 1-2-supabase-setup.spec.ts -g "AC2"`
- [ ] ✅ Tests pass (green phase)

**Estimated Effort:** 0.5 hours

---

### Test: Environment variables configured

**File:** `tests/e2e/1-2-supabase-setup.spec.ts:84-130`

**Tasks to make this test pass:**

- [ ] Create file: `.env.local` in project root
- [ ] Add Supabase URL: `NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co`
- [ ] Add Supabase anon key: `NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here`
- [ ] Add service role key: `SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here`
- [ ] Get actual values from Supabase project Settings > API
- [ ] Run test: `npm run test:e2e -- 1-2-supabase-setup.spec.ts -g "AC3"`
- [ ] ✅ Tests pass (green phase)

**Estimated Effort:** 0.25 hours

---

### Test: Environment variables properly secured

**File:** `tests/e2e/1-2-supabase-setup.spec.ts:132-158`

**Tasks to make this test pass:**

- [ ] Open `.gitignore` file
- [ ] Add line: `.env*.local` (if not already present)
- [ ] Verify `.env.local` is NOT staged in git: `git status`
- [ ] Ensure `.env.local` appears in untracked files or is ignored
- [ ] Run test: `npm run test:e2e -- 1-2-supabase-setup.spec.ts -g "AC4"`
- [ ] ✅ Tests pass (green phase)

**Estimated Effort:** 0.25 hours

---

### Test: .env.example file documents required variables

**File:** `tests/e2e/1-2-supabase-setup.spec.ts:160-224`

**Tasks to make this test pass:**

- [ ] Create file: `.env.example` in project root
- [ ] Add documented variables with placeholder values:
  ```env
  # Supabase Configuration
  # Get these values from your Supabase project: Settings > API

  # Supabase project URL (format: https://<project-id>.supabase.co)
  NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url

  # Supabase anonymous key (public, safe for browser use)
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

  # Supabase service role key (secret, server-side only, full database access)
  # WARNING: Keep this secret! Do not expose in browser code.
  SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
  ```
- [ ] Verify placeholders are NOT actual secrets (short, descriptive)
- [ ] Run test: `npm run test:e2e -- 1-2-supabase-setup.spec.ts -g "AC5"`
- [ ] ✅ Tests pass (green phase)

**Estimated Effort:** 0.25 hours

---

### Test: Database connection can be established

**File:** `tests/e2e/1-2-supabase-setup.spec.ts:226-292`

**Tasks to make this test pass:**

- [ ] Verify Supabase client utilities are implemented (completed above)
- [ ] Verify environment variables are set correctly (completed above)
- [ ] Ensure Supabase URL format is valid: https://<project-id>.supabase.co
- [ ] Ensure anon key is valid JWT (contains dots, length > 100 chars)
- [ ] Test client instantiation locally:
  ```typescript
  import { createClient } from '@/lib/supabase/client';
  const supabase = createClient();
  console.log(supabase.from); // Should have .from() method
  ```
- [ ] Run test: `npm run test:e2e -- 1-2-supabase-setup.spec.ts -g "AC6"`
- [ ] ✅ Tests pass (green phase)

**Estimated Effort:** 0.5 hours

---

### Test: Storage bucket created for encrypted videos

**File:** `tests/e2e/1-2-supabase-setup.spec.ts:294-320`

**Tasks to make this test pass:**

- [ ] Log into Supabase Dashboard
- [ ] Navigate to Storage section
- [ ] Create new bucket: "encrypted-videos"
- [ ] Set bucket to private (authentication required)
- [ ] Document storage bucket setup in README.md or CLAUDE.md:
  ```markdown
  ## Supabase Storage

  - Bucket: `encrypted-videos` (private)
  - Purpose: Store client-side encrypted video files
  - Access: Authenticated users only (RLS policies will be configured in Epic 6)
  ```
- [ ] Run test: `npm run test:e2e -- 1-2-supabase-setup.spec.ts -g "AC7"`
- [ ] ✅ Test passes (green phase)

**Estimated Effort:** 0.25 hours

---

### Final Verification

**Run all Story 1.2 tests:**

- [ ] Run full test suite: `npm run test:e2e -- 1-2-supabase-setup.spec.ts`
- [ ] Verify all 21 tests pass
- [ ] Verify no TypeScript errors: `npm run build`
- [ ] Commit changes with message: "feat: configure Supabase project setup (Story 1.2)"
- [ ] Push to branch: `git push origin story/1.2-supabase-setup`

**Total Estimated Effort:** ~2.5 hours

---

## Running Tests

```bash
# Run all failing tests for this story
npm run test:e2e -- 1-2-supabase-setup.spec.ts

# Run specific acceptance criteria tests
npm run test:e2e -- 1-2-supabase-setup.spec.ts -g "AC1"  # Supabase client library installed
npm run test:e2e -- 1-2-supabase-setup.spec.ts -g "AC2"  # Supabase client utility configured
npm run test:e2e -- 1-2-supabase-setup.spec.ts -g "AC3"  # Environment variables configured
npm run test:e2e -- 1-2-supabase-setup.spec.ts -g "AC4"  # Environment variables secured
npm run test:e2e -- 1-2-supabase-setup.spec.ts -g "AC5"  # .env.example documented
npm run test:e2e -- 1-2-supabase-setup.spec.ts -g "AC6"  # Database connection established
npm run test:e2e -- 1-2-supabase-setup.spec.ts -g "AC7"  # Storage bucket created

# Run tests in headed mode (see browser)
npm run test:e2e:headed -- 1-2-supabase-setup.spec.ts

# Debug specific test
npm run test:e2e:debug -- 1-2-supabase-setup.spec.ts
```

---

## Red-Green-Refactor Workflow

### RED Phase (Complete) ✅

**TEA Agent Responsibilities:**

- ✅ All tests written and failing (21 tests)
- ✅ Tests follow Given-When-Then format
- ✅ Tests validate infrastructure configuration
- ✅ Implementation checklist created with clear tasks
- ✅ No fixtures/factories needed (infrastructure story)

**Verification:**

- All tests run and fail as expected
- Failure messages are clear: "Expected file to exist", "Expected property in package.json"
- Tests fail due to missing implementation, not test bugs

---

### GREEN Phase (DEV Team - Next Steps)

**DEV Agent Responsibilities:**

1. **Create Supabase project** (prerequisite)
   - Follow instructions above to create project on Supabase
   - Note down URL and keys

2. **Pick first failing test** (recommend starting with AC1: Install packages)
   - Install @supabase/supabase-js and @supabase/ssr
   - Run test to verify green

3. **Work through implementation checklist** one section at a time
   - AC2: Create client utilities
   - AC3: Configure environment variables
   - AC4: Secure environment files
   - AC5: Document environment variables
   - AC6: Verify connection
   - AC7: Create storage bucket

4. **Run tests frequently** after each implementation
   - One acceptance criteria at a time
   - Verify tests turn green before moving to next

**Key Principles:**

- Follow implementation checklist order (dependencies)
- Use exact code examples provided in checklist
- Test each acceptance criteria independently
- Don't skip .gitignore and .env.example (security critical)

**Progress Tracking:**

- Check off tasks as you complete them
- Run `npm run test:e2e -- 1-2-supabase-setup.spec.ts` to verify progress
- Mark story as IN PROGRESS in `docs/sprint-artifacts/sprint-status.yaml`

---

### REFACTOR Phase (DEV Team - After All Tests Pass)

**DEV Agent Responsibilities:**

1. **Verify all tests pass** (all 21 tests green)
2. **Review code quality**
   - Check for hardcoded values (should use env vars)
   - Ensure error handling is present (check for missing env vars)
   - Add JSDoc comments to client utilities
3. **Security review**
   - Verify .env.local is in .gitignore
   - Verify .env.example contains NO actual secrets
   - Verify service role key is NOT used in browser code
4. **Documentation review**
   - Update README.md with Supabase setup instructions
   - Ensure .env.example has clear comments
5. **Run tests again** after refactoring
6. **Commit with descriptive message**

**Key Principles:**

- Tests provide safety net (refactor with confidence)
- Focus on security (env vars, .gitignore)
- Add error messages for missing configuration
- Document setup process for other developers

**Completion:**

- All tests pass (21/21 green)
- Code quality meets team standards
- Security best practices followed
- Ready for code review and story approval

---

## Next Steps

1. **Review this checklist** with team in standup or planning
2. **Create Supabase project** (prerequisite - see instructions above)
3. **Run failing tests** to confirm RED phase: `npm run test:e2e -- 1-2-supabase-setup.spec.ts`
4. **Begin implementation** using implementation checklist as guide
5. **Work one acceptance criteria at a time** (AC1 → AC2 → AC3 → ...)
6. **Share progress** in daily standup
7. **When all tests pass**, refactor code for quality and security
8. **When refactoring complete**, run `/bmad:bmm:workflows:story-done` to move story to DONE

---

## Knowledge Base References Applied

This ATDD workflow consulted the following knowledge fragments:

- **fixture-architecture.md** - Test fixture patterns (not needed for infrastructure story)
- **data-factories.md** - Factory patterns (not needed for infrastructure story)
- **test-quality.md** - Test design principles (Given-When-Then, one assertion per test, determinism)
- **test-levels-framework.md** - Test level selection framework (E2E for infrastructure validation)

See `.bmad/bmm/testarch/tea-index.csv` for complete knowledge fragment mapping.

---

## Test Execution Evidence

### Initial Test Run (RED Phase Verification)

**Command:** `npm run test:e2e -- 1-2-supabase-setup.spec.ts`

**Expected Results:**

```
Running 21 tests using 1 worker

Story 1.2: Supabase Project Setup & Configuration
  AC1: Supabase client library installed
    ✗ should have @supabase/supabase-js in dependencies
      Error: Expected property '@supabase/supabase-js' to exist in dependencies

    ✗ should have @supabase/ssr in dependencies for server-side auth
      Error: Expected property '@supabase/ssr' to exist in dependencies

  AC2: Supabase client utility configured
    ✗ should have lib/supabase/client.ts for browser client
      Error: Expected file to exist at lib/supabase/client.ts

    ✗ should have lib/supabase/server.ts for server-side client
      Error: Expected file to exist at lib/supabase/server.ts

  ... (17 more failing tests)

21 failed
  [chromium] › 1-2-supabase-setup.spec.ts:16 - should have @supabase/supabase-js in dependencies
  [chromium] › 1-2-supabase-setup.spec.ts:31 - should have @supabase/ssr in dependencies
  ... (19 more)
```

**Summary:**

- Total tests: 21
- Passing: 0 (expected)
- Failing: 21 (expected)
- Status: ✅ RED phase verified

**Expected Failure Messages:**

1. AC1 Tests: "Expected property '@supabase/supabase-js' to exist in dependencies"
2. AC2 Tests: "Expected file to exist at lib/supabase/client.ts"
3. AC3 Tests: "Expected file to exist at .env.local"
4. AC4 Tests: "Expected '.env.local' to be in .gitignore"
5. AC5 Tests: "Expected file to exist at .env.example"
6. AC6 Tests: "Cannot find module 'lib/supabase/client'"
7. AC7 Tests: "Expected documentation to contain 'storage' or 'bucket'"

---

## Notes

### Architecture Alignment

This story implements the foundation for:
- **Security-first design**: Client-side encryption requires secure backend storage
- **Cookie-based server-side auth**: Uses @supabase/ssr for HttpOnly cookies (per architecture)
- **Environment variable security**: Secrets never committed to git

### Database Schema

Note: Database schema (tables, RLS policies) will be created in Epic 6. This story only:
- Initializes empty PostgreSQL database
- Creates storage bucket for encrypted videos
- Configures client libraries for future use

### Storage Bucket Permissions

Storage bucket created as **private** in this story. Row-Level Security (RLS) policies will be configured in Epic 6 to ensure:
- Users can only access their own videos
- Encrypted video access requires authentication

### Testing Strategy

Tests are E2E infrastructure validation (file system, package.json, module imports). No browser automation needed. Tests run quickly (<5 seconds total).

### Dependencies for Future Stories

Story 1.2 is a prerequisite for:
- **Story 1.3**: Authentication Setup (uses Supabase Auth)
- **Story 2.1**: Video upload UI (uses Supabase Storage)
- **Epic 6**: Database schema and RLS policies

---

## Contact

**Questions or Issues?**

- Ask in team standup
- Tag @tea in Slack/Discord
- Refer to `.bmad/bmm/docs/README.md` for workflow documentation
- Consult `.bmad/bmm/testarch/knowledge` for testing best practices

---

**Generated by BMad TEA Agent** - 2025-11-20
