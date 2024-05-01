import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app/app.module';

(async () => {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Nest Study - Board')
    .setDescription('Implementing a board API using NestJS.')
    .setVersion('1.0.0')
    .addSecurity('JWT Token', {
      type: 'http',
      scheme: 'bearer',
    })
    .build();
  SwaggerModule.setup('/swagger-docs', app, SwaggerModule.createDocument(app, config), {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
})();
