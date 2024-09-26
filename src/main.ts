import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config()

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  const configService = await app.get(ConfigService);

  // ============================ Cors >    ============================
  const corsOptions: CorsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
  app.enableCors(corsOptions);

  // ============================ Swagger > ============================
  const urlSwagger = 'api'
  const config = new DocumentBuilder()
    .setTitle('Authentication Service')
    .setDescription('API authentication and other functions for creating tools')
    .setVersion(configService.get<string>('app_version'))
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(urlSwagger, app, document);

  // app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // const { httpAdapter } = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen(process.env.SERVER_PORT);
  logger.log(`| Application listening on port ${configService.get<string>('SERVER_PORT')} | http://localhost:${configService.get<string>('SERVER_PORT')}/${urlSwagger}`)
}
bootstrap();
