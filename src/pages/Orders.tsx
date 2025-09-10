import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Package, Clock, CheckCircle, XCircle, Truck, Eye } from "lucide-react";

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock order data
  const orders = [
    {
      id: "ORD-2024-001",
      item: "Vintage 1965 Gibson Les Paul Guitar",
      finalBid: 8750,
      date: "2024-01-15",
      status: "delivered",
      estimatedDelivery: "2024-01-22",
      actualDelivery: "2024-01-20",
      trackingNumber: "1Z999AA1234567890",
      seller: "VintageGuitars_Pro",
      category: "Music",
    },
    {
      id: "ORD-2024-002", 
      item: "First Edition Harry Potter Book Set",
      finalBid: 3200,
      date: "2024-01-10",
      status: "shipped",
      estimatedDelivery: "2024-01-25",
      trackingNumber: "1Z999BB1234567891",
      seller: "RareBooks_Ltd",
      category: "Books",
    },
    {
      id: "ORD-2024-003",
      item: "Vintage Chanel Handbag (1980s)",
      finalBid: 2850,
      date: "2024-01-08",
      status: "processing",
      estimatedDelivery: "2024-01-30",
      seller: "VintageLuxury",
      category: "Fashion",
    },
    {
      id: "ORD-2024-004",
      item: "MacBook Pro M3 Max (2024)",
      finalBid: 2400,
      date: "2024-01-05",
      status: "cancelled",
      reason: "Payment failed",
      seller: "TechDeals_Pro",
      category: "Electronics",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "shipped":
        return <Truck className="h-4 w-4 text-blue-500" />;
      case "processing":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Package className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "text-green-500";
      case "shipped":
        return "text-blue-500";
      case "processing":
        return "text-yellow-500";
      case "cancelled":
        return "text-red-500";
      default:
        return "text-muted-foreground";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">Delivered</Badge>;
      case "shipped":
        return <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">Shipped</Badge>;
      case "processing":
        return <Badge className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20">Processing</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const orderStats = {
    total: orders.length,
    delivered: orders.filter(o => o.status === "delivered").length,
    shipped: orders.filter(o => o.status === "shipped").length,
    processing: orders.filter(o => o.status === "processing").length,
    cancelled: orders.filter(o => o.status === "cancelled").length,
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">My Orders</h1>
            <p className="text-muted-foreground">Track your auction wins and order history</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <Card className="bg-gradient-card border-card-border">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">{orderStats.total}</div>
                <div className="text-sm text-muted-foreground">Total Orders</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-card border-card-border">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-500">{orderStats.delivered}</div>
                <div className="text-sm text-muted-foreground">Delivered</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-card border-card-border">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-500">{orderStats.shipped}</div>
                <div className="text-sm text-muted-foreground">Shipped</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-card border-card-border">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-500">{orderStats.processing}</div>
                <div className="text-sm text-muted-foreground">Processing</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-card border-card-border">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-500">{orderStats.cancelled}</div>
                <div className="text-sm text-muted-foreground">Cancelled</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-8 bg-card/50 border-card-border">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Orders</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Orders List */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id} className="bg-gradient-card border-card-border hover:border-primary/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                      {/* Order Info */}
                      <div className="lg:col-span-2">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-lg mb-1 line-clamp-1">
                              {order.item}
                            </h3>
                            <p className="text-sm text-muted-foreground">Order #{order.id}</p>
                          </div>
                          {getStatusBadge(order.status)}
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Seller:</span>
                            <span>{order.seller}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Category:</span>
                            <span>{order.category}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Order Date:</span>
                            <span>{new Date(order.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>

                      {/* Status & Delivery */}
                      <div>
                        <div className="flex items-center space-x-2 mb-3">
                          {getStatusIcon(order.status)}
                          <span className={`font-medium capitalize ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          {order.trackingNumber && (
                            <div>
                              <span className="text-muted-foreground">Tracking:</span>
                              <p className="font-mono text-xs mt-1">{order.trackingNumber}</p>
                            </div>
                          )}
                          
                          {order.estimatedDelivery && (
                            <div>
                              <span className="text-muted-foreground">
                                {order.status === "delivered" ? "Delivered:" : "Expected:"}
                              </span>
                              <p className="mt-1">
                                {order.actualDelivery 
                                  ? new Date(order.actualDelivery).toLocaleDateString()
                                  : new Date(order.estimatedDelivery).toLocaleDateString()
                                }
                              </p>
                            </div>
                          )}
                          
                          {order.reason && (
                            <div>
                              <span className="text-muted-foreground">Reason:</span>
                              <p className="mt-1 text-red-500">{order.reason}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Price & Actions */}
                      <div className="flex flex-col justify-between">
                        <div className="text-right mb-4">
                          <p className="text-sm text-muted-foreground">Final Bid</p>
                          <p className="text-2xl font-bold text-primary">
                            ${order.finalBid.toLocaleString()}
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <Button variant="outline" size="sm" className="w-full">
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Button>
                          
                          {order.trackingNumber && order.status !== "delivered" && (
                            <Button variant="secondary" size="sm" className="w-full">
                              <Truck className="mr-2 h-4 w-4" />
                              Track Package
                            </Button>
                          )}
                          
                          {order.status === "delivered" && (
                            <Button variant="outline" size="sm" className="w-full">
                              Buy Again
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="recent">
              <Card className="bg-card/50 border-card-border">
                <CardContent className="p-12 text-center">
                  <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">Recent Orders</h3>
                  <p className="text-muted-foreground">Your recent orders from the last 30 days will appear here</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="delivered">
              <Card className="bg-card/50 border-card-border">
                <CardContent className="p-12 text-center">
                  <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500" />
                  <h3 className="text-xl font-semibold mb-2">Delivered Orders</h3>
                  <p className="text-muted-foreground">All your successfully delivered orders will appear here</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="active">
              <Card className="bg-card/50 border-card-border">
                <CardContent className="p-12 text-center">
                  <Clock className="h-16 w-16 mx-auto mb-4 text-yellow-500" />
                  <h3 className="text-xl font-semibold mb-2">Active Orders</h3>
                  <p className="text-muted-foreground">Orders currently being processed or shipped will appear here</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Orders;