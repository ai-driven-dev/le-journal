import * as fs from 'fs';

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './infrastructure/logging/logger.filter';
import { AppLogger } from './infrastructure/logging/logger.service';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    // Catch logs when initializing the app, so we do not miss any logs when app starts.
    bufferLogs: true,
  });

  // Logging
  const logger = app.get(AppLogger);
  app.useLogger(logger);
  app.useGlobalFilters(new AllExceptionsFilter(logger));

  // API
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  // Configuration de Swagger
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Le Journal API')
      .setDescription("Documentation de l'API Le Journal")
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('', app, document);

    fs.writeFileSync('./swagger.json', JSON.stringify(document, null, 2));
  }

  await app.listen(8080);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
