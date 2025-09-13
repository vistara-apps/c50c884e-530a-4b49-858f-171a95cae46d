import { NextResponse } from 'next/server';

export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

export function handleApiError(error: unknown, context: string = 'API') {
  console.error(`[${context}] Error:`, error);

  if (error instanceof AppError) {
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode }
    );
  }

  // Handle OpenAI API errors
  if (error && typeof error === 'object' && 'status' in error) {
    const apiError = error as any;
    if (apiError.status === 429) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }
    if (apiError.status === 401) {
      return NextResponse.json(
        { error: 'Authentication failed. Please check your API key.' },
        { status: 401 }
      );
    }
  }

  // Handle database errors
  if (error && typeof error === 'object' && 'code' in error) {
    const dbError = error as any;
    if (dbError.code === 'P2002') {
      return NextResponse.json(
        { error: 'A record with this information already exists.' },
        { status: 409 }
      );
    }
  }

  // Generic error handling
  return NextResponse.json(
    { error: 'An unexpected error occurred. Please try again.' },
    { status: 500 }
  );
}

export function withErrorHandler<T extends any[]>(
  fn: (...args: T) => Promise<Response>,
  context: string = 'API'
) {
  return async (...args: T): Promise<Response> => {
    try {
      return await fn(...args);
    } catch (error) {
      return handleApiError(error, context);
    }
  };
}

// Client-side error boundary helper
export function logClientError(error: Error, errorInfo?: any) {
  console.error('Client Error:', error, errorInfo);

  // In production, you might want to send this to an error tracking service
  // like Sentry, LogRocket, or similar
  if (process.env.NODE_ENV === 'production') {
    // Example: send to error tracking service
    // Sentry.captureException(error, { extra: errorInfo });
  }
}

// Validation helpers
export function validateRequired(value: any, fieldName: string): void {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    throw new AppError(`${fieldName} is required`, 400);
  }
}

export function validateEmail(email: string): void {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new AppError('Invalid email format', 400);
  }
}

export function validateMinLength(value: string, minLength: number, fieldName: string): void {
  if (value.length < minLength) {
    throw new AppError(`${fieldName} must be at least ${minLength} characters long`, 400);
  }
}

