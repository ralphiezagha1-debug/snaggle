import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Product, USER_CREDITS } from "@/data/mockStoreData";
import { CreditsSlider } from "./CreditsSlider";
import { toast } from "@/hooks/use-toast";

interface ProductQuickBuyProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export const ProductQuickBuy = ({ isOpen, onClose, product }: ProductQuickBuyProps) => {
  const [quantity, setQuantity] = useState(1);
  const [creditsUsed, setCreditsUsed] = useState(0);

  const subtotal = product.priceUsd * quantity;
  const creditDiscount = creditsUsed * 0.6;
  const total = Math.max(0, subtotal - creditDiscount);

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, Math.min(10, quantity + delta)));
  };

  const handleCheckout = () => {
    toast({
      title: "Checkout (Demo)",
      description: `Added ${quantity}x ${product.title} to cart. Total: $${total.toFixed(2)}`,
    });
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto bg-[#0D0D0D] border-white/10">
        <SheetHeader>
          <SheetTitle className="text-white">Quick Buy</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* Product Info */}
          <div className="flex gap-4">
            <div className="w-24 h-24 rounded-lg overflow-hidden bg-white/5">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-xs text-white/50 uppercase tracking-wider">
                {product.brand}
              </p>
              <h3 className="font-semibold text-white mt-1">{product.title}</h3>
              <p className="text-xl font-bold text-white mt-2">
                ${product.priceUsd.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Quantity */}
          <div className="space-y-2">
            <Label className="text-white">Quantity</Label>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity === 1}
                className="border-white/20 hover:bg-white/10"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-2xl font-bold text-white w-12 text-center">
                {quantity}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity === 10}
                className="border-white/20 hover:bg-white/10"
              >
                <Plus className="h-4 w-4" />
              </Button>
              <span className="text-sm text-white/50 ml-2">Max 10 per order</span>
            </div>
          </div>

          {/* Credits Slider */}
          <CreditsSlider
            priceUsd={subtotal}
            userCredits={USER_CREDITS}
            maxCreditsAllowed={product.creditsAllowedMax * quantity}
            onCreditsChange={setCreditsUsed}
          />

          {/* Pricing Summary */}
          <div className="space-y-2 p-4 rounded-2xl bg-white/5 border border-white/10">
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
            <div className="flex justify-between text-sm text-white/50">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="h-px bg-white/10 my-2" />
            <div className="flex justify-between text-xl font-bold text-white">
              <span>Total</span>
              <span className="text-[#00FF80]">${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-white/20 hover:bg-white/5"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCheckout}
              className="flex-1 bg-[#00C46A] hover:bg-[#00D474] text-white font-semibold"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Buy Now
            </Button>
          </div>

          <p className="text-xs text-white/50 text-center italic">
            Demo mode • Test checkout placeholder
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
};
