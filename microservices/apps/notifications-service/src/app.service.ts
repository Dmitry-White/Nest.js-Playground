import { EVENTS } from '@app/core';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly logger: Logger) {}

  getHello(): string {
    return 'Hello World!';
  }

  notify(data: unknown) {
    this.logger.debug(
      `Received new ${EVENTS.NOTIFICATION_SEND} event: ${JSON.stringify(data)}`,
    );

    // In the real-world application, this service would be responsible for notifying other services (or user) about the alarm.
    // For example, it could send an email to the building manager/department about the alarm.
    // It could also send an SMS message to the maintenance team.
    this.logger.debug('Sending notification about the alarm.');
  }
}
