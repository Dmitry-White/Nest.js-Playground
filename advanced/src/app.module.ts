import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { HttpClientModule } from './http-client/http-client.module';
import { RewardsModule } from './rewards/rewards.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { ThreadsModule } from './threads/threads.module';
import { TagsModule } from './tags/tags.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('DB_HOST'),
        port: configService.getOrThrow('DB_PORT'),
        database: configService.getOrThrow('DB_DATABASE'),
        username: configService.getOrThrow('DB_USERNAME'),
        password: configService.getOrThrow('DB_PASSWORD'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    EventEmitterModule.forRoot(),
    HttpClientModule.register({ baseUrl: 'http://nestjs.com' }),
    SchedulerModule,
    CoffeesModule,
    RewardsModule,
    ThreadsModule,
    TagsModule,
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
