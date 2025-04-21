import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';

import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly paymentsService: PaymentsService,
  ) {}

  @Get('webhook')
  webhook(@Req() request: Request) {
    const contextId = ContextIdFactory.create();
    this.moduleRef.registerRequestByContextId(request, contextId);

    this.paymentsService.process(contextId);
  }
}
