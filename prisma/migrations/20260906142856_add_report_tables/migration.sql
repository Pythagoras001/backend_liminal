-- CreateTable
CREATE TABLE "ReportPersist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "authorId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "nivel" TEXT NOT NULL,
    "levelClassId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "principalEvidenceId" TEXT NOT NULL,
    CONSTRAINT "ReportPersist_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "UserPersist" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ReportPersist_levelClassId_fkey" FOREIGN KEY ("levelClassId") REFERENCES "SurvivalClassPersist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ReportPersist_principalEvidenceId_fkey" FOREIGN KEY ("principalEvidenceId") REFERENCES "EvidencePersist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EvidencePersist" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,
    "galeryReportId" INTEGER,
    CONSTRAINT "EvidencePersist_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "ImagePersist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "EvidencePersist_galeryReportId_fkey" FOREIGN KEY ("galeryReportId") REFERENCES "ReportPersist" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ReportLikePersist" (
    "userId" TEXT NOT NULL,
    "reportId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("userId", "reportId"),
    CONSTRAINT "ReportLikePersist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserPersist" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ReportLikePersist_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "ReportPersist" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "ReportPersist_principalEvidenceId_key" ON "ReportPersist"("principalEvidenceId");

-- CreateIndex
CREATE UNIQUE INDEX "EvidencePersist_imageId_key" ON "EvidencePersist"("imageId");
