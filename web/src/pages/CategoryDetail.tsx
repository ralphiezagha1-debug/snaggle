import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AuctionCard, AuctionItem } from "@/components/AuctionCard";
import { FilterPanel, FilterState } from "@/components/FilterPanel";
import { Pagination } from "@/components/Pagination";
import { AuctionCardSkeleton } from "@/components/Skeletons";
import { ChevronLeft, Grid, List } from "lucide-react";
import { useSEO } from "@/lib/seo";
import { analytics } from "@/lib/analytics";

// Mock data - would come from API
const mockAuctions: AuctionItem[] = [
  {
    id: "1",
    title: "iPhone 15 Pro Max - Unlocked",
    description: "Brand new iPhone 15 Pro Max, 256GB, Natural Titanium",
    currentBid: 950,
    buyNowPrice: 1199,
    imageUrl: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=400",
    endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    bidCount: 18,
    category: "Electronics",
    seller: "TechDeals"
  },
  {
    id: "2",
    title: "MacBook Pro M3 16-inch",
    description: "Latest MacBook Pro with M3 chip, 32GB RAM, 1TB SSD",
    currentBid: 2200,
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
    endTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
    bidCount: 31,
    category: "Electronics",
    seller: "AppleStore",
    isEnding: true
  },
  // Add more electronics items...
];

const categoryInfo = {
  "electronics": {
    name: "Electronics",
    description: "Discover the latest smartphones, laptops, cameras, and cutting-edge technology",
    totalAuctions: 245
  },
  "art-collectibles": {
    name: "Art & Collectibles", 
    description: "Unique paintings, sculptures, and rare collectible items",
    totalAuctions: 189
  },
  "fashion-accessories": {
    name: "Fashion & Accessories",
    description: "Designer clothing, luxury accessories, and fashion statements",
    totalAuctions: 156
  }
  // Add more categories...
};

const CategoryDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [auctions, setAuctions] = useState<AuctionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 10000],
    sortBy: "ending-soon",
    searchQuery: ""
  });

  const category = categoryInfo[slug as keyof typeof categoryInfo];

  useSEO({
    title: `${category?.name || 'Category'} Auctions - Snaggle`,
    description: category?.description || "Browse auctions in this category",
    canonical: `${window.location.origin}/categories/${slug}`
  });

  useEffect(() => {
    if (category) {
      analytics.page('Category Detail', { category: category.name, slug });
    }
  }, [category, slug]);

  useEffect(() => {
    if (!category) return;

    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      let filtered = [...mockAuctions];
      
      // Apply filters similar to Search page
      if (filters.searchQuery) {
        filtered = filtered.filter(auction =>
          auction.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
          auction.description.toLowerCase().includes(filters.searchQuery.toLowerCase())
        );
      }
      
      // Apply price range
      filtered = filtered.filter(auction =>
        auction.currentBid >= filters.priceRange[0] &&
        auction.currentBid <= filters.priceRange[1]
      );
      
      // Apply sorting
      switch (filters.sortBy) {
        case "ending-soon":
          filtered.sort((a, b) => a.endTime.getTime() - b.endTime.getTime());
          break;
        case "price-low":
          filtered.sort((a, b) => a.currentBid - b.currentBid);
          break;
        case "price-high":
          filtered.sort((a, b) => b.currentBid - a.currentBid);
          break;
        case "most-bids":
          filtered.sort((a, b) => b.bidCount - a.bidCount);
          break;
        default:
          break;
      }
      
      setAuctions(filtered);
      setIsLoading(false);
    }, 500);
  }, [filters, category]);

  const resetFilters = () => {
    setFilters({
      categories: [],
      priceRange: [0, 10000],
      sortBy: "ending-soon",
      searchQuery: ""
    });
  };

  if (!category) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <Card>
            <CardContent className="py-12 text-center">
              <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
              <p className="text-muted-foreground mb-6">
                The category you're looking for doesn't exist.
              </p>
              <Button asChild>
                <Link to="/categories">Browse All Categories</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const resultsCount = auctions.length;
  const itemsPerPage = 12;
  const totalPages = Math.ceil(resultsCount / itemsPerPage);
  const paginatedAuctions = auctions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link to="/categories" className="hover:text-primary">Categories</Link>
          <span>/</span>
          <span className="text-foreground">{category.name}</span>
        </nav>

        {/* Category Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/categories">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Categories
            </Link>
          </Button>
          
          <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
          <p className="text-lg text-muted-foreground mb-4">{category.description}</p>
          
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              {category.totalAuctions.toLocaleString()} total auctions
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <FilterPanel
              filters={filters}
              onFiltersChange={setFilters}
              onReset={resetFilters}
            />
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                {isLoading ? (
                  "Loading..."
                ) : (
                  `${resultsCount.toLocaleString()} auction${resultsCount !== 1 ? 's' : ''} found`
                )}
              </p>
            </div>

            {/* Results Grid */}
            {isLoading ? (
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                : "space-y-4"
              }>
                {Array.from({ length: 6 }).map((_, i) => (
                  <AuctionCardSkeleton key={i} />
                ))}
              </div>
            ) : resultsCount > 0 ? (
              <>
                <div className={viewMode === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8"
                  : "space-y-4 mb-8"
                }>
                  {paginatedAuctions.map((auction) => (
                    <AuctionCard 
                      key={auction.id} 
                      auction={auction}
                      variant={auction.isEnding ? 'ending-soon' : 'default'}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                )}
              </>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <h3 className="text-lg font-semibold mb-2">No auctions found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or check back later for new listings
                  </p>
                  <Button onClick={resetFilters} variant="outline">
                    Clear filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;