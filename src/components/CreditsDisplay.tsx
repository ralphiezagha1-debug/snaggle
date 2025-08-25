import { useCredits } from '../state/credits';
import { Skeleton } from '@/components/ui/skeleton';

export const CreditsDisplay = () => {
  const { credits, loading } = useCredits();

  if (loading) {
    return <Skeleton className="h-8 w-24" />;
  }

  return (
    <div className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 shadow-sm">
      <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" />
      <span className="text-sm font-medium">Credits</span>
      <span className="text-sm tabular-nums" data-credits={credits}>{credits}</span>
    </div>
  );
};
