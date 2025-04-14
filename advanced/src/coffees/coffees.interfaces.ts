import { Coffee } from './entities/coffee.entity';

interface ICoffeesDataSource {
  [index: number]: Coffee;
}

type TCoffeesDataSource = Coffee[];

export { ICoffeesDataSource, TCoffeesDataSource };
