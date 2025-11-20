import { test, expect } from '../support/fixtures';

/**
 * Story 1.4: Basic UI Framework & Design System
 * Test Suite: Material UI Configuration
 *
 * ATDD Tests - RED Phase
 * These tests verify Material UI installation, theme configuration, and global styling.
 *
 * Test Level: E2E (browser environment required)
 * Story: docs/sprint-artifacts/1-4-basic-ui-framework-design-system.md
 *
 * @see .bmad/bmm/workflows/testarch/atdd/instructions.md
 */

test.describe('Story 1.4: Material UI Configuration', () => {
  test.describe('AC: Material UI Installation and Theme Setup', () => {
    test('should have MUI packages installed in package.json', async () => {
      // GIVEN: Project with package.json
      const fs = require('fs');
      const path = require('path');
      const projectRoot = path.resolve(__dirname, '../..');
      const packageJsonPath = path.join(projectRoot, 'package.json');

      // WHEN: Reading package.json dependencies
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

      // THEN: MUI core packages are installed
      expect(packageJson.dependencies).toHaveProperty('@mui/material');
      expect(packageJson.dependencies).toHaveProperty('@emotion/react');
      expect(packageJson.dependencies).toHaveProperty('@emotion/styled');
      expect(packageJson.dependencies).toHaveProperty('@mui/icons-material');
    });

    test('should have lib/theme.ts with theme configuration', async () => {
      // GIVEN: Project structure
      const fs = require('fs');
      const path = require('path');
      const projectRoot = path.resolve(__dirname, '../..');
      const themePath = path.join(projectRoot, 'lib', 'theme.ts');

      // WHEN: Checking for theme file
      const themeExists = fs.existsSync(themePath);

      // THEN: Theme configuration file exists
      expect(themeExists).toBeTruthy();
    });

    test('should render with MUI ThemeProvider applied globally', async ({ page }) => {
      // GIVEN: Application with MUI ThemeProvider in layout
      await page.goto('/');

      // WHEN: Page is rendered
      // MUI applies baseline styles via CssBaseline

      // THEN: MUI baseline styles are applied
      const bodyStyles = await page.evaluate(() => {
        const body = document.body;
        const computedStyle = window.getComputedStyle(body);
        return {
          margin: computedStyle.margin,
          boxSizing: computedStyle.boxSizing,
        };
      });

      // MUI CssBaseline resets body margin to 0
      expect(bodyStyles.margin).toBe('0px');
      // MUI sets box-sizing to border-box
      expect(bodyStyles.boxSizing).toBe('border-box');
    });
  });

  test.describe('AC: Color Palette Configuration', () => {
    test('should have Professional Blue theme colors defined', async () => {
      // GIVEN: lib/theme.ts with color palette
      const fs = require('fs');
      const path = require('path');
      const projectRoot = path.resolve(__dirname, '../..');
      const themePath = path.join(projectRoot, 'lib', 'theme.ts');

      // WHEN: Reading theme file
      const themeContent = fs.readFileSync(themePath, 'utf-8');

      // THEN: Professional Blue theme colors are defined
      expect(themeContent).toContain('#2563eb'); // Primary blue
      expect(themeContent).toContain('#64748b'); // Secondary slate
    });

    test('should have waste categorization colors (red/yellow/green)', async () => {
      // GIVEN: lib/theme.ts with waste categorization colors
      const fs = require('fs');
      const path = require('path');
      const projectRoot = path.resolve(__dirname, '../..');
      const themePath = path.join(projectRoot, 'lib', 'theme.ts');

      // WHEN: Reading theme file
      const themeContent = fs.readFileSync(themePath, 'utf-8');

      // THEN: Waste categorization colors are defined
      expect(themeContent).toContain('#ef4444'); // Red (waste)
      expect(themeContent).toContain('#f59e0b'); // Yellow (non-value-added)
      expect(themeContent).toContain('#10b981'); // Green (value-added)
    });

    test('should apply primary color to MUI buttons', async ({ page }) => {
      // GIVEN: Application with themed MUI button
      await page.goto('/');

      // Create a test button with MUI primary color
      await page.evaluate(() => {
        const button = document.createElement('button');
        button.setAttribute('data-testid', 'test-primary-button');
        button.textContent = 'Test Button';
        button.className = 'MuiButton-root MuiButton-contained MuiButton-containedPrimary';
        document.body.appendChild(button);
      });

      // WHEN: Button is rendered
      const buttonBgColor = await page
        .getByTestId('test-primary-button')
        .evaluate((el) => window.getComputedStyle(el).backgroundColor);

      // THEN: Button has primary blue background (#2563eb = rgb(37, 99, 235))
      expect(buttonBgColor).toBe('rgb(37, 99, 235)');
    });
  });

  test.describe('AC: Typography System Configuration', () => {
    test('should use system font stack for headings and body', async () => {
      // GIVEN: lib/theme.ts with typography configuration
      const fs = require('fs');
      const path = require('path');
      const projectRoot = path.resolve(__dirname, '../..');
      const themePath = path.join(projectRoot, 'lib', 'theme.ts');

      // WHEN: Reading theme file
      const themeContent = fs.readFileSync(themePath, 'utf-8');

      // THEN: System font stack is configured
      // Should include: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto
      expect(themeContent).toContain('-apple-system');
      expect(themeContent).toContain('Segoe UI');
    });

    test('should apply typography scale correctly', async ({ page }) => {
      // GIVEN: Application with MUI typography components
      await page.goto('/');

      // Create test typography elements
      await page.evaluate(() => {
        const h1 = document.createElement('h1');
        h1.setAttribute('data-testid', 'test-h1');
        h1.textContent = 'Heading 1';
        h1.className = 'MuiTypography-h1';

        const body = document.createElement('p');
        body.setAttribute('data-testid', 'test-body');
        body.textContent = 'Body text';
        body.className = 'MuiTypography-body1';

        document.body.appendChild(h1);
        document.body.appendChild(body);
      });

      // WHEN: Typography elements are rendered
      const h1FontSize = await page
        .getByTestId('test-h1')
        .evaluate((el) => window.getComputedStyle(el).fontSize);

      const bodyFontSize = await page
        .getByTestId('test-body')
        .evaluate((el) => window.getComputedStyle(el).fontSize);

      // THEN: Typography scale is applied
      // H1 should be larger than body text
      const h1Size = parseFloat(h1FontSize);
      const bodySize = parseFloat(bodyFontSize);
      expect(h1Size).toBeGreaterThan(bodySize);
    });
  });

  test.describe('AC: Spacing Scale Configuration (4px base unit)', () => {
    test('should have spacing scale defined with 4px base', async () => {
      // GIVEN: lib/theme.ts with spacing configuration
      const fs = require('fs');
      const path = require('path');
      const projectRoot = path.resolve(__dirname, '../..');
      const themePath = path.join(projectRoot, 'lib', 'theme.ts');

      // WHEN: Reading theme file
      const themeContent = fs.readFileSync(themePath, 'utf-8');

      // THEN: Spacing scale is configured with 4px base
      // MUI spacing: spacing: 4 means 1 unit = 4px
      expect(themeContent).toMatch(/spacing:\s*4/);
    });
  });

  test.describe('AC: App Metadata Update (Yamazumi Branding)', () => {
    test('should have updated app metadata in layout.tsx', async ({ page }) => {
      // GIVEN: Application with updated metadata
      await page.goto('/');

      // WHEN: Page loads
      const pageTitle = await page.title();

      // THEN: Title is "Yamazumi" (not "Create Next App")
      expect(pageTitle).toBe('Yamazumi');
    });

    test('should have Yamazumi description in metadata', async ({ page }) => {
      // GIVEN: Application with updated metadata
      await page.goto('/');

      // WHEN: Checking meta description
      const description = await page
        .locator('meta[name="description"]')
        .getAttribute('content');

      // THEN: Description mentions video-based work element analysis
      expect(description).toContain('Video-based work element analysis');
    });
  });
});
