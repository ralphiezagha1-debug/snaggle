import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Clock, Heart, Eye, User, ArrowLeft, Gavel, Shield, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AuctionDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [bidAmount, setBidAmount] = useState("");
  const [isWatching, setIsWatching] = useState(false);
  const [isPlacingBid, setIsPlacingBid] = useState(false);

  // Mock auction data - TODO: Replace with API call
  const auction = {
    id: id || "1",
    title: "Vintage 1965 Gibson Les Paul Guitar",
    description: "This pristine 1965 Gibson Les Paul Standard features the original PAF pickups and maintains its original sunburst finish. A true collector's piece with incredible tone and historical significance. The guitar has been professionally maintained and shows minimal wear for its age.",
    currentBid: 8750,
    startingBid: 5000,
    minBidIncrement: 100,
    endTime: "2h 34m",
    bidCount: 23,
    watchers: 156,
    category: "Music",
    condition: "Excellent",
    seller: {
      name: "VintageGuitars_Pro",
      rating: 4.9,
      salesCount: 247,
    },
    images: [
      "/api/placeholder/600/400",
      "/api/placeholder/600/400", 
      "/api/placeholder/600/400",
    ],
    bidHistory: [
      { bidder: "Guitarist_Mike", amount: 8750, time: "2 minutes ago" },
      { bidder: "VintageCollector", amount: 8650, time: "5 minutes ago" },
      { bidder: "MusicLover_23", amount: 8500, time: "12 minutes ago" },
      { bidder: "Guitarist_Mike", amount: 8400, time: "18 minutes ago" },
      { bidder: "RetroRockstar", amount: 8300, time: "25 minutes ago" },
    ],
    details: {
      year: "1965",
      brand: "Gibson",
      model: "Les Paul Standard",
      color: "Sunburst",
      condition: "Excellent",
      weight: "9.2 lbs",
      serialNumber: "542167",
      modifications: "None - completely original",
    }
  };

  const handlePlaceBid = async () => {
    const bid = parseFloat(bidAmount);
    if (!bid || bid <= auction.currentBid) {
      toast({
        title: "Invalid bid amount",
        description: `Bid must be higher than current bid of $${auction.currentBid.toLocaleString()}`,
        variant: "destructive",
      });
      return;
    }

    setIsPlacingBid(true);
    // TODO: Implement actual bid placement API call
    setTimeout(() => {
      toast({
        title: "Bid placed successfully!",
        description: `Your bid of $${bid.toLocaleString()} has been placed.`,
      });
      setBidAmount("");
      setIsPlacingBid(false);
    }, 1000);
  };

  const toggleWatch = () => {
    setIsWatching(!isWatching);
    toast({
      title: isWatching ? "Removed from watchlist" : "Added to watchlist",
      description: isWatching 
        ? "You'll no longer receive updates for this auction"
        : "You'll receive notifications about this auction",
    });
  };

  const nextMinBid = auction.currentBid + auction.minBidIncrement;

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Button variant="ghost" asChild className="p-0 h-auto mb-4">
            <Link to="/auctions">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Auctions
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="bg-gradient-card border-card-border">
              <CardContent className="p-6">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
                  <span className="text-muted-foreground">Main Image Placeholder</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {auction.images.slice(1).map((_, index) => (
                    <div key={index} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">Image {index + 2}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card className="bg-gradient-card border-card-border">
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {auction.description}
                </p>
              </CardContent>
            </Card>

            {/* Item Details */}
            <Card className="bg-gradient-card border-card-border">
              <CardHeader>
                <CardTitle>Item Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(auction.details).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="font-medium capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                      </span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Bid History */}
            <Card className="bg-gradient-card border-card-border">
              <CardHeader>
                <CardTitle>Bid History</CardTitle>
                <CardDescription>Recent bidding activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {auction.bidHistory.map((bid, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {bid.bidder.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{bid.bidder}</p>
                          <p className="text-xs text-muted-foreground">{bid.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">
                          ${bid.amount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Bidding */}
          <div className="space-y-6">
            {/* Auction Status */}
            <Card className="bg-gradient-card border-card-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{auction.endTime} left</span>
                  </Badge>
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{auction.watchers}</span>
                  </div>
                </div>
                <CardTitle className="text-2xl">{auction.title}</CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{auction.category}</Badge>
                  <Badge variant="outline">{auction.condition}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Current Bid</p>
                    <p className="text-4xl font-bold text-primary">
                      ${auction.currentBid.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {auction.bidCount} bids • Starting bid: ${auction.startingBid.toLocaleString()}
                    </p>
                  </div>

                  <Separator />

                  {/* Bidding Form */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Place Your Bid</label>
                      <div className="flex space-x-2 mt-2">
                        <Input
                          type="number"
                          placeholder={`Min: $${nextMinBid.toLocaleString()}`}
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
                          min={nextMinBid}
                          step={auction.minBidIncrement}
                        />
                        <Button
                          onClick={handlePlaceBid}
                          disabled={isPlacingBid}
                          className="glow-green-hover"
                        >
                          <Gavel className="mr-2 h-4 w-4" />
                          {isPlacingBid ? "Placing..." : "Bid"}
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Minimum increment: ${auction.minBidIncrement}
                      </p>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        onClick={toggleWatch}
                        className="flex-1"
                      >
                        <Heart className={`mr-2 h-4 w-4 ${isWatching ? 'fill-current' : ''}`} />
                        {isWatching ? "Watching" : "Watch"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setBidAmount(nextMinBid.toString())}
                        className="flex-1"
                      >
                        Quick Bid ${nextMinBid.toLocaleString()}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seller Info */}
            <Card className="bg-gradient-card border-card-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Seller Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{auction.seller.name}</span>
                    <Badge variant="secondary" className="flex items-center space-x-1">
                      <Shield className="h-3 w-3" />
                      <span>Verified</span>
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Rating:</span>
                    <span className="font-medium">{auction.seller.rating}/5.0</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Sales:</span>
                    <span className="font-medium">{auction.seller.salesCount}</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    View Seller Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Auction Info */}
            <Card className="bg-gradient-card border-card-border">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Info className="h-5 w-5" />
                  <span>Auction Terms</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>• Bidding ends automatically at the specified time</p>
                <p>• All sales are final</p>
                <p>• Payment due within 24 hours</p>
                <p>• Shipping calculated after auction</p>
                <p>• Returns accepted only if item misrepresented</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionDetail;