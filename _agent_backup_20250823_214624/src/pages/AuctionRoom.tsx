import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CountdownTimer } from '@/components/auction/CountdownTimer';
import { BidButton } from '@/components/auction/BidButton';
import { BidHistory } from '@/components/auction/BidHistory';
import { Header } from '@/components/layout/Header';
import { Heart, Share2, Users, Zap, Trophy, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import macbookImage from '@/assets/macbook-hero.jpg';

// Mock data - in real app this would come from API
type AuctionStatus = 'LIVE' | 'SCHEDULED' | 'ENDED';

interface AuctionData {
  _id: string;
  title: string;
  description: string;
  images: string[];
  currentPrice: number;
  msrp: number;
  endTime: Date;
  status: AuctionStatus;
  bidCost: number;
  participantCount: number;
  totalBids: number;
  lastBidder: string;
  reserveMet: boolean;
}

const mockAuction: AuctionData = {
  _id: '1',
  title: 'MacBook Pro 16" M3 Max - Latest Model',
  description: 'Brand new MacBook Pro with M3 Max chip, 32GB RAM, 1TB SSD. Perfect for creative professionals and developers.',
  images: [macbookImage, macbookImage, macbookImage],
  currentPrice: 47.23,
  msrp: 399900, // $3999 in cents
  endTime: new Date(Date.now() + 45000), // 45 seconds from now
  status: 'LIVE',
  bidCost: 1,
  participantCount: 127,
  totalBids: 2341,
  lastBidder: 'Alice_2024',
  reserveMet: true,
};

const mockBids = [
  { _id: '1', userId: '1', userName: 'Alice_2024', price: 47.23, timestamp: new Date(Date.now() - 5000), isWinning: true },
  { _id: '2', userId: '2', userName: 'BidMaster', price: 47.22, timestamp: new Date(Date.now() - 15000) },
  { _id: '3', userId: '3', userName: 'QuickBidder', price: 47.21, timestamp: new Date(Date.now() - 25000) },
  { _id: '4', userId: '1', userName: 'Alice_2024', price: 47.20, timestamp: new Date(Date.now() - 35000) },
  { _id: '5', userId: '4', userName: 'AuctionFan', price: 47.19, timestamp: new Date(Date.now() - 45000) },
];

const AuctionRoom = () => {
  const { _id } = useParams();
  const { toast } = useToast();
  const [auction, setAuction] = useState(mockAuction);
  const [bids, setBids] = useState(mockBids);
  const [userCredits, setUserCredits] = useState(75);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isWatchlisted, setIsWatchlisted] = useState(false);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add new bids (simulation)
      if (Math.random() > 0.7) {
        const newBid = {
          _id: Date.now().toString(),
          userId: Math.floor(Math.random() * 5).toString(),
          userName: ['Alice_2024', 'BidMaster', 'QuickBidder', 'AuctionFan', 'ProBidder'][Math.floor(Math.random() * 5)],
          price: auction.currentPrice + 0.01,
          timestamp: new Date(),
          isWinning: true,
        };

        setBids(prev => [newBid, ...prev.map(b => ({ ...b, isWinning: false }))]);
        setAuction(prev => ({
          ...prev,
          currentPrice: prev.currentPrice + 0.01,
          totalBids: prev.totalBids + 1,
          endTime: new Date(Date.now() + 15000), // Reset to 15 seconds
          lastBidder: newBid.userName,
        }));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [auction.currentPrice]);

  const handleBid = async () => {
    if (userCredits < auction.bidCost) {
      toast({
        title: "Insufficient Credits",
        description: "You don't have enough bid credits. Purchase more to continue bidding.",
        variant: "destructive",
      });
      return;
    }

    // Simulate bid placement
    await new Promise(resolve => setTimeout(resolve, 500));

    const newBid = {
      _id: Date.now().toString(),
      userId: 'current-user',
      userName: 'You',
      price: auction.currentPrice + 0.01,
      timestamp: new Date(),
      isWinning: true,
    };

    setBids(prev => [newBid, ...prev.map(b => ({ ...b, isWinning: false }))]);
    setAuction(prev => ({
      ...prev,
      currentPrice: prev.currentPrice + 0.01,
      totalBids: prev.totalBids + 1,
      endTime: new Date(Date.now() + 15000), // Reset timer
      lastBidder: 'You',
    }));
    setUserCredits(prev => prev - auction.bidCost);

    toast({
      title: "Bid Placed Successfully!",
      description: `You're now winning at $${(auction.currentPrice + 0.01).toFixed(2)}`,
    });
  };

  const handleTimeUp = () => {
    setAuction(prev => ({ ...prev, status: 'ENDED' as AuctionStatus }));
    
    if (auction.lastBidder === 'You') {
      toast({
        title: "ðŸŽ‰ Congratulations! You Won!",
        description: `You won the ${auction.title} for $${auction.currentPrice.toFixed(2)}!`,
      });
    } else {
      toast({
        title: "Auction Ended",
        description: `${auction.lastBidder} won this auction.`,
      });
    }
  };

  const savings = auction.msrp - (auction.currentPrice * 100);
  const savingsPercent = Math.round((savings / auction.msrp) * 100);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userCredits={userCredits} 
        userName="You" 
        isAuthenticated={true} 
      />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Auction Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Images */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="relative">
                    <img
                      src={auction.images[selectedImageIndex]}
                      alt={auction.title}
                      className="w-full h-96 object-cover rounded-lg"
                    />
                    <Badge 
                      className={`absolute top-4 right-4 text-lg px-3 py-1 ${
                        auction.status === 'LIVE' 
                          ? 'bg-auction-success text-auction-gold-foreground' 
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {auction.status}
                    </Badge>
                  </div>
                  
                  <div className="flex gap-2 justify-center">
                    {auction.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`w-16 h-16 rounded-md border-2 overflow-hidden transition-smooth ${
                          selectedImageIndex === index 
                            ? 'border-primary' 
                            : 'border-transparent hover:border-muted-foreground'
                        }`}
                      >
                        <img
                          src={auction.images[index]}
                          alt={`${auction.title} view ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Product Details */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{auction.title}</CardTitle>
                    <p className="text-muted-foreground mt-2">{auction.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsWatchlisted(!isWatchlisted)}
                      className={isWatchlisted ? 'text-auction-danger' : ''}
                    >
                      <Heart className={`w-4 h-4 mr-2 ${isWatchlisted ? 'fill-current' : ''}`} />
                      Watch
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">MSRP</p>
                    <p className="font-bold">${(auction.msrp / 100).toFixed(2)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">You Save</p>
                    <p className="font-bold text-auction-success">{savingsPercent}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Participants</p>
                    <p className="font-bold">{auction.participantCount}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Total Bids</p>
                    <p className="font-bold">{auction.totalBids}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Auction Controls Sidebar */}
          <div className="space-y-6">
            {/* Current Price & Timer */}
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">CURRENT PRICE</CardTitle>
                <div className="text-4xl font-bold text-auction-gold">
                  ${auction.currentPrice.toFixed(2)}
                </div>
                <p className="text-sm text-muted-foreground">
                  Last bid by: <span className="font-medium">{auction.lastBidder}</span>
                </p>
              </CardHeader>
              <CardContent>
                <CountdownTimer 
                  endTime={auction.endTime} 
                  onTimeUp={handleTimeUp}
                  className="mb-4"
                />
                
                {auction.status === 'LIVE' ? (
                  <BidButton
                    currentPrice={auction.currentPrice}
                    bidCost={auction.bidCost}
                    userCredits={userCredits}
                    onBid={handleBid}
                  />
                ) : (
                  <div className="space-y-4">
                    <Badge variant="secondary" className="text-lg px-4 py-2">
                      <Trophy className="w-5 h-5 mr-2" />
                      Auction Ended
                    </Badge>
                    {auction.lastBidder === 'You' ? (
                      <Button className="w-full gradient-primary" size="lg">
                        Complete Purchase
                      </Button>
                    ) : (
                      <p className="text-muted-foreground">
                        Won by {auction.lastBidder}
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  Your Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bids Remaining:</span>
                  <span className="font-bold text-auction-gold">{userCredits}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Your Bids Here:</span>
                  <span className="font-bold">
                    {bids.filter(bid => bid.userId === 'current-user').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">If You Win:</span>
                  <span className="font-bold text-auction-success">
                    Save ${(savings / 100).toFixed(2)}
                  </span>
                </div>
                <div className="pt-2 border-t">
                  <Button variant="outline" className="w-full" size="sm">
                    <Zap className="w-4 h-4 mr-2" />
                    Buy More Credits
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Live Activity */}
            <div className="flex items-center gap-2 p-3 bg-card border rounded-lg">
              <div className="w-2 h-2 bg-auction-success rounded-full animate-pulse"></div>
              <Users className="w-4 h-4" />
              <span className="text-sm">{auction.participantCount} people watching</span>
            </div>
          </div>
        </div>

        {/* Bid History */}
        <div className="mt-8">
          <BidHistory bids={(bids as any)} currentUserId="current-user" />
        </div>
      </div>
    </div>
  );
};

export default AuctionRoom;

