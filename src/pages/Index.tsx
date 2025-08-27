import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { AuctionCard } from '@/components/auction/AuctionCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Gavel, Zap, Trophy, Clock, Users, Star } from 'lucide-react';
import { HOME_COPY } from '@/content/home';
import macbookImage from '@/assets/macbook-hero.jpg';
import nintendoImage from '@/assets/nintendo-switch.jpg';
import airpodsImage from '@/assets/airpods-pro.jpg';
import cameraImage from '@/assets/dslr-camera.jpg';

// Mock auctions data
const mockAuctions = [
  {
    id: '1',
    title: 'MacBook Pro 16" M3 Max - Latest Model',
    image: macbookImage,
    currentPrice: 47.23,
    msrp: 399900,
    endTime: new Date(Date.now() + 45000),
    status: 'LIVE' as const,
    bidCount: 2341,
    participantCount: 127,
    lastBidder: 'Alice_2024',
  },
  {
    id: '2', 
    title: 'Nintendo Switch OLED - Neon Edition',
    image: nintendoImage,
    currentPrice: 12.87,
    msrp: 34999,
    endTime: new Date(Date.now() + 120000),
    status: 'LIVE' as const,
    bidCount: 834,
    participantCount: 89,
    lastBidder: 'GameMaster',
  },
  {
    id: '3',
    title: 'Apple AirPods Pro (3rd Generation)',
    image: airpodsImage,
    currentPrice: 8.45,
    msrp: 24999,
    endTime: new Date(Date.now() + 300000),
    status: 'LIVE' as const,
    bidCount: 567,
    participantCount: 45,
    lastBidder: 'AudioPhile',
  },
  {
    id: '4',
    title: 'Canon EOS R5 Mirrorless Camera',
    image: cameraImage,
    currentPrice: 89.12,
    msrp: 389900,
    endTime: new Date(Date.now() + 600000),
    status: 'SCHEDULED' as const,
    bidCount: 0,
    participantCount: 23,
  }
];

const Index = () => {
  const [userCredits] = useState(75);
  const [activeTab, setActiveTab] = useState('live');
  const [liveAuctions, setLiveAuctions] = useState(mockAuctions.filter(a => a.status === 'LIVE'));
  const [scheduledAuctions] = useState(mockAuctions.filter(a => a.status === 'SCHEDULED'));

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveAuctions(prev => prev.map(auction => {
        if (Math.random() > 0.8) {
          return {
            ...auction,
            currentPrice: auction.currentPrice + 0.01,
            bidCount: auction.bidCount + 1,
            endTime: new Date(Date.now() + 15000), // Reset timer
          };
        }
        return auction;
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userCredits={userCredits} 
        userName="You" 
        isAuthenticated={true} 
      />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-primary opacity-10"></div>
        <div className="container mx-auto relative z-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Gavel className="w-12 h-12 text-primary" />
            <h1 className="text-5xl md:text-6xl font-bold"
              dangerouslySetInnerHTML={{ __html: HOME_COPY.headline.replace('Snaggle', '<span class="text-primary">Snaggle</span>')}}
            />
          </div>
          <p className="text-xl text-muted mb-8 max-w-2xl mx-auto">
            {HOME_COPY.sub}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="text-lg px-8 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
              <Zap className="w-5 h-5 mr-2" />
              {HOME_COPY.ctaPrimary}
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
              <Clock className="w-5 h-5 mr-2" />
              {HOME_COPY.ctaSecondary}
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {HOME_COPY.stats.map((stat, index) => (
              <Card className="text-center" key={index}>
                <CardHeader>
                  {index === 0 && <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />}
                  {index === 1 && <Users className="w-8 h-8 text-primary mx-auto mb-2" />}
                  {index === 2 && <Star className="w-8 h-8 text-primary mx-auto mb-2" />}
                  <CardTitle className="text-2xl font-bold text-primary">{stat.value}</CardTitle>
                  <p className="text-muted">{stat.label}</p>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Auctions Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Live Auctions</h2>
            <p className="text-muted max-w-2xl mx-auto">
              Join thousands of smart shoppers who save up to 95% on brand new products. 
              Every auction starts at $0.00 and increases by just $0.01 per bid!
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="live" className="flex items-center gap-2">
                <div className="w-2 h-2 bg-auction-success rounded-full animate-pulse"></div>
                Live ({liveAuctions.length})
              </TabsTrigger>
              <TabsTrigger value="scheduled">
                <Clock className="w-4 h-4 mr-1" />
                Upcoming ({scheduledAuctions.length})
              </TabsTrigger>
              <TabsTrigger value="ended">
                <Trophy className="w-4 h-4 mr-1" />
                Ended
              </TabsTrigger>
            </TabsList>

            <TabsContent value="live">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {liveAuctions.map((auction) => (
                  <AuctionCard
                    key={auction.id}
                    {...auction}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="scheduled">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {scheduledAuctions.map((auction) => (
                  <AuctionCard
                    key={auction.id}
                    {...auction}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="ended">
              <div className="text-center py-12">
                <Trophy className="w-16 h-16 text-muted mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Ended Auctions</h3>
                <p className="text-muted">
                  Auction results will appear here after auctions end.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How Snaggle Works</h2>
            <p className="text-muted max-w-2xl mx-auto">
              Simple, fair, and exciting. Here's how our penny auctions work.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <CardTitle>Buy Bid Credits</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted">
                  Purchase bid packs to get started. Each bid typically costs between $0.50-$1.00.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <CardTitle>Place Your Bids</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted">
                  Each bid increases the price by $0.01 and resets the countdown timer.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <CardTitle>Win & Save</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted">
                  Be the last bidder when time runs out and win at the final price!
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg">
              <Zap className="w-5 h-5 mr-2" />
              Get Your First Bid Pack
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4">
        <div className="container mx-auto text-center text-muted">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Gavel className="w-5 h-5" />
            <span className="font-semibold">Snaggle</span>
          </div>
          <p>&copy; 2024 Snaggle. All rights reserved. Bid responsibly.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

