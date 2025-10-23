/*
  Warnings:

  - Made the column `image` on table `CartItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `CartItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `CartItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `productId` on table `CartItem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `quantity` on table `CartItem` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CartItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "image" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "pickupDay" DATETIME NOT NULL,
    "pickupTime" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "cartId" TEXT NOT NULL,
    CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CartItem" ("cartId", "id", "image", "name", "pickupDay", "pickupTime", "price", "productId", "quantity") SELECT "cartId", "id", "image", "name", "pickupDay", "pickupTime", "price", "productId", "quantity" FROM "CartItem";
DROP TABLE "CartItem";
ALTER TABLE "new_CartItem" RENAME TO "CartItem";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
