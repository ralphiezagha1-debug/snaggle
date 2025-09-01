import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CountdownTimer } from '@/components/auction/CountdownTimer';
import { BidButton } from '@/components/auction/BidButton';
import { BidHistory } from '@/components/auction/BidHistory';
import { Header } from "@/components/layout/Header";
import { Heart, Share2, Users, Zap, Trophy, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import macbookImage from '@/assets/macbook-hero.jpg';
import { loadBidApi } from '@/api';
import type { Auction } from '@/models/Auction';
import type { Bid } from '@/models/Bid';
import type { UserCredits } from '@/models/UserCredits';
import type { Unsubscribe } from '@/api/bidApi';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { app } from '@/platforms/firebase/app';


const AuctionRoom = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [auction, setAuction] = useState<Auction | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [userCredits, setUserCredits] = useState<UserCredits | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isWatchlisted, setIsWatchlisted] = useState(false);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const bidApi = await loadBidApi();
        const credits = await bidApi.getCredits(user.uid);
        setUserCredits(credits);
      } else {
        setUserCredits(null);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!id) return;

    let auctionUnsubscribe: Unsubscribe | undefined;
    let bidsUnsubscribe: Unsubscribe | undefined;

    const setupListeners = async () => {
      const bidApi = await loadBidApi();

      auctionUnsubscribe = bidApi.watchAuction(id, (newAuction) => {
        setAuction(newAuction);
      });

      bidsUnsubscribe = bidApi.watchRecentBids(id, 20, (newBids) => {
        setBids(newBids ?? []);
      });
    };

    setupListeners();

    return () => {
      auctionUnsubscribe?.();
      bidsUnsubscribe?.();
    };
  }, [id]);

  if (!auction) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Loading auction...</p>
      </div>
    );
  }

  const handleBid = async () => {
    if (!currentUser) {
      toast({ title: "Not signed in", description: "You must be signed in to bid.", variant: "destructive" });
      return;
    }
    if (!auction) return;

    if ((userCredits?.balance ?? 0) < 1) { // Assuming bid cost is 1
      toast({
        title: "Insufficient Credits",
        description: "You don't have enough bid credits. Purchase more to continue bidding.",
        variant: "destructive",
      });
      return;
    }

    try {
      const bidApi = await loadBidApi();
      await bidApi.placeBid(auction.id);
      toast({
        title: "Bid Placed Successfully!",
        description: "You are the new highest bidder.",
      });
      setUserCredits(prev => prev ? { ...prev, balance: prev.balance - 1 } : null);
    } catch (error: any) {
      toast({
        title: "Bid Failed",
        description: error.message || "An unknown error occurred.",
        variant: "destructive",
      });
    }
  };

  const handleTimeUp = () => {
    setAuction(prev => prev ? ({ ...prev, status: 'closed' }) : null);
    
    if (auction?.lastBidderId === currentUser?.uid) {
      toast({
        title: "🎉 Congratulations! You Won!",
        description: `You won the ${auction.title} for $${auction.currentPrice.toFixed(2)}!`,
      });
    } else if (auction) {
      toast({
        title: "Auction Ended",
        description: `${auction.lastBidder} won this auction.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userCredits={userCredits?.balance ?? 0}
        userName={currentUser?.displayName ?? "Guest"}
        isAuthenticated={!!currentUser}
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
                      src={auction.imageUrl || macbookImage}
                      alt={auction.title}
                      className="w-full h-96 object-cover rounded-lg"
                    />
                    <Badge 
                      className={`absolute top-4 right-4 text-lg px-3 py-1`}
                    >
                      {auction.status}
                    </Badge>
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
                    <p className="text-muted mt-2">{auction.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsWatchlisted(!isWatchlisted)}
                      className={isWatchlisted ? 'text-red-500' : ''}
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
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/20 rounded-lg">
                  <div className="text-center">
                    <p className="text-sm text-muted">Participants</p>
                    <p className="font-bold">{auction.participantCount || 0}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted">Total Bids</p>
                    <p className="font-bold">{auction.bidCount || 0}</p>
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
                <CardTitle className="text-sm text-muted">CURRENT PRICE</CardTitle>
                <div className="text-4xl font-bold text-accent">
                  ${auction.currentPrice.toFixed(2)}
                </div>
                <p className="text-sm text-muted">
                  Last bid by: <span className="font-medium text-fg">{auction.lastBidder || 'N/A'}</span>
                </p>
              </CardHeader>
              <CardContent>
                <CountdownTimer 
                  endTime={new Date(auction.endsAt || 0)}
                  onTimeUp={handleTimeUp}
                  className="mb-4"
                />
                
                {auction.status === 'open' ? (
                  <BidButton
                    currentPrice={auction.currentPrice}
                    bidCost={1} // Hardcoded for now
                    userCredits={userCredits?.balance ?? 0}
                    onBid={handleBid}
                  />
                ) : (
                  <div className="space-y-4">
                    <Badge variant="secondary" className="text-lg px-4 py-2">
                      <Trophy className="w-5 h-5 mr-2" />
                      Auction Ended
                    </Badge>
                    {auction.lastBidderId === currentUser?.uid ? (
                      <Button className="w-full" size="lg">
                        Complete Purchase
                      </Button>
                    ) : (
                      <p className="text-muted">
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
                  <span className="text-muted">Bids Remaining:</span>
                  <span className="font-bold text-accent">{userCredits?.balance ?? 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Your Bids Here:</span>
                  <span className="font-bold">
                    {(bids ?? []).filter(bid => bid.userId === currentUser?.uid).length}
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
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <Users className="w-4 h-4" />
              <span className="text-sm">{auction.participantCount || 0} people watching</span>
            </div>
          </div>
        </div>

        {/* Bid History */}
        <div className="mt-8">
          <BidHistory bids={bids ?? []} currentUserId={currentUser?.uid} />
        </div>
      </div>
    </div>
  );
};

export default AuctionRoom;

