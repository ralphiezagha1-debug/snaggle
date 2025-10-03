import { Badge } from "@/components/ui/badge";
import { Clock, Package } from "lucide-react";
import { Drop } from "@/data/mockStoreData";
import { useState, useEffect } from "react";

interface DropHeroProps {
  drop: Drop;
}

export const DropHero = ({ drop }: DropHeroProps) => {
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
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      } else {
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [drop]);

  const getStatusBadge = () => {
    switch (drop.status) {
      case 'live':
        return <Badge className="bg-[#00FF80] text-black font-semibold text-lg px-4 py-1">Live Now</Badge>;
      case 'upcoming':
        return <Badge variant="outline" className="border-white/30 text-white/70 text-lg px-4 py-1">Upcoming</Badge>;
      case 'past':
        return <Badge variant="outline" className="border-white/20 text-white/50 text-lg px-4 py-1">Ended</Badge>;
    }
  };

  return (
    <div className="relative rounded-3xl overflow-hidden">
      {/* Background Image */}
      <div className="aspect-[21/9] w-full relative">
        <img
          src={drop.heroImage}
          alt={drop.title}
          className="object-cover w-full h-full"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
        <div className="space-y-4 max-w-3xl">
          {/* Partner & Status */}
          <div className="flex items-center gap-3 flex-wrap">
            <p className="text-[#00FF80] text-sm md:text-base uppercase tracking-widest font-bold">
              {drop.partner}
            </p>
            {getStatusBadge()}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-black text-white hero-glow">
            {drop.title}
          </h1>

          {/* Timer & Units */}
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
              <Clock className="h-5 w-5 text-[#00FF80]" />
              <span className="font-semibold text-white">
                {drop.status === 'upcoming' ? 'Starts in: ' : 'Ends in: '}
                {timeLeft}
              </span>
            </div>
            
            {drop.unitsRemaining !== undefined && drop.status !== 'past' && (
              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                <Package className="h-5 w-5 text-[#00FF80]" />
                <span className="font-semibold text-white">
                  {drop.unitsRemaining} / {drop.totalUnits} remaining
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Partner Logo */}
      {drop.partnerLogo && (
        <div className="absolute top-6 right-6 w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/95 p-3 shadow-lg">
          <img src={drop.partnerLogo} alt={drop.partner} className="w-full h-full object-contain" />
        </div>
      )}
    </div>
  );
};
