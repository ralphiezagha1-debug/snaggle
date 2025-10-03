import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Package, Gavel, ShoppingBag, Bell } from "lucide-react";
import { Drop } from "@/data/mockStoreData";
import { useState, useEffect } from "react";

interface DropCardProps {
  drop: Drop;
}

export const DropCard = ({ drop }: DropCardProps) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const target = drop.status === 'upcoming' ? drop.startAt : drop.endAt;
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft("Ended");
        clearInterval(timer);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h`);
      } else {
        setTimeLeft(`${hours}h ${minutes}m`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [drop]);

  const getStatusBadge = () => {
    switch (drop.status) {
      case 'live':
        return <Badge className="bg-[#00FF80] text-black font-semibold">Live Now</Badge>;
      case 'upcoming':
        return <Badge variant="outline" className="border-white/30 text-white/70">Upcoming</Badge>;
      case 'past':
        return <Badge variant="outline" className="border-white/20 text-white/50">Ended</Badge>;
    }
  };

  const getCTA = () => {
    if (drop.status === 'past') {
      return (
        <Button disabled className="w-full" variant="outline">
          <Package className="h-4 w-4 mr-2" />
          Sold Out
        </Button>
      );
    }

    if (drop.status === 'upcoming') {
      return (
        <Button className="w-full bg-white/10 hover:bg-white/20 text-white" variant="outline">
          <Bell className="h-4 w-4 mr-2" />
          Notify Me
        </Button>
      );
    }

    return (
      <Button asChild className="w-full bg-[#00C46A] hover:bg-[#00D474] text-white font-semibold">
        <Link to={`/drops/${drop.id}`}>
          {drop.type === 'store' && <ShoppingBag className="h-4 w-4 mr-2" />}
          {drop.type === 'auction' && <Gavel className="h-4 w-4 mr-2" />}
          {drop.type === 'hybrid' && <ShoppingBag className="h-4 w-4 mr-2" />}
          {drop.type === 'store' ? 'Shop Now' : drop.type === 'auction' ? 'Bid Now' : 'View Drop'}
        </Link>
      </Button>
    );
  };

  return (
    <Card className="group overflow-hidden bg-white/5 border-white/10 hover:border-[#00FF80]/30 transition-all duration-300 card-hover-glow">
      <CardContent className="p-0">
        {/* Hero Image */}
        <Link to={`/drops/${drop.id}`}>
          <div className="aspect-[16/9] relative overflow-hidden bg-white/5">
            <img
              src={drop.heroImage}
              alt={drop.title}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            />
            
            {/* Status Badge */}
            <div className="absolute top-3 left-3">
              {getStatusBadge()}
            </div>

            {/* Partner Logo (if exists) */}
            {drop.partnerLogo && (
              <div className="absolute top-3 right-3 w-12 h-12 rounded-lg bg-white/90 p-2">
                <img src={drop.partnerLogo} alt={drop.partner} className="w-full h-full object-contain" />
              </div>
            )}
          </div>
        </Link>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div>
            <p className="text-xs text-[#00FF80] uppercase tracking-wider mb-1 font-semibold">
              {drop.partner}
            </p>
            <Link to={`/drops/${drop.id}`}>
              <h3 className="text-lg font-bold text-white group-hover:text-[#00FF80] transition-colors line-clamp-2">
                {drop.title}
              </h3>
            </Link>
          </div>

          {/* Story Preview */}
          <p className="text-sm text-white/70 line-clamp-2">
            {drop.story}
          </p>

          {/* Timer & Units */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1.5 text-white/70">
              <Clock className="h-4 w-4" />
              <span>{timeLeft}</span>
            </div>
            {drop.unitsRemaining !== undefined && drop.status !== 'past' && (
              <div className="flex items-center gap-1.5 text-white/70">
                <Package className="h-4 w-4" />
                <span>{drop.unitsRemaining} left</span>
              </div>
            )}
          </div>

          {/* CTA */}
          {getCTA()}
        </div>
      </CardContent>
    </Card>
  );
};
