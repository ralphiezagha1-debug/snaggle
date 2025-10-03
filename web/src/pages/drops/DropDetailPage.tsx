import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ShoppingBag, Gavel, Bell, Share2, ExternalLink } from "lucide-react";
import { DROPS, PRODUCTS } from "@/data/mockStoreData";
import { DropHero } from "@/components/drops/DropHero";
import { ProductCard } from "@/components/store/ProductCard";
import { toast } from "@/hooks/use-toast";

export default function DropDetailPage() {
  const { dropId } = useParams();
  const drop = DROPS.find((d) => d.id === dropId);

  if (!drop) {
    return (
      <div className="min-h-screen bg-snag-gradient flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Drop Not Found</h1>
          <Button asChild variant="outline" className="border-white/20">
            <Link to="/drops">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Drops
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const storeProducts = PRODUCTS.filter((p) => drop.storeProductIds.includes(p.id));

  const handleNotifyMe = () => {
    toast({
      title: "You're on the list! (Demo)",
      description: "We'll notify you when this drop goes live.",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied",
      description: "Drop link copied to clipboard",
    });
  };

  return (
    <div className="min-h-screen bg-snag-gradient">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6 text-white/70 hover:text-white hover:bg-white/10">
          <Link to="/drops">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Drops
          </Link>
        </Button>

        {/* Hero */}
        <DropHero drop={drop} />

        {/* Content */}
        <div className="mt-12 space-y-12">
          {/* Story Section */}
          <div className="max-w-4xl">
            <h2 className="text-3xl font-black text-white mb-4">About This Drop</h2>
            <p className="text-lg text-white/80 leading-relaxed">{drop.story}</p>
          </div>

          {/* Store Products */}
          {storeProducts.length > 0 && drop.status !== 'past' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-black text-white mb-2">
                    <ShoppingBag className="inline h-8 w-8 text-[#00FF80] mr-3" />
                    Buy Now
                  </h2>
                  <p className="text-white/70">
                    {drop.unitsRemaining && `${drop.unitsRemaining} units remaining`}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {storeProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}

          {/* Auction Section */}
          {drop.auctionIds.length > 0 && drop.status !== 'past' && (
            <div>
              <div className="mb-6">
                <h2 className="text-3xl font-black text-white mb-2">
                  <Gavel className="inline h-8 w-8 text-[#00FF80] mr-3" />
                  Auction Units
                </h2>
                <p className="text-white/70">
                  Limited units available via auction for an even better deal
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
                <p className="text-white/70 mb-6">
                  {drop.auctionIds.length} exclusive auction{drop.auctionIds.length > 1 ? 's' : ''} available
                </p>
                <Button asChild size="lg" className="bg-[#00C46A] hover:bg-[#00D474] text-white font-semibold">
                  <Link to="/auctions">
                    <Gavel className="h-5 w-5 mr-2" />
                    View Auctions
                  </Link>
                </Button>
              </div>
            </div>
          )}

          {/* Upcoming CTA */}
          {drop.status === 'upcoming' && (
            <div className="bg-gradient-to-br from-[#00FF80]/10 to-[#00FF80]/5 border border-[#00FF80]/20 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Drop Starts Soon</h3>
              <p className="text-white/70 mb-6">
                Be the first to know when this exclusive drop goes live
              </p>
              <Button
                onClick={handleNotifyMe}
                size="lg"
                className="bg-[#00FF80] hover:bg-[#00D474] text-black font-semibold"
              >
                <Bell className="h-5 w-5 mr-2" />
                Notify Me
              </Button>
            </div>
          )}

          {/* Past Drop Message */}
          {drop.status === 'past' && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-white/70 mb-4">This Drop Has Ended</h3>
              <p className="text-white/50 mb-6">Check out our current drops and store</p>
              <div className="flex gap-4 justify-center">
                <Button asChild variant="outline" className="border-white/20 hover:bg-white/10">
                  <Link to="/drops">
                    View Current Drops
                  </Link>
                </Button>
                <Button asChild className="bg-[#00C46A] hover:bg-[#00D474] text-white font-semibold">
                  <Link to="/store">
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Browse Store
                  </Link>
                </Button>
              </div>
            </div>
          )}

          {/* Share */}
          <div className="flex justify-center">
            <Button
              onClick={handleShare}
              variant="outline"
              className="border-white/20 hover:bg-white/10"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share This Drop
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
