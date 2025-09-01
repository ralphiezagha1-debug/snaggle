import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AuctionCard } from '@/components/auction/AuctionCard';
import { Footer } from "@/components/Footer";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Gavel, Zap, Trophy, Clock, Users, Star } from 'lucide-react';

export default function Index() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0" style={{background: 'radial-gradient(800px 400px at 20% 0%, hsl(var(--primary)/.15), transparent 70%)'}}></div>
        <div className="container mx-auto relative z-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Gavel className="w-12 h-12 text-primary" />
            <h1 className="text-5xl md:text-6xl font-bold">
              Welcome to <span className="text-primary">Snaggle</span>
            </h1>
          </div>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            The ultimate penny auction experience. Bid smart, save big, and win amazing products
            at unbelievable prices. Every bid counts!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="bg-primary text-primary-foreground shadow-lg text-lg px-8">
              <Zap className="w-5 h-5 mr-2" />
              Start Bidding Now
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              <Clock className="w-5 h-5 mr-2" />
              How It Works
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="text-center bg-card">
              <CardHeader>
                <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-2xl font-bold text-primary">2,847</CardTitle>
                <p className="text-muted-foreground">Winners This Month</p>
              </CardHeader>
            </Card>
            <Card className="text-center bg-card">
              <CardHeader>
                <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-2xl font-bold text-primary">12,394</CardTitle>
                <p className="text-muted-foreground">Active Bidders</p>
              </CardHeader>
            </Card>
            <Card className="text-center bg-card">
              <CardHeader>
                <Star className="w-8 h-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-2xl font-bold text-primary">$2.4M</CardTitle>
                <p className="text-muted-foreground">Total Savings</p>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Auctions Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Live Auctions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of smart shoppers who save up to 95% on brand new products.
              Every auction starts at $0.00 and increases by just $0.01 per bid!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AuctionCard id={1} title="Apple AirPods Pro (2nd Gen) with MagSafe Charging Case" />
            <AuctionCard id={2} title="Samsung 27â€ 4K UHD Monitor (IPS, 60Hz) - 2024 Model" />
            <AuctionCard id={3} title="Nintendo Switch OLED - White Joy-Con" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}



