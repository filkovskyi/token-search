import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { tokenStore } from "@/store/token";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useAccount, useBalance } from "wagmi";

const TokenData: React.FC = () => {
  const token = tokenStore((state: any) => state.token);

  const account = useAccount();

  const { data, isError, isLoading } = useBalance({
    address: account.address,
    //token: '0x539bdE0d7Dbd336b79148AA742883198BBF60342',

  });

  if (isLoading) return <div>Fetching balance…</div>;
  if (isError) return <div>Error fetching balance</div>;

  console.log(data);
  
  return (
    <Card x-chunk="dashboard-01-chunk-5">
      <CardHeader>
        <CardTitle>{`User's token data:`}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        <div className="flex items-center gap-4">
          <Avatar className="hidden h-9 w-9 sm:flex">
            <AvatarImage src={token.large} alt={token.name} />
            <AvatarFallback>{token.name}</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">{token.name}</p>
            <p className="text-sm text-muted-foreground">{token.symbol}</p>
          </div>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">Token Balance</p>
            <p className="text-sm text-muted-foreground">{`${data?.formatted.slice(
              0,
              6
            )} ${data?.symbol}`}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenData;
