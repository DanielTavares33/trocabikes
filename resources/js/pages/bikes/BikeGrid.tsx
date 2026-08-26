import { router } from '@inertiajs/react';
import { Search } from 'lucide-react';

import { index as bikesIndex } from '@/routes/bikes';
import type { BikeCardData } from '~/components/home/BikeCard';
import BikeCard from '~/components/home/BikeCard';
import type { BikeFiltersState } from '~/pages/bikes/BikeFilters';
import { normalizeBikeSortValue } from '~/pages/bikes/BikeFilters';

interface BikeGridProps {
    bikes: BikeCardData[];
    total: number;
    filters: BikeFiltersState;
}

export default function BikeGrid({
    bikes,
    total,
    filters,
}: Readonly<BikeGridProps>) {
    const sortValue = normalizeBikeSortValue(filters.sort);

    const handleSortChange = (sort: string) => {
        const params: Record<string, string | string[]> = { sort };

        if (filters.bike_brand_id) {
            params.bike_brand_id = filters.bike_brand_id;
        }

        if (filters.bike_category_id) {
            params.bike_category_id = filters.bike_category_id;
        }

        if (filters.price) {
            params.price = filters.price;
        }

        if (filters.condition && filters.condition.length > 0) {
            params.condition = filters.condition;
        }

        if (filters.year_from) {
            params.year_from = filters.year_from;
        }

        if (filters.year_to) {
            params.year_to = filters.year_to;
        }

        if (filters.location) {
            params.location = filters.location;
        }

        router.get(
            bikesIndex.url({ query: params }),
            {},
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    return (
        <div className="flex flex-1 flex-col">
            <div className="mb-4 flex items-center justify-between gap-4">
                <p className="text-sm text-text-muted">
                    <span className="font-medium text-text">{total}</span> bikes
                    found
                </p>

                <select
                    value={sortValue}
                    onChange={(event) => handleSortChange(event.target.value)}
                    className="h-9 rounded-sm border border-border bg-surface px-3 text-sm text-text focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                >
                    <option value="newest">Newest first</option>
                    <option value="price_asc">Price: low to high</option>
                    <option value="price_desc">Price: high to low</option>
                </select>
            </div>

            {bikes.length === 0 ? (
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
                    {bikes.map((bike) => (
                        <BikeCard key={bike.id} bike={bike} />
                    ))}
                </div>
            )}
        </div>
    );
}
