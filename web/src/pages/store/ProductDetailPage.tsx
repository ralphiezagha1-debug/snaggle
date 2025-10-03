import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ShoppingCart, Heart, Share2, ChevronLeft, AlertCircle } from "lucide-react";
import { PRODUCTS, USER_CREDITS } from "@/data/mockStoreData";
import { CreditsSlider } from "@/components/store/CreditsSlider";
import { ProductCard } from "@/components/store/ProductCard";
import { toast } from "@/hooks/use-toast";

export default function ProductDetailPage() {
  const { productId } = useParams();
  const product = PRODUCTS.find((p) => p.id === productId);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [creditsUsed, setCreditsUsed] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen bg-snag-gradient flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Product Not Found</h1>
          <Button asChild variant="outline" className="border-white/20">
            <Link to="/store">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Store
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const subtotal = product.priceUsd * quantity;
  const creditDiscount = creditsUsed * 0.6;
  const total = Math.max(0, subtotal - creditDiscount);

  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.brand === product.brand)
  ).slice(0, 4);

  const handleAddToCart = () => {
    toast({
      title: "Added to Cart (Demo)",
      description: `${quantity}x ${product.title}`,
    });
  };

  const handleBuyNow = () => {
    toast({
      title: "Checkout (Demo)",
      description: `Total: $${total.toFixed(2)}`,
    });
  };

  return (
    <div className="min-h-screen bg-snag-gradient">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6 text-white/70 hover:text-white hover:bg-white/10">
          <Link to="/store">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Store
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-white/5 border border-white/10">
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === idx
                        ? "border-[#00FF80]"
                        : "border-white/10 hover:border-white/30"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {product.isExclusive && (
                <Badge className="bg-[#00FF80] text-black font-semibold">Exclusive</Badge>
              )}
              {product.isDailyDeal && (
                <Badge className="bg-[#E7B10A] text-black font-semibold">Daily Deal</Badge>
              )}
              {product.isLowStock && (
                <Badge variant="destructive" className="flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  Only {product.inventory} left
                </Badge>
              )}
            </div>

            {/* Title & Brand */}
            <div>
              <p className="text-sm text-[#00FF80] uppercase tracking-wider mb-2 font-semibold">
                {product.brand}
              </p>
              <h1 className="text-4xl font-black text-white mb-4">{product.title}</h1>
              <p className="text-white/70">{product.description}</p>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <p className="text-5xl font-black text-white">${product.priceUsd.toFixed(2)}</p>
              {product.creditsAllowedMax > 0 && (
                <p className="text-sm text-[#00FF80]/80">
                  Use up to {product.creditsAllowedMax} credits per item
                </p>
              )}
            </div>

            <Separator className="bg-white/10" />

            {/* Quantity */}
            <div>
              <p className="text-white font-semibold mb-3">Quantity</p>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="border-white/20 hover:bg-white/10"
                >
                  -
                </Button>
                <span className="text-2xl font-bold text-white w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  className="border-white/20 hover:bg-white/10"
                >
                  +
                </Button>
              </div>
            </div>

            {/* Credits Slider */}
            <CreditsSlider
              priceUsd={subtotal}
              userCredits={USER_CREDITS}
              maxCreditsAllowed={product.creditsAllowedMax * quantity}
              onCreditsChange={setCreditsUsed}
            />

            {/* Price Summary */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
              <div className="flex justify-between text-white/70">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {creditsUsed > 0 && (
                <div className="flex justify-between text-[#00FF80]">
                  <span>Credits ({creditsUsed})</span>
                  <span>-${creditDiscount.toFixed(2)}</span>
                </div>
              )}
              <Separator className="bg-white/10" />
              <div className="flex justify-between text-xl font-bold text-white">
                <span>Total</span>
                <span className="text-[#00FF80]">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                onClick={handleBuyNow}
                className="flex-1 bg-[#00C46A] hover:bg-[#00D474] text-white font-semibold h-12 text-lg"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Buy Now
              </Button>
              <Button
                onClick={handleAddToCart}
                variant="outline"
                className="flex-1 border-white/20 hover:bg-white/10 h-12 text-lg"
              >
                Add to Cart
              </Button>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" size="icon" className="border-white/20 hover:bg-white/10">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="border-white/20 hover:bg-white/10">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Specs */}
        <div className="max-w-4xl mb-16">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="specs" className="bg-white/5 border border-white/10 rounded-2xl px-6">
              <AccordionTrigger className="text-white font-semibold text-lg hover:no-underline">
                Specifications
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-2">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-white/5 last:border-0">
                      <span className="text-white/70">{key}</span>
                      <span className="text-white font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-black text-white mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
