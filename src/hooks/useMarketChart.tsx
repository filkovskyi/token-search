// import { useState } from "react";

// const useMarketChart = () => {
//   const [chartData, setChartData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const fetchMarketChartData = async (query: string) => {
//     setLoading(true);

//     const coingeckoApiKey = process.env.NEXT_PUBLIC_COINGECKO_API_KEY || "";

//     const options = {
//       method: "GET",
//       headers: {
//         accept: "application/json",
//         "x-cg-demo-api-key": coingeckoApiKey,
//       },
//     };

//     try {
//       const response = await fetch(
//         `https://api.coingecko.com/api/v3/coins/${query}/market_chart?vs_currency=usd&days=30&interval=daily`,
//         options
//       );
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const data = await response.json();
//       setChartData(data);
//       setLoading(false);
//     } catch (error) {
//       setError("Error fetching market chart data.");
//       setLoading(false);
//     }
//   };

//   return { chartData, loading, error, fetchMarketChartData };
// };

// export default useMarketChart;
