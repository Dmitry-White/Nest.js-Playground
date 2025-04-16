import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import Piscina from 'piscina';
import { resolve } from 'path';

import { WORKERS } from '../threads.constants';

@Injectable()
export class PiscinaHost
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private worker: Piscina;

  onApplicationBootstrap() {
    this.worker = new Piscina({
      filename: resolve(__dirname, WORKERS.PISCINA),
    });
  }

  async onApplicationShutdown() {
    this.worker.destroy();
  }

  run(n: number) {
    return this.worker.run(n);
  }
}
