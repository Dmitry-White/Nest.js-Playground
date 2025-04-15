import { Injectable } from '@nestjs/common';

import { Host } from '../scheduler/decorators/host.decorator';
import { Interval } from '../scheduler/decorators/interval.decorator';

@Host()
@Injectable()
export class RewardsService {
  grantTo() {
    console.log('Hello from the lazy-loaded RewardsService 👋');
  }

  @Interval(1000)
  remindTo() {
    console.log('This will be logged every second 🐈');
  }
}
