import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';

import { HOST_KEY, INTERVAL_KEY } from './scheduler.constants';
import { HostProvider, IntervalMethod } from './scheduler.types';

@Injectable()
export class SchedulerService
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private readonly intervals: NodeJS.Timeout[] = [];

  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly reflector: Reflector,
    private readonly metadataScanner: MetadataScanner,
  ) {}

  onApplicationBootstrap() {
    const hostProviders = this.getHostProviders();

    this.initSchedules(hostProviders);
  }

  onApplicationShutdown() {
    this.intervals.forEach((intervalRef) => clearInterval(intervalRef));
  }

  private getHostProviders() {
    const providers = this.discoveryService.getProviders();

    const hostProviders = providers.reduce((acc, { instance }) => {
      const prototype = instance && Object.getPrototypeOf(instance);
      if (!instance || !prototype) {
        return acc;
      }

      const isHost = this.reflector.get(HOST_KEY, instance.constructor);
      if (!isHost) {
        return acc;
      }

      const intervalMethods = this.getIntervalMethods(prototype, instance);

      acc.push({ hostInstance: instance, intervalMethods });

      return acc;
    }, [] as HostProvider[]);

    return hostProviders;
  }

  private getIntervalMethods(prototype: object, instance: object) {
    const methodKeys = this.metadataScanner.getAllMethodNames(prototype);

    const intervalMethods = methodKeys.reduce((acc, curr) => {
      const interval = this.reflector.get(INTERVAL_KEY, instance[curr]);
      if (!interval) {
        return acc;
      }

      acc.push({ method: curr, interval });

      return acc;
    }, [] as IntervalMethod[]);

    return intervalMethods;
  }

  private initSchedules(hostProviders: HostProvider[]) {
    hostProviders.forEach(({ hostInstance, intervalMethods }) => {
      intervalMethods.forEach(({ method, interval }) => {
        const intervalRef = setInterval(() => hostInstance[method](), interval);
        this.intervals.push(intervalRef);
      });
    });
  }
}
