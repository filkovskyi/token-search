import { useState, useEffect } from "react";
import { Coin } from "@/types/types";

type UseCoinListResult = {
  coins: Coin[];
  loading: boolean;
  error: string;
};

const useCoinsList = (searchTerm?: string): UseCoinListResult => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchCoinList = async () => {
      setLoading(true);

      const coingeckoApiKey = process.env.NEXT_PUBLIC_COINGECKO_API_KEY || "";

      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": coingeckoApiKey,
        },
      };

      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/list?include_platform=true",
          options
        );
        const data: Coin[] = await response.json();

        let filteredCoins = data.filter((coin) => coin.platforms.ethereum);

        if (searchTerm && searchTerm.length > 2) {
          filteredCoins = data.filter((coin) =>
            coin.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        setCoins(filteredCoins);
        setLoading(false);
      } catch (error) {
        setError("Error fetching coin list.");
        setLoading(false);
      }
    };

    fetchCoinList();
  }, [searchTerm]);

  return { coins, loading, error };
};

export default useCoinsList;
