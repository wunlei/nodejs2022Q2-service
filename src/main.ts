import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { DEFAULT_PORT } from './constants/app';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { resolve } from 'path';
import { readFile } from 'fs/promises';
import { parse } from 'yaml';
import { cwd } from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const DOC_API = await readFile(resolve(cwd(), 'doc', 'api.yaml'), 'utf-8');

  SwaggerModule.setup('api', app, parse(DOC_API));

  await app.listen(process.env.PORT || DEFAULT_PORT);
}

bootstrap();
