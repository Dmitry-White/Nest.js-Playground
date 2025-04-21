import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications/notifications.service';
import { PaymentsContext } from './payments.context';

import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { SubscriptionsService } from './subscriptions/subscriptions.service';

@Module({
  controllers: [PaymentsController],
  providers: [
    PaymentsService,
    NotificationsService,
    SubscriptionsService,
    PaymentsContext,
  ],
})
export class PaymentsModule {}
