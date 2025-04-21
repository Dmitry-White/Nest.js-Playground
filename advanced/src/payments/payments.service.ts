import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ContextId } from '@nestjs/core';

import { PaymentFailedEvent } from './payments.events';

@Injectable()
export class PaymentsService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  process(contextId: ContextId) {
    const paymentId = Math.floor(Math.random() * 1000);

    const res = this.eventEmitter.emit(
      PaymentFailedEvent.key,
      new PaymentFailedEvent(paymentId, { contextId }),
    );
    console.log(res)
  }
}
