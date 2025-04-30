import { EVENTS, MESSAGE_BROKER } from '@app/core';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    private readonly logger: Logger,

    @Inject(MESSAGE_BROKER)
    private readonly messageBroker: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async create(data: { name: string; buildingId: number }): Promise<void> {
    this.logger.debug(
      `Received new ${EVENTS.ALARM_CREATE} event: ${JSON.stringify(data)}`,
    );

    // If we decided to use the choreography pattern instead, we would simply emit an event here and let other services handle the rest.
    //
    // So for example:
    // 1. "Alarms service" would emit an event to the "Alarm classifier service" to classify the alarm.
    // 2. "Alarm classifier service" would classify the alarm and emit an event to the "Notifications service" to notify other services about the alarm.
    // 3. "Notifications service" would subscribe to the "EVENTS.ALARM_CLASSIFY" event and notify other services about the alarm.
    const classify$ = this.messageBroker.send(EVENTS.ALARM_CLASSIFY, data);
    const alarmClassification = await lastValueFrom(classify$);
    this.logger.debug(
      `Alarm "${data.name}" classified as "${alarmClassification.category}"`,
    );

    const notify$ = this.messageBroker.emit(EVENTS.NOTIFICATION_SEND, {
      alarm: data,
      category: alarmClassification.category,
    });
    await lastValueFrom(notify$);
    this.logger.debug(`Dispatched "notification.send" event`);
  }
}
