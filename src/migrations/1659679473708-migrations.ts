import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1659679473708 implements MigrationInterface {
    name = 'migrations1659679473708'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "artists" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grammy" boolean NOT NULL, CONSTRAINT "PK_09b823d4607d2675dc4ffa82261" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "albums" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artistId" uuid, CONSTRAINT "PK_838ebae24d2e12082670ffc95d7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tracks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "artistId" uuid, "albumId" uuid, "duration" integer NOT NULL, CONSTRAINT "PK_242a37ffc7870380f0e611986e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favs" ("idUser" character varying NOT NULL, CONSTRAINT "PK_c48a1c3bb19eacb7e76dc50c0de" PRIMARY KEY ("idUser"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, "version" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "hashToken" character varying, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "fav_use_art" ("fav_id" character varying NOT NULL, "art_id" uuid NOT NULL, CONSTRAINT "PK_6d3a000d556c2075546634d77f5" PRIMARY KEY ("fav_id", "art_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bb3eee8c4daba2e015bf4759e7" ON "fav_use_art" ("fav_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_a6dbd65aae4005bc48cf5310ad" ON "fav_use_art" ("art_id") `);
        await queryRunner.query(`CREATE TABLE "fav_use_alb" ("fav_id" character varying NOT NULL, "alb_id" uuid NOT NULL, CONSTRAINT "PK_a11309f219d884f4749894bc4cf" PRIMARY KEY ("fav_id", "alb_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2de18bc0369763cfad323448a8" ON "fav_use_alb" ("fav_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_6bdb9ea426521940f039d6f3c4" ON "fav_use_alb" ("alb_id") `);
        await queryRunner.query(`CREATE TABLE "fav_use_track" ("fav_id" character varying NOT NULL, "track_id" uuid NOT NULL, CONSTRAINT "PK_680453a1550633c91c111cde3eb" PRIMARY KEY ("fav_id", "track_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_736e995feec8e16d799d5f2102" ON "fav_use_track" ("fav_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_7cbf40c7c5072b39c4452cd22f" ON "fav_use_track" ("track_id") `);
        await queryRunner.query(`ALTER TABLE "albums" ADD CONSTRAINT "FK_ed378d7c337efd4d5c8396a77a1" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tracks" ADD CONSTRAINT "FK_62f595181306916265849fced48" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tracks" ADD CONSTRAINT "FK_5c52e761792791f57de2fec342d" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "fav_use_art" ADD CONSTRAINT "FK_bb3eee8c4daba2e015bf4759e71" FOREIGN KEY ("fav_id") REFERENCES "favs"("idUser") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "fav_use_art" ADD CONSTRAINT "FK_a6dbd65aae4005bc48cf5310ad5" FOREIGN KEY ("art_id") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "fav_use_alb" ADD CONSTRAINT "FK_2de18bc0369763cfad323448a82" FOREIGN KEY ("fav_id") REFERENCES "favs"("idUser") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "fav_use_alb" ADD CONSTRAINT "FK_6bdb9ea426521940f039d6f3c42" FOREIGN KEY ("alb_id") REFERENCES "albums"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "fav_use_track" ADD CONSTRAINT "FK_736e995feec8e16d799d5f2102b" FOREIGN KEY ("fav_id") REFERENCES "favs"("idUser") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "fav_use_track" ADD CONSTRAINT "FK_7cbf40c7c5072b39c4452cd22f2" FOREIGN KEY ("track_id") REFERENCES "tracks"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fav_use_track" DROP CONSTRAINT "FK_7cbf40c7c5072b39c4452cd22f2"`);
        await queryRunner.query(`ALTER TABLE "fav_use_track" DROP CONSTRAINT "FK_736e995feec8e16d799d5f2102b"`);
        await queryRunner.query(`ALTER TABLE "fav_use_alb" DROP CONSTRAINT "FK_6bdb9ea426521940f039d6f3c42"`);
        await queryRunner.query(`ALTER TABLE "fav_use_alb" DROP CONSTRAINT "FK_2de18bc0369763cfad323448a82"`);
        await queryRunner.query(`ALTER TABLE "fav_use_art" DROP CONSTRAINT "FK_a6dbd65aae4005bc48cf5310ad5"`);
        await queryRunner.query(`ALTER TABLE "fav_use_art" DROP CONSTRAINT "FK_bb3eee8c4daba2e015bf4759e71"`);
        await queryRunner.query(`ALTER TABLE "tracks" DROP CONSTRAINT "FK_5c52e761792791f57de2fec342d"`);
        await queryRunner.query(`ALTER TABLE "tracks" DROP CONSTRAINT "FK_62f595181306916265849fced48"`);
        await queryRunner.query(`ALTER TABLE "albums" DROP CONSTRAINT "FK_ed378d7c337efd4d5c8396a77a1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7cbf40c7c5072b39c4452cd22f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_736e995feec8e16d799d5f2102"`);
        await queryRunner.query(`DROP TABLE "fav_use_track"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6bdb9ea426521940f039d6f3c4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2de18bc0369763cfad323448a8"`);
        await queryRunner.query(`DROP TABLE "fav_use_alb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a6dbd65aae4005bc48cf5310ad"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bb3eee8c4daba2e015bf4759e7"`);
        await queryRunner.query(`DROP TABLE "fav_use_art"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "favs"`);
        await queryRunner.query(`DROP TABLE "tracks"`);
        await queryRunner.query(`DROP TABLE "albums"`);
        await queryRunner.query(`DROP TABLE "artists"`);
    }

}
