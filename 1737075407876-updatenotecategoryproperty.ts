import { MigrationInterface, QueryRunner } from "typeorm";

export class Updatenotecategoryproperty1737075407876 implements MigrationInterface {
    name = 'Updatenotecategoryproperty1737075407876'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note_categories" ADD "unique_relation" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "note_categories" ADD CONSTRAINT "UQ_3b530709feb5a87f5d7d6a0bf42" UNIQUE ("unique_relation")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note_categories" DROP CONSTRAINT "UQ_3b530709feb5a87f5d7d6a0bf42"`);
        await queryRunner.query(`ALTER TABLE "note_categories" DROP COLUMN "unique_relation"`);
    }

}
