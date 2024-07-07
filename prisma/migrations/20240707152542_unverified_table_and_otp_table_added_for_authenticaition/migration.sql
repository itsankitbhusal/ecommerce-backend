-- CreateTable
CREATE TABLE "unverified_users" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "name" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "email_verified" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT NOT NULL,
    "otp" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "password_otp" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "hashOtp" TEXT NOT NULL,
    "user_mail" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "password_otp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "unverified_users_uuid_key" ON "unverified_users"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "unverified_users_email_key" ON "unverified_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "password_otp_uuid_key" ON "password_otp"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "password_otp_user_mail_key" ON "password_otp"("user_mail");
