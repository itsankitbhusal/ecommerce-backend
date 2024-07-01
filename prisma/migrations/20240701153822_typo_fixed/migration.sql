/*
  Warnings:

  - You are about to drop the column `shipping_addres` on the `orders` table. All the data in the column will be lost.
  - Added the required column `shipping_address` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "shipping_addres",
ADD COLUMN     "shipping_address" TEXT NOT NULL;
