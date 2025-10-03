import { useState } from "react";
import { useSEO } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AuctionCard } from "@/components/AuctionCard";
import { FilterPanel } from "@/components/FilterPanel";
import { Pagination } from "@/components/Pagination";
import { Countdown } from "@/components/Countdown";
import { AuctionCardSkeleton, AuctionDetailSkeleton, TableSkeleton } from "@/components/Skeletons";
import { Info, Heart, Star, Gavel, Calendar, Package } from "lucide-react";

const UI = () => {
  useSEO({
    title: "UI Components - Snaggle Design System",
    description: "Showcase of all Snaggle UI components and design tokens",
    canonical: `${window.location.origin}/ui`,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    categories: [] as string[],
    priceRange: [0, 1000] as [number, number],
    sortBy: "ending_soon" as string,
    searchQuery: "",
  });

  const mockAuction = {
    id: "1",
    title: "Vintage Rolex Submariner",
    description: "Classic timepiece from 1965",
    currentBid: 15750,
    endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
    category: "Watches",
    bidCount: 23,
    seller: "WatchCollector123",
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Snaggle UI Components
            </h1>
            <p className="text-xl text-muted-foreground">
              Design system showcase and component library
            </p>
          </header>

          <Tabs defaultValue="components" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="components">Components</TabsTrigger>
              <TabsTrigger value="cards">Cards</TabsTrigger>
              <TabsTrigger value="tokens">Design Tokens</TabsTrigger>
              <TabsTrigger value="interactive">Interactive</TabsTrigger>
            </TabsList>

            <TabsContent value="components" className="space-y-8">
              {/* Buttons */}
              <Card>
                <CardHeader>
                  <CardTitle>Buttons</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    <Button>Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="destructive">Destructive</Button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button className="glow-green">Glow Green</Button>
                    <Button className="glow-purple">Glow Purple</Button>
                    <Button className="glow-gold">Glow Gold</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Badges */}
              <Card>
                <CardHeader>
                  <CardTitle>Badges</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                    <Badge className="bg-snaggle-green text-snaggle-green-foreground">Custom Green</Badge>
                    <Badge className="bg-snaggle-purple text-snaggle-purple-foreground">Custom Purple</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle>Alerts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      This is an informational alert with an icon.
                    </AlertDescription>
                  </Alert>
                  <Alert variant="destructive">
                    <AlertDescription>
                      This is a destructive alert for errors.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              {/* Countdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Countdown Timer</CardTitle>
                </CardHeader>
                <CardContent>
                  <Countdown endTime={new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)} />
                </CardContent>
              </Card>

              {/* Pagination */}
              <Card>
                <CardHeader>
                  <CardTitle>Pagination</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Numbers Variant</h4>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={10}
                      onPageChange={setCurrentPage}
                      variant="numbers"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Load More Variant</h4>
                    <Pagination
                      currentPage={1}
                      totalPages={5}
                      onPageChange={() => {}}
                      variant="load-more"
                      hasNextPage={true}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Skeletons */}
              <Card>
                <CardHeader>
                  <CardTitle>Loading Skeletons</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <h4 className="font-semibold">Card Skeletons</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <AuctionCardSkeleton />
                      <AuctionCardSkeleton />
                    </div>
                    
                    <h4 className="font-semibold">Detail Skeleton</h4>
                    <AuctionDetailSkeleton />
                    
                    <h4 className="font-semibold">Table Skeleton</h4>
                    <TableSkeleton />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cards" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AuctionCard auction={mockAuction} variant="default" />
                <AuctionCard auction={{...mockAuction, id: "2"}} variant="featured" />
                <AuctionCard auction={{...mockAuction, id: "3", endTime: new Date(Date.now() + 2 * 60 * 60 * 1000)}} variant="ending-soon" />
                <AuctionCard auction={{...mockAuction, id: "4", endTime: new Date(Date.now() - 1000)}} variant="sold-out" />
              </div>
            </TabsContent>

            <TabsContent value="tokens" className="space-y-8">
              {/* Colors */}
              <Card>
                <CardHeader>
                  <CardTitle>Color Palette</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Primary Colors</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-primary rounded-lg mx-auto mb-2"></div>
                        <span className="text-sm">Primary</span>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-snaggle-purple rounded-lg mx-auto mb-2"></div>
                        <span className="text-sm">Purple</span>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-snaggle-green rounded-lg mx-auto mb-2"></div>
                        <span className="text-sm">Green</span>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-snaggle-gold rounded-lg mx-auto mb-2"></div>
                        <span className="text-sm">Gold</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Neutral Colors</h4>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-background border rounded-lg mx-auto mb-2"></div>
                        <span className="text-xs">Background</span>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-card rounded-lg mx-auto mb-2"></div>
                        <span className="text-xs">Card</span>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-muted rounded-lg mx-auto mb-2"></div>
                        <span className="text-xs">Muted</span>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-foreground rounded-lg mx-auto mb-2"></div>
                        <span className="text-xs">Foreground</span>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-border rounded-lg mx-auto mb-2"></div>
                        <span className="text-xs">Border</span>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-accent rounded-lg mx-auto mb-2"></div>
                        <span className="text-xs">Accent</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Gradients */}
              <Card>
                <CardHeader>
                  <CardTitle>Gradients</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="h-24 bg-gradient-hero rounded-lg flex items-center justify-center text-white font-semibold">
                      Hero Gradient
                    </div>
                    <div className="h-24 bg-gradient-card rounded-lg flex items-center justify-center font-semibold">
                      Card Gradient
                    </div>
                    <div className="h-24 bg-gradient-subtle rounded-lg flex items-center justify-center font-semibold">
                      Subtle Gradient
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Glow Effects */}
              <Card>
                <CardHeader>
                  <CardTitle>Glow Effects</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center space-y-4">
                    <div className="glow-sm p-4 rounded-lg border">Small Glow</div>
                    <div className="glow-md p-4 rounded-lg border">Medium Glow</div>
                    <div className="glow-lg p-4 rounded-lg border">Large Glow</div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="interactive" className="space-y-8">
              {/* Filter Panel */}
              <Card>
                <CardHeader>
                  <CardTitle>Filter Panel</CardTitle>
                </CardHeader>
                <CardContent>
                  <FilterPanel
                    filters={filters}
                    onFiltersChange={setFilters}
                    onReset={() => setFilters({ categories: [], priceRange: [0, 1000], sortBy: "ending_soon", searchQuery: "" })}
                  />
                </CardContent>
              </Card>

              {/* Dialog */}
              <Card>
                <CardHeader>
                  <CardTitle>Dialog Modal</CardTitle>
                </CardHeader>
                <CardContent>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Open Dialog</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirm Your Bid</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          Are you sure you want to place a bid of $16,000?
                        </p>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline">Cancel</Button>
                          <Button>Confirm Bid</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>

              {/* Form Elements */}
              <Card>
                <CardHeader>
                  <CardTitle>Form Elements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input placeholder="Search auctions..." />
                  <Input type="email" placeholder="Email address" />
                  <Input type="password" placeholder="Password" />
                  <div className="flex space-x-2">
                    <Input type="number" placeholder="Min Price" className="flex-1" />
                    <Input type="number" placeholder="Max Price" className="flex-1" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UI;