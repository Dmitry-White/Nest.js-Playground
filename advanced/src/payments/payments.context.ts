import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class PaymentsContext {
  constructor(@Inject(REQUEST) public readonly request: Request) {}
}
