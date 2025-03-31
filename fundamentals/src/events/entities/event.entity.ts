import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  name: string;

  @Column('json')
  payload: Record<string, any>;
}
export { Event };
