import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import {
  Permission,
  PermissionType,
} from '../../iam/authorization/authorization.types';
import { Role } from '../../iam/authorization/enums/role.enum';
import { ApiKey } from '../../iam/authentication/entities/api-key.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ enum: Role, default: Role.Regular })
  role: Role;

  @Column({ enum: Permission, default: [], type: 'json' })
  permissions: PermissionType[];

  @JoinTable()
  @OneToMany(() => ApiKey, (apiKey) => apiKey.user)
  apiKeys: ApiKey[];

  @Column({ default: false })
  is2FAEnabled: boolean;

  @Column({ nullable: true })
  secret2FA: string;
}
