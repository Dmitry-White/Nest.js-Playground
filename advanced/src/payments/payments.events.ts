import { ContextId } from '@nestjs/core';

class PaymentFailedEvent {
  static readonly key = 'PAYMENT_FAILED';
  constructor(
    public readonly paymentId: number,
    public readonly meta: { contextId: ContextId },
  ) {}
}

export { PaymentFailedEvent };
