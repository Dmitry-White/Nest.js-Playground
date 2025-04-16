import { Module } from '@nestjs/common';

import { BasicHost } from './hosts/basic.host';
import { PiscinaHost } from './hosts/piscina.host';
import { ThreadsController } from './threads.controller';

@Module({
  controllers: [ThreadsController],
  providers: [BasicHost, PiscinaHost],
})
export class ThreadsModule {}
