import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { DEFAULT_PORT } from './constants/app';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { dirname, resolve } from 'path';
import { readFile } from 'fs/promises';
import { parse } from 'yaml';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const rootDirname = dirname(__dirname);
  const DOC_API = await readFile(
    resolve(rootDirname, 'doc', 'api.yaml'),
    'utf-8',
  );

  SwaggerModule.setup('api', app, parse(DOC_API));

  await app.listen(process.env.PORT || DEFAULT_PORT);
}
bootstrap();
