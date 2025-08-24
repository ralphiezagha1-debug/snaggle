import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader2, Zap } from 'lucide-react';

interface BidButtonProps {
  currentPrice: number;
  bidCost: number;
  userCredits: number;
  onBid: () => Promise<void>;
  disabled?: boolean;
  className?: string;
}

export const BidButton = ({ 
  currentPrice, 
  bidCost, 
  userCredits, 
  onBid, 
  disabled,
  className 
}: BidButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [cooldown, setCooldown] = useState(false);

  const handleBid = async () => {
    if (disabled || isLoading || cooldown || userCredits < bidCost) return;

    setIsLoading(true);
    setCooldown(true);

    try {
      await onBid();
      
      // Brief cooldown to prevent spam
      setTimeout(() => setCooldown(false), 1000);
    } catch (error) {
      console.error('Bid failed:', error);
      setCooldown(false);
    } finally {
      setIsLoading(false);
    }
  };

  const canBid = userCredits >= bidCost && !disabled && !cooldown;
  const nextPrice = (currentPrice + 0.01).toFixed(2);

  return (
    <div className="space-y-4">
      <Button
        onClick={handleBid}
        disabled={!canBid || isLoading}
        size="lg"
        className={cn(
          "w-full h-16 text-xl font-bold gradient-primary shadow-glow hover:shadow-gold-glow transition-smooth",
          {
            "opacity-50 cursor-not-allowed": !canBid,
            "animate-pulse": isLoading,
          },
          className
        )}
      >
        {isLoading ? (
          <Loader2 className="w-6 h-6 animate-spin mr-2" />
        ) : (
          <Zap className="w-6 h-6 mr-2" />
        )}
        {isLoading ? 'Placing Bid...' : `BID - $${nextPrice}`}
      </Button>
      
      <div className="text-center space-y-1">
        <p className="text-sm text-muted-foreground">
          Costs {bidCost} bid credit{bidCost !== 1 ? 's' : ''}
        </p>
        <p className="text-sm font-medium text-auction-gold">
          You have {userCredits} bid credits
        </p>
        {cooldown && (
          <p className="text-xs text-auction-warning">
            Synchronizing... please wait
          </p>
        )}
      </div>
    </div>
  );
};