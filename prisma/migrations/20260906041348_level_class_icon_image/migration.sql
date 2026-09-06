/*
  Warnings:

  - You are about to drop the column `iconUrl` on the `SurvivalClassPersist` table. All the data in the column will be lost.
  - Added the required column `iconImageId` to the `SurvivalClassPersist` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SurvivalClassPersist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "classNumber" TEXT,
    "securityLevel" TEXT NOT NULL,
    "legitimacy" TEXT NOT NULL,
    "dangerLevel" TEXT NOT NULL,
    "iconImageId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    CONSTRAINT "SurvivalClassPersist_iconImageId_fkey" FOREIGN KEY ("iconImageId") REFERENCES "ImagePersist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_SurvivalClassPersist" ("classNumber", "dangerLevel", "description", "id", "legitimacy", "securityLevel", "type") SELECT "classNumber", "dangerLevel", "description", "id", "legitimacy", "securityLevel", "type" FROM "SurvivalClassPersist";
DROP TABLE "SurvivalClassPersist";
ALTER TABLE "new_SurvivalClassPersist" RENAME TO "SurvivalClassPersist";
CREATE UNIQUE INDEX "SurvivalClassPersist_iconImageId_key" ON "SurvivalClassPersist"("iconImageId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
