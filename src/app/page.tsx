"use client";

import TokenChart from "@/components/tokenChart/TokenChart";
import TokenData from "@/components/tokenData/TokenData";

export default function Home() {
  return (
    <>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <TokenChart />
        <TokenData />
      </div>
    </>
  );
}
