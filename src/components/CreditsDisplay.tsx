import { useCredits } from '../state/credits';
import { Badge } from '@/components/ui/badge';

export const CreditsDisplay = () => {
  const { balance } = useCredits();

  return (
    <div className="flex items-center space-x-2">
      <span>Credits:</span>
      <Badge>{balance}</Badge>
    </div>
  );
};
