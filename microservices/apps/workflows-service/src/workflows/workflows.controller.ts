import { CreateWorkflowDto, EVENTS, UpdateWorkflowDto } from '@app/core';
import { Controller, Get, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { WorkflowsService } from './workflows.service';

@Controller('workflows')
export class WorkflowsController {
  constructor(
    private readonly logger: Logger,
    private readonly workflowsService: WorkflowsService) {}

  @MessagePattern(EVENTS.WORKFLOW_CREATE)
  create(@Payload() createWorkflowDto: CreateWorkflowDto) {
    this.logger.log(createWorkflowDto);
    return this.workflowsService.create(createWorkflowDto);
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
