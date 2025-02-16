import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class AppLogger implements LoggerService {
  log(message: string, context: unknown): void {
    console.info(message, context);
  }

  error(message: string, context: unknown): void {
    console.error(message, context);
  }

  warn(message: string, context: unknown): void {
    console.warn(message, context);
  }

  debug(message: string, context: unknown): void {
    console.debug(message, context);
  }
}
