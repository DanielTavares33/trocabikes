import { Head, Link, router } from '@inertiajs/react';

import { index as bikesIndex } from '@/routes/bikes';
import Footer from '~/components/home/Footer';
import type { BikeCardData } from '~/components/home/BikeCard';
import Navbar from '~/components/home/Navbar';
import Layout from '~/components/layout/Layout';
import Pagination from '~/components/Pagination';
import BikeFilters from '~/pages/bikes/BikeFilters';
import type { BikeFiltersState } from '~/pages/bikes/BikeFilters';
import BikeGrid from '~/pages/bikes/BikeGrid';

interface PaginatedBikes {
    data: BikeCardData[];
    current_page: number;
    last_page: number;
    total: number;
}

interface BikesIndexProps {
    bikes: PaginatedBikes;
    filters: BikeFiltersState;
    filterOptions: {
        brands: { id: number; name: string }[];
        categories: { id: number; name: string }[];
        conditions: { value: string; label: string }[];
        priceRanges: { label: string; value: string }[];
    };
}

export default function BikesIndex({
    bikes,
    filters,
    filterOptions,
}: Readonly<BikesIndexProps>) {
    const handlePageChange = (page: number) => {
        const params: Record<string, string | string[] | number> = { page };

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

    return (
        <Layout>
            <Head title="Browse bikes — Trocabikes" />

            <div className="flex min-h-screen flex-col bg-bg text-text">
                <Navbar />

                <main className="flex-1 px-6 py-10 lg:px-12">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-8">
                            <nav className="mb-2 text-sm text-text-muted">
                                <Link
                                    href="/"
                                    className="transition-colors hover:text-text"
                                >
                                    Home
                                </Link>
                                <span className="mx-2">/</span>
                                <span className="text-text">Browse bikes</span>
                            </nav>
                            <h1 className="text-3xl font-semibold text-text">
                                Browse bikes
                            </h1>
                        </div>

                        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
                            <div className="lg:w-56 lg:shrink-0">
                                <BikeFilters
                                    key={JSON.stringify(filters)}
                                    filters={filters}
                                    filterOptions={filterOptions}
                                />
                            </div>
                            <div className="flex flex-1 flex-col">
                                <BikeGrid
                                    bikes={bikes.data}
                                    total={bikes.total}
                                    filters={filters}
                                />
                                <Pagination
                                    currentPage={bikes.current_page}
                                    totalPages={bikes.last_page}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </Layout>
    );
}
