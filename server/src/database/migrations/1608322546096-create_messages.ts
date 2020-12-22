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
          name: 'owner_id',
          type: 'integer',
        },
        {
          name: 'signature',
          type: 'varchar',
        },
      ],
      foreignKeys: [{
        name: 'MessageUser',
        columnNames: ['owner_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onUpdate: 'CASCADE',
      }],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('messages');
  }
}
