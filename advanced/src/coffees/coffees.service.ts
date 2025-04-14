import { Inject, Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';

import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { ICoffeesDataSource } from './coffees.interfaces';
import { COFFEES_DATA_SOURCE } from './coffees.constants';
/**
 * Circular dependency with token injection.
 *
 * Causes the following error:
 * ERROR [ExceptionHandler]
 * UndefinedDependencyException [Error]: Nest can't resolve dependencies of the CoffeesService (?).
 * Please make sure that the argument dependency at index [0] is available in the CoffeesModule context.
 */
// import { COFFEES_DATA_SOURCE } from './coffees.module';

@Injectable()
export class CoffeesService {
  constructor(
    private readonly lazyModuleLoader: LazyModuleLoader,

    @Inject(COFFEES_DATA_SOURCE)
    private readonly coffeesDataSource: ICoffeesDataSource,
    /**
     * Using TS interfaces/types directly to inject dependencies.
     *
     * Causes the following error:
     *  ERROR [ExceptionHandler]
     *  UnknownDependenciesException [Error]: Nest can't resolve dependencies of the CoffeesService (?, Array).
     *  Please make sure that the argument Object at index [0] is available in the CoffeesModule context.
     */
    // private readonly iCoffeesDataSource: ICoffeesDataSource,
    // private readonly tCoffeesDataSource: TCoffeesDataSource,
  ) {}

  async create(createCoffeeDto: CreateCoffeeDto) {
    // Lazy load RewardsModule
    console.time();
    const { RewardsModule } = await import('../rewards/rewards.module');
    const rewardsModuleRef = await this.lazyModuleLoader.load(
      () => RewardsModule,
    );
    const { RewardsService } = await import('../rewards/rewards.service');
    const rewardsService = rewardsModuleRef.get(RewardsService);
    console.timeEnd();

    rewardsService.grantTo();

    return 'This action adds a new coffee';
  }

  findAll() {
    return `This action returns all coffees`;
  }

  findOne(id: number) {
    return `This action returns a #${id} coffee`;
  }

  update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
    return `This action updates a #${id} coffee`;
  }

  remove(id: number) {
    return `This action removes a #${id} coffee`;
  }
}
