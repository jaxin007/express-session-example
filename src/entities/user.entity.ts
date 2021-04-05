import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import {
  SessionIds,
} from './sessionIds.entity';
import {
  EntityNames,
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

  @OneToMany(() => SessionIds, (sessionId) => sessionId.user)
  sessionIds: SessionIds[];
}
