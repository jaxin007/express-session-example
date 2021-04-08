import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import {
  SessionIds,
} from './sessionIds.entity';
import {
  EntityNames,
  UserRoles,
} from '../constants';

@Entity(EntityNames.users)
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 256,
    unique: true,
    nullable: false,
  })
  login: string;

  @Column({
    type: 'varchar',
    length: 256,
    unique: false,
    nullable: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 256,
    unique: true,
    nullable: true,
  })
  email: string;

  @Column({
    type: 'enum',
    enum: UserRoles,
    nullable: false,
    default: UserRoles.user,
  })
  role: UserRoles;

  @CreateDateColumn({
    type: 'timestamp',
    default: 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;

  @OneToMany(() => SessionIds, (sessionId) => sessionId.user)
  sessionIds: SessionIds[];
}
