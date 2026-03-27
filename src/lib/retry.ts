import { logger } from './logger';

/**
 * Retry configuration options
 */
export interface RetryOptions {
  maxAttempts?: number;
  delayMs?: number;
  backoffMultiplier?: number;
  maxDelayMs?: number;
  onRetry?: (attempt: number, error: Error) => void;
}

/**
 * Execute a function with exponential backoff retry logic
 * Useful for handling transient failures in external services
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxAttempts = 3,
    delayMs = 1000,
    backoffMultiplier = 2,
    maxDelayMs = 10000,
    onRetry,
  } = options;

  let lastError: Error;
  let currentDelay = delayMs;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      
      if (attempt === maxAttempts) {
        logger.error(
          { error, attempt, maxAttempts },
          'Max retry attempts reached'
        );
        throw lastError;
      }

      logger.warn(
        { error, attempt, maxAttempts, delay: currentDelay },
        'Retry attempt failed, retrying...'
      );

      // Call retry callback if provided
      if (onRetry) {
        onRetry(attempt, lastError);
      }

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, currentDelay));
      
      // Increase delay for next attempt (exponential backoff)
      currentDelay = Math.min(currentDelay * backoffMultiplier, maxDelayMs);
    }
  }

  throw lastError!;
}

/**
 * Retry with jitter to prevent thundering herd problem
 */
export async function withRetryJitter<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const jitteredOptions = {
    ...options,
    delayMs: options.delayMs ? options.delayMs + Math.random() * 1000 : 1000,
  };

  return withRetry(fn, jitteredOptions);
}

// Made with Bob
