/*
  Warnings:

  - You are about to drop the column `cortesia` on the `categorias` table. All the data in the column will be lost.
  - You are about to drop the column `inteira` on the `categorias` table. All the data in the column will be lost.
  - You are about to drop the column `meia` on the `categorias` table. All the data in the column will be lost.
  - You are about to drop the column `sorteio` on the `categorias` table. All the data in the column will be lost.
  - You are about to drop the column `vip` on the `categorias` table. All the data in the column will be lost.
  - Added the required column `categoria` to the `categorias` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categorias" DROP COLUMN "cortesia",
DROP COLUMN "inteira",
DROP COLUMN "meia",
DROP COLUMN "sorteio",
DROP COLUMN "vip",
ADD COLUMN     "categoria" TEXT NOT NULL;
