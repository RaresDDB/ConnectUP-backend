-- AlterTable
ALTER TABLE "change_email_requests" ADD COLUMN     "resolved_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "change_password_requests" ADD COLUMN     "resolved_at" TIMESTAMP(3);
