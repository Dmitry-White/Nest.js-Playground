import { EVENTS } from '@app/workflows';
import { Controller, Get } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern(EVENTS.NOTIFICATION_SEND)
  notify(@Payload() data: unknown) {
    return this.appService.notify(data);
  }
}
