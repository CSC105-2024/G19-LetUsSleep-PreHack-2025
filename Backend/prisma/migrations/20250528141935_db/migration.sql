/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToJob` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `Benenfit` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `CompanyId` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `Desciption` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `JobType` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `Qualification` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `Responbility` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Job` table. All the data in the column will be lost.
  - Added the required column `categories` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobType` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Category_name_key";

-- DropIndex
DROP INDEX "_CategoryToJob_B_index";

-- DropIndex
DROP INDEX "_CategoryToJob_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Category";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_CategoryToJob";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Job" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "desciption" TEXT,
    "responbility" TEXT,
    "qualification" TEXT,
    "benenfit" TEXT,
    "workingHours" TEXT,
    "jobType" TEXT NOT NULL,
    "minSalary" INTEGER NOT NULL,
    "maxSalary" INTEGER NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "companyId" INTEGER NOT NULL,
    "categories" TEXT NOT NULL,
    CONSTRAINT "Job_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Job" ("id", "maxSalary", "minSalary", "published", "title", "workingHours") SELECT "id", "maxSalary", "minSalary", "published", "title", "workingHours" FROM "Job";
DROP TABLE "Job";
ALTER TABLE "new_Job" RENAME TO "Job";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
