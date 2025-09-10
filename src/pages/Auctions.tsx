import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Search, Filter, Heart, Eye } from "lucide-react";

const Auctions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("ending-soon");
  const [category, setCategory] = useState("all");

  // Mock auction data
  const auctions = [
    {
      id: "1",
      title: "Vintage 1965 Gibson Les Paul Guitar",
      description: "Pristine condition vintage electric guitar with original case",
      currentBid: 8750,
      startingBid: 5000,
      endTime: "2h 34m",
      bidCount: 23,
      watchers: 156,
      category: "Music",
      seller: "VintageGuitars_Pro",
      condition: "Excellent",
      featured: true,
    },
    {
      id: "2",
      title: "Original Banksy Street Art Piece",
      description: "Authenticated original street art by world-renowned artist",
      currentBid: 15420,
      startingBid: 8000,
      endTime: "1d 5h",
      bidCount: 67,
      watchers: 892,
      category: "Art",
      seller: "UrbanArtCollector",
      condition: "Good",
      featured: true,
    },
    {
      id: "3",
      title: "Rolex Submariner Watch (1970)",
      description: "Classic luxury timepiece in working condition",
      currentBid: 12300,
      startingBid: 8500,
      endTime: "4h 12m",
      bidCount: 45,
      watchers: 234,
      category: "Watches",
      seller: "LuxuryTimepieces",
      condition: "Very Good",
      featured: false,
    },
    {
      id: "4",
      title: "First Edition Harry Potter Book Set",
      description: "Complete set of first edition Harry Potter books",
      currentBid: 3200,
      startingBid: 1500,
      endTime: "6h 45m",
      bidCount: 28,
      watchers: 167,
      category: "Books",
      seller: "RareBooks_Ltd",
      condition: "Near Mint",
      featured: false,
    },
    {
      id: "5",
      title: "Vintage Chanel Handbag (1980s)",
      description: "Authentic vintage Chanel quilted handbag",
      currentBid: 2850,
      startingBid: 1200,
      endTime: "3d 2h",
      bidCount: 19,
      watchers: 89,
      category: "Fashion",
      seller: "VintageLuxury",
      condition: "Good",
      featured: false,
    },
    {
      id: "6",
      title: "MacBook Pro M3 Max (2024)",
      description: "Latest MacBook Pro with M3 Max chip, 32GB RAM",
      currentBid: 2400,
      startingBid: 2000,
      endTime: "12h 20m",
      bidCount: 14,
      watchers: 78,
      category: "Electronics",
      seller: "TechDeals_Pro",
      condition: "New",
      featured: false,
    },
  ];

  const categories = [
    "All",
    "Art",
    "Music", 
    "Watches",
    "Books",
    "Fashion",
    "Electronics",
    "Collectibles",
  ];

  const getStatusColor = (endTime: string) => {
    if (endTime.includes("h") && !endTime.includes("d")) {
      const hours = parseInt(endTime);
      if (hours <= 2) return "destructive";
      if (hours <= 6) return "secondary";
    }
    return "outline";
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Live Auctions</h1>
          <p className="text-xl text-muted-foreground">
            Discover amazing items and place your bids
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8 bg-card/50 border-card-border">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search auctions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat.toLowerCase()}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ending-soon">Ending Soon</SelectItem>
                  <SelectItem value="highest-bid">Highest Bid</SelectItem>
                  <SelectItem value="most-bids">Most Bids</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Auction Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {auctions.map((auction) => (
            <Card key={auction.id} className="bg-gradient-card border-card-border hover:border-primary/50 transition-all duration-300 group">
              <div className="relative">
                <div className="aspect-video bg-muted rounded-t-lg flex items-center justify-center">
                  <span className="text-muted-foreground">Image Placeholder</span>
                </div>
                
                {auction.featured && (
                  <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                    Featured
                  </Badge>
                )}
                
                <Badge 
                  variant={getStatusColor(auction.endTime)}
                  className="absolute top-3 right-3 flex items-center space-x-1"
                >
                  <Clock className="h-3 w-3" />
                  <span>{auction.endTime}</span>
                </Badge>

                <div className="absolute bottom-3 right-3 flex space-x-2">
                  <Button size="sm" variant="secondary" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="h-8 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="h-4 w-4 mr-1" />
                    {auction.watchers}
                  </Button>
                </div>
              </div>

              <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {auction.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    by {auction.seller}
                  </span>
                </div>
                <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                  {auction.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {auction.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Current Bid</span>
                    <span className="text-lg font-bold text-primary">
                      ${auction.currentBid.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Starting: ${auction.startingBid.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground">
                      {auction.bidCount} bids
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Condition: {auction.condition}
                    </span>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button asChild variant="secondary" size="sm" className="flex-1">
                      <Link to={`/auctions/${auction.id}`}>
                        View Details
                      </Link>
                    </Button>
                    <Button asChild size="sm" className="flex-1 glow-green-hover">
                      <Link to={`/auctions/${auction.id}`}>
                        Place Bid
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            <Filter className="mr-2 h-4 w-4" />
            Load More Auctions
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Auctions;