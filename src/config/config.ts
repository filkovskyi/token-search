"use client";

import { http, createStorage, cookieStorage } from "wagmi";
import { sepolia, bscTestnet, blastSepolia } from "wagmi/chains";
import { Chain, getDefaultConfig } from "@rainbow-me/rainbowkit";

const projectId = "414a549ccf7b48828aeec2e3b4b64533";

const supportedChains: Chain[] = [sepolia, bscTestnet, blastSepolia];

export const config = getDefaultConfig({
  appName: "WalletConnection",
  projectId,
  chains: supportedChains as any,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: supportedChains.reduce(
    (obj, chain) => ({ ...obj, [chain.id]: http() }),
    {}
  ),
});
