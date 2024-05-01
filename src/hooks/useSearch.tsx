import { useState } from "react";

const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const search = async (query: string) => {
    setSearchTerm(query);
    setLoading(true);

    const coingeckoApiKey = process.env.NEXT_PUBLIC_COINGECKO_API_KEY || "";

    if (query.length > 2) {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            "x-cg-demo-api-key": coingeckoApiKey,
          },
        };
        const response = await fetch(
          `https://api.coingecko.com/api/v3/search?query=${query}`,
          options
        );
        const data = await response.json();
        setSearchResults(data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching search results.");
        setLoading(false);
      }
    } else {
      setSearchResults([]);
      setLoading(false);
    }
  };

  return { searchTerm, searchResults, loading, error, search };
};

export default useSearch;
