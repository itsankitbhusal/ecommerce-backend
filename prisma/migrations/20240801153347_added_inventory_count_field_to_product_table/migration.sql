-- AlterTable
ALTER TABLE "products" ALTER COLUMN "inventory_count" DROP NOT NULL,
ALTER COLUMN "inventory_count" DROP DEFAULT;
