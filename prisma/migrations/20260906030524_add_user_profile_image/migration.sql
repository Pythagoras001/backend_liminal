-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserPersist" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "profileImageId" TEXT,
    CONSTRAINT "UserPersist_profileImageId_fkey" FOREIGN KEY ("profileImageId") REFERENCES "ImagePersist" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_UserPersist" ("createdAt", "email", "id", "password", "userName") SELECT "createdAt", "email", "id", "password", "userName" FROM "UserPersist";
DROP TABLE "UserPersist";
ALTER TABLE "new_UserPersist" RENAME TO "UserPersist";
CREATE UNIQUE INDEX "UserPersist_userName_key" ON "UserPersist"("userName");
CREATE UNIQUE INDEX "UserPersist_email_key" ON "UserPersist"("email");
CREATE UNIQUE INDEX "UserPersist_profileImageId_key" ON "UserPersist"("profileImageId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
