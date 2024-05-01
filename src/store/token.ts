import { create } from "zustand";
import { Coin } from "@/types/types";

export const tokenStore = create((set) => ({
  token: {
    id: "ethereum",
    name: "Ethereum",
    api_symbol: "ethereum",
    symbol: "ETH",
    market_cap_rank: 2,
    thumb: "https://assets.coingecko.com/coins/images/279/thumb/ethereum.png",
    large: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
  },
  updateToken: (newToken: Coin) => set({ token: newToken }),
}));
