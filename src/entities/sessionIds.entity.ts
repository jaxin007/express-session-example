import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import {
  EntityNames,
} from '../constants';
import {
  User,
} from './user.entity';

@Entity(EntityNames.sessionIds)
export class SessionIds {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 256,
    unique: true,
    nullable: false,
  })
  sessionId: string;

  @ManyToOne(() => User, (user) => user.sessionIds)
  user: User;
}
