import { CreateWorkflowDto, EVENTS, MESSAGE_BROKER } from '@app/core';
import { Outbox } from '@app/outbox';
import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { DataSource, Repository } from 'typeorm';
import { lastValueFrom } from 'rxjs';

import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { Building } from './entities/building.entity';

@Injectable()
export class BuildingsService {
  constructor(
    private readonly logger: Logger,

    @InjectRepository(Building)
    private readonly buildingsRepository: Repository<Building>,

    @Inject(MESSAGE_BROKER)
    private readonly messageBroker: ClientProxy,

    private readonly dataSource: DataSource,
  ) {}

  async findAll(): Promise<Building[]> {
    return this.buildingsRepository.find();
  }

  async findOne(id: number): Promise<Building> {
    const building = await this.buildingsRepository.findOne({ where: { id } });
    if (!building) {
      throw new NotFoundException(`Building #${id} does not exist`);
    }
    return building;
  }

  async create(createBuildingDto: CreateBuildingDto): Promise<Building> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const buildingsRepository = queryRunner.manager.getRepository(Building);
    const outboxRepository = queryRunner.manager.getRepository(Outbox);

    try {
      const building = buildingsRepository.create({
        ...createBuildingDto,
      });
      const newBuildingEntity = await buildingsRepository.save(building);
      this.logger.log("Building: ", newBuildingEntity);

      await outboxRepository.save({
        type: EVENTS.WORKFLOW_CREATE,
        payload: {
          name: 'My workflow',
          buildingId: building.id,
        },
        target: MESSAGE_BROKER.description,
      });

      await queryRunner.commitTransaction();

      return newBuildingEntity;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async update(
    id: number,
    updateBuildingDto: UpdateBuildingDto,
  ): Promise<Building> {
    const building = await this.buildingsRepository.preload({
      id: +id,
      ...updateBuildingDto,
    });

    if (!building) {
      throw new NotFoundException(`Building #${id} does not exist`);
    }
    return this.buildingsRepository.save(building);
  }

  async remove(id: number): Promise<Building> {
    const building = await this.findOne(id);
    return this.buildingsRepository.remove(building);
  }

  async createWorkflow(buildingId: number) {
    const newWorkflow = await lastValueFrom(
      this.messageBroker.send(EVENTS.WORKFLOW_CREATE, {
        name: 'My Workflow',
        buildingId,
      } as CreateWorkflowDto),
    );
    this.logger.log({ newWorkflow });
    return newWorkflow;
  }
}
