/*
  Warnings:

  - You are about to drop the column `birth_date` on the `members` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `members` table. All the data in the column will be lost.
  - You are about to drop the `member_tags` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `birth_date` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "member_tags" DROP CONSTRAINT "member_tags_member_id_fkey";

-- DropForeignKey
ALTER TABLE "member_tags" DROP CONSTRAINT "member_tags_tag_id_fkey";

-- AlterTable
ALTER TABLE "members" DROP COLUMN "birth_date",
DROP COLUMN "gender";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "birth_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL;

-- DropTable
DROP TABLE "member_tags";

-- CreateTable
CREATE TABLE "user_tags" (
    "tag_id" TEXT NOT NULL,
    "member_id" TEXT NOT NULL,

    CONSTRAINT "user_tags_pkey" PRIMARY KEY ("member_id","tag_id")
);

-- AddForeignKey
ALTER TABLE "user_tags" ADD CONSTRAINT "user_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_tags" ADD CONSTRAINT "user_tags_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
