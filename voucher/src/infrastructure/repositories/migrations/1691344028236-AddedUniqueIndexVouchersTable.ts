import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedUniqueIndexVouchersTable1691344028236
  implements MigrationInterface
{
  name = "AddedUniqueIndexVouchersTable1691344028236";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_efc30b2b9169e05e0e1e19d6dd" ON "vouchers" ("code") `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_efc30b2b9169e05e0e1e19d6dd"`
    );
  }
}
