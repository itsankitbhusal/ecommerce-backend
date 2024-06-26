/*
  Warnings:

  - Changed the type of `product_id` on the `banners` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `order_no` on the `orders` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `cart_items` on the `orders` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `product_date` on the `products` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "banners" DROP COLUMN "product_id",
ADD COLUMN     "product_id" UUID NOT NULL,
ALTER COLUMN "banner_type" SET DATA TYPE VARCHAR;

-- AlterTable
ALTER TABLE "categories" ALTER COLUMN "category_name" SET DATA TYPE VARCHAR;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "order_no",
ADD COLUMN     "order_no" INTEGER NOT NULL,
ALTER COLUMN "shipping_email" SET DATA TYPE VARCHAR,
ALTER COLUMN "shipping_phone" SET DATA TYPE VARCHAR,
ALTER COLUMN "order_payment_method" SET DATA TYPE VARCHAR,
DROP COLUMN "cart_items",
ADD COLUMN     "cart_items" INTEGER NOT NULL,
ALTER COLUMN "items_price" SET DATA TYPE VARCHAR,
ALTER COLUMN "delivery_charge" SET DATA TYPE VARCHAR,
ALTER COLUMN "total_price" SET DATA TYPE VARCHAR,
ALTER COLUMN "status" SET DATA TYPE VARCHAR;

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "product_name" SET DATA TYPE VARCHAR,
ALTER COLUMN "product_price" SET DATA TYPE VARCHAR,
ALTER COLUMN "product_status" SET DATA TYPE VARCHAR,
DROP COLUMN "product_date",
ADD COLUMN     "product_date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "reviews" ALTER COLUMN "rating" SET DATA TYPE VARCHAR,
ALTER COLUMN "status" SET DATA TYPE VARCHAR;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "name" SET DATA TYPE VARCHAR,
ALTER COLUMN "email" SET DATA TYPE VARCHAR;

-- AddForeignKey
ALTER TABLE "banners" ADD CONSTRAINT "banners_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
