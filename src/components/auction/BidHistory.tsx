import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import type { Bid } from '@/models/Bid';

interface BidHistoryProps {
  bids: Bid[];
  currentUserId?: string;
}

export const BidHistory = ({ bids, currentUserId }: BidHistoryProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          Bid History
          <Badge variant="secondary">{bids.length} bids</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-80">
          <div className="space-y-2 p-4 pt-0">
            {bids.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No bids yet. Be the first to bid!
              </p>
            ) : (
              bids.map((bid, index) => (
                <div
                  key={bid.id}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-smooth ${
                    bid.userId === currentUserId
                      ? 'bg-primary/10 border border-primary/20'
                      : index === 0
                      ? 'bg-auction-gold/10 border border-auction-gold/20'
                      : 'bg-card hover:bg-accent/50'
                  }`}
                >
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="text-xs">
                      {bid.userName.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm truncate">
                        {bid.userName}
                        {bid.userId === currentUserId && (
                          <span className="text-primary ml-1">(You)</span>
                        )}
                      </p>
                      {index === 0 && (
                        <Badge variant="secondary" className="text-xs bg-auction-gold text-auction-gold-foreground">
                          Leading
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(bid.timestamp, { addSuffix: true })}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-bold text-auction-gold">
                      ${bid.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};