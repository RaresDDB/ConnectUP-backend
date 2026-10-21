-- CreateTable
CREATE TABLE "change_email_requests" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "old_email" TEXT NOT NULL,
    "new_email" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "change_email_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "change_password_requests" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "old_password" TEXT NOT NULL,
    "new_password" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "change_password_requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "change_email_requests_token_key" ON "change_email_requests"("token");

-- CreateIndex
CREATE UNIQUE INDEX "change_password_requests_token_key" ON "change_password_requests"("token");

-- AddForeignKey
ALTER TABLE "change_email_requests" ADD CONSTRAINT "change_email_requests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "change_password_requests" ADD CONSTRAINT "change_password_requests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
