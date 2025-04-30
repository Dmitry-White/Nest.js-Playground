import { MESSAGE_BROKER } from '@app/core';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { lastValueFrom } from 'rxjs';

import { Outbox } from './outbox.entity';
import { OutboxService } from './outbox.service';

@Injectable()
export class OutboxProcessor {
  constructor(
    private readonly logger: Logger,
    private readonly outboxService: OutboxService,

    @Inject(MESSAGE_BROKER)
    private readonly messageBroker: ClientProxy,

    @InjectRepository(Outbox)
    private readonly outboxRepository: Repository<Outbox>,
  ) {}

  /**
   * This method will be executed every 10 seconds.
   * Production-ready applications should use a more reasonable interval.
   * Also, in the real-world system, we would rather use "@nestjs/bull" instead of "@nestjs/schedule"
   * because it provides more sophisticated features (e.g. locking, supports multiple nodes running in parallel etc.).
   */
  @Cron(CronExpression.EVERY_10_SECONDS)
  async processOutboxMessages() {
    this.logger.debug(`Processing outbox messages`);

    const messages = await this.outboxService.getUnprocessedMessages({
      target: MESSAGE_BROKER.description!,
      take: 100,
    });
    this.logger.log('Messages: ', messages);

    await Promise.all(messages.map(this.processOutboxMessage));
  }

  async dispatchWorkflowEvent(outbox: Outbox) {
    const event$ = this.messageBroker.emit(outbox.type, outbox.payload);

    await lastValueFrom(event$);
  }

  private processOutboxMessage = async (message: Outbox) => {
    await this.dispatchWorkflowEvent(message);
    // Instead of removing the message from the database, we could also update the message status to "processed".
    // However, for simplicity sake, we'll just remove the message from the database.
    await this.outboxRepository.delete(message.id);
  };
}
