import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { UserPlus, Search, Gavel, Trophy, Shield, CreditCard, Clock, Star, ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      icon: UserPlus,
      title: "Create Your Account",
      description: "Sign up for free and verify your identity to start bidding on premium items.",
      details: ["Quick 2-minute registration", "Email verification", "Optional profile enhancement"]
    },
    {
      number: 2,
      icon: Search,
      title: "Browse & Discover",
      description: "Explore curated auctions across categories like art, collectibles, and luxury items.",
      details: ["Advanced search filters", "Watchlist for favorites", "Personalized recommendations"]
    },
    {
      number: 3,
      icon: CreditCard,
      title: "Add Credits",
      description: "Purchase bidding credits securely to participate in auctions.",
      details: ["Flexible credit packages", "Secure payment processing", "Instant credit activation"]
    },
    {
      number: 4,
      icon: Gavel,
      title: "Place Your Bids",
      description: "Bid confidently with real-time updates and automatic bid notifications.",
      details: ["Live bidding interface", "Auto-bid functionality", "Mobile-friendly bidding"]
    },
    {
      number: 5,
      icon: Trophy,
      title: "Win & Celebrate",
      description: "Win amazing items and enjoy secure shipping directly to your door.",
      details: ["Instant win notifications", "Secure payment processing", "Tracked shipping"]
    }
  ];

  const features = [
    {
      icon: Clock,
      title: "Real-Time Bidding",
      description: "Lightning-fast bid processing with live updates across all devices."
    },
    {
      icon: Shield,
      title: "Verified Sellers",
      description: "All sellers are thoroughly vetted to ensure authenticity and quality."
    },
    {
      icon: Star,
      title: "Quality Guarantee",
      description: "Items are exactly as described or your money back, guaranteed."
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            How Snaggle Works
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            Your journey from discovery to ownership in 5 simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="space-y-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div key={step.number} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}>
                  {/* Content */}
                  <div className={isEven ? 'lg:pr-8' : 'lg:pl-8 lg:col-start-2'}>
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl">
                        {step.number}
                      </div>
                      <Badge variant="secondary" className="px-3 py-1">
                        Step {step.number}
                      </Badge>
                    </div>
                    <h3 className="text-3xl font-bold mb-4">{step.title}</h3>
                    <p className="text-xl text-muted-foreground mb-6">{step.description}</p>
                    <ul className="space-y-2">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-muted-foreground">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Visual */}
                  <div className={`${!isEven ? 'lg:col-start-1' : ''}`}>
                    <Card className="bg-gradient-card border-card-border p-8">
                      <div className="text-center">
                        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                          <Icon className="h-12 w-12 text-primary" />
                        </div>
                        <div className="h-32 bg-muted rounded-lg flex items-center justify-center">
                          <span className="text-muted-foreground">Step {step.number} Illustration</span>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Features */}
        <section className="py-20 bg-gradient-card rounded-3xl mb-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose Snaggle?
              </h2>
              <p className="text-xl text-muted-foreground">
                Built for serious collectors and casual bidders alike
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Card key={feature.title} className="text-center border-card-border bg-card/50">
                    <CardHeader>
                      <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="h-8 w-8 text-primary" />
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

        {/* Bidding Guide */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Bidding Best Practices
            </h2>
            <p className="text-xl text-muted-foreground">
              Tips to help you win more auctions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-card/50 border-card-border">
              <CardHeader>
                <CardTitle className="text-lg">Research First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Study the item's market value, condition, and seller history before bidding.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-card-border">
              <CardHeader>
                <CardTitle className="text-lg">Set Your Limit</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Decide your maximum bid beforehand and stick to it to avoid overpaying.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-card-border">
              <CardHeader>
                <CardTitle className="text-lg">Time It Right</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Many auctions heat up in the final minutes. Be ready for last-minute bidding.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-card-border">
              <CardHeader>
                <CardTitle className="text-lg">Use Auto-Bid</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Set up automatic bidding to compete even when you're not actively watching.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-card-border">
              <CardHeader>
                <CardTitle className="text-lg">Watch & Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Add items to your watchlist to observe bidding patterns and market trends.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-card-border">
              <CardHeader>
                <CardTitle className="text-lg">Ask Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Contact sellers for additional details or photos before placing serious bids.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <Card className="bg-gradient-hero border-primary/20 text-center p-12">
          <CardHeader>
            <CardTitle className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Bidding?
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of successful bidders who trust Snaggle for their auction needs.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button asChild size="lg" className="glow-green text-lg px-8">
              <Link to="/signup">
                Create Free Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8">
              <Link to="/auctions">Browse Auctions</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HowItWorks;