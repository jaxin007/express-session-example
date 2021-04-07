import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @DeleteDateColumn({
    type: 'timestamp',
    nullable: true,
    default: null,
  })
  deleted_at: Date | null;
}
