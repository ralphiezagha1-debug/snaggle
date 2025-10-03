import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, Trophy, Zap, Shield, Users, TrendingUp } from "lucide-react";
import QuickBidModal from "@/components/modals/QuickBidModal";
import { toast } from "@/hooks/use-toast";

const Home = () => {
  const [quickBidModalOpen, setQuickBidModalOpen] = useState(false);
  const [selectedAuction, setSelectedAuction] = useState<{ id: string; title: string; currentBid: number } | null>(null);

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
    <div className="min-h-screen bg-snag-gradient">
      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-12 pb-10">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-[#00FF80] hero-glow">
            Snag Deals in Live Auctions
          </h1>
          <p className="text-white mb-8 max-w-3xl text-lg font-medium">
            The premium live auction platform where collectors, enthusiasts, and investors 
            compete for exclusive items in real-time. Authenticity guaranteed, every bid counts.
          </p>
          <div className="flex flex-wrap gap-4 mb-8">
            <Button 
              size="lg" 
              variant="primary"
              asChild
            >
              <Link to="/auctions">Shop Now</Link>
            </Button>
            <Button 
              size="lg" 
              variant="ghost-green" 
              asChild
            >
              <Link to="/how-it-works">Learn How It Works</Link>
            </Button>
          </div>
          {/* Trust row */}
          <div className="flex flex-wrap items-center gap-8 text-lg">
            <span className="inline-flex items-center gap-3">
              <svg className="h-6 w-6 text-[#5DBAFF]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-bold text-white">Verified sellers</span>
            </span>
            <span className="inline-flex items-center gap-3">
              <svg className="h-6 w-6 text-[#5DBAFF]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-bold text-white">Buyer protection</span>
            </span>
            <span className="inline-flex items-center gap-3">
              <svg className="h-6 w-6 text-[#5DBAFF]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
              </svg>
              <span className="font-bold text-white">Free shipping on wins</span>
            </span>
          </div>
        </div>
      </section>

      {/* Neon Green Divider */}
      <div className="container mx-auto px-6">
        <div className="neon-divider"></div>
      </div>

      {/* Featured Auctions */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Featured Auctions
            </h2>
            <p className="text-xl text-white/80">
              Discover exceptional items ending soon
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredAuctions.map((auction) => (
              <Card key={auction.id} className="group overflow-hidden transition-all duration-300 rounded-2xl bg-gradient-to-br from-slate-900/95 to-slate-800/95 border border-white/10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)] hover:border-[#00FF80] hover:shadow-[0_0_20px_rgba(0,255,128,0.4),inset_0_1px_2px_rgba(255,255,255,0.05)] hover:-translate-y-2">
                <div className="relative">
                  <div className="aspect-video bg-slate-800 rounded-t-2xl flex items-center justify-center">
                    <span className="text-white/40">Image Placeholder</span>
                  </div>
                  {auction.featured && (
                    <Badge className="absolute top-3 left-3 bg-[#FFD700] text-black font-semibold">
                      Featured
                    </Badge>
                  )}
                  <div className="absolute top-3 right-3 bg-white/5 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-2 border border-white/10">
                    <Clock className="h-3.5 w-3.5 text-[#FFD700]" />
                    <span className="text-sm font-semibold text-[#FFD700]">{auction.endTime}</span>
                  </div>
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl font-bold text-white line-clamp-2 group-hover:text-[#00FF80] transition-colors">
                    {auction.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="text-sm text-white/60 font-medium">Current Bid</div>
                      <p className="text-3xl font-bold text-[#00FF80]">
                        ${auction.currentBid.toLocaleString()}
                      </p>
                      <div className="flex items-center gap-1.5 text-white/50 text-xs mt-1">
                        <Users className="h-3.5 w-3.5" />
                        <span>{auction.bidCount} bids</span>
                      </div>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                      <Button
                        data-testid="quick-bid-card-cta"
                        aria-label="Quick Bid increase by one cent"
                        variant="outline"
                        size="sm"
                        className="shrink-0"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedAuction({
                            id: auction.id,
                            title: auction.title,
                            currentBid: auction.currentBid
                          });
                          setQuickBidModalOpen(true);
                        }}
                      >
                        Quick Bid
                      </Button>
                    </div>
                  </div>
                  <Button asChild variant="ghost-green" className="w-full h-11">
                    <Link to={`/auctions/${auction.id}`}>
                      View Auction
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild size="lg" variant="primary" className="px-8">
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
                <Card key={feature.title} className="text-center bg-transparent border-0">
                  <CardHeader>
                    <div className="mx-auto mb-4 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl text-white/90">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/60">{feature.description}</p>
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
          <Card className="bg-transparent border-0 text-center p-12">
            <CardHeader>
              <div className="flex justify-center mb-6">
                <Trophy className="h-16 w-16 text-[#00FF85]" />
              </div>
              <CardTitle className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Ready to Start Winning?
              </CardTitle>
              <CardDescription className="text-lg text-white/70 max-w-2xl mx-auto">
                Join thousands of successful bidders who trust Snaggle for their most important purchases.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button 
                asChild 
                size="lg" 
                variant="primary"
                className="text-lg px-8"
              >
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

      {/* Quick Bid Modal */}
      {quickBidModalOpen && selectedAuction && (
        <QuickBidModal
          isOpen={quickBidModalOpen}
          onClose={() => {
            setQuickBidModalOpen(false);
            setSelectedAuction(null);
          }}
          lotId={selectedAuction.id}
          lotTitle={selectedAuction.title}
          currentBid={selectedAuction.currentBid}
        />
      )}
    </div>
  );
};

export default Home;