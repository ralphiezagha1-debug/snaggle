import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuctionCard } from "@/components/AuctionCard";
import { ProductCard } from "./ProductCard";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface StoreTabsProps {
  auctions: any[];
  products: any[];
}

export default function StoreTabs({ auctions, products }: StoreTabsProps) {
  const [auctionFilter, setAuctionFilter] = useState<'all' | 'live' | 'upcoming'>('all');

  const filteredAuctions = auctions.filter(auction => {
    if (auctionFilter === 'live') return auction.isLive;
    if (auctionFilter === 'upcoming') return auction.upcoming;
    return true;
  });

  const liveCount = auctions.filter(a => a.isLive).length;
  const upcomingCount = auctions.filter(a => a.upcoming).length;

  return (
    <Tabs defaultValue="auctions" className="w-full">
      <TabsList className="grid w-full grid-cols-2 bg-white/5 border border-white/10">
        <TabsTrigger 
          value="auctions" 
          className="data-[state=active]:bg-[var(--snag-neon)]/10 data-[state=active]:text-[var(--snag-neon)]"
        >
          Auctions ({auctions.length})
        </TabsTrigger>
        <TabsTrigger 
          value="buy-now"
          className="data-[state=active]:bg-[var(--snag-neon)]/10 data-[state=active]:text-[var(--snag-neon)]"
        >
          Buy Now ({products.length})
        </TabsTrigger>
      </TabsList>

      <TabsContent value="auctions" className="mt-6 space-y-6">
        {/* Filter Chips */}
        <div className="flex gap-2 flex-wrap">
          <Badge 
            variant={auctionFilter === 'all' ? 'default' : 'outline'}
            className={`cursor-pointer ${
              auctionFilter === 'all' 
                ? 'bg-[var(--snag-neon)] text-black' 
                : 'border-white/30 text-white/80 hover:border-[var(--snag-neon)]'
            }`}
            onClick={() => setAuctionFilter('all')}
          >
            All ({auctions.length})
          </Badge>
          <Badge 
            variant={auctionFilter === 'live' ? 'default' : 'outline'}
            className={`cursor-pointer ${
              auctionFilter === 'live' 
                ? 'bg-[var(--snag-neon)] text-black' 
                : 'border-white/30 text-white/80 hover:border-[var(--snag-neon)]'
            }`}
            onClick={() => setAuctionFilter('live')}
          >
            Live ({liveCount})
          </Badge>
          <Badge 
            variant={auctionFilter === 'upcoming' ? 'default' : 'outline'}
            className={`cursor-pointer ${
              auctionFilter === 'upcoming' 
                ? 'bg-[var(--snag-neon)] text-black' 
                : 'border-white/30 text-white/80 hover:border-[var(--snag-neon)]'
            }`}
            onClick={() => setAuctionFilter('upcoming')}
          >
            Upcoming ({upcomingCount})
          </Badge>
        </div>

        {/* Auctions Grid */}
        {filteredAuctions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAuctions.map((auction) => (
              <AuctionCard key={auction.id} auction={auction} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="border-2 border-dashed border-[var(--snag-neon)]/30 rounded-xl p-8">
              <p className="text-white/70 mb-4">No {auctionFilter} auctions found</p>
              <Badge 
                variant="outline" 
                className="border-[var(--snag-neon)] text-[var(--snag-neon)] cursor-pointer"
                onClick={() => setAuctionFilter('all')}
              >
                View All Auctions
              </Badge>
            </div>
          </div>
        )}
      </TabsContent>

      <TabsContent value="buy-now" className="mt-6">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="border-2 border-dashed border-[var(--snag-neon)]/30 rounded-xl p-8">
              <p className="text-white/70 mb-4">No products available for immediate purchase</p>
              <Badge 
                variant="outline" 
                className="border-[var(--snag-neon)] text-[var(--snag-neon)]"
              >
                Check back soon
              </Badge>
            </div>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}