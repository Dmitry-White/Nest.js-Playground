import {
  EVENTS,
  MESSAGE_STATUS,
  TargetRepository,
  TARGET_REPOSITORY,
} from '@app/core';
import { Injectable, Logger, Inject } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EntityManager } from 'typeorm';

import { InboxService } from './inbox.service';
import { Inbox } from './inbox.entity';

@Injectable()
export class InboxProcessor {
  constructor(
    private readonly logger: Logger,
    private readonly inboxService: InboxService,

    @Inject(TARGET_REPOSITORY)
    private readonly targetRepository: TargetRepository,
  ) {}

  /**
   * This method will be executed every 10 seconds.
   * Production-ready applications should use a more reasonable interval.
   * Also, in the real-world system, we would rather use "@nestjs/bull" instead of "@nestjs/schedule"
   * because it provides more sophisticated features (e.g. locking, supports multiple nodes running in parallel etc.).
   */
  @Cron(CronExpression.EVERY_10_SECONDS)
  async processInboxMessages() {
    this.logger.debug(`Processing inbox messages`);

    const process = async (messages: Inbox[], manager: EntityManager) =>
      Promise.all(
        messages.map((message) => this.processInboxMessage(message, manager)),
      );
    const options = {
      take: 100,
    };
    await this.inboxService.processInboxMessages(process, options);
  }

  private processInboxMessage = async (
    message: Inbox,
    manager: EntityManager,
  ) => {
    if (message.pattern === EVENTS.WORKFLOW_CREATE) {
      await this.targetRepository.process(message);

      // Update the message status to "processed".
      const update = {
        status: MESSAGE_STATUS.PROCESSED,
      };
      await manager.update(Inbox, message.id, update);
    }
  };
}
