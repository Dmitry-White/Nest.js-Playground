import { EVENTS } from '@app/workflows';
import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern(EVENTS.ALARM_CLASSIFY)
  classify(@Payload() data: unknown) {
    return this.appService.classify(data);
  }
}
