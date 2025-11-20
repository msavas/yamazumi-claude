import { test, expect } from '../support/fixtures';

/**
 * Example Test Suite
 *
 * Demonstrates Playwright test patterns:
 * - Given-When-Then structure
 * - Network-first approach (route interception before navigation)
 * - Data-testid selectors for stability
 * - Atomic tests (one assertion per test)
 *
 * @see .bmad/bmm/testarch/knowledge/test-quality.md
 * @see .bmad/bmm/testarch/knowledge/network-first.md
 */

test.describe('Example Test Suite', () => {
  test('should load homepage', async ({ page }) => {
    // GIVEN: User navigates to homepage
    await page.goto('/');

    // WHEN: Page loads
    // (implicit - navigation completes)

    // THEN: Page title contains expected text
    await expect(page).toHaveTitle(/Yamazumi|Home/i);
  });

  test('should display navigation elements', async ({ page }) => {
    // GIVEN: User is on homepage
    await page.goto('/');

    // WHEN: Page renders
    // (implicit - navigation completes)

    // THEN: Navigation elements are visible
    // Note: Update selectors with actual data-testid attributes when UI is implemented
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();
  });

  // Example: Network-first pattern
  test.skip('should load user data from API', async ({ page }) => {
    // CRITICAL: Intercept route BEFORE navigation to prevent race conditions
    await page.route('**/api/user', (route) =>
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          id: 1,
          name: 'Test User',
          email: 'test@example.com',
        }),
      })
    );

    // NOW navigate (route is already intercepted)
    await page.goto('/dashboard');

    // THEN: User data is displayed
    await expect(page.locator('[data-testid="user-name"]')).toHaveText('Test User');
  });

  // Example: Using data factory (will be implemented when backend is ready)
  test.skip('should create user and login', async ({ page }) => {
    // GIVEN: Create test user using factory
    // const user = await userFactory.createUser();

    // WHEN: User logs in
    // await page.goto('/login');
    // await page.fill('[data-testid="email-input"]', user.email);
    // await page.fill('[data-testid="password-input"]', user.password);
    // await page.click('[data-testid="login-button"]');

    // THEN: User is redirected to dashboard
    // await expect(page).toHaveURL('/dashboard');
    // await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();
  });
});
