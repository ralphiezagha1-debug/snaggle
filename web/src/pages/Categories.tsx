import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Smartphone, 
  Palette, 
  Shirt, 
  Home, 
  Trophy, 
  Book, 
  Gem, 
  Clock, 
  GamepadIcon, 
  Music,
  Car,
  Camera
} from "lucide-react";
import { useSEO } from "@/lib/seo";
import { analytics } from "@/lib/analytics";
import { useEffect } from "react";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  auctionCount: number;
  imageUrl: string;
  isPopular?: boolean;
}

const categories: Category[] = [
  {
    id: "1",
    name: "Electronics",
    slug: "electronics", 
    description: "Smartphones, laptops, cameras, and more",
    icon: Smartphone,
    auctionCount: 245,
    imageUrl: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400",
    isPopular: true
  },
  {
    id: "2",
    name: "Art & Collectibles",
    slug: "art-collectibles",
    description: "Paintings, sculptures, rare collectibles",
    icon: Palette,
    auctionCount: 189,
    imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400",
    isPopular: true
  },
  {
    id: "3",
    name: "Fashion & Accessories",
    slug: "fashion-accessories",
    description: "Designer clothing, shoes, bags, accessories",
    icon: Shirt,
    auctionCount: 156,
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400"
  },
  {
    id: "4",
    name: "Home & Garden",
    slug: "home-garden",
    description: "Furniture, decor, tools, plants",
    icon: Home,
    auctionCount: 134,
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400"
  },
  {
    id: "5",
    name: "Sports & Recreation",
    slug: "sports-recreation",
    description: "Equipment, memorabilia, outdoor gear",
    icon: Trophy,
    auctionCount: 98,
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400"
  },
  {
    id: "6",
    name: "Books & Media",
    slug: "books-media",
    description: "Rare books, vinyl records, movies",
    icon: Book,
    auctionCount: 87,
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400"
  },
  {
    id: "7",
    name: "Jewelry & Watches",
    slug: "jewelry-watches",
    description: "Fine jewelry, luxury watches, gems",
    icon: Gem,
    auctionCount: 76,
    imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
    isPopular: true
  },
  {
    id: "8",
    name: "Antiques",
    slug: "antiques",
    description: "Vintage items, historical artifacts",
    icon: Clock,
    auctionCount: 65,
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400"
  },
  {
    id: "9",
    name: "Toys & Games",
    slug: "toys-games",
    description: "Collectible toys, board games, puzzles",
    icon: GamepadIcon,
    auctionCount: 54,
    imageUrl: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400"
  },
  {
    id: "10",
    name: "Musical Instruments",
    slug: "musical-instruments",
    description: "Guitars, pianos, vintage instruments",
    icon: Music,
    auctionCount: 43,
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400"
  },
  {
    id: "11",
    name: "Automotive",
    slug: "automotive",
    description: "Classic cars, motorcycles, parts",
    icon: Car,
    auctionCount: 32,
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400"
  },
  {
    id: "12",
    name: "Photography",
    slug: "photography",
    description: "Vintage cameras, lenses, equipment",
    icon: Camera,
    auctionCount: 28,
    imageUrl: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400"
  }
];

const Categories = () => {
  useSEO({
    title: "Auction Categories - Snaggle",
    description: "Browse auction categories including electronics, art, fashion, jewelry, antiques and more. Find the perfect items to bid on.",
    canonical: `${window.location.origin}/categories`
  });

  useEffect(() => {
    analytics.page('Categories');
  }, []);

  const popularCategories = categories.filter(cat => cat.isPopular);
  const allCategories = categories.sort((a, b) => b.auctionCount - a.auctionCount);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Auction Categories</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover thousands of items across our diverse categories. From electronics to antiques, 
            find exactly what you're looking for.
          </p>
        </div>

        {/* Popular Categories */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Popular Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.id}
                  to={`/categories/${category.slug}`}
                  onClick={() => analytics.track('Category Click', { category: category.name, section: 'popular' })}
                >
                  <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 snaggle-glow-sm">
                    <div className="relative h-32">
                      <img
                        src={category.imageUrl}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-snaggle-gold text-snaggle-gold-foreground">
                          Popular
                        </Badge>
                      </div>
                      <div className="absolute bottom-3 left-3 text-white">
                        <Icon className="h-6 w-6 mb-1" />
                        <h3 className="font-semibold">{category.name}</h3>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground mb-2">
                        {category.description}
                      </p>
                      <p className="text-sm font-medium text-primary">
                        {category.auctionCount} active auctions
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* All Categories */}
        <section>
          <h2 className="text-2xl font-bold mb-6">All Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.id}
                  to={`/categories/${category.slug}`}
                  onClick={() => analytics.track('Category Click', { category: category.name, section: 'all' })}
                >
                  <Card className="group hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-full">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex items-center justify-between mb-3">
                        <Icon className="h-8 w-8 text-primary" />
                        {category.isPopular && (
                          <Badge variant="outline" className="text-xs">
                            Popular
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 flex-1">
                        {category.description}
                      </p>
                      <p className="text-sm font-medium text-primary">
                        {category.auctionCount} auctions
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Categories;