import { CreateWorkflowDto, UpdateWorkflowDto } from '@app/core';
import { Inbox, InboxService } from '@app/inbox';
import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Workflow } from './entities/workflow.entity';

@Injectable()
export class WorkflowsService {
  constructor(
    private readonly logger: Logger,

    @InjectRepository(Workflow)
    private readonly workflowsRepository: Repository<Workflow>,

    private readonly inboxService: InboxService,
  ) {}

  async findAll(): Promise<Workflow[]> {
    return this.workflowsRepository.find();
  }

  async findOne(id: number): Promise<Workflow> {
    const workflow = await this.workflowsRepository.findOne({ where: { id } });
    if (!workflow) {
      throw new NotFoundException(`Workflow #${id} does not exist`);
    }
    return workflow;
  }

  async create(createWorkflowDto: CreateWorkflowDto): Promise<Workflow> {
    const workflow = this.workflowsRepository.create({
      ...createWorkflowDto,
    });
    const newWorkflowEntity = await this.workflowsRepository.save(workflow);
    return newWorkflowEntity;
  }

  async inboxSave(
    createWorkflowDto: CreateWorkflowDto,
    message: Record<string, any>,
    pattern: string,
  ) {
    await this.inboxService.save(createWorkflowDto, message, pattern);
  }

  async process(message: Inbox): Promise<void> {
    const workflow = this.workflowsRepository.create({
      ...message.payload,
    });
    const newWorkflowEntity = await this.workflowsRepository.save(workflow);
    this.logger.debug(
      `Created workflow with id ${newWorkflowEntity.id} for building ${newWorkflowEntity.buildingId}`,
    );
  }

  async update(
    id: number,
    updateWorkflowDto: UpdateWorkflowDto,
  ): Promise<Workflow> {
    const workflow = await this.workflowsRepository.preload({
      id: +id,
      ...updateWorkflowDto,
    });

    if (!workflow) {
      throw new NotFoundException(`Workflow #${id} does not exist`);
    }
    return this.workflowsRepository.save(workflow);
  }

  async remove(id: number): Promise<Workflow> {
    const workflow = await this.findOne(id);
    return this.workflowsRepository.remove(workflow);
  }
}
