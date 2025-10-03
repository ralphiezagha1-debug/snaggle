import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import StoreHeader from "@/components/store/StoreHeader";
import StoreTabs from "@/components/store/StoreTabs";
import { mockSeller, mockAuctions, mockProducts, flags } from "@/mocks/sellerStore";


export default function Store() {
  const { username } = useParams<{ username: string }>();
  const [seller, setSeller] = useState<any>(null);
  const [auctions, setAuctions] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock fetch seller data
    const fetchStoreData = async () => {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (username === mockSeller.username) {
        setSeller(mockSeller);
        setAuctions(mockAuctions);
        setProducts(mockProducts);
      } else {
        // Mock empty store for other usernames
        setSeller({
          username: username || "",
          storeName: `${username}'s Store`,
          bannerUrl: null,
          avatarUrl: null,
          rating: 0,
          followers: 0,
          auctionsCompleted: 0,
        });
        setAuctions([]);
        setProducts([]);
      }
      
      setLoading(false);
    };

    if (flags.sellerStoresUI && username) {
      fetchStoreData();
    }
  }, [username]);

  if (!flags.sellerStoresUI) {
    return (
      <div className="min-h-screen bg-snag-gradient flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Seller Stores</h1>
          <p className="text-white/70">This feature is currently disabled.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-snag-gradient">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-48 bg-white/10 rounded-xl"></div>
            <div className="h-8 bg-white/10 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-white/10 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!seller) {
    return (
      <div className="min-h-screen bg-snag-gradient flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Store Not Found</h1>
          <p className="text-white/70">The store "{username}" could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-snag-gradient">
      <div className="container mx-auto px-4 py-8">
        <StoreHeader
          bannerUrl={seller.bannerUrl}
          avatarUrl={seller.avatarUrl}
          storeName={seller.storeName}
          rating={seller.rating}
          followers={seller.followers}
          auctionsCompleted={seller.auctionsCompleted}
        />
        
        <StoreTabs auctions={auctions} products={products} />
      </div>
    </div>
  );
}