import { Controller, Get, Query } from '@nestjs/common';

import { PiscinaHost } from './hosts/piscina.host';
import { BasicHost } from './hosts/basic.host';

@Controller('threads')
export class ThreadsController {
  constructor(
    private readonly basicHost: BasicHost,
    private readonly piscinaHost: PiscinaHost,
  ) {}

  @Get('basic')
  basic(@Query('n') n = 10) {
    return this.basicHost.run(n);
  }

  @Get('piscina')
  piscina(@Query('n') n = 10) {
    return this.piscinaHost.run(n);
  }
}
