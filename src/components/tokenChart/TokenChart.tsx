import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { tokenStore } from "@/store/token";

import moment from "moment";

import { Line } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TokenChart: React.FC = () => {
  const token = tokenStore((state: any) => state.token);
  const [cryptos, setCryptos] = useState<Crypto[] | null>(null);
  const [selected, setSelected] = useState<Crypto[]>([]);

  const [data, setData] = useState<ChartData<"line">>();
  const [options, setOptions] = useState<ChartOptions<"line">>({
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  });

  useEffect(() => {
    if (!token) return;

    const coingeckoApiKey = process.env.NEXT_PUBLIC_COINGECKO_API_KEY || "";

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": coingeckoApiKey,
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/${token.id}/market_chart?vs_currency=usd&days=30&interval=daily`,
      options
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData({
          labels: data.prices.map((price: number[]) => {
            return moment.unix(price[0] / 1000).format("MM-DD");
          }),
          datasets: [
            {
              label: "Dataset 1",
              data: data.prices.map((price: number[]) => {
                return price[1].toFixed(2);
              }),
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [token]);

  console.log(data);

  return (
    <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Price Chart</CardTitle>
          <CardDescription>
            Historical view of coin performance.
          </CardDescription>
        </div>
      </CardHeader>
      {data && (
        <CardContent>{<Line options={options} data={data} />}</CardContent>
      )}
    </Card>
  );
};

export default TokenChart;
