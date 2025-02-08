import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  // Configuration de Swagger
  const config = new DocumentBuilder()
    .setTitle('Le Journal API')
    .setDescription("Documentation de l'API Le Journal")
    .setVersion('1.0')
    .addTag('users', 'Gestion des utilisateurs')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(8080);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
