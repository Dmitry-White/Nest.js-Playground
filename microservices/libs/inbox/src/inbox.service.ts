import { MESSAGE_STATUS } from '@app/core';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';

import { Inbox } from './inbox.entity';

@Injectable()
export class InboxService {
  constructor(
    private readonly dataSource: DataSource,

    @InjectRepository(Inbox)
    private readonly inboxRepository: Repository<Inbox>,
  ) {}

  async processInboxMessages(
    process: (messages: Inbox[], manager: EntityManager) => Promise<unknown>,
    options: { take: number },
  ) {
    const operation = async (manager: EntityManager) => {
      const inboxRepository = manager.getRepository(Inbox);
      const messages = await inboxRepository.find({
        where: {
          status: MESSAGE_STATUS.PENDING,
        },
        order: {
          createdAt: 'ASC',
        },
        take: options.take,
        // While this approach works, it's far from ideal as we'll have 2 nodes running cron jobs that basically do nothing but fail.
        // This is why we should rather use one of the other approaches mentioned in this lesson instead.
        lock: {
          mode: 'pessimistic_write',
          onLocked: 'nowait',
        },
      });
      await process(messages, manager);
    };

    return this.dataSource.transaction(operation);
  }

  async save(
    payload: Record<string, any>,
    message: Record<string, any>,
    pattern: string,
  ) {
    const messageId = `${message.fields.routingKey}-${payload.buildingId}`;

    const inboxMessage = await this.inboxRepository.findOne({
      where: {
        messageId,
      },
    });
    if (!inboxMessage) {
      await this.inboxRepository.save({
        messageId,
        pattern,
        status: MESSAGE_STATUS.PENDING,
        payload,
      });
    }
  }
}
