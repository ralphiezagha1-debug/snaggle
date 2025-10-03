import { Star, Users, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface StoreHeaderProps {
  bannerUrl?: string;
  avatarUrl?: string;
  storeName: string;
  rating?: number;
  followers?: number;
  auctionsCompleted?: number;
}

export default function StoreHeader({
  bannerUrl,
  avatarUrl,
  storeName,
  rating = 0,
  followers = 0,
  auctionsCompleted = 0
}: StoreHeaderProps) {
  return (
    <div className="w-full">
      {/* Banner */}
      <div 
        className={`h-48 w-full rounded-xl mb-6 ${
          bannerUrl 
            ? 'bg-cover bg-center' 
            : 'bg-snag-gradient'
        }`}
        style={bannerUrl ? { backgroundImage: `url(${bannerUrl})` } : undefined}
      >
        <div className="h-full w-full bg-black/20 rounded-xl flex items-end p-6">
          <div className="flex items-end gap-4">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full border-4 border-white/20 overflow-hidden bg-white/10 backdrop-blur-sm">
              {avatarUrl ? (
                <img 
                  src={avatarUrl} 
                  alt={`${storeName} avatar`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold">
                  {storeName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            
            {/* Store Info */}
            <div className="text-white pb-2">
              <h1 className="snag-headline text-3xl font-bold mb-2">{storeName}</h1>
              
              {/* Rating */}
              {rating > 0 && (
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(rating) 
                            ? 'text-snag-gold fill-snag-gold' 
                            : 'text-white/30'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-white/80">{rating.toFixed(1)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats and Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        {/* Stats */}
        <div className="flex gap-6 text-white/80">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="text-sm">{followers.toLocaleString()} followers</span>
          </div>
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            <span className="text-sm">{auctionsCompleted} auctions completed</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button 
            variant="ghost-green" 
            disabled
            className="opacity-60"
            title="Coming soon"
          >
            Follow
          </Button>
          <Badge variant="outline" className="border-white/30 text-white/80">
            Verified Seller
          </Badge>
        </div>
      </div>
    </div>
  );
}