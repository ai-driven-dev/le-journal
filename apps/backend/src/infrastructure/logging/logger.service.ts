import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class AppLogger implements LoggerService {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService) {}

  log(message: string, context?: string): void {
    this.logger.log(message, context);
  }

  error(message: string, trace?: string, context?: string): void {
    this.logger.error(message, trace, context);
  }

  warn(message: string, context?: string): void {
    this.logger.warn(message, context);
  }

  debug(message: string, from: string, context?: Record<string, unknown>): void {
    if (this.logger.debug) {
      const formattedMessage = `\x1b[34m${from}: ${message}\x1b[0m`;
      this.logger.debug(formattedMessage, context);
    }
  }

  success(message: string, from: string, context?: Record<string, unknown>): void {
    const formattedMessage = `\x1b[32m${from}: ${message}\x1b[0m`;
    this.logger.log(formattedMessage, context);
  }
}
