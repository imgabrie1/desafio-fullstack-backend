import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1685169243543 implements MigrationInterface {
  name = "InitialMigration1685169243543";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "contacts" RENAME COLUMN "full_name" TO "name"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "contacts" RENAME COLUMN "name" TO "full_name"`
    );
  }
}
