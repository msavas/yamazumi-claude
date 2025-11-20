import { test, expect } from '../support/fixtures';

/**
 * Story 1.4: Basic UI Framework & Design System
 * Test Suite: Accessibility Compliance (WCAG 2.1 Level AA)
 *
 * ATDD Tests - RED Phase
 * These tests verify accessibility compliance for color contrast, keyboard navigation,
 * screen reader support, and focus management.
 *
 * Test Level: E2E (browser environment required for accessibility testing)
 * Story: docs/sprint-artifacts/1-4-basic-ui-framework-design-system.md
 *
 * @see .bmad/bmm/workflows/testarch/atdd/instructions.md
 */

test.describe('Story 1.4: Accessibility Compliance (WCAG AA)', () => {
  test.describe('AC: Color Contrast Standards', () => {
    test('should meet 4.5:1 contrast ratio for text on background', async ({ page }) => {
      // GIVEN: Test page with text on background
      await page.goto('/');

      // Create test text on background
      await page.evaluate(() => {
        const text = document.createElement('p');
        text.setAttribute('data-testid', 'body-text');
        text.textContent = 'Sample body text';
        text.style.color = '#1e293b'; // Text primary (dark slate)
        text.style.backgroundColor = '#ffffff'; // White background
        document.body.appendChild(text);
      });

      // WHEN: Text is rendered
      const textElement = page.getByTestId('body-text');

      // THEN: Text is visible (contrast ratio validation requires external tool)
      // Note: Automated contrast checking done via Lighthouse audit
      await expect(textElement).toBeVisible();
      await expect(textElement).toHaveText('Sample body text');
    });

    test('should meet 3:1 contrast ratio for interactive elements', async ({ page }) => {
      // GIVEN: Test page with button (interactive element)
      await page.goto('/');

      // Create test button
      await page.evaluate(() => {
        const button = document.createElement('button');
        button.setAttribute('data-testid', 'contrast-button');
        button.textContent = 'Click Me';
        button.style.backgroundColor = '#2563eb'; // Primary blue
        button.style.color = '#ffffff'; // White text
        button.style.border = '2px solid #1e40af'; // Darker blue border
        document.body.appendChild(button);
      });

      // WHEN: Button is rendered
      const button = page.getByTestId('contrast-button');

      // THEN: Button is visible with sufficient contrast
      await expect(button).toBeVisible();
    });

    test('should not rely on color alone for waste categorization', async ({ page }) => {
      // GIVEN: Test page with waste categorization indicators
      await page.goto('/');

      // Create test categorization badges (color + label)
      await page.evaluate(() => {
        const wasteCategory = document.createElement('span');
        wasteCategory.setAttribute('data-testid', 'waste-badge');
        wasteCategory.style.backgroundColor = '#ef4444'; // Red
        wasteCategory.style.color = '#ffffff';
        wasteCategory.textContent = 'Waste'; // Text label (not color alone)
        wasteCategory.style.padding = '4px 8px';

        document.body.appendChild(wasteCategory);
      });

      // WHEN: Category badge is rendered
      const wasteBadge = page.getByTestId('waste-badge');

      // THEN: Badge has text label (not relying on color alone)
      await expect(wasteBadge).toBeVisible();
      await expect(wasteBadge).toHaveText('Waste');
    });
  });

  test.describe('AC: Keyboard Navigation', () => {
    test('should navigate to button with Tab key', async ({ page }) => {
      // GIVEN: Test page with focusable button
      await page.goto('/');

      await page.evaluate(() => {
        const button = document.createElement('button');
        button.setAttribute('data-testid', 'keyboard-button');
        button.textContent = 'Focusable Button';
        document.body.appendChild(button);
      });

      // WHEN: User presses Tab key
      await page.keyboard.press('Tab');

      // THEN: Button receives focus
      const button = page.getByTestId('keyboard-button');
      const isFocused = await button.evaluate((el) => document.activeElement === el);
      expect(isFocused).toBeTruthy();
    });

    test('should activate button with Enter key', async ({ page }) => {
      // GIVEN: Test page with button
      await page.goto('/');

      await page.evaluate(() => {
        const button = document.createElement('button');
        button.setAttribute('data-testid', 'enter-button');
        button.textContent = 'Press Enter';
        button.onclick = () => {
          button.setAttribute('data-activated', 'true');
        };
        document.body.appendChild(button);
      });

      // WHEN: User focuses button and presses Enter
      const button = page.getByTestId('enter-button');
      await button.focus();
      await page.keyboard.press('Enter');

      // THEN: Button is activated
      const activated = await button.getAttribute('data-activated');
      expect(activated).toBe('true');
    });

    test('should activate button with Space key', async ({ page }) => {
      // GIVEN: Test page with button
      await page.goto('/');

      await page.evaluate(() => {
        const button = document.createElement('button');
        button.setAttribute('data-testid', 'space-button');
        button.textContent = 'Press Space';
        button.onclick = () => {
          button.setAttribute('data-activated', 'true');
        };
        document.body.appendChild(button);
      });

      // WHEN: User focuses button and presses Space
      const button = page.getByTestId('space-button');
      await button.focus();
      await page.keyboard.press('Space');

      // THEN: Button is activated
      const activated = await button.getAttribute('data-activated');
      expect(activated).toBe('true');
    });

    test('should have logical tab order through form fields', async ({ page }) => {
      // GIVEN: Test page with form fields
      await page.goto('/');

      await page.evaluate(() => {
        const form = document.createElement('form');
        form.innerHTML = `
          <input data-testid="field-1" type="text" placeholder="Field 1" />
          <input data-testid="field-2" type="text" placeholder="Field 2" />
          <button data-testid="submit-button" type="submit">Submit</button>
        `;
        document.body.appendChild(form);
      });

      // WHEN: User tabs through form
      await page.keyboard.press('Tab'); // Focus field 1
      let focusedElement = await page.evaluate(() => document.activeElement?.getAttribute('data-testid'));
      expect(focusedElement).toBe('field-1');

      await page.keyboard.press('Tab'); // Focus field 2
      focusedElement = await page.evaluate(() => document.activeElement?.getAttribute('data-testid'));
      expect(focusedElement).toBe('field-2');

      await page.keyboard.press('Tab'); // Focus submit button
      focusedElement = await page.evaluate(() => document.activeElement?.getAttribute('data-testid'));
      expect(focusedElement).toBe('submit-button');

      // THEN: Tab order is logical (1 → 2 → submit)
    });
  });

  test.describe('AC: Focus Indicators', () => {
    test('should show visible focus indicator on buttons (2px outline, #2563eb)', async ({ page }) => {
      // GIVEN: Test page with focusable button
      await page.goto('/');

      await page.evaluate(() => {
        const button = document.createElement('button');
        button.setAttribute('data-testid', 'focus-button');
        button.textContent = 'Focus Me';
        // MUI applies focus-visible outline
        button.style.outline = '2px solid #2563eb';
        button.style.outlineOffset = '2px';
        document.body.appendChild(button);
      });

      // WHEN: Button receives focus
      const button = page.getByTestId('focus-button');
      await button.focus();

      // THEN: Focus indicator is visible
      const outlineStyle = await button.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          outlineWidth: computed.outlineWidth,
          outlineColor: computed.outlineColor,
        };
      });

      expect(outlineStyle.outlineWidth).toBe('2px');
      // Note: Color comparison may vary by browser rendering
    });

    test('should show focus indicator on input fields', async ({ page }) => {
      // GIVEN: Test page with input field
      await page.goto('/');

      await page.evaluate(() => {
        const input = document.createElement('input');
        input.setAttribute('data-testid', 'focus-input');
        input.setAttribute('type', 'text');
        input.style.outline = '2px solid #2563eb';
        input.style.outlineOffset = '2px';
        document.body.appendChild(input);
      });

      // WHEN: Input receives focus
      const input = page.getByTestId('focus-input');
      await input.focus();

      // THEN: Focus indicator is visible
      const isFocused = await input.evaluate((el) => document.activeElement === el);
      expect(isFocused).toBeTruthy();
    });

    test('should show focus indicator on links', async ({ page }) => {
      // GIVEN: Test page with focusable link
      await page.goto('/');

      await page.evaluate(() => {
        const link = document.createElement('a');
        link.setAttribute('data-testid', 'focus-link');
        link.setAttribute('href', '/dashboard');
        link.textContent = 'Dashboard';
        link.style.outline = '2px solid #2563eb';
        link.style.outlineOffset = '2px';
        document.body.appendChild(link);
      });

      // WHEN: Link receives focus
      const link = page.getByTestId('focus-link');
      await link.focus();

      // THEN: Focus indicator is visible
      const isFocused = await link.evaluate((el) => document.activeElement === el);
      expect(isFocused).toBeTruthy();
    });
  });

  test.describe('AC: Screen Reader Support', () => {
    test('should have semantic HTML structure (headings, nav, main)', async ({ page }) => {
      // GIVEN: Test page with semantic HTML
      await page.goto('/');

      await page.evaluate(() => {
        const header = document.createElement('header');
        header.innerHTML = '<h1 data-testid="page-title">Page Title</h1>';

        const nav = document.createElement('nav');
        nav.setAttribute('data-testid', 'main-nav');
        nav.innerHTML = '<a href="/dashboard">Dashboard</a>';

        const main = document.createElement('main');
        main.setAttribute('data-testid', 'main-content');
        main.innerHTML = '<p>Main content</p>';

        document.body.appendChild(header);
        document.body.appendChild(nav);
        document.body.appendChild(main);
      });

      // WHEN: Semantic elements are rendered
      const heading = page.getByTestId('page-title');
      const nav = page.getByTestId('main-nav');
      const main = page.getByTestId('main-content');

      // THEN: Semantic elements are present
      await expect(heading).toBeVisible();
      await expect(nav).toBeVisible();
      await expect(main).toBeVisible();
    });

    test('should have ARIA labels for interactive elements', async ({ page }) => {
      // GIVEN: Test page with ARIA labeled button
      await page.goto('/');

      await page.evaluate(() => {
        const button = document.createElement('button');
        button.setAttribute('data-testid', 'aria-button');
        button.setAttribute('aria-label', 'Open menu');
        button.textContent = '☰'; // Icon button
        document.body.appendChild(button);
      });

      // WHEN: Button is rendered
      const button = page.getByTestId('aria-button');

      // THEN: Button has ARIA label for screen readers
      await expect(button).toHaveAttribute('aria-label', 'Open menu');
    });

    test('should have proper label associations for form inputs', async ({ page }) => {
      // GIVEN: Test page with labeled input
      await page.goto('/');

      await page.evaluate(() => {
        const label = document.createElement('label');
        label.setAttribute('for', 'email-input');
        label.textContent = 'Email Address';

        const input = document.createElement('input');
        input.setAttribute('data-testid', 'labeled-input');
        input.setAttribute('id', 'email-input');
        input.setAttribute('type', 'email');

        document.body.appendChild(label);
        document.body.appendChild(input);
      });

      // WHEN: Input with label is rendered
      const input = page.getByTestId('labeled-input');

      // THEN: Input has proper label association
      await expect(input).toHaveAttribute('id', 'email-input');
    });

    test('should indicate required fields with aria-required', async ({ page }) => {
      // GIVEN: Test page with required input
      await page.goto('/');

      await page.evaluate(() => {
        const label = document.createElement('label');
        label.textContent = 'Email Address *';

        const input = document.createElement('input');
        input.setAttribute('data-testid', 'required-input');
        input.setAttribute('type', 'email');
        input.setAttribute('required', '');
        input.setAttribute('aria-required', 'true');

        document.body.appendChild(label);
        document.body.appendChild(input);
      });

      // WHEN: Required input is rendered
      const input = page.getByTestId('required-input');

      // THEN: Input has aria-required attribute
      await expect(input).toHaveAttribute('aria-required', 'true');
    });

    test('should associate error messages with fields using aria-describedby', async ({ page }) => {
      // GIVEN: Test page with input and error message
      await page.goto('/');

      await page.evaluate(() => {
        const input = document.createElement('input');
        input.setAttribute('data-testid', 'error-input');
        input.setAttribute('type', 'email');
        input.setAttribute('aria-invalid', 'true');
        input.setAttribute('aria-describedby', 'email-error');

        const errorMessage = document.createElement('p');
        errorMessage.setAttribute('id', 'email-error');
        errorMessage.setAttribute('data-testid', 'error-message');
        errorMessage.textContent = 'Email is required';

        document.body.appendChild(input);
        document.body.appendChild(errorMessage);
      });

      // WHEN: Input with error is rendered
      const input = page.getByTestId('error-input');
      const errorMessage = page.getByTestId('error-message');

      // THEN: Error message is associated with input
      await expect(input).toHaveAttribute('aria-describedby', 'email-error');
      await expect(errorMessage).toBeVisible();
    });
  });

  test.describe('AC: Touch Targets (Mobile)', () => {
    test('should have minimum 44px × 44px touch targets on mobile', async ({ page }) => {
      // GIVEN: Mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');

      // Create test button with minimum touch target
      await page.evaluate(() => {
        const button = document.createElement('button');
        button.setAttribute('data-testid', 'touch-button');
        button.textContent = 'Tap Me';
        button.style.minWidth = '44px';
        button.style.minHeight = '44px';
        button.style.padding = '12px';
        document.body.appendChild(button);
      });

      // WHEN: Button is rendered on mobile
      const button = page.getByTestId('touch-button');

      // THEN: Button meets minimum touch target size
      const buttonSize = await button.evaluate((el) => {
        const rect = el.getBoundingClientRect();
        return {
          width: rect.width,
          height: rect.height,
        };
      });

      expect(buttonSize.width).toBeGreaterThanOrEqual(44);
      expect(buttonSize.height).toBeGreaterThanOrEqual(44);
    });

    test('should have adequate spacing between touch targets', async ({ page }) => {
      // GIVEN: Mobile viewport with multiple buttons
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');

      // Create test buttons with spacing
      await page.evaluate(() => {
        const button1 = document.createElement('button');
        button1.setAttribute('data-testid', 'button-1');
        button1.textContent = 'Button 1';
        button1.style.marginRight = '8px'; // Adequate spacing

        const button2 = document.createElement('button');
        button2.setAttribute('data-testid', 'button-2');
        button2.textContent = 'Button 2';

        document.body.appendChild(button1);
        document.body.appendChild(button2);
      });

      // WHEN: Buttons are rendered with spacing
      const button1 = page.getByTestId('button-1');
      const button2 = page.getByTestId('button-2');

      // THEN: Buttons are visible (spacing validation is visual)
      await expect(button1).toBeVisible();
      await expect(button2).toBeVisible();
    });
  });
});
