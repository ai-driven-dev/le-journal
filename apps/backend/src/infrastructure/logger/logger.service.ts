import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { ErrorContext, LogContext } from './logger.type';

@Injectable()
export class AppLogger implements LoggerService {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService) {}

  log(message: string, context: LogContext): void {
    this.logger.log('info', message, this.formatContext(context));
  }

  error(message: string, context: ErrorContext): void {
    this.logger.error(message, this.formatContext(context));
  }

  warn(message: string, context: LogContext): void {
    this.logger.warn(message, this.formatContext(context));
  }

  debug(message: string, context: LogContext): void {
    if (this.logger.debug) {
      this.logger.debug(message, this.formatContext(context));
    }
  }

  private formatContext(context: LogContext | ErrorContext): Record<string, unknown> {
    const baseContext = {
      service: context.service,
      method: context.method,
      correlationId: context.correlationId,
      metadata: context.metadata,
    };

    if (this.isErrorContext(context)) {
      return {
        ...baseContext,
        error: context.error,
      };
    }

    return baseContext;
  }

  private isErrorContext(context: unknown): context is ErrorContext {
    return (
      typeof context === 'object' &&
      context !== null &&
      'error' in context &&
      context.error instanceof Error
    );
  }
}
