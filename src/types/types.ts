export type Token = {
  updateToken: any;
  token: any;
  id: string;
  name: string;
  api_symbol: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
};

export type SearchResults = {
  coins: Token[];
};

export type Coin = {
  id: string;
  symbol: string;
  name: string;
  platforms: {
    [key: string]: string;
  };
};

export type UseCoinListResult = {
  coins: Coin[];
  loading: boolean;
  error: string;
};
