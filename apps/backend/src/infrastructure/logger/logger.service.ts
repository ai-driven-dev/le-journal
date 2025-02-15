import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { ErrorContext, LogContext } from './logger.type';

@Injectable()
export class AppLogger implements LoggerService {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService) {}

  log(message: string, context: LogContext): void {
    this.logger.log(message, context);
  }

  error(message: string, context: ErrorContext): void {
    this.logger.error(message, context);
  }

  warn(message: string, context: LogContext): void {
    this.logger.warn(message, context);
  }

  debug(message: string, context: LogContext): void {
    if (this.logger.debug) {
      this.logger.debug(message, context);
    }
  }
}
