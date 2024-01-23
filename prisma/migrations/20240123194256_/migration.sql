/*
  Warnings:

  - You are about to drop the column `category_id` on the `Transations` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Transations` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Transations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Transations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transations" DROP CONSTRAINT "Transations_category_id_fkey";

-- DropForeignKey
ALTER TABLE "Transations" DROP CONSTRAINT "Transations_user_id_fkey";

-- AlterTable
ALTER TABLE "Transations" DROP COLUMN "category_id",
DROP COLUMN "user_id",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Transations" ADD CONSTRAINT "Transations_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transations" ADD CONSTRAINT "Transations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
