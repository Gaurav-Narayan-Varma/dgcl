/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "foo" TEXT NOT NULL DEFAULT 'bar';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name";
