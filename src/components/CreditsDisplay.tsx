import { useCredits } from '../state/credits';
import { Badge } from '@/components/ui/badge';

export const CreditsDisplay = () => {
  const { credits } = useCredits();

  return (
    <div className="flex items-center space-x-2">
      <span>Credits:</span>
      <Badge data-credits={credits}>{credits}</Badge>
    </div>
  );
};
