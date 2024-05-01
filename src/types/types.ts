export type Coin = {
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
  coins: Coin[];
};
