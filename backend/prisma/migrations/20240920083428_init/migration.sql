/*
  Warnings:

  - You are about to drop the `_CategoryToEvent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `_CategoryToEvent`;

-- CreateTable
CREATE TABLE `_EventCategories` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_EventCategories_AB_unique`(`A`, `B`),
    INDEX `_EventCategories_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
