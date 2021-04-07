import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
} from 'typeorm';

import {
  EntityNames,
} from '../constants';

export class addSessionIdsTimestamps1617691973115 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns(EntityNames.sessionIds, [
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

      new TableColumn({
        name: 'deleted_at',
        type: 'timestamp',
        isNullable: true,
        default: null,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(EntityNames.sessionIds, 'created_at');
    await queryRunner.dropColumn(EntityNames.sessionIds, 'updated_at');
    await queryRunner.dropColumn(EntityNames.sessionIds, 'deleted_at');
  }
}
