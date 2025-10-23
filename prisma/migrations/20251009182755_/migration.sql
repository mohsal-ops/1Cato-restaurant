-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CartItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "image" TEXT,
    "productId" TEXT,
    "name" TEXT,
    "pickupDay" DATETIME NOT NULL,
    "pickupTime" TEXT NOT NULL,
    "price" INTEGER,
    "quantity" INTEGER,
    "cartId" TEXT NOT NULL,
    CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CartItem" ("cartId", "id", "image", "name", "pickupDay", "pickupTime", "price", "productId", "quantity") SELECT "cartId", "id", "image", "name", "pickupDay", "pickupTime", "price", "productId", "quantity" FROM "CartItem";
DROP TABLE "CartItem";
ALTER TABLE "new_CartItem" RENAME TO "CartItem";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
