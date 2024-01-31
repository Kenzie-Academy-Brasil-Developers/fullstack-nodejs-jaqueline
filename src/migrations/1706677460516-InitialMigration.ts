import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1706677460516 implements MigrationInterface {
    name = 'InitialMigration1706677460516'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" ADD "deletedAt" date`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "deletedAt"`);
    }

}
