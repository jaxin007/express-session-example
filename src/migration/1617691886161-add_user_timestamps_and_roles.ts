import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
} from 'typeorm';

import {
  EntityNames,
} from '../constants';

export class addUserTimestampsAndRoles1617691886161 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns(EntityNames.users, [
      new TableColumn({
        name: 'role',
        type: 'enum',
        enum: [
          'user',
          'admin',
        ],
        isNullable: false,
        default: '\'user\'',
      }),

      new TableColumn({
        name: 'created_at',
        type: 'timestamp',
        default: 'NOW()',
      }),

      new TableColumn({
        name: 'updated_at',
        type: 'timestamp',
        default: 'NOW()',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(EntityNames.users, 'role');
    await queryRunner.dropColumn(EntityNames.users, 'created_at');
    await queryRunner.dropColumn(EntityNames.users, 'updated_at');
  }
}
