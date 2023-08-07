import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOrderStatusOrdersTable1691411239527
  implements MigrationInterface
{
  name = "AddOrderStatusOrdersTable1691411239527";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "status" character varying NOT NULL DEFAULT 'PENDING'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "status"`);
  }
}
