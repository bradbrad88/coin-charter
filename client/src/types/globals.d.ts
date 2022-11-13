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
