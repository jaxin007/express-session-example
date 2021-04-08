import {
  MigrationInterface,
  QueryRunner,
  Table,
} from 'typeorm';

import {
  EntityNames,
} from '../constants';

export class addUsers1617624727510 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: EntityNames.users,
      columns: [
        {
          name: 'id',
          type: 'serial',
          isPrimary: true,
        },
        {
          name: 'login',
          type: 'varchar',
          length: '256',
          isUnique: true,
          isNullable: false,
        },
        {
          name: 'password',
          type: 'varchar',
          length: '256',
          isNullable: false,
        },
        {
          name: 'email',
          type: 'varchar',
          length: '256',
          isNullable: true,
          isUnique: true,
        },
      ],
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(EntityNames.users, true);
  }
}
