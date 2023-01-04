/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `VerifiedEmail` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "VerifiedEmail_email_key" ON "VerifiedEmail"("email");
