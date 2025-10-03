import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, ShoppingCart, Truck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QuickBuyModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
  productTitle: string;
  price: number;
  imageUrl: string;
}

export default function QuickBuyModal({
  isOpen,
  onClose,
  productId,
  productTitle,
  price,
  imageUrl
}: QuickBuyModalProps) {
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleSubmit = () => {
    toast({
      title: "Demo mode",
      description: "Backend coming soon — purchase functionality disabled",
      variant: "destructive",
    });
  };

  const totalPrice = price * quantity;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-slate-900/95 to-slate-800/95 border border-white/10">
        <DialogHeader>
          <DialogTitle className="text-white">Quick Buy</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Product Info */}
          <div className="flex gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
            <img 
              src={imageUrl} 
              alt={productTitle}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white mb-1 line-clamp-2">{productTitle}</h3>
              <p className="text-[var(--snag-neon)] font-semibold">${price.toFixed(2)} each</p>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-2">
            <Label className="text-white">Quantity</Label>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className="border-white/20 text-white/80 hover:bg-white/10 disabled:opacity-30"
              >
                <Minus className="h-4 w-4" />
              </Button>
              
              <div className="flex-1 text-center">
                <span className="text-lg font-semibold text-white">{quantity}</span>
              </div>
              
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= 10}
                className="border-white/20 text-white/80 hover:bg-white/10 disabled:opacity-30"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-white/60 text-center">Maximum 10 items per order</p>
          </div>

          {/* Shipping Info */}
          <div className="p-3 rounded-lg bg-[var(--snag-neon)]/10 border border-[var(--snag-neon)]/20">
            <div className="flex items-center gap-2 text-[var(--snag-neon)]">
              <Truck className="h-4 w-4" />
              <span className="text-sm font-medium">Free shipping included</span>
            </div>
            <p className="text-xs text-white/60 mt-1">Estimated delivery: 3-5 business days</p>
          </div>

          {/* Total */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
            <span className="text-white font-medium">Total</span>
            <div className="text-right">
              <span className="text-2xl font-bold text-[var(--snag-neon)]">
                ${totalPrice.toFixed(2)}
              </span>
              {quantity > 1 && (
                <p className="text-xs text-white/60">{quantity} × ${price.toFixed(2)}</p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button 
              variant="ghost-green" 
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              variant="primary"
              onClick={handleSubmit}
              className="flex-1"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Buy Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}