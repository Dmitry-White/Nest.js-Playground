import { MESSAGE_BROKER } from '@app/core';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { Outbox } from './outbox.entity';
import { OutboxService } from './outbox.service';
import { OutboxProcessor } from './outbox.processor';
import { OutboxSubscriber } from './outbox.subscriber';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Outbox]),
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        name: MESSAGE_BROKER,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: configService.getOrThrow('RABBITMQ_URL'),
            queue: configService.getOrThrow('RABBITMQ_QUEUE'),
          },
        }),
      },
    ]),
  ],
  providers: [OutboxService, OutboxProcessor, OutboxSubscriber],
})
export class OutboxModule {}
