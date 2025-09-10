import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, Trophy, Zap, Shield, Users, TrendingUp } from "lucide-react";

const Home = () => {
  // Mock featured auctions
  const featuredAuctions = [
    {
      id: "1",
      title: "Vintage 1965 Gibson Les Paul",
      currentBid: 8750,
      endTime: "2h 34m",
      bidCount: 23,
      image: "/api/placeholder/300/200",
      featured: true,
    },
    {
      id: "2", 
      title: "Original Banksy Street Art",
      currentBid: 15420,
      endTime: "1d 5h",
      bidCount: 67,
      image: "/api/placeholder/300/200",
      featured: true,
    },
    {
      id: "3",
      title: "Rolex Submariner (1970)",
      currentBid: 12300,
      endTime: "4h 12m", 
      bidCount: 45,
      image: "/api/placeholder/300/200",
      featured: false,
    },
  ];

  const features = [
    {
      icon: Zap,
      title: "Real-Time Bidding",
      description: "Lightning-fast bid processing with instant updates and no delays."
    },
    {
      icon: Shield,
      title: "Secure Transactions",
      description: "Bank-level security with verified sellers and protected payments."
    },
    {
      icon: Users,
      title: "Curated Community",
      description: "Join thousands of collectors and enthusiasts worldwide."
    },
    {
      icon: TrendingUp,
      title: "Market Insights",
      description: "Get real-time market data and price trends for informed bidding."
    },
  ];

  return (
    <div className="snaggle-glow min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-snaggle-green bg-clip-text text-transparent">
              Win What You Want.<br />
              <span className="text-primary">Bid What It's Worth.</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              The premium live auction platform where collectors, enthusiasts, and investors 
              compete for the world's most coveted items.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="glow-green text-lg px-8 py-6">
                <Link to="/auctions">
                  Browse Live Auctions
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg" className="text-lg px-8 py-6">
                <Link to="/how-it-works">Learn How It Works</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Auctions */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured Auctions
            </h2>
            <p className="text-xl text-muted-foreground">
              Discover exceptional items ending soon
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredAuctions.map((auction) => (
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
                  <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1">
                    <Clock className="h-3 w-3 text-destructive" />
                    <span className="text-xs font-medium">{auction.endTime}</span>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                    {auction.title}
                  </CardTitle>
                  <CardDescription className="flex items-center justify-between">
                    <span>Current Bid</span>
                    <span className="text-primary font-semibold">
                      ${auction.currentBid.toLocaleString()}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {auction.bidCount} bids
                    </span>
                    <Button asChild variant="secondary" size="sm">
                      <Link to={`/auctions/${auction.id}`}>
                        View Auction
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild variant="outline" size="lg">
              <Link to="/auctions">
                View All Auctions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Snaggle?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of online auctions with cutting-edge technology 
              and unmatched reliability.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="text-center border-card-border bg-card/50">
                  <CardHeader>
                    <div className="mx-auto mb-4 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-hero border-primary/20 text-center p-12">
            <CardHeader>
              <div className="flex justify-center mb-6">
                <Trophy className="h-16 w-16 text-primary" />
              </div>
              <CardTitle className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Start Winning?
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join thousands of successful bidders who trust Snaggle for their most important purchases.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button asChild size="lg" className="glow-green text-lg px-8">
                <Link to="/signup">
                  Create Your Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link to="/waitlist">Join Our Waitlist</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;