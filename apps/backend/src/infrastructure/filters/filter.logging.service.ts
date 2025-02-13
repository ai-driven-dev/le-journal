import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { Observable, catchError, finalize } from 'rxjs';

import { AppLogger } from '../logger/logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: AppLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const className = context.getClass().name;
    const methodName = context.getHandler().name;

    // Log de début d'opération
    this.logger.debug('Request started', {
      service: className,
      method: methodName,
      metadata: {
        path: request.url,
        method: request.method,
        params: request.params,
        query: request.query,
        body: request.body,
      },
    });

    // TODO check that in logs.
    return next.handle().pipe(
      catchError((err) => {
        this.logger.error('Request failed', {
          service: className,
          method: methodName,
          error: err.message,
        });
        throw err;
      }),
      finalize(() => {
        this.logger.debug('Request stream completed', {
          service: className,
          method: methodName,
          metadata: {
            path: request.url,
            method: request.method,
            params: request.params,
            query: request.query,
            body: request.body,
          },
        });
      }),
    );
  }
}
