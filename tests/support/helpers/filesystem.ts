import * as fs from 'fs';
import * as path from 'path';

/**
 * Filesystem Test Helpers
 *
 * Utility functions for filesystem validation in E2E tests.
 * Used primarily for infrastructure/setup tests (Story 1.1, etc.)
 */

export const PROJECT_ROOT = path.resolve(__dirname, '../../..');

/**
 * Check if a file exists
 */
export function fileExists(relativePath: string): boolean {
  const fullPath = path.join(PROJECT_ROOT, relativePath);
  return fs.existsSync(fullPath);
}

/**
 * Check if a directory exists
 */
export function directoryExists(relativePath: string): boolean {
  const fullPath = path.join(PROJECT_ROOT, relativePath);
  return fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory();
}

/**
 * Read and parse JSON file
 */
export function readJsonFile<T = any>(relativePath: string): T {
  const fullPath = path.join(PROJECT_ROOT, relativePath);
  const content = fs.readFileSync(fullPath, 'utf-8');
  return JSON.parse(content) as T;
}

/**
 * Read text file
 */
export function readTextFile(relativePath: string): string {
  const fullPath = path.join(PROJECT_ROOT, relativePath);
  return fs.readFileSync(fullPath, 'utf-8');
}

/**
 * Check if package.json has a dependency
 */
export function hasDependency(packageName: string, type: 'dependencies' | 'devDependencies' = 'dependencies'): boolean {
  const packageJson = readJsonFile<{ dependencies?: Record<string, string>; devDependencies?: Record<string, string> }>('package.json');
  return packageJson[type]?.[packageName] !== undefined;
}

/**
 * Check if package.json has a script
 */
export function hasScript(scriptName: string): boolean {
  const packageJson = readJsonFile<{ scripts?: Record<string, string> }>('package.json');
  return packageJson.scripts?.[scriptName] !== undefined;
}
