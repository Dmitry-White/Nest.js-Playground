import { EVENTS } from '@app/workflows';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Interval } from '@nestjs/schedule';

import { ALARMS_SERVICE } from './app.constants';

@Injectable()
export class AppService {
  constructor(
    private readonly logger: Logger,
    @Inject(ALARMS_SERVICE)
    private readonly alarmsService: ClientProxy,
  ) {}

  @Interval(10000)
  generateAlarm() {
    const payload = {
      name: 'Alarm #' + Math.floor(Math.random() * 1000) + 1,
      buildingId: Math.floor(Math.random() * 100) + 1,
    };
    this.alarmsService.emit(EVENTS.ALARM_CREATE, payload);
    this.logger.log('Payload: ', payload);
  }
}
