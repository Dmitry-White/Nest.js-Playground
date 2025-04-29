import { EVENTS } from '@app/workflows';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly logger: Logger) {}

  getHello(): string {
    return 'Hello World!';
  }

  classify(data: unknown) {
    this.logger.debug(
      `Received new ${EVENTS.ALARM_CLASSIFY} event: ${JSON.stringify(data)}`,
    );

    return {
      category: ['critical', 'non-critical', 'invalid'][
        Math.floor(Math.random() * 3)
      ],
    };
  }
}
