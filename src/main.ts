import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { parse } from 'yaml';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './utils/http-exception.filter';
import { InternalServerErrorFilter } from './utils/InternalServerErrorFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(
    new InternalServerErrorFilter(),
    new HttpExceptionFilter(),
  );

  const DOC_API = await readFile(
    resolve(process.cwd(), 'doc', 'api.yaml'),
    'utf8',
  );
  const document = parse(DOC_API);
  SwaggerModule.setup('doc', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
