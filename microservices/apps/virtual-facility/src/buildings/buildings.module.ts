import { MESSAGE_BROKER } from '@app/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { BuildingsController } from './buildings.controller';
import { BuildingsService } from './buildings.service';
import { Building } from './entities/building.entity';
import { Outbox, OutboxModule } from '@app/outbox';

@Module({
  imports: [
    TypeOrmModule.forFeature([Building, Outbox]),
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        name: MESSAGE_BROKER,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: configService.getOrThrow('RABBITMQ_URL'),
          },
        }),
      },
    ]),
    OutboxModule,
  ],
  controllers: [BuildingsController],
  providers: [Logger, BuildingsService],
})
export class BuildingsModule {}
