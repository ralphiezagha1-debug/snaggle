import { useSEO } from "@/lib/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Users, Clock, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Live = () => {
  useSEO({
    title: "Live Auctions - Snaggle",
    description: "Join live auction streams and bid in real-time on premium items",
    canonical: `${window.location.origin}/live`,
  });

  const liveAuctions = [
    {
      id: "auction-1",
      title: "Vintage Rolex Submariner 1965",
      currentPrice: 15750,
      viewers: 234,
      timeLeft: "2h 15m",
      host: "Premium Auctions",
      thumbnail: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop"
    },
    {
      id: "auction-2", 
      title: "Nike Air Jordan 1 Chicago",
      currentPrice: 8900,
      viewers: 789,
      timeLeft: "45m",
      host: "Sneaker Central",
      thumbnail: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=300&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-snaggle-purple to-snaggle-green bg-clip-text text-transparent">
            Live Auctions
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join live auction streams and bid in real-time on premium collectibles, luxury items, and rare finds
          </p>
        </div>

        <Tabs defaultValue="live" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="live">Now Live</TabsTrigger>
            <TabsTrigger value="ending">Ending Soon</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          </TabsList>

          <TabsContent value="live" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                Live Now ({liveAuctions.length})
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveAuctions.map((auction) => (
                <Link key={auction.id} to={`/live/${auction.id}`}>
                  <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-primary/50 overflow-hidden">
                    <div className="relative">
                      <img 
                        src={auction.thumbnail}
                        alt={auction.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-red-500 text-white animate-pulse">
                          <Play className="w-3 h-3 mr-1" />
                          LIVE
                        </Badge>
                      </div>
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="bg-black/60 text-white">
                          <Users className="w-3 h-3 mr-1" />
                          {auction.viewers}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">{auction.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">by {auction.host}</p>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-muted-foreground">Current Bid</p>
                          <p className="text-xl font-bold text-snaggle-green">${auction.currentPrice.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {auction.timeLeft}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ending">
            <div className="text-center py-12">
              <TrendingUp className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Auctions Ending Soon</h3>
              <p className="text-muted-foreground">Check back later for last-chance bidding opportunities</p>
            </div>
          </TabsContent>

          <TabsContent value="upcoming">
            <div className="text-center py-12">
              <Clock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Upcoming Auctions</h3>
              <p className="text-muted-foreground">New auctions are added daily - stay tuned!</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Live;