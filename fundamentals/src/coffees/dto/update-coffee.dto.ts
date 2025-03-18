import { PartialType } from '@nestjs/mapped-types';

import { CreateCoffeeDto } from './create-coffee.dto';

class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {}

export { UpdateCoffeeDto };
