import { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';

interface QuickBidButtonProps {
  auctionId: string;
  creditCost?: number;
  onSuccess?: () => void;
  onOptimisticUpdate?: () => void;
}

export default function QuickBidButton({ 
  auctionId, 
  creditCost = 1, 
  onSuccess,
  onOptimisticUpdate
}: QuickBidButtonProps) {
  const [busy, setBusy] = useState(false);
  const { toast } = useToast();
  const cooldownRef = useRef(false);
  const repeatIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const INCREMENT = 0.01;

  async function placeBid() {
    if (busy || cooldownRef.current) return;
    
    // Check auth & credits here - mock implementation
    const isLoggedIn = true; // Replace with actual auth check
    const hasCredits = true; // Replace with actual credit check
    
    if (!isLoggedIn) {
      toast({
        title: "Sign in required",
        description: "Please sign in to place bids",
        variant: "destructive"
      });
      return;
    }

    if (!hasCredits) {
      toast({
        title: "Insufficient credits",
        description: "Please purchase credits to continue bidding",
        variant: "destructive"
      });
      return;
    }

    setBusy(true);
    cooldownRef.current = true;
    
    // Optimistic update
    onOptimisticUpdate?.();
    
    try {
      const res = await fetch(`/api/bid/quick`, {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ auctionId })
      });
      
      if (!res.ok) {
        const error = await res.text();
        throw new Error(error);
      }
      
      const result = await res.json();
      onSuccess?.();
      
      toast({
        title: "Bid placed ✓",
        description: `+$${INCREMENT.toFixed(2)} • ${creditCost} credit used`,
      });
    } catch (e: any) {
      toast({
        title: "Bid failed",
        description: e.message || "Failed to place bid",
        variant: "destructive"
      });
      console.error('Quick bid failed:', e);
    } finally {
      setBusy(false);
      // Cooldown period
      setTimeout(() => {
        cooldownRef.current = false;
      }, 400); // 400ms cooldown between bids
    }
  }

  // Handle mouse down for repeat bidding on mobile
  function handleMouseDown() {
    placeBid();
    // Start repeat bidding after 500ms
    setTimeout(() => {
      if (repeatIntervalRef.current) return;
      repeatIntervalRef.current = setInterval(() => {
        placeBid();
      }, 333); // ~3 bids/sec
    }, 500);
  }

  function handleMouseUp() {
    if (repeatIntervalRef.current) {
      clearInterval(repeatIntervalRef.current);
      repeatIntervalRef.current = null;
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (repeatIntervalRef.current) {
        clearInterval(repeatIntervalRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-end gap-1">
      <Button 
        variant="quick-bid" 
        onClick={placeBid}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        disabled={busy} 
        className="px-4 py-2 select-none"
        aria-label={`Quick bid on auction ${auctionId}`}
      >
        {busy ? 'Bidding…' : 'Quick Bid'}
      </Button>
      <span className="text-xs text-white/70">uses {creditCost} credit</span>
    </div>
  );
}