/*
  Warnings:

  - You are about to drop the column `avatar_uri` on the `pending_members` table. All the data in the column will be lost.
  - You are about to drop the column `birth_date` on the `pending_members` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `pending_members` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `pending_members` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `pending_members` table. All the data in the column will be lost.
  - You are about to drop the column `birth_date` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `change_email_requests` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `change_password_requests` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `notification_logs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_tags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "change_email_requests" DROP CONSTRAINT "change_email_requests_user_id_fkey";

-- DropForeignKey
ALTER TABLE "change_password_requests" DROP CONSTRAINT "change_password_requests_user_id_fkey";

-- DropForeignKey
ALTER TABLE "notification_logs" DROP CONSTRAINT "notification_logs_event_id_fkey";

-- DropForeignKey
ALTER TABLE "notification_logs" DROP CONSTRAINT "notification_logs_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_tags" DROP CONSTRAINT "user_tags_member_id_fkey";

-- DropForeignKey
ALTER TABLE "user_tags" DROP CONSTRAINT "user_tags_tag_id_fkey";

-- DropIndex
DROP INDEX "pending_members_username_key";

-- DropIndex
DROP INDEX "users_username_key";

-- AlterTable
ALTER TABLE "pending_members" DROP COLUMN "avatar_uri",
DROP COLUMN "birth_date",
DROP COLUMN "created_at",
DROP COLUMN "gender",
DROP COLUMN "username";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "birth_date",
DROP COLUMN "gender",
DROP COLUMN "username";

-- DropTable
DROP TABLE "change_email_requests";

-- DropTable
DROP TABLE "change_password_requests";

-- DropTable
DROP TABLE "notification_logs";

-- DropTable
DROP TABLE "user_tags";

-- CreateTable
CREATE TABLE "member_tags" (
    "tag_id" TEXT NOT NULL,
    "member_id" TEXT NOT NULL,

    CONSTRAINT "member_tags_pkey" PRIMARY KEY ("member_id","tag_id")
);

-- AddForeignKey
ALTER TABLE "member_tags" ADD CONSTRAINT "member_tags_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "members"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "member_tags" ADD CONSTRAINT "member_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
