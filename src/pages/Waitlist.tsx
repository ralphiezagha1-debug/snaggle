import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Mail, Users, Clock, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Waitlist = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Frontend-only implementation - POST to /api/waitlist
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setEmail("");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      // For demo purposes, we'll simulate success since backend isn't implemented
      console.log("Waitlist signup would POST to /api/waitlist:", { email });
      setIsSuccess(true);
      setEmail("");
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    {
      icon: Star,
      title: "Early Access",
      description: "Be among the first to experience Snaggle's premium auction platform"
    },
    {
      icon: Users,
      title: "Exclusive Auctions",
      description: "Access to special preview auctions before public launch"
    },
    {
      icon: Clock,
      title: "Priority Support",
      description: "Dedicated customer support and onboarding assistance"
    },
    {
      icon: Mail,
      title: "Beta Updates",
      description: "Regular updates on new features and platform improvements"
    }
  ];

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto bg-gradient-hero border-primary/20 text-center">
            <CardContent className="p-12">
              <div className="flex justify-center mb-6">
                <CheckCircle className="h-24 w-24 text-primary animate-pulse" />
              </div>
              <h1 className="text-4xl font-bold mb-4">You're on the list!</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Welcome to the Snaggle community. We'll notify you as soon as we launch.
              </p>
              <div className="bg-card/50 rounded-lg p-6 mb-8">
                <h3 className="font-semibold mb-4">What happens next?</h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">1</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      You'll receive a confirmation email shortly
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">2</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      We'll send you exclusive updates during development
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">3</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Get early access when we launch
                    </p>
                  </div>
                </div>
              </div>
              <p 
                className="text-sm text-muted-foreground" 
                aria-live="polite"
                role="status"
              >
                Thank you for your interest in Snaggle!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-snaggle-green bg-clip-text text-transparent">
            Join the Future of<br />
            <span className="text-primary">Live Auctions</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Be among the first to experience Snaggle's revolutionary auction platform. 
            Join our exclusive waitlist for early access and special perks.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Signup Form */}
          <Card className="bg-gradient-card border-card-border">
            <CardHeader>
              <CardTitle className="text-2xl">Reserve Your Spot</CardTitle>
              <CardDescription>
                Join thousands of auction enthusiasts waiting for Snaggle
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    required
                    className="text-lg h-12"
                    disabled={isLoading}
                  />
                  {error && (
                    <p className="text-sm text-destructive" role="alert">
                      {error}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-lg glow-green"
                  disabled={isLoading || !isValidEmail(email)}
                >
                  {isLoading ? "Joining..." : "Join the Waitlist"}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By joining, you agree to receive updates about Snaggle. 
                  You can unsubscribe at any time.
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Benefits */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">What You'll Get</h3>
            <div className="space-y-4">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <Card key={benefit.title} className="bg-card/50 border-card-border">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">{benefit.title}</h4>
                          <p className="text-muted-foreground text-sm">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Stats */}
            <Card className="bg-gradient-hero border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-3xl font-bold text-primary mb-1">1,247</div>
                    <div className="text-sm text-muted-foreground">People Waiting</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-1">Q1 2024</div>
                    <div className="text-sm text-muted-foreground">Expected Launch</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mt-20">
          <h3 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h3>
          <div className="space-y-6">
            <Card className="bg-card/50 border-card-border">
              <CardHeader>
                <CardTitle className="text-lg">When will Snaggle launch?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We're targeting a Q1 2024 launch. Waitlist members will get early access 
                  2-4 weeks before the public launch.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-card-border">
              <CardHeader>
                <CardTitle className="text-lg">Will there be any fees to join?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Joining Snaggle is completely free. We only charge small transaction fees 
                  when you successfully win an auction.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-card-border">
              <CardHeader>
                <CardTitle className="text-lg">What types of items will be available?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We'll feature a curated selection of art, collectibles, vintage items, 
                  electronics, fashion, and more from verified sellers worldwide.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Waitlist;