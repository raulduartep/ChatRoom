import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUsers1608322295346 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
          isNullable: false,
          isUnique: true,
        },
        {
          name: 'username',
          type: 'varchar',
          isUnique: true,
          isNullable: false,
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
