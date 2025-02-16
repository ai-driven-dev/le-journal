import { Global, Logger, Module } from '@nestjs/common';

import { AppLogger } from './logger.service';

@Global()
@Module({
  providers: [
    AppLogger,
    {
      provide: Logger,
      useClass: AppLogger,
    },
  ],
  exports: [Logger, AppLogger],
})
export class LoggerModule {}
