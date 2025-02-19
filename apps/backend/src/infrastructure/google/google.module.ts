import { Module } from '@nestjs/common';
import { UsersModule } from 'src/modules/users/users.module';

import { GoogleService } from './google.service';

@Module({
  imports: [UsersModule],
  providers: [GoogleService],
  exports: [GoogleService],
})
export class GoogleModule {}
