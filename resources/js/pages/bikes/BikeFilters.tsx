import { router } from '@inertiajs/react';
import type { SubmitEvent } from 'react';
import { useState } from 'react';

import { BIKE_MAX_YEAR, BIKE_MIN_YEAR } from '@/lib/bike';
import { index as bikesIndex } from '@/routes/bikes';

interface FilterOption {
    id: number;
    name: string;
}

interface ConditionOption {
    value: string;
    label: string;
}

interface PriceRange {
    label: string;
    value: string;
}

export interface BikeFiltersState {
    bike_brand_id?: string;
    bike_category_id?: string;
    price?: string;
    condition?: string[];
    year_from?: string;
    year_to?: string;
    location?: string;
    sort?: string;
}

export const BIKE_SORT_OPTIONS = ['newest', 'price_asc', 'price_desc'] as const;

export type BikeSortOption = (typeof BIKE_SORT_OPTIONS)[number];

export function normalizeBikeSortValue(sort: unknown): BikeSortOption {
    return typeof sort === 'string' &&
        (BIKE_SORT_OPTIONS as readonly string[]).includes(sort)
        ? (sort as BikeSortOption)
        : 'newest';
}

export function normalizeFilterSelectValue(value: unknown): string {
    if (value === null || value === undefined) {
        return '';
    }

    if (Array.isArray(value) || typeof value === 'object') {
        return '';
    }

    return String(value);
}

interface BikeFiltersProps {
    filters: BikeFiltersState;
    filterOptions: {
        brands: FilterOption[];
        categories: FilterOption[];
        conditions: ConditionOption[];
        priceRanges: PriceRange[];
    };
}

export default function BikeFilters({
    filters,
    filterOptions,
}: Readonly<BikeFiltersProps>) {
    const [localFilters, setLocalFilters] = useState<BikeFiltersState>({
        bike_brand_id: normalizeFilterSelectValue(filters.bike_brand_id),
        bike_category_id: normalizeFilterSelectValue(filters.bike_category_id),
        price: filters.price ?? '',
        condition: filters.condition ?? [],
        year_from: filters.year_from ?? '',
        year_to: filters.year_to ?? '',
        location: filters.location ?? '',
    });

    const applyFilters = (event?: SubmitEvent) => {
        event?.preventDefault();

        const params: Record<string, string | string[]> = {};

        if (localFilters.bike_brand_id) {
            params.bike_brand_id = localFilters.bike_brand_id;
        }

        if (localFilters.bike_category_id) {
            params.bike_category_id = localFilters.bike_category_id;
        }

        if (localFilters.price) {
            params.price = localFilters.price;
        }

        if (localFilters.condition && localFilters.condition.length > 0) {
            params.condition = localFilters.condition;
        }

        if (localFilters.year_from) {
            params.year_from = localFilters.year_from;
        }

        if (localFilters.year_to) {
            params.year_to = localFilters.year_to;
        }

        if (localFilters.location) {
            params.location = localFilters.location;
        }

        if (filters.sort) {
            params.sort = filters.sort;
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

    const clearFilters = () => {
        setLocalFilters({
            bike_brand_id: '',
            bike_category_id: '',
            price: '',
            condition: [],
            year_from: '',
            year_to: '',
            location: '',
        });

        router.get(
            bikesIndex.url({
                query: filters.sort ? { sort: filters.sort } : {},
            }),
            {},
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const toggleCondition = (value: string) => {
        setLocalFilters((current) => {
            const conditions = current.condition ?? [];
            const next = conditions.includes(value)
                ? conditions.filter((item) => item !== value)
                : [...conditions, value];

            return { ...current, condition: next };
        });
    };

    return (
        <aside className="w-full rounded-sm border border-border bg-surface p-6">
            <h2 className="mb-5 text-sm font-semibold tracking-wide text-text uppercase">
                Filters
            </h2>

            <form onSubmit={applyFilters} className="flex flex-col gap-6">
                <div>
                    <h3 className="mb-3 text-sm font-medium text-text">
                        Brand
                    </h3>
                    <select
                        aria-label="Filter by brand"
                        value={normalizeFilterSelectValue(
                            localFilters.bike_brand_id,
                        )}
                        onChange={(event) =>
                            setLocalFilters((current) => ({
                                ...current,
                                bike_brand_id: event.target.value,
                            }))
                        }
                        className="h-9 w-full rounded-sm border border-border bg-bg px-3 text-sm text-text focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                    >
                        <option value="">All brands</option>
                        {filterOptions.brands.map((brand) => (
                            <option key={brand.id} value={String(brand.id)}>
                                {brand.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <h3 className="mb-3 text-sm font-medium text-text">
                        Category
                    </h3>
                    <select
                        aria-label="Filter by category"
                        value={normalizeFilterSelectValue(
                            localFilters.bike_category_id,
                        )}
                        onChange={(event) =>
                            setLocalFilters((current) => ({
                                ...current,
                                bike_category_id: event.target.value,
                            }))
                        }
                        className="h-9 w-full rounded-sm border border-border bg-bg px-3 text-sm text-text focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                    >
                        <option value="">All categories</option>
                        {filterOptions.categories.map((category) => (
                            <option
                                key={category.id}
                                value={String(category.id)}
                            >
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <h3 className="mb-3 text-sm font-medium text-text">
                        Price
                    </h3>
                    <div className="flex flex-col gap-2">
                        {filterOptions.priceRanges.map((range) => (
                            <label
                                key={range.value}
                                className="flex cursor-pointer items-center gap-2"
                            >
                                <input
                                    type="radio"
                                    name="price"
                                    value={range.value}
                                    checked={localFilters.price === range.value}
                                    onChange={(event) =>
                                        setLocalFilters((current) => ({
                                            ...current,
                                            price: event.target.value,
                                        }))
                                    }
                                    className="h-4 w-4 accent-primary"
                                />
                                <span className="text-sm text-text-muted">
                                    {range.label}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="mb-3 text-sm font-medium text-text">
                        Condition
                    </h3>
                    <div className="flex flex-col gap-2">
                        {filterOptions.conditions.map((cond) => (
                            <label
                                key={cond.value}
                                className="flex cursor-pointer items-center gap-2"
                            >
                                <input
                                    type="checkbox"
                                    name="condition"
                                    value={cond.value}
                                    checked={localFilters.condition?.includes(
                                        cond.value,
                                    )}
                                    onChange={() => toggleCondition(cond.value)}
                                    className="h-4 w-4 accent-primary"
                                />
                                <span className="text-sm text-text-muted">
                                    {cond.label}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="mb-3 text-sm font-medium text-text">
                        Location
                    </h3>
                    <input
                        type="text"
                        name="location"
                        value={localFilters.location}
                        onChange={(event) =>
                            setLocalFilters((current) => ({
                                ...current,
                                location: event.target.value,
                            }))
                        }
                        placeholder="City or district"
                        className="h-9 w-full rounded-sm border border-border bg-bg px-3 text-sm text-text placeholder:text-text-subtle focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                    />
                </div>

                <div>
                    <h3 className="mb-3 text-sm font-medium text-text">Year</h3>
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            name="year_from"
                            min={String(BIKE_MIN_YEAR)}
                            max={String(BIKE_MAX_YEAR)}
                            placeholder="From"
                            value={localFilters.year_from}
                            onChange={(event) =>
                                setLocalFilters((current) => ({
                                    ...current,
                                    year_from: event.target.value,
                                }))
                            }
                            className="h-9 w-full rounded-sm border border-border bg-bg px-3 text-sm text-text placeholder:text-text-subtle focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                        />
                        <span className="text-text-muted">–</span>
                        <input
                            type="number"
                            name="year_to"
                            min={String(BIKE_MIN_YEAR)}
                            max={String(BIKE_MAX_YEAR)}
                            placeholder="To"
                            value={localFilters.year_to}
                            onChange={(event) =>
                                setLocalFilters((current) => ({
                                    ...current,
                                    year_to: event.target.value,
                                }))
                            }
                            className="h-9 w-full rounded-sm border border-border bg-bg px-3 text-sm text-text placeholder:text-text-subtle focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="h-9 w-full rounded-sm bg-primary text-sm font-medium text-white transition-colors hover:bg-primary-hover"
                >
                    Apply filters
                </button>

                <button
                    type="button"
                    onClick={clearFilters}
                    className="h-9 w-full rounded-sm border border-border text-sm font-medium text-text transition-colors hover:border-border-strong hover:bg-bg-subtle"
                >
                    Clear filters
                </button>
            </form>
        </aside>
    );
}
