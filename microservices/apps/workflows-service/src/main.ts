import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const configService = await app.resolve(ConfigService);
  const mqServer = configService.getOrThrow('RABBITMQ_URL');
  const appName = configService.getOrThrow('APP_NAME');
  const port = configService.get('PORT');

  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.RMQ,
      options: {
        urls: mqServer,
        queue: appName,
        noAck: false,
      },
    },
    { inheritAppConfig: true },
  );
  await app.startAllMicroservices();

  await app.listen(port ?? 3001);
}
bootstrap();
