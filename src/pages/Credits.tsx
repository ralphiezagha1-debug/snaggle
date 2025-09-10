import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Check, Zap, Crown, Star, ArrowRight } from "lucide-react";

const Credits = () => {
  const plans = [
    {
      name: "Starter",
      credits: 100,
      price: 100,
      popular: false,
      bonus: 0,
      features: ["Basic bidding", "Email support", "Transaction history"]
    },
    {
      name: "Popular",
      credits: 500,
      price: 475,
      popular: true,
      bonus: 25,
      features: ["Priority bidding", "Phone support", "Advanced analytics", "Early auction access"]
    },
    {
      name: "Pro",
      credits: 1000,
      price: 900,
      popular: false,
      bonus: 100,
      features: ["VIP bidding", "Dedicated support", "Market insights", "Exclusive auctions"]
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Credits & Pricing</h1>
          <p className="text-xl text-muted-foreground">Choose the perfect credit package for your bidding needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card key={plan.name} className={`relative ${plan.popular ? 'border-primary scale-105' : 'border-card-border'} bg-gradient-card`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                  Most Popular
                </Badge>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="text-4xl font-bold text-primary">${plan.credits}</div>
                <CardDescription>${plan.price} ({plan.bonus > 0 && `+$${plan.bonus} bonus`})</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
                <Button asChild className={`w-full ${plan.popular ? 'glow-green' : ''}`}>
                  <Link to="/wallet">Purchase Credits</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Credits;