import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { EmailExtractService } from './email-extract.service';
import { EmailService } from './email.service';

@Module({
  imports: [ConfigModule],
  providers: [EmailService, EmailExtractService],
  exports: [EmailService, EmailExtractService],
})
export class EmailModule {}
