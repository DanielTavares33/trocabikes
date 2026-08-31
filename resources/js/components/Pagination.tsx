import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '~/lib/utils';

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) {
    return null;
  }

  const pages: (number | 'ellipsis')[] = [];

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== 'ellipsis') {
      pages.push('ellipsis');
    }
  }

  return (
    <nav className="mt-8 flex items-center justify-center gap-1">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          'flex h-9 w-9 items-center justify-center rounded-sm text-sm transition-colors',
          currentPage === 1
            ? 'cursor-not-allowed text-text-subtle'
            : 'text-text-muted hover:border-border-strong hover:bg-bg-subtle hover:text-text',
        )}
      >
        <ChevronLeft width={16} height={16} />
      </button>

      {pages.map((page, idx) =>
        page === 'ellipsis' ? (
          <span
            key={`ellipsis-${idx}`}
            className="flex h-9 w-9 items-center justify-center text-sm text-text-subtle"
          >
            &hellip;
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-sm text-sm font-medium transition-colors',
              page === currentPage
                ? 'bg-primary text-white'
                : 'text-text-muted hover:bg-bg-subtle hover:text-text',
            )}
          >
            {page}
          </button>
        ),
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          'flex h-9 w-9 items-center justify-center rounded-sm text-sm transition-colors',
          currentPage === totalPages
            ? 'cursor-not-allowed text-text-subtle'
            : 'text-text-muted hover:border-border-strong hover:bg-bg-subtle hover:text-text',
        )}
      >
        <ChevronRight width={16} height={16} />
      </button>
    </nav>
  );
}
