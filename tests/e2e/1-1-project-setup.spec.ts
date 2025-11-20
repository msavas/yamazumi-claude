import { test, expect } from '../support/fixtures';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Story 1.1: Project Setup & Repository Structure
 *
 * ATDD Tests - RED Phase
 * These tests verify the acceptance criteria for Story 1.1.
 * All tests should FAIL initially (missing implementation).
 *
 * Test Level: E2E (infrastructure validation)
 * Story: docs/sprint-artifacts/1-1-project-setup.md
 *
 * @see .bmad/bmm/workflows/testarch/atdd/instructions.md
 */

const PROJECT_ROOT = path.resolve(__dirname, '../..');

test.describe('Story 1.1: Project Setup & Repository Structure', () => {
  test.describe('AC1: Next.js 15 with App Router configured', () => {
    test('should have package.json with Next.js 15 dependency', () => {
      // GIVEN: Project root directory
      const packageJsonPath = path.join(PROJECT_ROOT, 'package.json');

      // WHEN: Reading package.json
      const packageJsonExists = fs.existsSync(packageJsonPath);
      expect(packageJsonExists).toBeTruthy();

      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

      // THEN: Next.js 15 is listed in dependencies
      expect(packageJson.dependencies).toHaveProperty('next');
      expect(packageJson.dependencies.next).toMatch(/^15\./);
    });

    test('should have next.config.js or next.config.mjs', () => {
      // GIVEN: Project root directory
      const nextConfigJs = path.join(PROJECT_ROOT, 'next.config.js');
      const nextConfigMjs = path.join(PROJECT_ROOT, 'next.config.mjs');

      // WHEN: Checking for Next.js config
      const hasNextConfig = fs.existsSync(nextConfigJs) || fs.existsSync(nextConfigMjs);

      // THEN: Next.js config file exists
      expect(hasNextConfig).toBeTruthy();
    });

    test('should have app/ directory for App Router', () => {
      // GIVEN: Project root directory
      const appDirPath = path.join(PROJECT_ROOT, 'app');

      // WHEN: Checking for app directory
      const appDirExists = fs.existsSync(appDirPath);

      // THEN: app/ directory exists
      expect(appDirExists).toBeTruthy();

      // AND: It is a directory (not a file)
      const stats = fs.statSync(appDirPath);
      expect(stats.isDirectory()).toBeTruthy();
    });
  });

  test.describe('AC2: TypeScript configuration', () => {
    test('should have tsconfig.json', () => {
      // GIVEN: Project root directory
      const tsconfigPath = path.join(PROJECT_ROOT, 'tsconfig.json');

      // WHEN: Checking for TypeScript config
      const tsconfigExists = fs.existsSync(tsconfigPath);

      // THEN: tsconfig.json exists
      expect(tsconfigExists).toBeTruthy();
    });

    test('should have TypeScript in devDependencies', () => {
      // GIVEN: Project root directory
      const packageJsonPath = path.join(PROJECT_ROOT, 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

      // WHEN: Reading package.json
      // (already read above)

      // THEN: TypeScript is in devDependencies
      expect(packageJson.devDependencies).toHaveProperty('typescript');
    });

    test('should have @types/node and @types/react in devDependencies', () => {
      // GIVEN: Project root directory
      const packageJsonPath = path.join(PROJECT_ROOT, 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

      // WHEN: Reading package.json
      // (already read above)

      // THEN: Type definitions are installed
      expect(packageJson.devDependencies).toHaveProperty('@types/node');
      expect(packageJson.devDependencies).toHaveProperty('@types/react');
    });
  });

  test.describe('AC3: ESLint and Prettier setup', () => {
    test('should have .eslintrc.json or eslint.config.js', () => {
      // GIVEN: Project root directory
      const eslintrcJson = path.join(PROJECT_ROOT, '.eslintrc.json');
      const eslintConfigJs = path.join(PROJECT_ROOT, 'eslint.config.js');
      const eslintConfigMjs = path.join(PROJECT_ROOT, 'eslint.config.mjs');

      // WHEN: Checking for ESLint config
      const hasEslintConfig =
        fs.existsSync(eslintrcJson) ||
        fs.existsSync(eslintConfigJs) ||
        fs.existsSync(eslintConfigMjs);

      // THEN: ESLint config file exists
      expect(hasEslintConfig).toBeTruthy();
    });

    test('should have eslint in devDependencies', () => {
      // GIVEN: Project root directory
      const packageJsonPath = path.join(PROJECT_ROOT, 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

      // WHEN: Reading package.json
      // (already read above)

      // THEN: ESLint is in devDependencies
      expect(packageJson.devDependencies).toHaveProperty('eslint');
    });

    test('should have .prettierrc config file', () => {
      // GIVEN: Project root directory
      const prettierrcPath = path.join(PROJECT_ROOT, '.prettierrc');
      const prettierrcJson = path.join(PROJECT_ROOT, '.prettierrc.json');
      const prettierrcJs = path.join(PROJECT_ROOT, '.prettierrc.js');

      // WHEN: Checking for Prettier config
      const hasPrettierConfig =
        fs.existsSync(prettierrcPath) ||
        fs.existsSync(prettierrcJson) ||
        fs.existsSync(prettierrcJs);

      // THEN: Prettier config file exists
      expect(hasPrettierConfig).toBeTruthy();
    });

    test('should have prettier in devDependencies', () => {
      // GIVEN: Project root directory
      const packageJsonPath = path.join(PROJECT_ROOT, 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

      // WHEN: Reading package.json
      // (already read above)

      // THEN: Prettier is in devDependencies
      expect(packageJson.devDependencies).toHaveProperty('prettier');
    });
  });

  test.describe('AC4: Basic folder structure', () => {
    test('should have app/ directory', () => {
      // GIVEN: Project root directory
      const appPath = path.join(PROJECT_ROOT, 'app');

      // WHEN: Checking for app directory
      const appExists = fs.existsSync(appPath);

      // THEN: app/ directory exists
      expect(appExists).toBeTruthy();
      expect(fs.statSync(appPath).isDirectory()).toBeTruthy();
    });

    test('should have components/ directory', () => {
      // GIVEN: Project root directory
      const componentsPath = path.join(PROJECT_ROOT, 'components');

      // WHEN: Checking for components directory
      const componentsExists = fs.existsSync(componentsPath);

      // THEN: components/ directory exists
      expect(componentsExists).toBeTruthy();
      expect(fs.statSync(componentsPath).isDirectory()).toBeTruthy();
    });

    test('should have lib/ directory', () => {
      // GIVEN: Project root directory
      const libPath = path.join(PROJECT_ROOT, 'lib');

      // WHEN: Checking for lib directory
      const libExists = fs.existsSync(libPath);

      // THEN: lib/ directory exists
      expect(libExists).toBeTruthy();
      expect(fs.statSync(libPath).isDirectory()).toBeTruthy();
    });

    test('should have types/ directory', () => {
      // GIVEN: Project root directory
      const typesPath = path.join(PROJECT_ROOT, 'types');

      // WHEN: Checking for types directory
      const typesExists = fs.existsSync(typesPath);

      // THEN: types/ directory exists
      expect(typesExists).toBeTruthy();
      expect(fs.statSync(typesPath).isDirectory()).toBeTruthy();
    });
  });

  test.describe('AC5: Package.json with core dependencies', () => {
    test('should have required core dependencies', () => {
      // GIVEN: Project root directory
      const packageJsonPath = path.join(PROJECT_ROOT, 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

      // WHEN: Reading package.json
      // (already read above)

      // THEN: Core dependencies are listed
      expect(packageJson.dependencies).toHaveProperty('next');
      expect(packageJson.dependencies).toHaveProperty('react');
      expect(packageJson.dependencies).toHaveProperty('react-dom');
    });

    test('should have Tailwind CSS dependencies', () => {
      // GIVEN: Project root directory
      const packageJsonPath = path.join(PROJECT_ROOT, 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

      // WHEN: Reading package.json
      // (already read above)

      // THEN: Tailwind CSS is configured
      expect(packageJson.devDependencies).toHaveProperty('tailwindcss');
      expect(packageJson.devDependencies).toHaveProperty('postcss');
      expect(packageJson.devDependencies).toHaveProperty('autoprefixer');
    });
  });

  test.describe('AC6: README with setup instructions', () => {
    test('should have README.md file', () => {
      // GIVEN: Project root directory
      const readmePath = path.join(PROJECT_ROOT, 'README.md');

      // WHEN: Checking for README
      const readmeExists = fs.existsSync(readmePath);

      // THEN: README.md exists
      expect(readmeExists).toBeTruthy();
    });

    test('should have setup instructions in README', () => {
      // GIVEN: Project root directory
      const readmePath = path.join(PROJECT_ROOT, 'README.md');
      const readmeContent = fs.readFileSync(readmePath, 'utf-8');

      // WHEN: Reading README content
      // (already read above)

      // THEN: README contains setup instructions
      expect(readmeContent).toContain('npm install');
      expect(readmeContent).toContain('npm run dev');
    });
  });

  test.describe('AC7: Project can start with npm run dev', () => {
    test('should have dev script in package.json', () => {
      // GIVEN: Project root directory
      const packageJsonPath = path.join(PROJECT_ROOT, 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

      // WHEN: Reading package.json scripts
      // (already read above)

      // THEN: dev script exists
      expect(packageJson.scripts).toHaveProperty('dev');
      expect(packageJson.scripts.dev).toContain('next dev');
    });

    // Note: Actual server start test would require process spawning
    // This is better tested manually or in integration tests
    test.skip('should start dev server on port 3000', async () => {
      // This test would spawn `npm run dev` and verify server starts
      // Skipped for now - will be implemented when needed
    });
  });

  test.describe('AC8: TypeScript compilation succeeds', () => {
    test('should have build script in package.json', () => {
      // GIVEN: Project root directory
      const packageJsonPath = path.join(PROJECT_ROOT, 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

      // WHEN: Reading package.json scripts
      // (already read above)

      // THEN: build script exists
      expect(packageJson.scripts).toHaveProperty('build');
      expect(packageJson.scripts.build).toContain('next build');
    });

    // Note: Actual build test would require executing npm run build
    // This is better tested in CI or manually
    test.skip('should compile TypeScript without errors', async () => {
      // This test would run `npm run build` and verify exit code 0
      // Skipped for now - will be implemented when needed
    });
  });

  test.describe('AC9: Linting passes', () => {
    test('should have lint script in package.json', () => {
      // GIVEN: Project root directory
      const packageJsonPath = path.join(PROJECT_ROOT, 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

      // WHEN: Reading package.json scripts
      // (already read above)

      // THEN: lint script exists
      expect(packageJson.scripts).toHaveProperty('lint');
      expect(packageJson.scripts.lint).toContain('next lint');
    });

    // Note: Actual lint test would require executing npm run lint
    // This is better tested in CI or manually
    test.skip('should pass linting without errors', async () => {
      // This test would run `npm run lint` and verify exit code 0
      // Skipped for now - will be implemented when needed
    });
  });
});
