import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  Type,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const EntityExistsPipe = (entityCls: Type): Type<PipeTransform> => {
  @Injectable()
  class EntityExistsPipeCls implements PipeTransform {
    constructor(
      @InjectRepository(entityCls)
      private entityRepository: Repository<typeof entityCls>,
    ) {
      console.log(this.entityRepository);
    }

    async transform(value: string, metadata: ArgumentMetadata) {
      const exists = await this.entityRepository.exists({
        // @ts-ignore
        where: { id: value },
      });
      if (!exists) {
        throw new NotFoundException();
      }

      return value;
    }
  }
  return EntityExistsPipeCls;
};

export { EntityExistsPipe };
