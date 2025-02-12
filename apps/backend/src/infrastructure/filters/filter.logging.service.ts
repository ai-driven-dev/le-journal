import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

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

    // Utilisation de la nouvelle syntaxe d'observer
    return next.handle().pipe(
      tap((value) => {
        this.logger.log('Request completed', {
          service: className,
          method: methodName,
          metadata: {
            path: request.url,
            method: request.method,
          },
        });
        return value;
      }),
    );
  }
}
