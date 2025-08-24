import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function AuctionCard({ auction }) {
  return (
    <Card>
      <CardHeader>
        <img src={auction.img} alt={auction.title} className="rounded-t-lg" />
        <CardTitle>{auction.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Current Price</p>
            <p className="text-2xl font-bold">${auction.currentPrice.toFixed(2)}</p>
          </div>
          <Badge variant={auction.status === 'live' ? 'destructive' : 'secondary'}>
            {auction.status}
          </Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Link to={`/auctions/${auction.id}`} className="w-full">
          <Button className="w-full">View</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
