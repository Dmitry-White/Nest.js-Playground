import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { HttpClientModule } from './http-client/http-client.module';
import { RewardsModule } from './rewards/rewards.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { ThreadsModule } from './threads/threads.module';

@Module({
  imports: [
    SchedulerModule,
    CoffeesModule,
    RewardsModule,
    ThreadsModule,
    HttpClientModule.register({ baseUrl: 'http://nestjs.com' }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
