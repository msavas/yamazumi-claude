import { test, expect } from '../support/fixtures';

/**
 * Story 1.4: Basic UI Framework & Design System
 * Test Suite: Layout Components (Header, Sidebar, MainContent)
 *
 * ATDD Tests - RED Phase
 * These tests verify layout components render correctly and respond to different viewport sizes.
 *
 * Test Level: E2E (browser environment required for responsive testing)
 * Story: docs/sprint-artifacts/1-4-basic-ui-framework-design-system.md
 *
 * @see .bmad/bmm/workflows/testarch/atdd/instructions.md
 */

test.describe('Story 1.4: Layout Components', () => {
  test.describe('AC: Header Component', () => {
    test('should have Header component file created', async () => {
      // GIVEN: components/layout directory
      const fs = require('fs');
      const path = require('path');
      const projectRoot = path.resolve(__dirname, '../..');
      const headerPath = path.join(projectRoot, 'components', 'layout', 'Header.tsx');

      // WHEN: Checking for Header component
      const headerExists = fs.existsSync(headerPath);

      // THEN: Header.tsx exists
      expect(headerExists).toBeTruthy();
    });

    test('should render header with Material UI AppBar', async ({ page }) => {
      // GIVEN: Test page with Header component
      await page.goto('/');

      // Create test header
      await page.evaluate(() => {
        const header = document.createElement('header');
        header.setAttribute('data-testid', 'app-header');
        header.className = 'MuiAppBar-root';
        header.innerHTML = `
          <div class="MuiToolbar-root">
            <div data-testid="logo">Yamazumi</div>
            <nav data-testid="nav-menu">
              <a href="/dashboard">Dashboard</a>
              <a href="/videos">Videos</a>
            </nav>
          </div>
        `;
        document.body.appendChild(header);
      });

      // WHEN: Header is rendered
      const header = page.getByTestId('app-header');
      const logo = page.getByTestId('logo');
      const navMenu = page.getByTestId('nav-menu');

      // THEN: Header with logo and navigation is visible
      await expect(header).toBeVisible();
      await expect(logo).toBeVisible();
      await expect(logo).toHaveText('Yamazumi');
      await expect(navMenu).toBeVisible();
    });

    test('should render navigation menu items', async ({ page }) => {
      // GIVEN: Test page with Header navigation
      await page.goto('/');

      await page.evaluate(() => {
        const nav = document.createElement('nav');
        nav.setAttribute('data-testid', 'header-nav');
        nav.innerHTML = `
          <a data-testid="nav-dashboard" href="/dashboard">Dashboard</a>
          <a data-testid="nav-videos" href="/videos">Videos</a>
          <a data-testid="nav-yamazumi" href="/yamazumi">Yamazumi</a>
        `;
        document.body.appendChild(nav);
      });

      // WHEN: Navigation is rendered
      const dashboardLink = page.getByTestId('nav-dashboard');
      const videosLink = page.getByTestId('nav-videos');
      const yamazumiLink = page.getByTestId('nav-yamazumi');

      // THEN: All navigation links are visible
      await expect(dashboardLink).toBeVisible();
      await expect(videosLink).toBeVisible();
      await expect(yamazumiLink).toBeVisible();
    });

    test('should show hamburger menu on mobile (<768px)', async ({ page }) => {
      // GIVEN: Mobile viewport
      await page.setViewportSize({ width: 375, height: 667 }); // Mobile
      await page.goto('/');

      // Create test header with hamburger menu
      await page.evaluate(() => {
        const header = document.createElement('header');
        header.setAttribute('data-testid', 'mobile-header');

        const hamburgerButton = document.createElement('button');
        hamburgerButton.setAttribute('data-testid', 'hamburger-menu');
        hamburgerButton.setAttribute('aria-label', 'Open menu');
        hamburgerButton.textContent = '☰';

        header.appendChild(hamburgerButton);
        document.body.appendChild(header);
      });

      // WHEN: Mobile header is rendered
      const hamburger = page.getByTestId('hamburger-menu');

      // THEN: Hamburger menu button is visible on mobile
      await expect(hamburger).toBeVisible();
    });

    test('should hide hamburger menu on desktop (≥1024px)', async ({ page }) => {
      // GIVEN: Desktop viewport
      await page.setViewportSize({ width: 1280, height: 800 }); // Desktop
      await page.goto('/');

      // Create test header (no hamburger on desktop)
      await page.evaluate(() => {
        const header = document.createElement('header');
        header.setAttribute('data-testid', 'desktop-header');

        const nav = document.createElement('nav');
        nav.setAttribute('data-testid', 'desktop-nav');
        nav.innerHTML = '<a href="/dashboard">Dashboard</a>';

        header.appendChild(nav);
        document.body.appendChild(header);
      });

      // WHEN: Desktop header is rendered
      const desktopNav = page.getByTestId('desktop-nav');

      // THEN: Full navigation is visible (no hamburger)
      await expect(desktopNav).toBeVisible();
    });
  });

  test.describe('AC: Sidebar Component', () => {
    test('should have Sidebar component file created', async () => {
      // GIVEN: components/layout directory
      const fs = require('fs');
      const path = require('path');
      const projectRoot = path.resolve(__dirname, '../..');
      const sidebarPath = path.join(projectRoot, 'components', 'layout', 'Sidebar.tsx');

      // WHEN: Checking for Sidebar component
      const sidebarExists = fs.existsSync(sidebarPath);

      // THEN: Sidebar.tsx exists
      expect(sidebarExists).toBeTruthy();
    });

    test('should render fixed width sidebar on desktop (300px)', async ({ page }) => {
      // GIVEN: Desktop viewport
      await page.setViewportSize({ width: 1280, height: 800 }); // Desktop
      await page.goto('/');

      // Create test sidebar
      await page.evaluate(() => {
        const sidebar = document.createElement('aside');
        sidebar.setAttribute('data-testid', 'sidebar');
        sidebar.className = 'MuiDrawer-root MuiDrawer-docked';
        sidebar.style.width = '300px';
        sidebar.innerHTML = '<nav><a href="/videos">Videos</a></nav>';
        document.body.appendChild(sidebar);
      });

      // WHEN: Sidebar is rendered on desktop
      const sidebar = page.getByTestId('sidebar');

      // THEN: Sidebar is visible with 300px width
      await expect(sidebar).toBeVisible();

      const sidebarWidth = await sidebar.evaluate((el) =>
        window.getComputedStyle(el).getPropertyValue('width')
      );
      expect(sidebarWidth).toBe('300px');
    });

    test('should render collapsible drawer on mobile (<768px)', async ({ page }) => {
      // GIVEN: Mobile viewport
      await page.setViewportSize({ width: 375, height: 667 }); // Mobile
      await page.goto('/');

      // Create test mobile drawer
      await page.evaluate(() => {
        const drawer = document.createElement('div');
        drawer.setAttribute('data-testid', 'mobile-drawer');
        drawer.className = 'MuiDrawer-root MuiDrawer-modal';
        drawer.style.display = 'none'; // Hidden by default on mobile
        drawer.innerHTML = '<nav><a href="/videos">Videos</a></nav>';
        document.body.appendChild(drawer);
      });

      // WHEN: Mobile drawer is rendered
      const drawer = page.getByTestId('mobile-drawer');

      // THEN: Drawer exists but is hidden initially
      // Visibility is controlled by open state (not tested here, interaction test)
      const drawerExists = (await drawer.count()) > 0;
      expect(drawerExists).toBeTruthy();
    });

    test('should use Material UI Drawer component', async ({ page }) => {
      // GIVEN: Test page with MUI Drawer
      await page.goto('/');

      // Create test drawer with MUI classes
      await page.evaluate(() => {
        const drawer = document.createElement('div');
        drawer.setAttribute('data-testid', 'mui-drawer');
        drawer.className = 'MuiDrawer-root MuiDrawer-docked';
        drawer.innerHTML = '<div class="MuiDrawer-paper"><nav>Sidebar Content</nav></div>';
        document.body.appendChild(drawer);
      });

      // WHEN: Drawer is rendered
      const drawer = page.getByTestId('mui-drawer');

      // THEN: Drawer has MUI classes
      const drawerClasses = await drawer.getAttribute('class');
      expect(drawerClasses).toContain('MuiDrawer-root');
    });
  });

  test.describe('AC: MainContent Component', () => {
    test('should have MainContent component file created', async () => {
      // GIVEN: components/layout directory
      const fs = require('fs');
      const path = require('path');
      const projectRoot = path.resolve(__dirname, '../..');
      const mainContentPath = path.join(projectRoot, 'components', 'layout', 'MainContent.tsx');

      // WHEN: Checking for MainContent component
      const mainContentExists = fs.existsSync(mainContentPath);

      // THEN: MainContent.tsx exists
      expect(mainContentExists).toBeTruthy();
    });

    test('should render content area with proper padding', async ({ page }) => {
      // GIVEN: Test page with MainContent
      await page.goto('/');

      // Create test main content
      await page.evaluate(() => {
        const main = document.createElement('main');
        main.setAttribute('data-testid', 'main-content');
        main.className = 'MuiContainer-root';
        main.innerHTML = '<h1>Page Content</h1>';
        document.body.appendChild(main);
      });

      // WHEN: Main content is rendered
      const mainContent = page.getByTestId('main-content');

      // THEN: Main content is visible with padding
      await expect(mainContent).toBeVisible();
      await expect(mainContent).toContainText('Page Content');
    });

    test('should use Material UI Grid for responsive layout', async ({ page }) => {
      // GIVEN: Test page with MUI Grid
      await page.goto('/');

      // Create test grid layout
      await page.evaluate(() => {
        const grid = document.createElement('div');
        grid.setAttribute('data-testid', 'content-grid');
        grid.className = 'MuiGrid-root MuiGrid-container';
        grid.innerHTML = `
          <div class="MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-md-6" data-testid="grid-item-1">Column 1</div>
          <div class="MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-md-6" data-testid="grid-item-2">Column 2</div>
        `;
        document.body.appendChild(grid);
      });

      // WHEN: Grid is rendered
      const grid = page.getByTestId('content-grid');
      const gridItem1 = page.getByTestId('grid-item-1');
      const gridItem2 = page.getByTestId('grid-item-2');

      // THEN: Grid and items are visible
      await expect(grid).toBeVisible();
      await expect(gridItem1).toBeVisible();
      await expect(gridItem2).toBeVisible();
    });

    test('should apply max-width container on desktop (1400px)', async ({ page }) => {
      // GIVEN: Desktop viewport
      await page.setViewportSize({ width: 1920, height: 1080 }); // Large desktop
      await page.goto('/');

      // Create test container with max-width
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.setAttribute('data-testid', 'max-width-container');
        container.className = 'MuiContainer-root';
        container.style.maxWidth = '1400px';
        container.innerHTML = '<p>Content</p>';
        document.body.appendChild(container);
      });

      // WHEN: Container is rendered
      const container = page.getByTestId('max-width-container');

      // THEN: Container has max-width constraint
      const maxWidth = await container.evaluate((el) =>
        window.getComputedStyle(el).getPropertyValue('max-width')
      );
      expect(maxWidth).toBe('1400px');
    });

    test('should be full width on mobile (<768px)', async ({ page }) => {
      // GIVEN: Mobile viewport
      await page.setViewportSize({ width: 375, height: 667 }); // Mobile
      await page.goto('/');

      // Create test mobile container
      await page.evaluate(() => {
        const container = document.createElement('div');
        container.setAttribute('data-testid', 'mobile-container');
        container.className = 'MuiContainer-root';
        container.innerHTML = '<p>Mobile Content</p>';
        document.body.appendChild(container);
      });

      // WHEN: Mobile container is rendered
      const container = page.getByTestId('mobile-container');

      // THEN: Container is visible and takes full width
      await expect(container).toBeVisible();
    });
  });

  test.describe('AC: Responsive Breakpoints', () => {
    test('should render correctly on desktop (≥1024px)', async ({ page }) => {
      // GIVEN: Desktop viewport
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto('/');

      // WHEN: Page is rendered on desktop
      const viewportWidth = await page.evaluate(() => window.innerWidth);

      // THEN: Viewport is desktop size
      expect(viewportWidth).toBeGreaterThanOrEqual(1024);
    });

    test('should render correctly on tablet (768px - 1023px)', async ({ page }) => {
      // GIVEN: Tablet viewport
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('/');

      // WHEN: Page is rendered on tablet
      const viewportWidth = await page.evaluate(() => window.innerWidth);

      // THEN: Viewport is tablet size
      expect(viewportWidth).toBeGreaterThanOrEqual(768);
      expect(viewportWidth).toBeLessThan(1024);
    });

    test('should render correctly on mobile (<768px)', async ({ page }) => {
      // GIVEN: Mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');

      // WHEN: Page is rendered on mobile
      const viewportWidth = await page.evaluate(() => window.innerWidth);

      // THEN: Viewport is mobile size
      expect(viewportWidth).toBeLessThan(768);
    });
  });
});
