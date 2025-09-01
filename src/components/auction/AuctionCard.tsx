import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CountdownTimer } from './CountdownTimer';
import { Eye, Users, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AuctionCardProps {
  id: string;
  title: string;
  image: string;
  currentPrice: number;
  msrp: number;
  endTime: Date;
  status: 'LIVE' | 'SCHEDULED' | 'ENDED';
  bidCount: number;
  participantCount: number;
  lastBidder?: string;
  className?: string;
}

export const AuctionCard = ({
  id,
  title,
  image,
  currentPrice,
  msrp,
  endTime,
  status,
  bidCount,
  participantCount,
  lastBidder,
  className
}: AuctionCardProps) => {
  const navigate = useNavigate();
  const savings = msrp - (currentPrice * 100);
  const savingsPercent = Math.round((savings / msrp) * 100);

  const handleViewAuction = () => {
    navigate(`/auction/${id}`);
  };

  return (
    <Card className={cn(
      "overflow-hidden transition-smooth hover:shadow-elegant",
      {
        "border-primary shadow-glow": status === 'LIVE',
        "border-muted": status !== 'LIVE',
      },
      className
    )}>
      <CardHeader className="p-0">
        <div className="relative">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover"
          />
          <Badge 
            className={cn(
              "absolute top-2 right-2 font-bold",
              {
                "bg-auction-success text-auction-gold-foreground": status === 'LIVE',
                "bg-auction-warning text-auction-gold-foreground": status === 'SCHEDULED',
                "bg-muted text-muted-foreground": status === 'ENDED',
              }
            )}
          >
            {status}
          </Badge>
          {status === 'LIVE' && (
            <div className="absolute top-2 left-2 bg-background/80 backdrop-blur-sm rounded-md px-2 py-1">
              <div className="flex items-center gap-1 text-sm">
                <Users className="w-3 h-3" />
                <span>{participantCount}</span>
              </div>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        <div>
          <h3 className="font-semibold text-lg line-clamp-2">{title}</h3>
          <div className="flex items-center justify-between mt-2">
            <div>
              <p className="text-2xl font-bold text-auction-gold">
                ${currentPrice.toFixed(2)}
              </p>
              <p className="text-xs text-muted-foreground line-through">
                MSRP: ${(msrp / 100).toFixed(2)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-auction-success">
                Save {savingsPercent}%
              </p>
              <p className="text-xs text-muted-foreground">
                ${savings.toFixed(0)} off
              </p>
            </div>
          </div>
        </div>

        {status === 'LIVE' && (
          <CountdownTimer endTime={endTime} className="text-sm" />
        )}

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Zap className="w-3 h-3" />
            <span>{bidCount} bids</span>
          </div>
          {lastBidder && (
            <span>Last: {lastBidder}</span>
          )}
        </div>

        <Button
          onClick={handleViewAuction}
          variant={status === 'LIVE' ? 'default' : 'secondary'}
          className={cn(
            "w-full transition-smooth",
            status === 'LIVE' && "gradient-primary shadow-glow hover:shadow-gold-glow"
          )}
          disabled={status === 'ENDED'}
        >
          <Eye className="w-4 h-4 mr-2" />
          {status === 'LIVE' ? 'Join Auction' : status === 'SCHEDULED' ? 'View Details' : 'View Results'}
        </Button>
      </CardContent>
    </Card>
  );
};