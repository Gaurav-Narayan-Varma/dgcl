/*
  Warnings:

  - You are about to drop the column `example` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "example",
ADD COLUMN     "password" TEXT NOT NULL DEFAULT '$2a$10$cQEFiUaWpFvVVO5AcV3QN.7ohJXxxOPouTxORiZP.mUhupwEpDnUy';

-- CreateTable
CREATE TABLE "User2" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL DEFAULT '$2a$10$cQEFiUaWpFvVVO5AcV3QN.7ohJXxxOPouTxORiZP.mUhupwEpDnUy',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,

    CONSTRAINT "User2_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User2_email_key" ON "User2"("email");
