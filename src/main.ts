import 'dotenv/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DEFAULT_PORT } from './constants/app';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { resolve } from 'path';
import { readFile } from 'fs/promises';
import { parse } from 'yaml';
import { cwd } from 'process';
import { CustomLoggerService } from './modules/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const logger = new CustomLoggerService();
  app.useLogger(logger);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const DOC_API = await readFile(resolve(cwd(), 'doc', 'api.yaml'), 'utf-8');

  SwaggerModule.setup('doc', app, parse(DOC_API));

  // Promise.reject(Error('PROM! Oops!'));
  // throw new Error()

  process.on('unhandledRejection', (error: Error) => {
    console.error('unhandledRejection: ', error);
    logger.error('unhandledRejection', error.stack);
    process.exit(1);
  });

  await app.listen(process.env.PORT || DEFAULT_PORT);
}

bootstrap();
