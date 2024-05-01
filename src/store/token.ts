import { create } from "zustand";
import { Coin } from "@/types/types";

export const tokenStore = create((set) => ({
  token: {
    id: "mai-ethereum",
    symbol: "mimatic",
    name: "MAI (Ethereum)",
    platforms: {
      ethereum: "0x8d6cebd76f18e1558d4db88138e2defb3909fad6",
    },
  },
  updateToken: (newToken: Coin) => set({ token: newToken }),
}));
