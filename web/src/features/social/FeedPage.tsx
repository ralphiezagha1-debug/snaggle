import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, Share, Trophy, ShoppingCart, Star } from 'lucide-react';
import { useActivityFeed } from '@/lib/api/hooks';
import { formatDistanceToNow } from 'date-fns';

export const FeedPage: React.FC = () => {
  const { data: feed, isLoading } = useActivityFeed();

  if (isLoading) {
    return <div className="container mx-auto px-4 py-6">Loading feed...</div>;
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'auction_won':
        return <Trophy className="w-4 h-4 text-snaggle-accent" />;
      case 'auction_lost':
        return <Trophy className="w-4 h-4 text-muted-foreground" />;
      case 'item_listed':
        return <ShoppingCart className="w-4 h-4 text-blue-500" />;
      case 'achievement_earned':
        return <Star className="w-4 h-4 text-yellow-500" />;
      default:
        return <Heart className="w-4 h-4" />;
    }
  };

  const getActivityText = (item: any) => {
    switch (item.type) {
      case 'auction_won':
        return `won "${item.data.auctionTitle}" for $${item.data.winAmount}`;
      case 'auction_lost':
        return `participated in "${item.data.auctionTitle}"`;
      case 'item_listed':
        return 'listed a new item for sale';
      case 'achievement_earned':
        return 'earned a new achievement';
      case 'follow_user':
        return 'started following someone new';
      default:
        return 'had some activity';
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Activity Feed</h1>
          <p className="text-muted-foreground">Stay up to date with your network</p>
        </div>

        <div className="space-y-4">
          {feed?.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={item.user.avatar} alt={item.user.displayName} />
                    <AvatarFallback>{item.user.displayName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold">{item.user.displayName}</span>
                      {item.user.verified && <Badge variant="default" className="text-xs">Verified</Badge>}
                      <span className="text-muted-foreground">{getActivityText(item)}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      {getActivityIcon(item.type)}
                      <span>{formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}</span>
                    </div>

                    {item.type === 'auction_won' && (
                      <Card className="mb-3">
                        <CardContent className="pt-4">
                          <div className="flex gap-3">
                            <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                              <Trophy className="w-8 h-8 text-snaggle-accent" />
                            </div>
                            <div>
                              <h4 className="font-semibold">{item.data.auctionTitle}</h4>
                              <p className="text-snaggle-accent font-semibold">Final bid: ${item.data.winAmount}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    <div className="flex items-center gap-4 text-sm">
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                        <Heart className="w-4 h-4 mr-1" />
                        Like
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Comment
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                        <Share className="w-4 h-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {(!feed || feed.length === 0) && (
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <div className="text-muted-foreground">
                <Heart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">Your feed is empty</h3>
                <p>Follow some users to see their activity here!</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};