import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { ValidationFormatter } from './transformers/validation.transtormer';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import dotenv from 'dotenv';

import fs from 'fs';
const path = require('path');

const envConfig = dotenv.parse(
  fs.readFileSync(path.join(__dirname, '..', '.env')),
);

for (const k in envConfig) {
  process.env[k] = envConfig[k];
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());

  app.setGlobalPrefix('api');

  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: any) =>
        new UnprocessableEntityException(ValidationFormatter(errors)),

      transform: false, // transform object to DTO class
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('E-Fuse')
    .setDescription('E-Fuse Restful APIs')
    .setVersion('1.0')
    .addTag('e-fuse')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);

  const PORT = process.env.PORT || 5000;
  await app.listen(PORT, () => {
    console.log(`Server in running on port: ${PORT}`);
  });
}
bootstrap();
