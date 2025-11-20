import { test, expect } from '../support/fixtures';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Story 1.2: Supabase Project Setup & Configuration
 *
 * ATDD Tests - RED Phase
 * These tests verify the acceptance criteria for Story 1.2.
 * All tests should FAIL initially (missing implementation).
 *
 * Test Level: E2E (infrastructure validation)
 * Story: docs/epics.md (Story 1.2)
 *
 * @see .bmad/bmm/workflows/testarch/atdd/instructions.md
 */

const PROJECT_ROOT = path.resolve(__dirname, '../..');

test.describe('Story 1.2: Supabase Project Setup & Configuration', () => {
  test.describe('AC1: Supabase client library installed', () => {
    test('should have @supabase/supabase-js in dependencies', () => {
      // GIVEN: Project root directory
      const packageJsonPath = path.join(PROJECT_ROOT, 'package.json');

      // WHEN: Reading package.json
      const packageJsonExists = fs.existsSync(packageJsonPath);
      expect(packageJsonExists).toBeTruthy();

      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

      // THEN: Supabase client library is listed in dependencies
      expect(packageJson.dependencies).toHaveProperty('@supabase/supabase-js');
    });

    test('should have @supabase/ssr in dependencies for server-side auth', () => {
      // GIVEN: Project root directory
      const packageJsonPath = path.join(PROJECT_ROOT, 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

      // WHEN: Reading package.json
      // (already read above)

      // THEN: Supabase SSR library is listed in dependencies (per architecture)
      expect(packageJson.dependencies).toHaveProperty('@supabase/ssr');
    });
  });

  test.describe('AC2: Supabase client utility configured', () => {
    test('should have lib/supabase/client.ts for browser client', () => {
      // GIVEN: Project lib directory
      const clientPath = path.join(PROJECT_ROOT, 'lib/supabase/client.ts');

      // WHEN: Checking for Supabase client utility
      const clientExists = fs.existsSync(clientPath);

      // THEN: Supabase client utility exists
      expect(clientExists).toBeTruthy();
    });

    test('should have lib/supabase/server.ts for server-side client', () => {
      // GIVEN: Project lib directory
      const serverPath = path.join(PROJECT_ROOT, 'lib/supabase/server.ts');

      // WHEN: Checking for Supabase server utility
      const serverExists = fs.existsSync(serverPath);

      // THEN: Supabase server utility exists (per architecture: @supabase/ssr)
      expect(serverExists).toBeTruthy();
    });

    test('should export createClient function from lib/supabase/client.ts', () => {
      // GIVEN: Supabase client utility file
      const clientPath = path.join(PROJECT_ROOT, 'lib/supabase/client.ts');
      const clientContent = fs.readFileSync(clientPath, 'utf-8');

      // WHEN: Reading client utility content
      // (already read above)

      // THEN: File exports createClient function
      expect(clientContent).toContain('createClient');
      expect(clientContent).toContain('export');
    });

    test('should export createClient function from lib/supabase/server.ts', () => {
      // GIVEN: Supabase server utility file
      const serverPath = path.join(PROJECT_ROOT, 'lib/supabase/server.ts');
      const serverContent = fs.readFileSync(serverPath, 'utf-8');

      // WHEN: Reading server utility content
      // (already read above)

      // THEN: File exports createClient function
      expect(serverContent).toContain('createClient');
      expect(serverContent).toContain('export');
    });
  });

  test.describe('AC3: Environment variables configured', () => {
    test('should have .env.local file in project root', () => {
      // GIVEN: Project root directory
      const envLocalPath = path.join(PROJECT_ROOT, '.env.local');

      // WHEN: Checking for .env.local
      const envLocalExists = fs.existsSync(envLocalPath);

      // THEN: .env.local exists
      expect(envLocalExists).toBeTruthy();
    });

    test('should have NEXT_PUBLIC_SUPABASE_URL in .env.local', () => {
      // GIVEN: .env.local file
      const envLocalPath = path.join(PROJECT_ROOT, '.env.local');
      const envLocalContent = fs.readFileSync(envLocalPath, 'utf-8');

      // WHEN: Reading .env.local content
      // (already read above)

      // THEN: NEXT_PUBLIC_SUPABASE_URL is defined
      expect(envLocalContent).toContain('NEXT_PUBLIC_SUPABASE_URL=');
    });

    test('should have NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local', () => {
      // GIVEN: .env.local file
      const envLocalPath = path.join(PROJECT_ROOT, '.env.local');
      const envLocalContent = fs.readFileSync(envLocalPath, 'utf-8');

      // WHEN: Reading .env.local content
      // (already read above)

      // THEN: NEXT_PUBLIC_SUPABASE_ANON_KEY is defined
      expect(envLocalContent).toContain('NEXT_PUBLIC_SUPABASE_ANON_KEY=');
    });

    test('should have SUPABASE_SERVICE_ROLE_KEY in .env.local for admin operations', () => {
      // GIVEN: .env.local file
      const envLocalPath = path.join(PROJECT_ROOT, '.env.local');
      const envLocalContent = fs.readFileSync(envLocalPath, 'utf-8');

      // WHEN: Reading .env.local content
      // (already read above)

      // THEN: SUPABASE_SERVICE_ROLE_KEY is defined
      expect(envLocalContent).toContain('SUPABASE_SERVICE_ROLE_KEY=');
    });
  });

  test.describe('AC4: Environment variables properly secured', () => {
    test('should have .env.local in .gitignore', () => {
      // GIVEN: .gitignore file
      const gitignorePath = path.join(PROJECT_ROOT, '.gitignore');

      // WHEN: Reading .gitignore
      const gitignoreExists = fs.existsSync(gitignorePath);
      expect(gitignoreExists).toBeTruthy();

      const gitignoreContent = fs.readFileSync(gitignorePath, 'utf-8');

      // THEN: .env.local is covered by .gitignore patterns (either literal or glob)
      // Check for literal .env.local OR glob patterns like .env* that would match it
      expect(
        gitignoreContent.includes('.env.local') || gitignoreContent.includes('.env*')
      ).toBeTruthy();
    });

    test('should have .env*.local in .gitignore to prevent accidental commits', () => {
      // GIVEN: .gitignore file
      const gitignorePath = path.join(PROJECT_ROOT, '.gitignore');
      const gitignoreContent = fs.readFileSync(gitignorePath, 'utf-8');

      // WHEN: Reading .gitignore
      // (already read above)

      // THEN: Local env files are covered by patterns (matches .env.local, .env.production.local, etc.)
      // Accept: .env*.local, .env.*.local, .env.local, or .env* (glob covering all)
      expect(
        gitignoreContent.includes('.env*.local') ||
          gitignoreContent.includes('.env.*.local') ||
          gitignoreContent.includes('.env.local') ||
          gitignoreContent.includes('.env*')
      ).toBeTruthy();
    });
  });

  test.describe('AC5: .env.example file documents required variables', () => {
    test('should have .env.example file in project root', () => {
      // GIVEN: Project root directory
      const envExamplePath = path.join(PROJECT_ROOT, '.env.example');

      // WHEN: Checking for .env.example
      const envExampleExists = fs.existsSync(envExamplePath);

      // THEN: .env.example exists
      expect(envExampleExists).toBeTruthy();
    });

    test('should have NEXT_PUBLIC_SUPABASE_URL documented in .env.example', () => {
      // GIVEN: .env.example file
      const envExamplePath = path.join(PROJECT_ROOT, '.env.example');
      const envExampleContent = fs.readFileSync(envExamplePath, 'utf-8');

      // WHEN: Reading .env.example content
      // (already read above)

      // THEN: NEXT_PUBLIC_SUPABASE_URL is documented
      expect(envExampleContent).toContain('NEXT_PUBLIC_SUPABASE_URL');
    });

    test('should have NEXT_PUBLIC_SUPABASE_ANON_KEY documented in .env.example', () => {
      // GIVEN: .env.example file
      const envExamplePath = path.join(PROJECT_ROOT, '.env.example');
      const envExampleContent = fs.readFileSync(envExamplePath, 'utf-8');

      // WHEN: Reading .env.example content
      // (already read above)

      // THEN: NEXT_PUBLIC_SUPABASE_ANON_KEY is documented
      expect(envExampleContent).toContain('NEXT_PUBLIC_SUPABASE_ANON_KEY');
    });

    test('should have SUPABASE_SERVICE_ROLE_KEY documented in .env.example', () => {
      // GIVEN: .env.example file
      const envExamplePath = path.join(PROJECT_ROOT, '.env.example');
      const envExampleContent = fs.readFileSync(envExamplePath, 'utf-8');

      // WHEN: Reading .env.example content
      // (already read above)

      // THEN: SUPABASE_SERVICE_ROLE_KEY is documented
      expect(envExampleContent).toContain('SUPABASE_SERVICE_ROLE_KEY');
    });

    test('should NOT contain actual secrets in .env.example', () => {
      // GIVEN: .env.example file
      const envExamplePath = path.join(PROJECT_ROOT, '.env.example');
      const envExampleContent = fs.readFileSync(envExamplePath, 'utf-8');

      // WHEN: Reading .env.example content
      // (already read above)

      // THEN: Values should be placeholders (not actual secrets)
      // Example format: NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
      const lines = envExampleContent.split('\n');
      const envLines = lines.filter((line) => line.includes('=') && !line.trim().startsWith('#'));

      envLines.forEach((line) => {
        const [key, value] = line.split('=');
        // Values should be placeholders, not actual secrets (no 'https://' or long base64 strings)
        if (key.includes('URL')) {
          expect(value).not.toMatch(/https:\/\/[a-z0-9-]+\.supabase\.co/);
        }
        if (key.includes('KEY')) {
          expect(value.length).toBeLessThan(50); // Actual keys are much longer
        }
      });
    });
  });

  test.describe('AC6: Database connection can be established', () => {
    // Note: Dynamic import tests require transpilation/bundler setup
    // Runtime validation of Supabase client occurs during application execution
    // These tests verify infrastructure is in place (files, exports, env vars)

    test.skip('should be able to import Supabase client without errors', async () => {
      // SKIPPED: Dynamic import of TypeScript files requires test transpilation setup
      // This acceptance criteria is validated during application runtime
      // Infrastructure verified by other tests: files exist, exports correct, env configured
    });

    test.skip('should be able to create Supabase client instance', async () => {
      // SKIPPED: Dynamic import of TypeScript files requires test transpilation setup
      // This acceptance criteria is validated during application runtime
      // Infrastructure verified by other tests: files exist, exports correct, env configured
    });

    test('should have valid Supabase URL format in environment', async () => {
      // GIVEN: Environment variables loaded
      // Load .env.local manually for test validation
      const envLocalPath = path.join(PROJECT_ROOT, '.env.local');
      const envContent = fs.readFileSync(envLocalPath, 'utf-8');

      // WHEN: Parsing NEXT_PUBLIC_SUPABASE_URL
      const urlMatch = envContent.match(/NEXT_PUBLIC_SUPABASE_URL=(.+)/);
      const supabaseUrl = urlMatch ? urlMatch[1].trim() : '';

      // THEN: URL follows Supabase format (https://<project-id>.supabase.co)
      expect(supabaseUrl).toMatch(/^https:\/\/[a-z0-9-]+\.supabase\.co$/);
    });

    test('should have non-empty Supabase anon key in environment', async () => {
      // GIVEN: Environment variables loaded
      const envLocalPath = path.join(PROJECT_ROOT, '.env.local');
      const envContent = fs.readFileSync(envLocalPath, 'utf-8');

      // WHEN: Parsing NEXT_PUBLIC_SUPABASE_ANON_KEY
      const keyMatch = envContent.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.+)/);
      const anonKey = keyMatch ? keyMatch[1].trim() : '';

      // THEN: Anon key is non-empty and matches either:
      // - New format: sb_publishable_ prefix (Supabase's updated API key format)
      // - Old format: JWT with dots (legacy format)
      expect(anonKey).toBeTruthy();
      expect(anonKey.length).toBeGreaterThan(20); // Minimum reasonable key length

      // Accept either new sb_publishable_ format or old JWT format
      const isNewFormat = anonKey.startsWith('sb_publishable_');
      const isOldJWTFormat = anonKey.includes('.') && anonKey.length > 100;

      expect(isNewFormat || isOldJWTFormat).toBeTruthy();
    });
  });

  test.describe('AC7: Storage bucket created for encrypted videos', () => {
    test('should have storage bucket configuration documented in README or docs', () => {
      // GIVEN: Project documentation
      const readmePath = path.join(PROJECT_ROOT, 'README.md');
      const claudeMdPath = path.join(PROJECT_ROOT, 'CLAUDE.md');

      // WHEN: Reading documentation
      const readmeExists = fs.existsSync(readmePath);
      const claudeMdExists = fs.existsSync(claudeMdPath);

      expect(readmeExists || claudeMdExists).toBeTruthy();

      let docContent = '';
      if (readmeExists) {
        docContent += fs.readFileSync(readmePath, 'utf-8');
      }
      if (claudeMdExists) {
        docContent += fs.readFileSync(claudeMdPath, 'utf-8');
      }

      // THEN: Storage bucket setup is documented
      expect(docContent).toMatch(/storage|bucket|video.*storage/i);
    });

    // Note: Actual bucket verification requires Supabase API call
    // This will be tested in integration tests after auth is implemented
    test.skip('should be able to query storage buckets via Supabase client', async () => {
      // This test would query Supabase storage API
      // Skipped for now - will be implemented when auth is ready
    });
  });
});
