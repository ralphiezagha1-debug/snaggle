import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  variant?: 'numbers' | 'load-more';
  hasNextPage?: boolean;
  isLoading?: boolean;
  className?: string;
}

export const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  variant = 'numbers',
  hasNextPage = false,
  isLoading = false,
  className 
}: PaginationProps) => {
  if (variant === 'load-more') {
    return (
      <div className={cn("flex justify-center", className)}>
        <Button
          variant="outline"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNextPage || isLoading}
          className="px-8"
        >
          {isLoading ? "Loading..." : "Load More"}
        </Button>
      </div>
    );
  }

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); 
         i <= Math.min(totalPages - 1, currentPage + delta); 
         i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className={cn("flex items-center justify-center space-x-1", className)} aria-label="Pagination">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="flex items-center gap-1"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>

      <div className="flex items-center space-x-1">
        {pageNumbers.map((pageNumber, index) => {
          if (pageNumber === '...') {
            return (
              <span key={`ellipsis-${index}`} className="px-3 py-2">
                <MoreHorizontal className="h-4 w-4" />
              </span>
            );
          }

          const page = pageNumber as number;
          const isActive = page === currentPage;

          return (
            <Button
              key={page}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(page)}
              className={cn(
                "min-w-[40px]",
                isActive && "bg-primary text-primary-foreground"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              {page}
            </Button>
          );
        })}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="flex items-center gap-1"
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  );
};