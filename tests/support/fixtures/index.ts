import { test as base } from '@playwright/test';

/**
 * Extended Test Fixtures
 *
 * This file implements the fixture architecture pattern for Playwright tests.
 * Fixtures provide automatic setup and teardown for test dependencies.
 *
 * Pattern: Pure Function → Fixture → mergeTests composition
 *
 * Usage:
 * ```typescript
 * import { test, expect } from '../support/fixtures';
 *
 * test('example test', async ({ page }) => {
 *   // Test implementation
 * });
 * ```
 *
 * @see .bmad/bmm/testarch/knowledge/fixture-architecture.md
 */

// Define custom fixture types
type TestFixtures = {
  // Add custom fixtures here as needed
  // Example: authenticatedUser: User;
};

// Extend base test with custom fixtures
export const test = base.extend<TestFixtures>({
  // Add custom fixture implementations here
  // Example:
  // authenticatedUser: async ({ page }, use) => {
  //   // Setup: Create and authenticate user
  //   const user = await createUser();
  //   await page.goto('/login');
  //   await page.fill('[data-testid="email-input"]', user.email);
  //   await page.fill('[data-testid="password-input"]', user.password);
  //   await page.click('[data-testid="login-button"]');
  //   await page.waitForURL('/dashboard');
  //
  //   // Provide to test
  //   await use(user);
  //
  //   // Cleanup: Delete user
  //   await deleteUser(user.id);
  // },
});

// Export expect from Playwright
export { expect } from '@playwright/test';
