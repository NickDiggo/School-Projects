/*
  Warnings:

  - Made the column `mapId` on table `Memo` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Memo" DROP CONSTRAINT "Memo_mapId_fkey";

-- AlterTable
ALTER TABLE "Memo" ALTER COLUMN "content" DROP NOT NULL,
ALTER COLUMN "mapId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Memo" ADD CONSTRAINT "Memo_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Map"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
