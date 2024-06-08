/*
  Warnings:

  - You are about to drop the column `content` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Service` table. All the data in the column will be lost.
  - Added the required column `card_description` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `card_title` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `editor_state` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `html` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Service" DROP COLUMN "content",
DROP COLUMN "published",
DROP COLUMN "title",
ADD COLUMN     "card_description" TEXT NOT NULL,
ADD COLUMN     "card_title" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "editor_state" TEXT NOT NULL,
ADD COLUMN     "html" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
