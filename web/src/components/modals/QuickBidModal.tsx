import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { nextPenny } from "@/lib/utils";

interface QuickBidModalProps {
  isOpen: boolean;
  onClose: () => void;
  lotId: string;
  lotTitle: string;
  currentBid: number;
  minIncrement?: number;
}

export default function QuickBidModal({
  isOpen,
  onClose,
  lotId,
  lotTitle,
  currentBid,
  minIncrement = 0.01
}: QuickBidModalProps) {
  const initialAmount = nextPenny(currentBid);
  const [bidAmount, setBidAmount] = useState(initialAmount);
  const { toast } = useToast();

  const addIncrement = (amount: number) => {
    setBidAmount(prevAmount => prevAmount + amount);
  };

  const handleSubmit = () => {
    toast({
      title: "Demo mode",
      description: "Backend coming soon — bid functionality disabled",
      variant: "destructive",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-slate-900/95 to-slate-800/95 border border-white/10">
        <DialogHeader>
          <DialogTitle className="text-white">Quick Bid</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Lot Info */}
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <h3 className="font-semibold text-white mb-1 line-clamp-1">{lotTitle}</h3>
            <p className="text-sm text-white/70">
              Current bid: <span className="text-[var(--snag-neon)] font-semibold">${currentBid.toFixed(2)}</span>
            </p>
          </div>

          {/* Next Bid Display */}
          <div className="space-y-2">
            <div className="text-sm text-white/80">Next bid:</div>
            <div className="text-3xl font-bold text-[var(--snag-neon)]">${bidAmount.toFixed(2)}</div>
            <p className="text-xs text-white/60">
              Snaggle auctions move by exactly $0.01 increments. Manual typing is disabled.
            </p>
          </div>

          {/* Quick Increment Buttons */}
          <div className="space-y-2">
            <div className="text-sm text-white/80">Quick Add</div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addIncrement(0.01)}
                className="border-white/20 text-white/80 hover:bg-white/10"
              >
                <Plus className="h-3 w-3 mr-1" />
                $0.01
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addIncrement(0.10)}
                className="border-white/20 text-white/80 hover:bg-white/10"
              >
                <Plus className="h-3 w-3 mr-1" />
                $0.10
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addIncrement(1.00)}
                className="border-white/20 text-white/80 hover:bg-white/10"
              >
                <Plus className="h-3 w-3 mr-1" />
                $1.00
              </Button>
            </div>
          </div>

          {/* Info */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/60">Minimum increment:</span>
            <Badge variant="outline" className="border-white/30 text-white/80">
              ${minIncrement.toFixed(2)}
            </Badge>
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
              Place Bid ${bidAmount.toFixed(2)}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}