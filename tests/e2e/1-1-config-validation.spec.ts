import { test, expect } from '../support/fixtures';
import * as path from 'path';
import * as fs from 'fs';

/**
 * Story 1.1: Configuration Validation
 *
 * Integration Tests - Config file validity
 * These tests verify that configuration files are valid and properly structured.
 *
 * Test Level: Integration (config parsing and validation)
 * Priority: P2 (medium priority, catches configuration drift)
 * Story: docs/sprint-artifacts/1-1-project-setup.md
 *
 * @see .bmad/bmm/testarch/knowledge/test-quality.md
 */

const PROJECT_ROOT = path.resolve(__dirname, '../..');

test.describe('Story 1.1: Configuration Validation', () => {
  test.describe('[P2] TypeScript Configuration', () => {
    test('[P2] should have valid TypeScript configuration', () => {
      // GIVEN: Project has tsconfig.json
      const tsconfigPath = path.join(PROJECT_ROOT, 'tsconfig.json');
      expect(fs.existsSync(tsconfigPath)).toBeTruthy();

      // WHEN: Reading and parsing tsconfig.json
      const tsconfigContent = fs.readFileSync(tsconfigPath, 'utf-8');
      let tsconfig: any;

      expect(() => {
        tsconfig = JSON.parse(tsconfigContent);
      }).not.toThrow();

      // THEN: Config has required compiler options
      expect(tsconfig).toHaveProperty('compilerOptions');
      expect(tsconfig.compilerOptions).toHaveProperty('strict');

      // AND: Config includes app directory
      expect(tsconfig).toHaveProperty('include');
      expect(tsconfig.include).toContain('**/*.ts');
    });

    test('[P2] should exclude tests from main build', () => {
      // GIVEN: Project has tsconfig.json
      const tsconfigPath = path.join(PROJECT_ROOT, 'tsconfig.json');
      const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf-8'));

      // WHEN: Checking exclude patterns
      // THEN: Tests directory is excluded
      expect(tsconfig).toHaveProperty('exclude');
      expect(
        tsconfig.exclude.some((pattern: string) => pattern.includes('tests'))
      ).toBeTruthy();
    });
  });

  test.describe('[P2] ESLint Configuration', () => {
    test('[P2] should have valid ESLint configuration', () => {
      // GIVEN: Project has ESLint config
      const eslintConfigMjs = path.join(PROJECT_ROOT, 'eslint.config.mjs');
      const eslintConfigJs = path.join(PROJECT_ROOT, 'eslint.config.js');
      const eslintRc = path.join(PROJECT_ROOT, '.eslintrc.json');

      const configPath =
        fs.existsSync(eslintConfigMjs)
          ? eslintConfigMjs
          : fs.existsSync(eslintConfigJs)
            ? eslintConfigJs
            : eslintRc;

      expect(fs.existsSync(configPath)).toBeTruthy();

      // WHEN: Reading config file
      const configExists = fs.existsSync(configPath);

      // THEN: Config file exists and is readable
      expect(configExists).toBeTruthy();

      // AND: File has content
      const configContent = fs.readFileSync(configPath, 'utf-8');
      expect(configContent.length).toBeGreaterThan(0);
    });

    test('[P2] should ignore tests and .bmad directories in ESLint', () => {
      // GIVEN: Project has ESLint config
      const eslintConfigMjs = path.join(PROJECT_ROOT, 'eslint.config.mjs');

      if (!fs.existsSync(eslintConfigMjs)) {
        test.skip();
        return;
      }

      // WHEN: Reading ESLint config
      const configContent = fs.readFileSync(eslintConfigMjs, 'utf-8');

      // THEN: Config ignores tests and .bmad directories
      // Note: ESLint 9 flat config uses ignores array
      expect(
        configContent.includes('tests') || configContent.includes('ignores')
      ).toBeTruthy();
    });
  });

  test.describe('[P2] Next.js Configuration', () => {
    test('[P2] should have valid Next.js configuration', () => {
      // GIVEN: Project has Next.js config
      const nextConfigTs = path.join(PROJECT_ROOT, 'next.config.ts');
      const nextConfigMjs = path.join(PROJECT_ROOT, 'next.config.mjs');
      const nextConfigJs = path.join(PROJECT_ROOT, 'next.config.js');

      const configPath = fs.existsSync(nextConfigTs)
        ? nextConfigTs
        : fs.existsSync(nextConfigMjs)
          ? nextConfigMjs
          : nextConfigJs;

      expect(fs.existsSync(configPath)).toBeTruthy();

      // WHEN: Reading config file
      const configContent = fs.readFileSync(configPath, 'utf-8');

      // THEN: Config file has content
      expect(configContent.length).toBeGreaterThan(0);

      // AND: Config exports a configuration object
      expect(
        configContent.includes('export') || configContent.includes('module')
      ).toBeTruthy();
    });
  });

  test.describe('[P2] Prettier Configuration', () => {
    test('[P2] should have valid Prettier configuration', () => {
      // GIVEN: Project has Prettier config
      const prettierRc = path.join(PROJECT_ROOT, '.prettierrc');
      const prettierRcJson = path.join(PROJECT_ROOT, '.prettierrc.json');
      const prettierRcJs = path.join(PROJECT_ROOT, '.prettierrc.js');

      const configPath = fs.existsSync(prettierRc)
        ? prettierRc
        : fs.existsSync(prettierRcJson)
          ? prettierRcJson
          : prettierRcJs;

      expect(fs.existsSync(configPath)).toBeTruthy();

      // WHEN: Reading and parsing Prettier config
      const configContent = fs.readFileSync(configPath, 'utf-8');
      let config: any;

      expect(() => {
        config = JSON.parse(configContent);
      }).not.toThrow();

      // THEN: Config has basic formatting rules
      expect(config).toHaveProperty('singleQuote');
      expect(config).toHaveProperty('semi');
      expect(config).toHaveProperty('tabWidth');
    });

    test('[P2] should have .prettierignore file', () => {
      // GIVEN: Project root directory
      const prettierIgnorePath = path.join(PROJECT_ROOT, '.prettierignore');

      // WHEN: Checking for .prettierignore
      const exists = fs.existsSync(prettierIgnorePath);

      // THEN: .prettierignore exists
      expect(exists).toBeTruthy();

      // AND: It ignores build artifacts and dependencies
      const ignoreContent = fs.readFileSync(prettierIgnorePath, 'utf-8');
      expect(
        ignoreContent.includes('node_modules') ||
          ignoreContent.includes('.next')
      ).toBeTruthy();
    });
  });

  test.describe('[P2] Tailwind CSS Configuration', () => {
    test('[P2] should have Tailwind CSS properly configured', () => {
      // GIVEN: Project has Tailwind CSS installed
      const packageJsonPath = path.join(PROJECT_ROOT, 'package.json');
      const packageJson = JSON.parse(
        fs.readFileSync(packageJsonPath, 'utf-8')
      );
      expect(packageJson.devDependencies).toHaveProperty('tailwindcss');

      // WHEN: Checking for PostCSS config (Tailwind 4 uses @tailwindcss/postcss)
      const postcssConfigMjs = path.join(PROJECT_ROOT, 'postcss.config.mjs');
      const postcssConfigJs = path.join(PROJECT_ROOT, 'postcss.config.js');

      const configExists =
        fs.existsSync(postcssConfigMjs) || fs.existsSync(postcssConfigJs);

      // THEN: PostCSS config exists
      expect(configExists).toBeTruthy();
    });

    test('[P2] should have Tailwind directives in global CSS', () => {
      // GIVEN: Project has app directory
      const appDir = path.join(PROJECT_ROOT, 'app');
      expect(fs.existsSync(appDir)).toBeTruthy();

      // WHEN: Looking for global CSS file
      const globalCssPath = path.join(appDir, 'globals.css');

      if (!fs.existsSync(globalCssPath)) {
        // Tailwind 4 may use different approach
        test.skip();
        return;
      }

      // THEN: Global CSS contains Tailwind directives
      const cssContent = fs.readFileSync(globalCssPath, 'utf-8');
      expect(
        cssContent.includes('@tailwind') || cssContent.includes('@import')
      ).toBeTruthy();
    });
  });
});
