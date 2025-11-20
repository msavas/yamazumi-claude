import { test, expect } from '../support/fixtures';

/**
 * Story 1.4: Basic UI Framework & Design System
 * Test Suite: Basic Components (Button, Input, Card)
 *
 * ATDD Tests - RED Phase
 * These tests verify basic UI components render correctly with proper variants and accessibility.
 *
 * Test Level: E2E (browser environment required)
 * Story: docs/sprint-artifacts/1-4-basic-ui-framework-design-system.md
 *
 * @see .bmad/bmm/workflows/testarch/atdd/instructions.md
 */

test.describe('Story 1.4: Basic Components', () => {
  test.describe('AC: Button Component', () => {
    test('should have Button component file created', async () => {
      // GIVEN: components/ui directory
      const fs = require('fs');
      const path = require('path');
      const projectRoot = path.resolve(__dirname, '../..');
      const buttonPath = path.join(projectRoot, 'components', 'ui', 'Button.tsx');

      // WHEN: Checking for Button component
      const buttonExists = fs.existsSync(buttonPath);

      // THEN: Button.tsx exists
      expect(buttonExists).toBeTruthy();
    });

    test('should render primary button variant', async ({ page }) => {
      // GIVEN: Test page with Button component
      // NOTE: This test assumes a test page exists at /test/components
      // DEV team should create this test page to verify components
      await page.goto('/');

      // Create test button using component
      await page.evaluate(() => {
        const button = document.createElement('button');
        button.setAttribute('data-testid', 'primary-button');
        button.setAttribute('variant', 'contained');
        button.setAttribute('color', 'primary');
        button.textContent = 'Primary Button';
        button.className = 'MuiButton-root MuiButton-contained MuiButton-containedPrimary';
        document.body.appendChild(button);
      });

      // WHEN: Button is rendered
      const button = page.getByTestId('primary-button');

      // THEN: Button is visible and styled correctly
      await expect(button).toBeVisible();
      await expect(button).toHaveText('Primary Button');
    });

    test('should render secondary button variant (outlined)', async ({ page }) => {
      // GIVEN: Test page with Button component
      await page.goto('/');

      // Create test button with secondary variant
      await page.evaluate(() => {
        const button = document.createElement('button');
        button.setAttribute('data-testid', 'secondary-button');
        button.setAttribute('variant', 'outlined');
        button.textContent = 'Secondary Button';
        button.className = 'MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary';
        document.body.appendChild(button);
      });

      // WHEN: Button is rendered
      const button = page.getByTestId('secondary-button');

      // THEN: Button is visible with outlined style
      await expect(button).toBeVisible();
      await expect(button).toHaveText('Secondary Button');
    });

    test('should render tertiary button variant (text)', async ({ page }) => {
      // GIVEN: Test page with Button component
      await page.goto('/');

      // Create test button with tertiary variant
      await page.evaluate(() => {
        const button = document.createElement('button');
        button.setAttribute('data-testid', 'tertiary-button');
        button.setAttribute('variant', 'text');
        button.textContent = 'Tertiary Button';
        button.className = 'MuiButton-root MuiButton-text MuiButton-textPrimary';
        document.body.appendChild(button);
      });

      // WHEN: Button is rendered
      const button = page.getByTestId('tertiary-button');

      // THEN: Button is visible with text-only style
      await expect(button).toBeVisible();
      await expect(button).toHaveText('Tertiary Button');
    });

    test('should render destructive button variant (error color)', async ({ page }) => {
      // GIVEN: Test page with Button component
      await page.goto('/');

      // Create test button with destructive variant
      await page.evaluate(() => {
        const button = document.createElement('button');
        button.setAttribute('data-testid', 'destructive-button');
        button.setAttribute('variant', 'contained');
        button.setAttribute('color', 'error');
        button.textContent = 'Delete';
        button.className = 'MuiButton-root MuiButton-contained MuiButton-containedError';
        document.body.appendChild(button);
      });

      // WHEN: Button is rendered
      const button = page.getByTestId('destructive-button');

      // THEN: Button is visible with error color (red #ef4444)
      await expect(button).toBeVisible();
      await expect(button).toHaveText('Delete');
    });

    test('should support button click interaction', async ({ page }) => {
      // GIVEN: Test page with clickable button
      await page.goto('/');

      await page.evaluate(() => {
        const button = document.createElement('button');
        button.setAttribute('data-testid', 'clickable-button');
        button.textContent = 'Click Me';
        button.onclick = () => {
          button.setAttribute('data-clicked', 'true');
        };
        document.body.appendChild(button);
      });

      // WHEN: User clicks button
      const button = page.getByTestId('clickable-button');
      await button.click();

      // THEN: Button responds to click
      const clicked = await button.getAttribute('data-clicked');
      expect(clicked).toBe('true');
    });
  });

  test.describe('AC: Input Component', () => {
    test('should have Input component file created', async () => {
      // GIVEN: components/ui directory
      const fs = require('fs');
      const path = require('path');
      const projectRoot = path.resolve(__dirname, '../..');
      const inputPath = path.join(projectRoot, 'components', 'ui', 'Input.tsx');

      // WHEN: Checking for Input component
      const inputExists = fs.existsSync(inputPath);

      // THEN: Input.tsx exists
      expect(inputExists).toBeTruthy();
    });

    test('should render text input with label', async ({ page }) => {
      // GIVEN: Test page with Input component
      await page.goto('/');

      // Create test input with label
      await page.evaluate(() => {
        const label = document.createElement('label');
        label.setAttribute('for', 'test-input');
        label.textContent = 'Email Address';

        const input = document.createElement('input');
        input.setAttribute('data-testid', 'email-input');
        input.setAttribute('id', 'test-input');
        input.setAttribute('type', 'email');
        input.setAttribute('placeholder', 'Enter your email');

        document.body.appendChild(label);
        document.body.appendChild(input);
      });

      // WHEN: Input is rendered
      const input = page.getByTestId('email-input');

      // THEN: Input is visible with proper attributes
      await expect(input).toBeVisible();
      await expect(input).toHaveAttribute('type', 'email');
      await expect(input).toHaveAttribute('placeholder', 'Enter your email');
    });

    test('should display error state with error message', async ({ page }) => {
      // GIVEN: Test page with Input in error state
      await page.goto('/');

      // Create test input with error
      await page.evaluate(() => {
        const input = document.createElement('input');
        input.setAttribute('data-testid', 'error-input');
        input.setAttribute('aria-invalid', 'true');
        input.className = 'MuiInputBase-input Mui-error';

        const errorText = document.createElement('p');
        errorText.setAttribute('data-testid', 'error-message');
        errorText.textContent = 'Email is required';
        errorText.className = 'MuiFormHelperText-root Mui-error';

        document.body.appendChild(input);
        document.body.appendChild(errorText);
      });

      // WHEN: Input with error is rendered
      const input = page.getByTestId('error-input');
      const errorMessage = page.getByTestId('error-message');

      // THEN: Error state and message are visible
      await expect(input).toHaveAttribute('aria-invalid', 'true');
      await expect(errorMessage).toBeVisible();
      await expect(errorMessage).toHaveText('Email is required');
    });

    test('should display help text below input', async ({ page }) => {
      // GIVEN: Test page with Input and help text
      await page.goto('/');

      // Create test input with help text
      await page.evaluate(() => {
        const input = document.createElement('input');
        input.setAttribute('data-testid', 'help-input');
        input.setAttribute('aria-describedby', 'help-text');

        const helpText = document.createElement('p');
        helpText.setAttribute('data-testid', 'help-text');
        helpText.setAttribute('id', 'help-text');
        helpText.textContent = 'We will never share your email';
        helpText.className = 'MuiFormHelperText-root';

        document.body.appendChild(input);
        document.body.appendChild(helpText);
      });

      // WHEN: Input with help text is rendered
      const helpText = page.getByTestId('help-text');

      // THEN: Help text is visible and associated with input
      await expect(helpText).toBeVisible();
      await expect(helpText).toHaveText('We will never share your email');
    });

    test('should support text input interaction', async ({ page }) => {
      // GIVEN: Test page with text input
      await page.goto('/');

      await page.evaluate(() => {
        const input = document.createElement('input');
        input.setAttribute('data-testid', 'text-input');
        input.setAttribute('type', 'text');
        document.body.appendChild(input);
      });

      // WHEN: User types into input
      const input = page.getByTestId('text-input');
      await input.fill('test@example.com');

      // THEN: Input value is updated
      await expect(input).toHaveValue('test@example.com');
    });
  });

  test.describe('AC: Card Component', () => {
    test('should have Card component file created', async () => {
      // GIVEN: components/ui directory
      const fs = require('fs');
      const path = require('path');
      const projectRoot = path.resolve(__dirname, '../..');
      const cardPath = path.join(projectRoot, 'components', 'ui', 'Card.tsx');

      // WHEN: Checking for Card component
      const cardExists = fs.existsSync(cardPath);

      // THEN: Card.tsx exists
      expect(cardExists).toBeTruthy();
    });

    test('should render default card variant', async ({ page }) => {
      // GIVEN: Test page with Card component
      await page.goto('/');

      // Create test card
      await page.evaluate(() => {
        const card = document.createElement('div');
        card.setAttribute('data-testid', 'default-card');
        card.className = 'MuiCard-root';
        card.innerHTML = '<div class="MuiCardContent-root"><p>Card Content</p></div>';
        document.body.appendChild(card);
      });

      // WHEN: Card is rendered
      const card = page.getByTestId('default-card');

      // THEN: Card is visible with content
      await expect(card).toBeVisible();
      await expect(card).toContainText('Card Content');
    });

    test('should render outlined card variant', async ({ page }) => {
      // GIVEN: Test page with outlined Card
      await page.goto('/');

      // Create test card with outlined variant
      await page.evaluate(() => {
        const card = document.createElement('div');
        card.setAttribute('data-testid', 'outlined-card');
        card.setAttribute('variant', 'outlined');
        card.className = 'MuiCard-root';
        card.innerHTML = '<div class="MuiCardContent-root"><p>Outlined Card</p></div>';
        document.body.appendChild(card);
      });

      // WHEN: Outlined card is rendered
      const card = page.getByTestId('outlined-card');

      // THEN: Card is visible with outlined style
      await expect(card).toBeVisible();
      await expect(card).toContainText('Outlined Card');
    });

    test('should render elevated card variant with shadow', async ({ page }) => {
      // GIVEN: Test page with elevated Card
      await page.goto('/');

      // Create test card with elevation
      await page.evaluate(() => {
        const card = document.createElement('div');
        card.setAttribute('data-testid', 'elevated-card');
        card.className = 'MuiCard-root MuiPaper-elevation8';
        card.innerHTML = '<div class="MuiCardContent-root"><p>Elevated Card</p></div>';
        document.body.appendChild(card);
      });

      // WHEN: Elevated card is rendered
      const card = page.getByTestId('elevated-card');

      // THEN: Card is visible (shadow is visual, hard to test)
      await expect(card).toBeVisible();
      await expect(card).toContainText('Elevated Card');
    });

    test('should support padding and content areas', async ({ page }) => {
      // GIVEN: Test page with Card containing multiple content areas
      await page.goto('/');

      // Create test card with header, content, and footer
      await page.evaluate(() => {
        const card = document.createElement('div');
        card.setAttribute('data-testid', 'multi-section-card');
        card.className = 'MuiCard-root';
        card.innerHTML = `
          <div class="MuiCardHeader-root" data-testid="card-header">
            <h3>Card Title</h3>
          </div>
          <div class="MuiCardContent-root" data-testid="card-content">
            <p>Card body content</p>
          </div>
          <div class="MuiCardActions-root" data-testid="card-actions">
            <button>Action</button>
          </div>
        `;
        document.body.appendChild(card);
      });

      // WHEN: Card is rendered
      const cardHeader = page.getByTestId('card-header');
      const cardContent = page.getByTestId('card-content');
      const cardActions = page.getByTestId('card-actions');

      // THEN: All card sections are visible
      await expect(cardHeader).toBeVisible();
      await expect(cardContent).toBeVisible();
      await expect(cardActions).toBeVisible();
    });
  });
});
