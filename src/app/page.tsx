"use client";
import TokenData from "@/components/tokenData/TokenData";
import TokenChart from "@/components/tokenChart/TokenChart";
import UserData from "@/components/userData/UserData";

export default function Home() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <TokenData />
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <TokenChart />
        <UserData />
      </div>
    </>
  );
}
