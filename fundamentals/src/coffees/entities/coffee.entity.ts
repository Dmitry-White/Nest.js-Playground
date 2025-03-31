import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column('json', { nullable: true })
  flavors: string[];
}

export { Coffee };
