import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  Users, 
  MessageCircle, 
  Heart, 
  Share2, 
  Clock, 
  Gavel,
  Send,
  Trophy,
  Star
} from 'lucide-react';
import { useAuction, useBidHistory, useChatMessages } from '@/lib/api/hooks';
import { Countdown } from '@/components/Countdown';
import { Card as SkeletonCard } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';

interface AuctionRoomProps {
  auctionId: string;
}

export const AuctionRoom: React.FC<AuctionRoomProps> = ({ auctionId }) => {
  const [chatMessage, setChatMessage] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  
  const { data: auction, isLoading: auctionLoading } = useAuction(auctionId);
  const { data: bidHistory, isLoading: bidsLoading } = useBidHistory(auctionId);
  const { data: chatMessages, isLoading: chatLoading } = useChatMessages(auction?.chatRoomId || '');

  if (auctionLoading) {
    return <div className="container mx-auto px-4 py-6">Loading auction...</div>;
  }

  if (!auction) {
    return <div className="text-center py-8">Auction not found</div>;
  }

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      // Mock send message
      console.log('Sending message:', chatMessage);
      setChatMessage('');
    }
  };

  const handlePlaceBid = () => {
    if (bidAmount) {
      // Mock bid placement
      console.log('Placing bid:', bidAmount);
      setBidAmount('');
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Stream Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Video Stream */}
          <Card>
            <CardContent className="p-0">
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Play className="w-16 h-16 mx-auto mb-4 opacity-60" />
                    <p className="text-lg">Live Stream</p>
                    <p className="text-sm opacity-80">Hosted by {auction.host.displayName}</p>
                  </div>
                </div>
                
                {/* Stream Overlay */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge variant="destructive" className="bg-red-600">
                    🔴 LIVE
                  </Badge>
                  <Badge variant="secondary" className="bg-black/50 text-white">
                    <Users className="w-3 h-3 mr-1" />
                    {auction.viewerCount}
                  </Badge>
                </div>
                
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button size="sm" variant="secondary" className="bg-black/50 text-white hover:bg-black/70">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="bg-black/50 text-white hover:bg-black/70">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Auction Info */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{auction.title}</CardTitle>
                  <p className="text-muted-foreground mt-1">{auction.description}</p>
                </div>
                <Badge variant={auction.status === 'live' ? 'default' : 'secondary'}>
                  {auction.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Current Bid</p>
                  <p className="text-3xl font-bold text-snaggle-accent">${auction.currentPrice}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Time Left</p>
                  <Countdown endTime={auction.endTime} />
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Total Bids</p>
                  <p className="text-3xl font-bold">{auction.bidCount}</p>
                </div>
              </div>
              
              <div className="mt-6 flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={auction.host.avatar} alt={auction.host.displayName} />
                  <AvatarFallback>{auction.host.displayName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{auction.host.displayName}</p>
                  <p className="text-sm text-muted-foreground">
                    Host • {auction.host.totalAuctions} auctions
                  </p>
                </div>
                {auction.host.verified && (
                  <Badge variant="default">Verified</Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Bidding Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gavel className="w-5 h-5" />
                Quick Bid
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-xs text-muted-foreground">+ $0.01 / bid • uses 1 credit</p>
              </div>
              <Button 
                onClick={handlePlaceBid}
                className="w-full" 
                size="lg"
                variant="primary"
              >
                <Gavel className="mr-2 h-4 w-4" />
                Quick Bid
              </Button>
              <div className="flex gap-2">
                <Button variant="ghost-green" className="flex-1">Watch</Button>
                <Button variant="ghost-green" className="flex-1">View Auction</Button>
              </div>
            </CardContent>
          </Card>

          {/* Chat & Bids Tabs */}
          <Card className="h-96">
            <Tabs defaultValue="chat" className="h-full flex flex-col">
              <CardHeader className="pb-3">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="chat">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat
                  </TabsTrigger>
                  <TabsTrigger value="bids">
                    <Gavel className="w-4 h-4 mr-2" />
                    Bids
                  </TabsTrigger>
                </TabsList>
              </CardHeader>
              
              <TabsContent value="chat" className="flex-1 flex flex-col px-6 pb-6">
                <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                  {chatLoading ? (
                    <div>Loading chat...</div>
                  ) : (
                    chatMessages?.map((message) => (
                      <div key={message.id} className="flex gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={message.user.avatar} alt={message.user.displayName} />
                          <AvatarFallback className="text-xs">{message.user.displayName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm">
                            <span className="font-semibold text-snaggle-primary">{message.user.displayName}</span>
                            <span className="ml-2">{message.message}</span>
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button size="sm" onClick={handleSendMessage}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="bids" className="flex-1 overflow-y-auto px-6 pb-6">
                {bidsLoading ? (
                  <div>Loading bids...</div>
                ) : (
                  <div className="space-y-3">
                    {bidHistory?.map((bid) => (
                      <div key={bid.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={bid.user.avatar} alt={bid.user.displayName} />
                            <AvatarFallback className="text-xs">{bid.user.displayName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">{bid.user.displayName}</span>
                          {bid.isWinning && (
                            <Trophy className="w-3 h-3 text-snaggle-accent" />
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-snaggle-accent">${bid.amount}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(bid.timestamp), { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};