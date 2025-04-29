import { MESSAGE_BROKER } from '@app/workflows';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { BuildingsController } from './buildings.controller';
import { BuildingsService } from './buildings.service';
import { Building } from './entities/building.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Building]),
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        name: MESSAGE_BROKER,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.NATS,
          options: {
            servers: configService.getOrThrow('NATS_URL'),
          },
        }),
      },
    ]),
  ],
  controllers: [BuildingsController],
  providers: [Logger, BuildingsService],
})
export class BuildingsModule {}
