import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterVoucherTableToAddUniqueIndex1691361550532 implements MigrationInterface {
    name = 'AlterVoucherTableToAddUniqueIndex1691361550532'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vouchers" ADD CONSTRAINT "UQ_d24e61c11bed3675b843d9a8657" UNIQUE ("orderId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vouchers" DROP CONSTRAINT "UQ_d24e61c11bed3675b843d9a8657"`);
    }

}
