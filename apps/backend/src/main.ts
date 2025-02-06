import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  await app.listen(8080);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
