import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class ValidationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();

    // Check for malformed JSON in request body
    if (request.method !== 'GET' && request.method !== 'DELETE') {
      if (request.headers['content-type']?.includes('application/json')) {
        if (
          request.body === undefined &&
          request.get('content-length') !== '0'
        ) {
          throw new BadRequestException('Invalid JSON format in request body');
        }
      }
    }

    return next.handle();
  }
}
