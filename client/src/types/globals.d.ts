import { AxiosRequestConfig } from "axios";
export {};

declare global {
  interface Chart {
    _id: string;
    coinId: string;
    coinName: string;
    symbol: string;
    chartTitle: string;
    chartDescription: string;
    chartComments: Comment[];
    coinComments: Comment[];
    username: string;
    userId: string;
    imageThumbnail: string;
    imageMedium: string;
    imageSmall: string;
    upVotes: User[];
    downVotes: User[];
    createdAt: number;
  }

  interface User {
    _id: string;
    username: string;
    subTitle: string;
    bio: string;
    friendCount: number;
    postCount: number;
    image?: string;
    favCoins: FavCoin[];
    favCoinCount: number;
    chartCount: number;
  }

  interface Comment {
    _id: string;
    commentText: string;
    username: string;
    image: string;
    userId: string;
    coinId: string;
    coinName: string;
    chartId: string;
    upVotes: number;
    downVotes: number;
    createdAt: number;
  }

  interface FavCoin {
    coin: Coin;
    updatedAt: string;
  }

  interface Coin {
    coinId: string;
    coinName: string;
    symbol: string;
    image: string;
  }

  type Config = AxiosRequestConfig;
}
