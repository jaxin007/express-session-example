import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

import {
  EntityNames,
} from '../constants';

export class addUsersSessionIds1617624922694 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: EntityNames.sessionIds,
      columns: [
        {
          name: 'id',
          type: 'serial',
          isPrimary: true,
        },
        {
          name: 'sessionId',
          type: 'varchar',
          length: '256',
          isUnique: true,
          isNullable: false,
        },
        {
          name: 'userId',
          type: 'integer',
        },
      ],
    }), true);

    await queryRunner.createForeignKey(EntityNames.sessionIds, new TableForeignKey({
      columnNames: ['userId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(EntityNames.sessionIds, true);
  }
}
