import { Search } from 'lucide-react';
import type { ListingCardData } from '~/components/home/ListingCard';
import ListingCard from '~/components/home/ListingCard';

export default function BrowseListings({
    listings,
    total,
}: {
    listings: ListingCardData[];
    total: number;
}) {
    return (
        <div className="flex flex-1 flex-col">
            <div className="mb-4 flex items-center justify-between gap-4">
                <p className="text-sm text-text-muted">
                    <span className="font-medium text-text">{total}</span> bikes
                    found
                </p>

                <select className="h-9 rounded-sm border border-border bg-surface px-3 text-sm text-text focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none">
                    <option value="newest">Newest first</option>
                    <option value="price_asc">Price: low to high</option>
                    <option value="price_desc">Price: high to low</option>
                </select>
            </div>

            {listings.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-sm border border-border bg-surface py-20 text-center">
                    <Search
                        width={48}
                        height={48}
                        className="mb-4 text-text-subtle"
                        strokeWidth={1.5}
                    />
                    <h3 className="mb-1 text-base font-semibold text-text">
                        No bikes found
                    </h3>
                    <p className="text-sm text-text-muted">
                        Try adjusting your filters to see more results.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
                    {listings.map((listing) => (
                        <ListingCard key={listing.id} listing={listing} />
                    ))}
                </div>
            )}
        </div>
    );
}
