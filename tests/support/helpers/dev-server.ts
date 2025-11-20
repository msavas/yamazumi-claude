import { spawn, ChildProcess } from 'child_process';
import { waitFor } from './wait-for';

/**
 * Dev Server Helper
 *
 * Manages Next.js dev server lifecycle for testing.
 * Starts server, waits for ready state, and cleans up.
 *
 * @see .bmad/bmm/testarch/knowledge/test-quality.md
 */

export interface DevServerOptions {
  port?: number;
  timeout?: number; // Timeout to wait for server ready (default: 60000ms)
}

export class DevServer {
  private process: ChildProcess | null = null;
  private port: number;
  private timeout: number;

  constructor(options: DevServerOptions = {}) {
    this.port = options.port || 3000;
    this.timeout = options.timeout || 60000;
  }

  /**
   * Start dev server and wait for it to be ready
   *
   * @returns Promise that resolves when server is ready
   */
  async start(): Promise<void> {
    // Spawn npm run dev process
    this.process = spawn('npm', ['run', 'dev'], {
      cwd: process.cwd(),
      stdio: 'pipe',
      detached: false,
    });

    let serverReady = false;

    // Listen for stdout to detect when server is ready
    this.process.stdout?.on('data', (data: Buffer) => {
      const output = data.toString();
      // Next.js dev server outputs "Local: http://localhost:3000" when ready
      if (output.includes('Local:') || output.includes('localhost')) {
        serverReady = true;
      }
    });

    // Listen for stderr for errors
    this.process.stderr?.on('data', (data: Buffer) => {
      const error = data.toString();
      // Log errors but don't fail immediately (some warnings are normal)
      if (error.includes('error') || error.includes('Error')) {
        console.error('Dev server error:', error);
      }
    });

    // Wait for server to be ready
    await waitFor(
      () => Promise.resolve(serverReady),
      this.timeout,
      1000 // Check every second
    );

    // Give it an extra second to fully initialize
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  /**
   * Stop dev server and clean up
   */
  async stop(): Promise<void> {
    if (this.process) {
      // Kill the process
      this.process.kill('SIGTERM');

      // Wait for process to exit
      await new Promise<void>((resolve) => {
        this.process?.on('exit', () => {
          resolve();
        });

        // Force kill after 5 seconds if still running
        setTimeout(() => {
          if (this.process && !this.process.killed) {
            this.process.kill('SIGKILL');
          }
          resolve();
        }, 5000);
      });

      this.process = null;
    }
  }

  /**
   * Get server URL
   */
  getUrl(): string {
    return `http://localhost:${this.port}`;
  }

  /**
   * Check if server is running
   */
  isRunning(): boolean {
    return this.process !== null && !this.process.killed;
  }
}

/**
 * Helper function to start dev server, run test, and clean up
 *
 * @param testFn - Test function to run while server is running
 * @param options - Dev server options
 */
export async function withDevServer(
  testFn: (url: string) => Promise<void>,
  options?: DevServerOptions
): Promise<void> {
  const server = new DevServer(options);

  try {
    await server.start();
    await testFn(server.getUrl());
  } finally {
    await server.stop();
  }
}
