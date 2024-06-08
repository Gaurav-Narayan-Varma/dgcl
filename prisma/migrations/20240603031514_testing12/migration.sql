/*
  Warnings:

  - You are about to drop the column `test` on the `User` table. All the data in the column will be lost.
  - Added the required column `example` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "test",
ADD COLUMN     "example" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
