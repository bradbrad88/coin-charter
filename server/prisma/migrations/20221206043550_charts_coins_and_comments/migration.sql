-- CreateTable
CREATE TABLE "Coin" (
    "id" TEXT NOT NULL,
    "coinName" VARCHAR(255) NOT NULL,
    "coinId" VARCHAR(255) NOT NULL,
    "symbol" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255) NOT NULL,

    CONSTRAINT "Coin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chart" (
    "id" TEXT NOT NULL,
    "coinId" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "userId" TEXT NOT NULL,
    "originalUsername" VARCHAR(255) NOT NULL,
    "imageThumbnail" VARCHAR(255) NOT NULL,
    "imageMedium" VARCHAR(255) NOT NULL,
    "imageLarge" VARCHAR(255) NOT NULL,

    CONSTRAINT "Chart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChartComment" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "chartId" VARCHAR(255) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ChartComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChartVote" (
    "userId" TEXT NOT NULL,
    "chartId" TEXT NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "ChartVote_pkey" PRIMARY KEY ("userId","chartId")
);

-- CreateTable
CREATE TABLE "ChartCommentVote" (
    "userId" TEXT NOT NULL,
    "chartCommentId" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "coinCommentId" TEXT,

    CONSTRAINT "ChartCommentVote_pkey" PRIMARY KEY ("userId","chartCommentId")
);

-- CreateTable
CREATE TABLE "CoinCommentVote" (
    "userId" TEXT NOT NULL,
    "coinCommentId" TEXT NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "CoinCommentVote_pkey" PRIMARY KEY ("userId","coinCommentId")
);

-- CreateTable
CREATE TABLE "CoinComment" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "coinId" VARCHAR(255) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "CoinComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoinFavourite" (
    "userId" TEXT NOT NULL,
    "coinId" TEXT NOT NULL,

    CONSTRAINT "CoinFavourite_pkey" PRIMARY KEY ("userId","coinId")
);

-- AddForeignKey
ALTER TABLE "Chart" ADD CONSTRAINT "Chart_coinId_fkey" FOREIGN KEY ("coinId") REFERENCES "Coin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chart" ADD CONSTRAINT "Chart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChartComment" ADD CONSTRAINT "ChartComment_chartId_fkey" FOREIGN KEY ("chartId") REFERENCES "Chart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChartComment" ADD CONSTRAINT "ChartComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChartVote" ADD CONSTRAINT "ChartVote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChartVote" ADD CONSTRAINT "ChartVote_chartId_fkey" FOREIGN KEY ("chartId") REFERENCES "Chart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChartCommentVote" ADD CONSTRAINT "ChartCommentVote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChartCommentVote" ADD CONSTRAINT "ChartCommentVote_chartCommentId_fkey" FOREIGN KEY ("chartCommentId") REFERENCES "ChartComment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChartCommentVote" ADD CONSTRAINT "ChartCommentVote_coinCommentId_fkey" FOREIGN KEY ("coinCommentId") REFERENCES "CoinComment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoinCommentVote" ADD CONSTRAINT "CoinCommentVote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoinCommentVote" ADD CONSTRAINT "CoinCommentVote_coinCommentId_fkey" FOREIGN KEY ("coinCommentId") REFERENCES "CoinComment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoinComment" ADD CONSTRAINT "CoinComment_coinId_fkey" FOREIGN KEY ("coinId") REFERENCES "Coin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoinComment" ADD CONSTRAINT "CoinComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoinFavourite" ADD CONSTRAINT "CoinFavourite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoinFavourite" ADD CONSTRAINT "CoinFavourite_coinId_fkey" FOREIGN KEY ("coinId") REFERENCES "Coin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
