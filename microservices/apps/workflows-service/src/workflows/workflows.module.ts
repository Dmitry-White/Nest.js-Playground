import { TARGET_REPOSITORY } from '@app/core';
import { Inbox, InboxModule, InboxProcessor } from '@app/inbox';
import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Workflow } from './entities/workflow.entity';
import { WorkflowsController } from './workflows.controller';
import { WorkflowsService } from './workflows.service';

@Module({
  imports: [TypeOrmModule.forFeature([Workflow, Inbox]), InboxModule],
  controllers: [WorkflowsController],
  providers: [
    Logger,
    WorkflowsService,
    InboxProcessor,
    {
      provide: TARGET_REPOSITORY,
      useClass: WorkflowsService,
    },
  ],
})
export class WorkflowsModule {}
