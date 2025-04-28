import { EVENTS } from '@app/workflows';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly logger: Logger) {}

  getHello(): string {
    return 'Hello World!';
  }

  create(data: unknown): void {
    this.logger.debug(
      `Received new ${EVENTS.ALARM_CREATE} event: ${JSON.stringify(data)}`,
    );
  }
}
