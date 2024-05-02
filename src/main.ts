import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { WINSTON_MODULE_NEST_PROVIDER, WINSTON_MODULE_PROVIDER } from 'nest-winston';
import * as morgan from 'morgan';

import { AppModule } from './app/app.module';

(async () => {
  const app = await NestFactory.create(AppModule);

  SwaggerModule.setup(
    '/swagger-docs',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Nest Study - Board')
        .setDescription('Implementing a board API using NestJS.')
        .setVersion('1.0.0')
        .addBearerAuth()
        .build(),
    ),
    {
      swaggerOptions: { defaultModelsExpandDepth: -1 },
    },
  );

  const logger = app.get(WINSTON_MODULE_PROVIDER);

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    morgan('[Response] :method :url :status :response-time ms', {
      stream: { write: (message) => logger.info(message.split('\n')[0]) },
    }),
  );

  await app.listen(3000);
})();
