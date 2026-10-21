/*
  Warnings:

  - Added the required column `avatar_uri` to the `pending_members` table without a default value. This is not possible if the table is not empty.
  - Made the column `avatar_uri` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "pending_members" ADD COLUMN     "avatar_uri" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "avatar_uri" SET NOT NULL;
