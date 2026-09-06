-- CreateTable
CREATE TABLE "SurvivalClassPersist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "classNumber" TEXT,
    "securityLevel" TEXT NOT NULL,
    "legitimacy" TEXT NOT NULL,
    "dangerLevel" TEXT NOT NULL,
    "iconUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL
);
