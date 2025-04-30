import { Module, Logger } from '@nestjs/common';
import { InboxService } from './inbox.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Inbox } from './inbox.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Inbox])],
  providers: [Logger, InboxService],
  exports: [InboxService],
})
export class InboxModule {}
