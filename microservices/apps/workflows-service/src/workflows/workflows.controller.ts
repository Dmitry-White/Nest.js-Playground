import { CreateWorkflowDto, EVENTS, UpdateWorkflowDto } from '@app/core';
import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
} from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

import { WorkflowsService } from './workflows.service';

@Controller('workflows')
export class WorkflowsController {
  constructor(
    private readonly logger: Logger,
    private readonly workflowsService: WorkflowsService,
  ) {}

  @EventPattern(EVENTS.WORKFLOW_CREATE)
  async create(
    @Payload() createWorkflowDto: CreateWorkflowDto,
    @Ctx() context: RmqContext,
  ) {
    const message = context.getMessage();
    const pattern = context.getPattern();

    await this.workflowsService.inboxSave(createWorkflowDto, message, pattern);

    const channel = context.getChannelRef();
    channel.ack(message);
  }

  @Get()
  findAll() {
    return this.workflowsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workflowsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWorkflowDto: UpdateWorkflowDto,
  ) {
    return this.workflowsService.update(+id, updateWorkflowDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workflowsService.remove(+id);
  }
}
