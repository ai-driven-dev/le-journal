import { Global, Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';

import { winstonConfig } from './logger.config';
import { AppLogger } from './logger.service';

@Global()
@Module({
  imports: [WinstonModule.forRoot(winstonConfig)],
  providers: [AppLogger],
  exports: [AppLogger],
})
export class LoggerModule {}
