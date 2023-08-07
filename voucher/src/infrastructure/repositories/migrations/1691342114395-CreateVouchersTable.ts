import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateVouchersTable1691342114395 implements MigrationInterface {
    name = 'CreateVouchersTable1691342114395'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vouchers" ("id" SERIAL NOT NULL, "orderId" integer NOT NULL, "code" character varying NOT NULL, "amount" numeric(10,2) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ed1b7dd909a696560763acdbc04" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "vouchers"`);
    }

}
