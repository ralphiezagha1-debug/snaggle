import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export const AuctionCardSkeleton = ({ className }: SkeletonProps) => (
  <Card className={cn("overflow-hidden", className)}>
    <Skeleton className="w-full h-48" />
    <CardContent className="p-4 space-y-3">
      <div className="space-y-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-6 w-20" />
        </div>
        <div className="space-y-1">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-5 w-16" />
        </div>
      </div>
      <div className="flex justify-between">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-12" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 w-20" />
      </div>
    </CardContent>
  </Card>
);

export const AuctionDetailSkeleton = ({ className }: SkeletonProps) => (
  <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-8", className)}>
    <div className="space-y-4">
      <Skeleton className="w-full h-80" />
      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="aspect-square" />
        ))}
      </div>
    </div>
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
      <Skeleton className="h-40 w-full" />
    </div>
  </div>
);

export const TableSkeleton = ({ rows = 5, cols = 4, className }: SkeletonProps & { rows?: number; cols?: number }) => (
  <div className={cn("space-y-3", className)}>
    <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {Array.from({ length: cols }).map((_, i) => (
        <Skeleton key={`header-${i}`} className="h-6" />
      ))}
    </div>
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div key={rowIndex} className="grid gap-3" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {Array.from({ length: cols }).map((_, colIndex) => (
          <Skeleton key={`${rowIndex}-${colIndex}`} className="h-8" />
        ))}
      </div>
    ))}
  </div>
);

export const ListSkeleton = ({ items = 5, className }: SkeletonProps & { items?: number }) => (
  <div className={cn("space-y-4", className)}>
    {Array.from({ length: items }).map((_, i) => (
      <Card key={i}>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
            <Skeleton className="h-8 w-20" />
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

export const ProfileSkeleton = ({ className }: SkeletonProps) => (
  <div className={cn("space-y-6", className)}>
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-20 w-20 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </CardHeader>
    </Card>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i}>
          <CardContent className="p-4 text-center">
            <Skeleton className="h-8 w-16 mx-auto mb-2" />
            <Skeleton className="h-4 w-20 mx-auto" />
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);