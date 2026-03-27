import { logger } from './logger';

/**
 * Circuit breaker states
 */
export enum CircuitState {
  CLOSED = 'CLOSED',     // Normal operation
  OPEN = 'OPEN',         // Failing, reject requests
  HALF_OPEN = 'HALF_OPEN', // Testing if service recovered
}

/**
 * Circuit breaker configuration
 */
export interface CircuitBreakerOptions {
  failureThreshold?: number;    // Number of failures before opening
  resetTimeout?: number;         // Time before attempting reset (ms)
  monitoringPeriod?: number;     // Time window for failure counting (ms)
  halfOpenRequests?: number;     // Successful requests needed to close from half-open
}

/**
 * Circuit Breaker pattern implementation
 * Prevents cascading failures by failing fast when a service is down
 */
export class CircuitBreaker {
  private state: CircuitState = CircuitState.CLOSED;
  private failureCount = 0;
  private lastFailureTime?: number;
  private successCount = 0;
  private nextAttemptTime = 0;

  constructor(
    private name: string,
    private options: CircuitBreakerOptions = {}
  ) {
    this.options = {
      failureThreshold: 5,
      resetTimeout: 60000, // 1 minute
      monitoringPeriod: 10000, // 10 seconds
      halfOpenRequests: 2,
      ...options,
    };
  }

  /**
   * Execute a function with circuit breaker protection
   */
  async execute<T>(fn: () => Promise<T>): Promise<T> {
    // Check if circuit is open
    if (this.state === CircuitState.OPEN) {
      if (this.shouldAttemptReset()) {
        this.transitionToHalfOpen();
      } else {
        const error = new Error(`Circuit breaker ${this.name} is OPEN`);
        logger.warn(
          { 
            circuit: this.name, 
            state: this.state,
            nextAttempt: new Date(this.nextAttemptTime).toISOString(),
          },
          'Circuit breaker rejected request'
        );
        throw error;
      }
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure(error as Error);
      throw error;
    }
  }

  /**
   * Handle successful execution
   */
  private onSuccess() {
    this.failureCount = 0;
    
    if (this.state === CircuitState.HALF_OPEN) {
      this.successCount++;
      
      if (this.successCount >= this.options.halfOpenRequests!) {
        this.transitionToClosed();
      }
    }
  }

  /**
   * Handle failed execution
   */
  private onFailure(error: Error) {
    this.failureCount++;
    this.lastFailureTime = Date.now();
    this.successCount = 0;

    logger.warn(
      { 
        circuit: this.name, 
        failureCount: this.failureCount,
        threshold: this.options.failureThreshold,
        error: error.message,
      },
      'Circuit breaker recorded failure'
    );

    if (this.failureCount >= this.options.failureThreshold!) {
      this.transitionToOpen();
    }
  }

  /**
   * Check if we should attempt to reset the circuit
   */
  private shouldAttemptReset(): boolean {
    return Date.now() >= this.nextAttemptTime;
  }

  /**
   * Transition to OPEN state
   */
  private transitionToOpen() {
    this.state = CircuitState.OPEN;
    this.nextAttemptTime = Date.now() + this.options.resetTimeout!;
    
    logger.error(
      { 
        circuit: this.name, 
        failureCount: this.failureCount,
        nextAttempt: new Date(this.nextAttemptTime).toISOString(),
      },
      'Circuit breaker opened'
    );
  }

  /**
   * Transition to HALF_OPEN state
   */
  private transitionToHalfOpen() {
    this.state = CircuitState.HALF_OPEN;
    this.successCount = 0;
    
    logger.info(
      { circuit: this.name },
      'Circuit breaker half-open, testing service'
    );
  }

  /**
   * Transition to CLOSED state
   */
  private transitionToClosed() {
    this.state = CircuitState.CLOSED;
    this.failureCount = 0;
    this.successCount = 0;
    
    logger.info(
      { circuit: this.name },
      'Circuit breaker closed, service recovered'
    );
  }

  /**
   * Get current circuit state
   */
  getState(): CircuitState {
    return this.state;
  }

  /**
   * Get circuit metrics
   */
  getMetrics() {
    return {
      name: this.name,
      state: this.state,
      failureCount: this.failureCount,
      successCount: this.successCount,
      lastFailureTime: this.lastFailureTime 
        ? new Date(this.lastFailureTime).toISOString() 
        : null,
      nextAttemptTime: this.state === CircuitState.OPEN
        ? new Date(this.nextAttemptTime).toISOString()
        : null,
    };
  }

  /**
   * Manually reset the circuit breaker
   */
  reset() {
    this.state = CircuitState.CLOSED;
    this.failureCount = 0;
    this.successCount = 0;
    this.lastFailureTime = undefined;
    
    logger.info({ circuit: this.name }, 'Circuit breaker manually reset');
  }
}

/**
 * Circuit breaker registry for managing multiple breakers
 */
class CircuitBreakerRegistry {
  private breakers: Map<string, CircuitBreaker> = new Map();

  getOrCreate(name: string, options?: CircuitBreakerOptions): CircuitBreaker {
    if (!this.breakers.has(name)) {
      this.breakers.set(name, new CircuitBreaker(name, options));
    }
    return this.breakers.get(name)!;
  }

  get(name: string): CircuitBreaker | undefined {
    return this.breakers.get(name);
  }

  getAllMetrics() {
    const metrics: Record<string, any> = {};
    this.breakers.forEach((breaker, name) => {
      metrics[name] = breaker.getMetrics();
    });
    return metrics;
  }

  resetAll() {
    this.breakers.forEach((breaker) => breaker.reset());
  }
}

export const circuitBreakerRegistry = new CircuitBreakerRegistry();

// Made with Bob
