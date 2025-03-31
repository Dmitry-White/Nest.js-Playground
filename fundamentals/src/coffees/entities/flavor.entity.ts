import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Coffee } from './coffee.entity';

@Entity()
class Flavor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany((type) => Coffee, (coffee) => coffee.flavors)
  coffees: Coffee[];
}

export { Flavor };
