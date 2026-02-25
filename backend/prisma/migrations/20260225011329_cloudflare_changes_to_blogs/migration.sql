/*
  Warnings:

  - You are about to drop the column `imageDelete` on the `Blogs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Blogs" DROP COLUMN "imageDelete",
ADD COLUMN     "imagePublicId" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "image" SET DEFAULT '';
