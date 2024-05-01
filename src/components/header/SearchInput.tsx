import { useState } from "react";
import { Search } from "lucide-react";
import useCoinsList from "@/hooks/useCoinsList";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Coin } from "@/types/types";
import { tokenStore } from "@/store/token";

const SearchInput: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const updateToken = tokenStore((state: any) => state.updateToken);

  const { coins, loading, error } = useCoinsList();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleCardClick = (coin: Coin) => {
    setIsDialogOpen(false);
    updateToken(coin);

    setSearchTerm("");
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="ml-auto flex-1 sm:flex-initial">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search token..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              onClick={() => setIsDialogOpen(true)}
            />
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Search token</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <form className="flex w-full">
              <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search token..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </form>
            {filteredCoins.length > 0 && (
              <Card
                className="mt-[40px] h-80 overflow-y-scroll"
                x-chunk="dashboard-01-chunk-5"
              >
                <CardHeader>
                  <CardTitle>Searching results: </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  {filteredCoins.map((coin: Coin) => (
                    <div
                      key={coin.id}
                      className="flex items-center gap-4 py-2 cursor-pointer hover:bg-gray-100 transition duration-200"
                      onClick={() => handleCardClick(coin)}
                    >
                      <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarFallback>{coin.symbol}</AvatarFallback>
                      </Avatar>

                      <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">
                          {coin.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {coin.symbol}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchInput;
