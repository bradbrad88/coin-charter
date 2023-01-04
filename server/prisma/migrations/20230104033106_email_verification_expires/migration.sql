-- AlterTable
ALTER TABLE "EmailVerification" ADD COLUMN     "expires" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP + (30 * interval '1 minute');
