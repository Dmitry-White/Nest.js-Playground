import { Module } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CoffeesController } from './coffees.controller';
import { COFFEES_DATA_SOURCE } from './coffees.constants';

/**
 * Circular dependency with token injection.
 *
 * Causes the following error:
 * ERROR [ExceptionHandler]
 * UndefinedDependencyException [Error]: Nest can't resolve dependencies of the CoffeesService (?).
 * Please make sure that the argument dependency at index [0] is available in the CoffeesModule context.
 */
// export const COFFEES_DATA_SOURCE = Symbol('COFFEES_DATA_SOURCE');

@Module({
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    {
      provide: COFFEES_DATA_SOURCE,
      useValue: []
    },
    /**
     * Using TS interfaces/types directly to inject dependencies.
     *
     * Causes the following error:
     *  ERROR [ExceptionHandler]
     *  UnknownDependenciesException [Error]: Nest can't resolve dependencies of the CoffeesService (?, Array).
     *  Please make sure that the argument Object at index [0] is available in the CoffeesModule context.
     */
    // {
    //   provide: 'ICoffeesDataSource',
    //   useValue: [],
    // },
    // {
    //   provide: 'TCoffeesDataSource',
    //   useValue: [],
    // },
  ],
})
export class CoffeesModule {}
