/**
 * Custom error classes for Qorvari application
 * Provides structured error handling with proper HTTP status codes
 */

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code: string,
    public isOperational = true
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, public details?: Record<string, string[]>) {
    super(400, message, 'VALIDATION_ERROR');
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(401, message, 'AUTH_ERROR');
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Insufficient permissions') {
    super(403, message, 'AUTHORIZATION_ERROR');
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(404, `${resource} not found`, 'NOT_FOUND');
  }
}

export class RateLimitError extends AppError {
  constructor(public retryAfter?: number) {
    super(429, 'Too many requests', 'RATE_LIMIT_EXCEEDED');
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(409, message, 'CONFLICT');
  }
}

export class ServiceUnavailableError extends AppError {
  constructor(message: string = 'Service temporarily unavailable') {
    super(503, message, 'SERVICE_UNAVAILABLE');
  }
}

export class DatabaseError extends AppError {
  constructor(message: string, public originalError?: Error) {
    super(500, message, 'DATABASE_ERROR');
  }
}

export class ExternalServiceError extends AppError {
  constructor(service: string, public originalError?: Error) {
    super(502, `External service error: ${service}`, 'EXTERNAL_SERVICE_ERROR');
  }
}

// Made with Bob
