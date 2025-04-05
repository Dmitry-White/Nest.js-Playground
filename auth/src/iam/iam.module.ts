import { Module } from '@nestjs/common';

import { HASHING_SERVICE } from './hashing/hashing.constants';
import { HashingService } from './hashing/hashing.service';

@Module({
  providers: [
    {
      provide: HASHING_SERVICE,
      useClass: HashingService,
    },
  ],
  exports: [
    {
      provide: HASHING_SERVICE,
      useClass: HashingService,
    },
  ],
})
export class IamModule {}
