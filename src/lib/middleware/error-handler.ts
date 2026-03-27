import { NextResponse } from 'next/server';
import { AppError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import { ZodError } from 'zod';

/**
 * Centralized error handler for API routes
 * Converts errors to standardized JSON responses
 */
export function handleApiError(error: unknown, correlationId: string): NextResponse {
  // Log the error with correlation ID for tracking
  logger.error({ error, correlationId }, 'API Error occurred');

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        error: {
          message: 'Validation failed',
          code: 'VALIDATION_ERROR',
          correlationId,
          details: error.flatten().fieldErrors,
        },
      },
      { status: 400 }
    );
  }

  // Handle custom AppError instances
  if (error instanceof AppError) {
    const response: any = {
      error: {
        message: error.message,
        code: error.code,
        correlationId,
      },
    };

    // Include additional details for validation errors
    if ('details' in error && error.details) {
      response.error.details = error.details;
    }

    // Include retry-after for rate limit errors
    if ('retryAfter' in error && error.retryAfter) {
      response.error.retryAfter = error.retryAfter;
    }

    return NextResponse.json(response, { status: error.statusCode });
  }

  // Handle unexpected errors (don't expose internal details)
  logger.error({ error, correlationId }, 'Unexpected error');
  
  return NextResponse.json(
    {
      error: {
        message: 'Internal server error',
        code: 'INTERNAL_ERROR',
        correlationId,
      },
    },
    { status: 500 }
  );
}

/**
 * Wrapper for API route handlers with error handling
 */
export function withErrorHandler<T>(
  handler: (correlationId: string) => Promise<T>
): Promise<T | NextResponse> {
  const correlationId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  return handler(correlationId).catch((error) => {
    return handleApiError(error, correlationId);
  });
}

// Made with Bob
