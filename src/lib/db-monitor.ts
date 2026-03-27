import { logger } from './logger';

/**
 * Database query monitoring utility
 * Tracks query performance and logs slow queries
 */

interface QueryMetrics {
  queryName: string;
  duration: number;
  success: boolean;
  error?: Error;
}

const SLOW_QUERY_THRESHOLD_MS = 1000; // 1 second
const VERY_SLOW_QUERY_THRESHOLD_MS = 3000; // 3 seconds

/**
 * Monitor a database query and log performance metrics
 */
export async function monitorQuery<T>(
  queryName: string,
  queryFn: () => Promise<T>
): Promise<T> {
  const startTime = Date.now();
  
  try {
    const result = await queryFn();
    const duration = Date.now() - startTime;

    const metrics: QueryMetrics = {
      queryName,
      duration,
      success: true,
    };

    // Log based on performance
    if (duration > VERY_SLOW_QUERY_THRESHOLD_MS) {
      logger.error(metrics, 'Very slow query detected');
    } else if (duration > SLOW_QUERY_THRESHOLD_MS) {
      logger.warn(metrics, 'Slow query detected');
    } else {
      logger.debug(metrics, 'Query completed');
    }

    return result;
  } catch (error) {
    const duration = Date.now() - startTime;
    
    const metrics: QueryMetrics = {
      queryName,
      duration,
      success: false,
      error: error as Error,
    };

    logger.error(metrics, 'Query failed');
    throw error;
  }
}

/**
 * Batch query monitoring for multiple queries
 */
export async function monitorBatchQueries<T>(
  batchName: string,
  queries: Array<{ name: string; fn: () => Promise<any> }>
): Promise<T[]> {
  const startTime = Date.now();
  
  try {
    const results = await Promise.all(
      queries.map(({ name, fn }) => monitorQuery(name, fn))
    );
    
    const duration = Date.now() - startTime;
    logger.info(
      { batchName, queryCount: queries.length, duration },
      'Batch queries completed'
    );
    
    return results;
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error(
      { batchName, queryCount: queries.length, duration, error },
      'Batch queries failed'
    );
    throw error;
  }
}

/**
 * Query performance tracker for aggregating metrics
 */
class QueryPerformanceTracker {
  private metrics: Map<string, { count: number; totalDuration: number; errors: number }> = new Map();

  track(queryName: string, duration: number, success: boolean) {
    const current = this.metrics.get(queryName) || { count: 0, totalDuration: 0, errors: 0 };
    
    this.metrics.set(queryName, {
      count: current.count + 1,
      totalDuration: current.totalDuration + duration,
      errors: current.errors + (success ? 0 : 1),
    });
  }

  getMetrics(queryName: string) {
    const metrics = this.metrics.get(queryName);
    if (!metrics) return null;

    return {
      count: metrics.count,
      averageDuration: metrics.totalDuration / metrics.count,
      errorRate: metrics.errors / metrics.count,
    };
  }

  getAllMetrics() {
    const result: Record<string, any> = {};
    
    this.metrics.forEach((metrics, queryName) => {
      result[queryName] = {
        count: metrics.count,
        averageDuration: metrics.totalDuration / metrics.count,
        errorRate: metrics.errors / metrics.count,
      };
    });

    return result;
  }

  reset() {
    this.metrics.clear();
  }
}

export const queryTracker = new QueryPerformanceTracker();

// Made with Bob
