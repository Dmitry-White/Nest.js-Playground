import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Coffee {
  constructor(public title: string) {}

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  brand: string;

  @Column({ default: 0 })
  recommendations: number;
}

export { Coffee };
