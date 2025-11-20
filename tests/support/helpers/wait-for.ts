/**
 * Wait-For Helper
 *
 * Polling helper for complex async conditions.
 * Used for waiting on server readiness, file changes, etc.
 *
 * @see .bmad/bmm/testarch/knowledge/test-quality.md
 */

/**
 * Wait for a condition to become true
 *
 * Polls the condition function at regular intervals until it returns true
 * or the timeout is reached.
 *
 * @param condition - Async function that returns true when condition is met
 * @param timeout - Maximum time to wait in milliseconds (default: 5000ms)
 * @param interval - Polling interval in milliseconds (default: 100ms)
 * @throws Error if timeout is reached before condition is met
 */
export async function waitFor(
  condition: () => Promise<boolean>,
  timeout: number = 5000,
  interval: number = 100
): Promise<void> {
  const startTime = Date.now();

  while (Date.now() - startTime < timeout) {
    if (await condition()) {
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, interval));
  }

  throw new Error(`Condition not met within ${timeout}ms`);
}

/**
 * Wait for a specific amount of time (use sparingly!)
 *
 * WARNING: Prefer event-based waits over fixed delays.
 * Only use this when absolutely necessary.
 *
 * @param ms - Milliseconds to wait
 */
export async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Retry a function multiple times until it succeeds
 *
 * @param fn - Async function to retry
 * @param maxAttempts - Maximum number of attempts (default: 3)
 * @param delayMs - Delay between attempts in milliseconds (default: 1000ms)
 * @returns Result from successful function call
 * @throws Last error if all attempts fail
 */
export async function retry<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  delayMs: number = 1000
): Promise<T> {
  let lastError: Error | undefined;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (attempt < maxAttempts) {
        await delay(delayMs);
      }
    }
  }

  throw lastError || new Error('All retry attempts failed');
}
