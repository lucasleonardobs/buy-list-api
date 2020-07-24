import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterProductFieldToProductId1595453092754
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('orders', 'product');

    await queryRunner.addColumn(
      'orders',
      new TableColumn({
        name: 'product_id',
        type: 'int',
      }),
    );

    await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey({
        name: 'OrderProduct',
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('orders', 'OrderProduct');

    await queryRunner.dropColumn('orders', 'product_id');

    await queryRunner.addColumn(
      'orders',
      new TableColumn({
        name: 'product',
        type: 'varchar',
      }),
    );
  }
}
