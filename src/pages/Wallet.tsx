import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Wallet as WalletIcon, Plus, Minus, CreditCard, DollarSign, TrendingUp, Clock, CheckCircle } from "lucide-react";

const Wallet = () => {
  const [addAmount, setAddAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Mock wallet data
  const walletData = {
    balance: 2450.75,
    pendingRefunds: 350.00,
    lockedFunds: 1200.00, // Funds locked in active bids
    totalSpent: 45670.25,
    totalEarned: 890.50, // From selling items
  };

  // Mock transaction history
  const transactions = [
    {
      id: "TXN-001",
      type: "credit_purchase",
      amount: 500.00,
      description: "Credit purchase via Visa ****1234",
      date: "2024-01-18T10:30:00Z",
      status: "completed",
    },
    {
      id: "TXN-002", 
      type: "bid_lock",
      amount: -750.00,
      description: "Bid placed on Vintage Gibson Les Paul",
      date: "2024-01-17T15:45:00Z",
      status: "locked",
    },
    {
      id: "TXN-003",
      type: "auction_win",
      amount: -8750.00,
      description: "Won: Vintage 1965 Gibson Les Paul Guitar",
      date: "2024-01-15T18:22:00Z",
      status: "completed",
    },
    {
      id: "TXN-004",
      type: "refund",
      amount: 450.00,
      description: "Refund for cancelled auction",
      date: "2024-01-12T09:15:00Z",
      status: "completed",
    },
    {
      id: "TXN-005",
      type: "credit_purchase",
      amount: 1000.00,
      description: "Credit purchase via PayPal",
      date: "2024-01-10T14:20:00Z",
      status: "completed",
    },
  ];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "credit_purchase":
        return <Plus className="h-4 w-4 text-green-500" />;
      case "bid_lock":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "auction_win":
        return <Minus className="h-4 w-4 text-red-500" />;
      case "refund":
        return <Plus className="h-4 w-4 text-green-500" />;
      default:
        return <DollarSign className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getTransactionColor = (amount: number) => {
    return amount > 0 ? "text-green-500" : "text-red-500";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500/10 text-green-500">Completed</Badge>;
      case "locked":
        return <Badge className="bg-yellow-500/10 text-yellow-500">Locked</Badge>;
      case "pending":
        return <Badge className="bg-blue-500/10 text-blue-500">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const creditPackages = [
    { amount: 100, bonus: 0, popular: false },
    { amount: 500, bonus: 25, popular: true },
    { amount: 1000, bonus: 100, popular: false },
    { amount: 2500, bonus: 300, popular: false },
  ];

  const handleAddCredits = async (amount: number) => {
    setIsLoading(true);
    // TODO: Implement actual credit purchase
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">My Wallet</h1>
            <p className="text-muted-foreground">Manage your credits and view transaction history</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Balance & Actions */}
            <div className="lg:col-span-2 space-y-6">
              {/* Balance Overview */}
              <Card className="bg-gradient-hero border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <WalletIcon className="h-6 w-6 text-primary" />
                    <span>Wallet Balance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="text-5xl font-bold text-primary mb-2">
                      ${walletData.balance.toLocaleString()}
                    </div>
                    <p className="text-muted-foreground">Available for bidding</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-card/30 rounded-lg">
                      <div className="text-xl font-semibold text-yellow-500">
                        ${walletData.lockedFunds.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">Locked in Bids</div>
                    </div>
                    <div className="text-center p-4 bg-card/30 rounded-lg">
                      <div className="text-xl font-semibold text-blue-500">
                        ${walletData.pendingRefunds.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">Pending Refunds</div>
                    </div>
                    <div className="text-center p-4 bg-card/30 rounded-lg">
                      <div className="text-xl font-semibold text-green-500">
                        ${walletData.totalEarned.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">Total Earned</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Credit Packages */}
              <Card className="bg-gradient-card border-card-border">
                <CardHeader>
                  <CardTitle>Add Credits</CardTitle>
                  <CardDescription>Purchase credits to participate in auctions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {creditPackages.map((pkg) => (
                      <Card 
                        key={pkg.amount} 
                        className={`cursor-pointer transition-all border-2 ${
                          pkg.popular 
                            ? 'border-primary bg-primary/5' 
                            : 'border-card-border hover:border-primary/50'
                        }`}
                      >
                        <CardContent className="p-4 text-center relative">
                          {pkg.popular && (
                            <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                              Most Popular
                            </Badge>
                          )}
                          <div className="text-2xl font-bold mb-2">${pkg.amount}</div>
                          {pkg.bonus > 0 && (
                            <div className="text-sm text-primary font-medium mb-3">
                              +${pkg.bonus} bonus
                            </div>
                          )}
                          <Button 
                            className="w-full"
                            variant={pkg.popular ? "default" : "outline"}
                            onClick={() => handleAddCredits(pkg.amount)}
                            disabled={isLoading}
                          >
                            Add Credits
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Separator className="mb-6" />

                  {/* Custom Amount */}
                  <div className="space-y-4">
                    <Label htmlFor="customAmount">Custom Amount</Label>
                    <div className="flex space-x-3">
                      <div className="relative flex-1">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="customAmount"
                          type="number"
                          placeholder="Enter amount"
                          value={addAmount}
                          onChange={(e) => setAddAmount(e.target.value)}
                          className="pl-10"
                          min="25"
                          max="10000"
                        />
                      </div>
                      <Button 
                        onClick={() => handleAddCredits(parseFloat(addAmount))}
                        disabled={!addAmount || parseFloat(addAmount) < 25 || isLoading}
                        className="glow-green-hover"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Credits
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Minimum: $25 • Maximum: $10,000 per transaction
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Transaction History */}
              <Card className="bg-gradient-card border-card-border">
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>Your recent wallet activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="all" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="credits">Credits</TabsTrigger>
                      <TabsTrigger value="bids">Bids</TabsTrigger>
                      <TabsTrigger value="refunds">Refunds</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="all" className="space-y-4">
                      {transactions.map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                          <div className="flex items-center space-x-3">
                            {getTransactionIcon(transaction.type)}
                            <div>
                              <p className="font-medium">{transaction.description}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <p className="text-sm text-muted-foreground">
                                  {new Date(transaction.date).toLocaleDateString()}
                                </p>
                                {getStatusBadge(transaction.status)}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`text-lg font-semibold ${getTransactionColor(transaction.amount)}`}>
                              {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                    
                    <TabsContent value="credits">
                      <div className="text-center py-8">
                        <Plus className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-xl font-semibold mb-2">Credit Purchases</h3>
                        <p className="text-muted-foreground">Your credit purchase history will appear here</p>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="bids">
                      <div className="text-center py-8">
                        <Clock className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-xl font-semibold mb-2">Bid Transactions</h3>
                        <p className="text-muted-foreground">Your bidding activity will appear here</p>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="refunds">
                      <div className="text-center py-8">
                        <CheckCircle className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-xl font-semibold mb-2">Refunds</h3>
                        <p className="text-muted-foreground">Your refund history will appear here</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Quick Info & Actions */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <Card className="bg-gradient-card border-card-border">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <span>Spending Summary</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">This Month</span>
                    <span className="font-semibold">$3,450</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Spent</span>
                    <span className="font-semibold">${walletData.totalSpent.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg. per Win</span>
                    <span className="font-semibold">$1,985</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Success Rate</span>
                    <span className="font-semibold text-primary">85%</span>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Methods */}
              <Card className="bg-gradient-card border-card-border">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5" />
                    <span>Payment Methods</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-6 bg-blue-500 rounded flex items-center justify-center">
                        <span className="text-xs text-white font-bold">V</span>
                      </div>
                      <div>
                        <p className="font-medium">Visa ****1234</p>
                        <p className="text-xs text-muted-foreground">Expires 12/25</p>
                      </div>
                    </div>
                    <Badge variant="secondary">Primary</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-6 bg-blue-600 rounded flex items-center justify-center">
                        <span className="text-xs text-white font-bold">PP</span>
                      </div>
                      <div>
                        <p className="font-medium">PayPal</p>
                        <p className="text-xs text-muted-foreground">john.doe@email.com</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Payment Method
                  </Button>
                </CardContent>
              </Card>

              {/* Security */}
              <Card className="bg-gradient-card border-card-border">
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Two-Factor Auth</span>
                    <Badge className="bg-green-500/10 text-green-500">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">SMS Notifications</span>
                    <Badge className="bg-green-500/10 text-green-500">On</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Email Alerts</span>
                    <Badge className="bg-green-500/10 text-green-500">On</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    Security Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;