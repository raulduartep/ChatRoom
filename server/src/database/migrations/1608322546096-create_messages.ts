import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createMessages1608322546096 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'messages',
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
          name: 'message',
          type: 'text',
          isNullable: false,
        },
        {
          name: 'signature',
          type: 'varchar',
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('messages');
  }
}
