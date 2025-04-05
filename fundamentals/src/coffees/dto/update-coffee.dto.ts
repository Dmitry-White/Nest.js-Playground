import { PartialType } from '@nestjs/swagger';

import { CreateCoffeeDto } from './create-coffee.dto';

class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {}

export { UpdateCoffeeDto };
