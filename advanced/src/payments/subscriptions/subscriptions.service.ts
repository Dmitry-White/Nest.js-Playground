import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { OnEvent } from '@nestjs/event-emitter';

import { PaymentsContext } from '../payments.context';
import { PaymentFailedEvent } from '../payments.events';

@Injectable()
export class SubscriptionsService {
  constructor(private readonly moduleRef: ModuleRef) {}

  @OnEvent(PaymentFailedEvent.key)
  async cancelSubscription(event: PaymentFailedEvent) {
    const eventContext = await this.moduleRef.resolve(
      PaymentsContext,
      event.meta.contextId,
    );

    console.log('Cancelling subscription', eventContext.request.url);
  }
}
