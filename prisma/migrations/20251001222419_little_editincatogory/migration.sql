/*
  Warnings:

  - You are about to drop the column `image` on the `Types` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Types" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL
);
INSERT INTO "new_Types" ("id", "name", "slug") SELECT "id", "name", "slug" FROM "Types";
DROP TABLE "Types";
ALTER TABLE "new_Types" RENAME TO "Types";
CREATE UNIQUE INDEX "Types_slug_key" ON "Types"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
