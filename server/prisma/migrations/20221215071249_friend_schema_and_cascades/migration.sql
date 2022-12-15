-- DropForeignKey
ALTER TABLE "Chart" DROP CONSTRAINT "Chart_userId_fkey";

-- DropForeignKey
ALTER TABLE "ChartComment" DROP CONSTRAINT "ChartComment_chartId_fkey";

-- DropForeignKey
ALTER TABLE "ChartComment" DROP CONSTRAINT "ChartComment_userId_fkey";

-- DropForeignKey
ALTER TABLE "ChartCommentVote" DROP CONSTRAINT "ChartCommentVote_chartCommentId_fkey";

-- DropForeignKey
ALTER TABLE "ChartCommentVote" DROP CONSTRAINT "ChartCommentVote_coinCommentId_fkey";

-- DropForeignKey
ALTER TABLE "ChartCommentVote" DROP CONSTRAINT "ChartCommentVote_userId_fkey";

-- DropForeignKey
ALTER TABLE "ChartVote" DROP CONSTRAINT "ChartVote_chartId_fkey";

-- DropForeignKey
ALTER TABLE "ChartVote" DROP CONSTRAINT "ChartVote_userId_fkey";

-- DropForeignKey
ALTER TABLE "CoinComment" DROP CONSTRAINT "CoinComment_coinId_fkey";

-- DropForeignKey
ALTER TABLE "CoinComment" DROP CONSTRAINT "CoinComment_userId_fkey";

-- DropForeignKey
ALTER TABLE "CoinCommentVote" DROP CONSTRAINT "CoinCommentVote_coinCommentId_fkey";

-- DropForeignKey
ALTER TABLE "CoinCommentVote" DROP CONSTRAINT "CoinCommentVote_userId_fkey";

-- DropForeignKey
ALTER TABLE "CoinFavourite" DROP CONSTRAINT "CoinFavourite_coinId_fkey";

-- DropForeignKey
ALTER TABLE "CoinFavourite" DROP CONSTRAINT "CoinFavourite_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserIdentity" DROP CONSTRAINT "UserIdentity_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserVerification" DROP CONSTRAINT "UserVerification_userId_fkey";

-- DropForeignKey
ALTER TABLE "VerifiedEmail" DROP CONSTRAINT "VerifiedEmail_userId_fkey";

-- AlterTable
ALTER TABLE "Chart" ALTER COLUMN "userId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Friend" (
    "userId" TEXT NOT NULL,
    "friendId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "verified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Friend_pkey" PRIMARY KEY ("userId","friendId")
);

-- AddForeignKey
ALTER TABLE "VerifiedEmail" ADD CONSTRAINT "VerifiedEmail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVerification" ADD CONSTRAINT "UserVerification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserIdentity" ADD CONSTRAINT "UserIdentity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chart" ADD CONSTRAINT "Chart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChartComment" ADD CONSTRAINT "ChartComment_chartId_fkey" FOREIGN KEY ("chartId") REFERENCES "Chart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChartComment" ADD CONSTRAINT "ChartComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChartVote" ADD CONSTRAINT "ChartVote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChartVote" ADD CONSTRAINT "ChartVote_chartId_fkey" FOREIGN KEY ("chartId") REFERENCES "Chart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChartCommentVote" ADD CONSTRAINT "ChartCommentVote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChartCommentVote" ADD CONSTRAINT "ChartCommentVote_chartCommentId_fkey" FOREIGN KEY ("chartCommentId") REFERENCES "ChartComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChartCommentVote" ADD CONSTRAINT "ChartCommentVote_coinCommentId_fkey" FOREIGN KEY ("coinCommentId") REFERENCES "CoinComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoinCommentVote" ADD CONSTRAINT "CoinCommentVote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoinCommentVote" ADD CONSTRAINT "CoinCommentVote_coinCommentId_fkey" FOREIGN KEY ("coinCommentId") REFERENCES "CoinComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoinComment" ADD CONSTRAINT "CoinComment_coinId_fkey" FOREIGN KEY ("coinId") REFERENCES "Coin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoinComment" ADD CONSTRAINT "CoinComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoinFavourite" ADD CONSTRAINT "CoinFavourite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoinFavourite" ADD CONSTRAINT "CoinFavourite_coinId_fkey" FOREIGN KEY ("coinId") REFERENCES "Coin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Add Constraint - friend <> self
ALTER TABLE "Friend" ADD CONSTRAINT "No_self_friend" CHECK ("userId" <> "friendId");