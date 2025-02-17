import { Module } from '@nestjs/common';

import { GoogleService } from './google.service';

import { UsersModule } from 'src/modules/users/users.module';

@Module({
  imports: [UsersModule],
  providers: [GoogleService],
  exports: [GoogleService],
})
export class GoogleModule {}
