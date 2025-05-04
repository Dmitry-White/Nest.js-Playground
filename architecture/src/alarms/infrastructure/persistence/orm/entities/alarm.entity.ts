import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('alarms')
class AlarmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  severity: string;
}

export { AlarmEntity };
