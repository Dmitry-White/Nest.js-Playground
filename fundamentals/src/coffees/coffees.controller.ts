import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiForbiddenResponse } from '@nestjs/swagger';

import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Public } from '../lib/decorators/public.decorator';

import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { ParseIntPipe } from '../lib/pipes/parse-int.pipe';
import { Protocol } from '../lib/decorators/protocol.decorator';

@ApiTags('Coffees')
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Public()
  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    // const { limit, offset } = paginationQuery;
    return this.coffeesService.findAll(paginationQuery);
  }

  @ApiForbiddenResponse({ description: 'Forbidden to find one.' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.coffeesService.findOne(id);
  }

  @ApiForbiddenResponse({ description: 'Forbidden to create.' })
  @Post()
  create(@Body() body: CreateCoffeeDto) {
    return this.coffeesService.create(body);
  }

  @ApiForbiddenResponse({ description: 'Forbidden to update.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateCoffeeDto) {
    return this.coffeesService.update(id, body);
  }

  @ApiForbiddenResponse({ description: 'Forbidden to remove.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(id);
  }

  @Public()
  @Get(':id/timeout')
  timeout(@Protocol() protocol) {
    console.log(protocol);
    return new Promise((resolve) => setTimeout(resolve, 5000));
  }
}
