import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { tokenStore } from "@/store/token";

import { useAccount, useBalance } from "wagmi";

const TokenData: React.FC = () => {
  const token = tokenStore((state: any) => state.token);
  const account = useAccount();

  const { data } = useBalance({
    address: account.address,
    token: token.platforms.ethereum,
  });

  console.log(data);

  return (
    <Card x-chunk="dashboard-01-chunk-5">
      <CardHeader>
        <CardTitle>{`User's token data:`}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        <div className="flex items-center gap-4">
          <div className="grid gap-1 ">
            <p className=" font-medium leading-none">Token Balance:</p>
            {data ? (
              <p className="text-sm text-muted-foreground">{`${data?.formatted.slice(
                0,
                6
              )} ${data?.symbol}`}</p>
            ) : (
              <p className=" text-sm font-medium leading-none">
                {` User wallet has not such coin ${token.name}`}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenData;
