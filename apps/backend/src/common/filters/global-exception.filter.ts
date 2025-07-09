import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { ZodValidationException } from 'nestjs-zod';

// A consistent structure for the final JSON response.
interface IErrorResponse {
  statusCode: number;
  timestamp: string;
  path: string;
  method: string;
  error: string;
  message: string | string[];
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  public catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const { status, error, message } = this.processException(exception);

    const errorResponse: IErrorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      error,
      message,
    };

    this.logError(errorResponse, exception);
    response.status(status).json(errorResponse);
  }

  // Determines the correct status, error, and message based on the exception type.
  private processException(exception: unknown): {
    status: number;
    error: string;
    message: string | string[];
  } {
    // 1. Check for ZodValidationException first due to extension order.
    if (exception instanceof ZodValidationException) {
      const zodError = exception.getZodError();
      return {
        status: HttpStatus.BAD_REQUEST,
        error: 'Validation Error',
        message: zodError.errors.map(
          (err) => `${err.path.join('.') || 'error'}: ${err.message}`,
        ),
      };
    }

    // 2. Check for raw ZodError
    if (exception instanceof ZodError) {
      return {
        status: HttpStatus.BAD_REQUEST,
        error: 'Validation Error',
        message: exception.errors.map(
          (err) => `${err.path.join('.') || 'error'}: ${err.message}`,
        ),
      };
    }

    // 3. Check for standard NestJS HTTP exceptions.
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const response = exception.getResponse();
      // Safely check if the response is an object with the expected properties.
      if (
        typeof response === 'object' &&
        response !== null &&
        'error' in response &&
        'message' in response
      ) {
        return {
          status,
          error: response.error as string,
          message: response.message as string | string[],
        };
      }
      return { status, error: exception.name, message: exception.message };
    }

    // 4. Check for Prisma database errors.
    if (exception instanceof PrismaClientKnownRequestError) {
      return this.handlePrismaError(exception);
    }

    // 5. Fallback for any other unknown errors.
    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'Internal Server Error',
      message: 'An unexpected internal error occurred.',
    };
  }

  // Handles known database errors from Prisma.
  private handlePrismaError(exception: PrismaClientKnownRequestError): {
    status: number;
    error: string;
    message: string;
  } {
    switch (exception.code) {
      case 'P2002':
        return {
          status: HttpStatus.CONFLICT,
          error: 'Unique Constraint Violation',
          message: 'A record with this data already exists.',
        };
      case 'P2025':
        return {
          status: HttpStatus.NOT_FOUND,
          error: 'Record Not Found',
          message: 'The requested record does not exist.',
        };
      default:
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Database Error',
          message: 'A database error occurred.',
        };
    }
  }

  // Centralized logger.
  private logError(errorResponse: IErrorResponse, exception: unknown): void {
    const { statusCode, error, method, path, message } = errorResponse;
    const messageString = Array.isArray(message) ? message.join(', ') : message;
    this.logger.error(
      `[${statusCode}] ${error} - ${method} ${path} | Message: ${messageString}`,
      exception instanceof Error ? exception.stack : String(exception),
    );
  }
}
