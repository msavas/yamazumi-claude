import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

/**
 * Command Runner Helper
 *
 * Executes shell commands and captures output/errors.
 * Used for testing build, lint, and dev server commands.
 *
 * @see .bmad/bmm/testarch/knowledge/test-quality.md
 */

export interface CommandResult {
  stdout: string;
  stderr: string;
  exitCode: number;
  success: boolean;
}

/**
 * Execute a shell command and return structured result
 *
 * @param command - Command to execute
 * @param cwd - Working directory (defaults to project root)
 * @param timeout - Timeout in milliseconds (default: 120000 = 2 minutes)
 * @returns Command result with stdout, stderr, exit code
 */
export async function runCommand(
  command: string,
  cwd: string = process.cwd(),
  timeout: number = 120000
): Promise<CommandResult> {
  try {
    const { stdout, stderr } = await execAsync(command, {
      cwd,
      timeout,
      maxBuffer: 10 * 1024 * 1024, // 10MB buffer for large outputs
    });

    return {
      stdout: stdout.trim(),
      stderr: stderr.trim(),
      exitCode: 0,
      success: true,
    };
  } catch (error: any) {
    return {
      stdout: error.stdout?.trim() || '',
      stderr: error.stderr?.trim() || '',
      exitCode: error.code || 1,
      success: false,
    };
  }
}

/**
 * Execute npm script and return result
 *
 * @param scriptName - npm script name (e.g., 'build', 'lint')
 * @param timeout - Timeout in milliseconds
 * @returns Command result
 */
export async function runNpmScript(
  scriptName: string,
  timeout?: number
): Promise<CommandResult> {
  return runCommand(`npm run ${scriptName}`, process.cwd(), timeout);
}

/**
 * Check if a command succeeds (exit code 0)
 *
 * @param command - Command to execute
 * @returns True if command succeeds
 */
export async function commandSucceeds(command: string): Promise<boolean> {
  const result = await runCommand(command);
  return result.success;
}
