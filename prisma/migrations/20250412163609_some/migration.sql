/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `pending_members` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `birth_date` to the `members` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `members` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birth_date` to the `pending_members` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `pending_members` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `pending_members` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "members" ADD COLUMN     "birth_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pending_members" ADD COLUMN     "birth_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "username" TEXT NOT NULL,
ALTER COLUMN "avatar_uri" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "pending_members_username_key" ON "pending_members"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
