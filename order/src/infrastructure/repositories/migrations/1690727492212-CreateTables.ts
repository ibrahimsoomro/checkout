import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1690727492212 implements MigrationInterface {
  name = 'CreateTables1690727492212';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "orders" ("id" SERIAL NOT NULL, "total" numeric(10,2) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "orders_products_products" ("ordersId" integer NOT NULL, "productsId" integer NOT NULL, CONSTRAINT "PK_9a16b87f8bea57750b1bca044ab" PRIMARY KEY ("ordersId", "productsId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_dbab812991c32a735a34748370" ON "orders_products_products" ("ordersId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_af9cb00de5ab2af01a6a325343" ON "orders_products_products" ("productsId") `
    );
    await queryRunner.query(
      `ALTER TABLE "orders_products_products" ADD CONSTRAINT "FK_dbab812991c32a735a34748370c" FOREIGN KEY ("ordersId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "orders_products_products" ADD CONSTRAINT "FK_af9cb00de5ab2af01a6a3253435" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "orders_products_products" DROP CONSTRAINT "FK_af9cb00de5ab2af01a6a3253435"`);
    await queryRunner.query(`ALTER TABLE "orders_products_products" DROP CONSTRAINT "FK_dbab812991c32a735a34748370c"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_af9cb00de5ab2af01a6a325343"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_dbab812991c32a735a34748370"`);
    await queryRunner.query(`DROP TABLE "orders_products_products"`);
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(`DROP TABLE "products"`);
  }
}
