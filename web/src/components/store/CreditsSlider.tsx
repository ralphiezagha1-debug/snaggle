import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Coins } from "lucide-react";
import { computeCreditsApplied } from "@/data/mockStoreData";

interface CreditsSliderProps {
  priceUsd: number;
  userCredits: number;
  maxCreditsAllowed: number;
  onCreditsChange: (credits: number) => void;
}

export const CreditsSlider = ({
  priceUsd,
  userCredits,
  maxCreditsAllowed,
  onCreditsChange
}: CreditsSliderProps) => {
  const [creditsChosen, setCreditsChosen] = useState(0);
  
  const maxUsable = Math.min(userCredits, maxCreditsAllowed);
  const { discount, total } = computeCreditsApplied({
    priceUsd,
    userCredits,
    maxCreditsAllowed,
    creditsChosen
  });

  const handleChange = (value: number[]) => {
    const credits = value[0];
    setCreditsChosen(credits);
    onCreditsChange(credits);
  };

  if (maxUsable === 0) {
    return null;
  }

  return (
    <div className="space-y-4 p-4 rounded-2xl bg-[#00FF80]/5 border border-[#00FF80]/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Coins className="h-5 w-5 text-[#00FF80]" />
          <span className="font-semibold text-white">Apply Loser Credits</span>
        </div>
        <span className="text-sm text-white/60">Max: {maxUsable}</span>
      </div>
      
      <Slider
        value={[creditsChosen]}
        onValueChange={handleChange}
        max={maxUsable}
        step={1}
        className="w-full"
      />
      
      <div className="space-y-1.5">
        <div className="flex justify-between text-sm">
          <span className="text-white/70">Credits Used:</span>
          <span className="font-semibold text-[#00FF80]">{creditsChosen}</span>
        </div>
        {creditsChosen > 0 && (
          <>
            <div className="flex justify-between text-sm">
              <span className="text-white/70">Discount:</span>
              <span className="font-semibold text-[#00FF80]">-${discount.toFixed(2)}</span>
            </div>
            <div className="h-px bg-white/10 my-2" />
            <div className="flex justify-between font-semibold">
              <span className="text-white">New Total:</span>
              <span className="text-[#00FF80]">${total.toFixed(2)}</span>
            </div>
          </>
        )}
      </div>
      
      <p className="text-xs text-white/50 italic">
        Credits apply at checkout (store purchases only)
      </p>
    </div>
  );
};
