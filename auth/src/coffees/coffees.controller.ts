import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { Roles } from '../iam/authorization/decorators/roles.decorator';
import { Role } from '../iam/authorization/enums/role.enum';
import { ActiveUser } from '../iam/decorators/active-user.decorator';
import { UserData } from '../iam/iam.interfaces';

import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Roles(Role.Admin)
  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeesService.create(createCoffeeDto);
  }

  @Get()
  findAll(@ActiveUser() user: UserData) {
    console.log(user);
    return this.coffeesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coffeesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(+id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(+id);
  }
}
