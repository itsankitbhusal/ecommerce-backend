/*
  Warnings:

  - You are about to drop the column `email_verified` on the `unverified_users` table. All the data in the column will be lost.
  - You are about to drop the column `email_verified` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "unverified_users" DROP COLUMN "email_verified";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "email_verified",
ADD COLUMN     "hashRT" TEXT;
