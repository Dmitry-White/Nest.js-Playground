import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { Permissions } from '../iam/authorization/decorators/permissions.decorator';
import { Permission } from '../iam/authorization/authorization.types';
import { Roles } from '../iam/authorization/decorators/roles.decorator';
import { Role } from '../iam/authorization/enums/role.enum';
import { Policies } from '../iam/authorization/decorators/policy.decorator';
import { FrameworkContributorPolicy } from '../iam/authorization/policies/framework-contributor.policy';
import { ActiveUser } from '../iam/decorators/active-user.decorator';
import { Authentication } from '../iam/authentication/decorators/authentication.decorator';
import { AuthenticationType } from '../iam/authentication/enums/authentication.enums';
import { UserData } from '../iam/iam.types';

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

  @Authentication(AuthenticationType.Bearer, AuthenticationType.ApiKey)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coffeesService.findOne(+id);
  }

  @Permissions(Permission.UpdateCoffee)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(+id, updateCoffeeDto);
  }

  @Policies(new FrameworkContributorPolicy())
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(+id);
  }
}
