import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @IsPositive()
  offset: number;
}

export { PaginationQueryDto };
