import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Eye, AlertCircle } from "lucide-react";
import { Product } from "@/data/mockStoreData";
import { ProductQuickBuy } from "./ProductQuickBuy";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard = ({ product, className }: ProductCardProps) => {
  const [showQuickBuy, setShowQuickBuy] = useState(false);
  
  const creditValue = (product.creditsAllowedMax * 0.6).toFixed(2);

  return (
    <>
      <Card className="group overflow-hidden bg-white/5 border-white/10 hover:border-[#00FF80]/30 transition-all duration-300 card-hover-glow">
        <CardContent className="p-0">
          {/* Image */}
          <Link to={`/product/${product.id}`}>
            <div className="aspect-square relative overflow-hidden bg-white/5">
              <img
                src={product.images[0]}
                alt={product.title}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Badges */}
              <div className="absolute top-2 left-2 flex flex-wrap gap-1.5">
                {product.isExclusive && (
                  <Badge className="bg-[#00FF80] text-black font-semibold">
                    Exclusive
                  </Badge>
                )}
                {product.isDailyDeal && (
                  <Badge className="bg-[#E7B10A] text-black font-semibold">
                    Daily Deal
                  </Badge>
                )}
                {product.isLowStock && (
                  <Badge variant="destructive" className="flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Low Stock
                  </Badge>
                )}
              </div>
            </div>
          </Link>

          {/* Content */}
          <div className="p-4 space-y-3">
            <div>
              <p className="text-xs text-white/50 uppercase tracking-wider mb-1">
                {product.brand}
              </p>
              <Link to={`/product/${product.id}`}>
                <h3 className="font-semibold text-white group-hover:text-[#00FF80] transition-colors line-clamp-2">
                  {product.title}
                </h3>
              </Link>
            </div>

            {/* Pricing */}
            <div className="space-y-1">
              <p className="text-2xl font-bold text-white">
                ${product.priceUsd.toFixed(2)}
              </p>
              {product.creditsAllowedMax > 0 && (
                <p className="text-xs text-[#00FF80]/80">
                  Up to {product.creditsAllowedMax} credits (≈${creditValue})
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              <Button
                onClick={() => setShowQuickBuy(true)}
                className="flex-1 bg-[#00C46A] hover:bg-[#00D474] text-white font-semibold"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Quick Buy
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white/20 hover:bg-white/5"
              >
                <Link to={`/product/${product.id}`}>
                  <Eye className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <ProductQuickBuy
        isOpen={showQuickBuy}
        onClose={() => setShowQuickBuy(false)}
        product={product}
      />
    </>
  );
};
