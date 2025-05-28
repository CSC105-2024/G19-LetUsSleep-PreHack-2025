/*
  Warnings:

  - You are about to drop the column `CompanySize` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `GeneralBe` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `Industy` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `Overview` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `Telcontact` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `WebsiteURL` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `YearEst` on the `Company` table. All the data in the column will be lost.
  - Added the required column `email` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `Email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Company" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "overview" TEXT,
    "industry" TEXT,
    "companySize" TEXT,
    "yearEst" INTEGER,
    "generalBe" TEXT,
    "location" TEXT NOT NULL,
    "contactPhone" TEXT,
    "email" TEXT NOT NULL,
    "websiteURL" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Company" ("id", "location", "password") SELECT "id", "location", "password" FROM "Company";
DROP TABLE "Company";
ALTER TABLE "new_Company" RENAME TO "Company";
CREATE UNIQUE INDEX "Company_email_key" ON "Company"("email");
CREATE TABLE "new_Job" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "Desciption" TEXT,
    "Responbility" TEXT,
    "Qualification" TEXT,
    "Benenfit" TEXT,
    "workingHours" TEXT,
    "JobType" TEXT NOT NULL,
    "minSalary" INTEGER NOT NULL,
    "maxSalary" INTEGER NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "CompanyId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Job_CompanyId_fkey" FOREIGN KEY ("CompanyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Job" ("Benenfit", "CompanyId", "Desciption", "JobType", "Qualification", "Responbility", "id", "maxSalary", "minSalary", "published", "title", "workingHours") SELECT "Benenfit", "CompanyId", "Desciption", "JobType", "Qualification", "Responbility", "id", "maxSalary", "minSalary", "published", "title", "workingHours" FROM "Job";
DROP TABLE "Job";
ALTER TABLE "new_Job" RENAME TO "Job";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER,
    "identificationNumber" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "Bdate" DATETIME,
    "age" INTEGER,
    "Telphone" TEXT,
    "Email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "ResumeURL" TEXT,
    "hasExperience" BOOLEAN NOT NULL DEFAULT false,
    "jobTitle" TEXT,
    "companyName" TEXT,
    "startYear" TEXT,
    "startMonth" TEXT,
    "endYear" TEXT,
    "endMonth" TEXT,
    "stillInRole" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("Bdate", "Email", "ResumeURL", "Telphone", "firstName", "id", "lastName", "password", "userId") SELECT "Bdate", "Email", "ResumeURL", "Telphone", "firstName", "id", "lastName", "password", "userId" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
