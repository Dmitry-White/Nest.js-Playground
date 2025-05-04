import { Controller, Get, Post, Body } from '@nestjs/common';

import { CreateAlarmCommand } from '../../application/commands/create-alarm.command';
import { AlarmsService } from '../../application/alarms.service';

import { CreateAlarmDto } from './dto/create-alarm.dto';

@Controller('alarms')
export class AlarmsController {
  constructor(private readonly alarmsService: AlarmsService) {}

  @Post()
  create(@Body() createAlarmDto: CreateAlarmDto) {
    const createAlarmCommand = new CreateAlarmCommand(
      createAlarmDto.name,
      createAlarmDto.severity,
    );
    return this.alarmsService.create(createAlarmCommand);
  }

  @Get()
  findAll() {
    return this.alarmsService.findAll();
  }
}
