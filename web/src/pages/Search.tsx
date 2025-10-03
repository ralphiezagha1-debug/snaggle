import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuctionCard, AuctionItem } from "@/components/AuctionCard";
import { FilterPanel, FilterState } from "@/components/FilterPanel";
import { Pagination } from "@/components/Pagination";
import { AuctionCardSkeleton } from "@/components/Skeletons";
import { Search as SearchIcon, Grid, List } from "lucide-react";
import { useSEO } from "@/lib/seo";
import { analytics } from "@/lib/analytics";

const mockAuctions: AuctionItem[] = [
  {
    id: "1",
    title: "Vintage Rolex Submariner",
    description: "1970s vintage Rolex Submariner in excellent condition",
    currentBid: 8500,
    buyNowPrice: 12000,
    imageUrl: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400",
    endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    bidCount: 24,
    category: "Jewelry & Watches",
    seller: "WatchCollector",
    isFeatured: true
  },
  {
    id: "2", 
    title: "Abstract Modern Art Painting",
    description: "Original contemporary art piece by emerging artist",
    currentBid: 450,
    imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400",
    endTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
    bidCount: 8,
    category: "Art & Collectibles",
    seller: "ArtGallery",
    isEnding: true
  },
  // Add more mock data...
];

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [auctions, setAuctions] = useState<AuctionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 10000],
    sortBy: "ending-soon",
    searchQuery: searchParams.get('q') || ""
  });

  useSEO({
    title: `Search Results${filters.searchQuery ? ` for "${filters.searchQuery}"` : ''} - Snaggle`,
    description: "Search through thousands of live auctions to find the perfect items. Filter by category, price, and more.",
    canonical: `${window.location.origin}/search${filters.searchQuery ? `?q=${encodeURIComponent(filters.searchQuery)}` : ''}`
  });

  useEffect(() => {
    analytics.page('Search', { query: filters.searchQuery, filters });
  }, [filters]);

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      let filtered = [...mockAuctions];
      
      // Apply search query
      if (filters.searchQuery) {
        filtered = filtered.filter(auction =>
          auction.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
          auction.description.toLowerCase().includes(filters.searchQuery.toLowerCase())
        );
      }
      
      // Apply category filter
      if (filters.categories.length > 0) {
        filtered = filtered.filter(auction =>
          filters.categories.includes(auction.category)
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
  }, [filters]);

  const handleSearch = (query: string) => {
    setFilters(prev => ({ ...prev, searchQuery: query }));
    setSearchParams(query ? { q: query } : {});
    analytics.track('Search', { query });
  };

  const resetFilters = () => {
    setFilters({
      categories: [],
      priceRange: [0, 10000],
      sortBy: "ending-soon",
      searchQuery: ""
    });
    setSearchParams({});
  };

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
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Search Auctions</h1>
          <div className="flex gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for items..."
                value={filters.searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
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
                  "Searching..."
                ) : (
                  `${resultsCount.toLocaleString()} result${resultsCount !== 1 ? 's' : ''} found`
                )}
                {filters.searchQuery && (
                  <span> for "<strong>{filters.searchQuery}</strong>"</span>
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
                      variant={auction.isFeatured ? 'featured' : auction.isEnding ? 'ending-soon' : 'default'}
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
                  <SearchIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No results found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search terms or filters
                  </p>
                  <Button onClick={resetFilters} variant="outline">
                    Clear all filters
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

export default Search;