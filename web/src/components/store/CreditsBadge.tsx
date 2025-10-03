import { Coins } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { USER_CREDITS } from "@/data/mockStoreData";
export const CreditsBadge = () => {
  return <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="outline" className="flex items-center gap-1.5 cursor-pointer border-[#00FF80]/30 bg-[#00FF80]/5 text-white hover:bg-[#00FF80]/10 transition-colors px-[11px] mx-0 my-0 py-[7px]">
            <Coins className="h-4 w-4 text-[#00FF80]" />
            <span className="font-semibold">{USER_CREDITS.toLocaleString()}</span>
            <span className="text-xs text-white/70">Credits</span>
          </Badge>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-xs bg-black/95 border-white/10">
          <div className="space-y-2">
            <p className="font-semibold text-[#00FF80]">Loser Credits</p>
            <p className="text-sm text-white/80">
              Earned from auctions you didn't win. Usable on store purchases only.
            </p>
            <p className="text-xs text-white/60">1 credit ≈ $0.60 value</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>;
};