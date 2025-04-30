import { EVENTS, MESSAGE_BROKER } from '@app/core';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Interval } from '@nestjs/schedule';

@Injectable()
export class AppService {
  constructor(
    private readonly logger: Logger,

    @Inject(MESSAGE_BROKER)
    private readonly messageBroker: ClientProxy,
  ) {}

  @Interval(10000)
  generateAlarm() {
    const payload = {
      name: 'Alarm #' + Math.floor(Math.random() * 1000) + 1,
      buildingId: Math.floor(Math.random() * 100) + 1,
    };
    this.messageBroker.emit(EVENTS.ALARM_CREATE, payload);
    this.logger.log('Payload: ', payload);
  }
}
