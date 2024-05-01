import { useState } from "react";
import { Search } from "lucide-react";
import useSearch from "@/hooks/useSearch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Coin {
  id: string;
  name: string;
  api_symbol: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
}

interface SearchResults {
  coins: Coin[];
}

const SearchInput: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { searchTerm, searchResults, loading, error, search } = useSearch();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    search(event.target.value);
  };

  const handleCardClick = (coin: Coin) => {
    setIsDialogOpen(false);
    search("");
    console.log(coin);
  };

  const { coins }: SearchResults = searchResults as unknown as SearchResults;

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
        <DialogContent className=" sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Search token</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <form className=" flex w-full">
              <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search token..."
                  className="pl-8 "
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </form>

            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}

            {coins && coins.length > 0 && (
              <Card
                className="mt-[40px] h-80 overflow-y-scroll"
                x-chunk="dashboard-01-chunk-5"
              >
                <CardHeader>
                  <CardTitle>Searching results: </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  {coins.map((coin: Coin) => (
                    <div
                      key={coin.id}
                      className="flex items-center gap-4 py-2 cursor-pointer hover:bg-gray-100 transition duration-200"
                      onClick={() => handleCardClick(coin)}
                    >
                      <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarImage src={coin.large} alt={coin.name} />
                        <AvatarFallback>{coin.name}</AvatarFallback>
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
