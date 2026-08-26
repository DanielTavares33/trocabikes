import { Head, Link } from '@inertiajs/react';
import { index as bikesIndex } from '@/routes/bikes';
import type { BikeCardData } from '~/components/home/BikeCard';
import BikeCard from '~/components/home/BikeCard';
import CategoriesGrid from '~/components/home/CategoriesGrid';
import Footer from '~/components/home/Footer';
import Hero from '~/components/home/Hero';
import Navbar from '~/components/home/Navbar';
import SearchSection from '~/components/home/SearchSection';
import Layout from '~/components/layout/Layout';

interface WelcomeProps {
    recentBikes: BikeCardData[];
}

export default function Welcome({ recentBikes }: Readonly<WelcomeProps>) {
    return (
        <Layout>
            <Head title="Trocabikes — Find your next bike" />

            <div className="flex min-h-screen flex-col bg-bg text-text">
                <Navbar />

                <main className="flex-1">
                    <Hero />
                    <SearchSection />
                    <CategoriesGrid />

                    <section className="bg-bg-subtle px-6 py-20 lg:px-12">
                        <div className="mx-auto max-w-6xl">
                            <div className="mb-12 flex items-end justify-between">
                                <div>
                                    <h2 className="mb-2 text-3xl font-semibold text-text">
                                        Recent bikes
                                    </h2>
                                    <p className="text-text-muted">
                                        Fresh bikes just listed in your area
                                    </p>
                                </div>
                                <Link
                                    href={bikesIndex.url()}
                                    className="hidden text-sm font-medium text-primary transition-colors hover:text-primary-hover sm:block"
                                >
                                    View all bikes &rarr;
                                </Link>
                            </div>

                            {recentBikes.length === 0 ? (
                                <div className="rounded-sm border border-border bg-surface py-16 text-center">
                                    <p className="text-sm text-text-muted">
                                        No bikes listed yet. Be the first to
                                        sell!
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {recentBikes.map((bike) => (
                                        <BikeCard key={bike.id} bike={bike} />
                                    ))}
                                </div>
                            )}

                            <div className="mt-10 text-center sm:hidden">
                                <Link
                                    href={bikesIndex.url()}
                                    className="inline-block rounded-sm border border-border px-6 py-2 text-sm font-medium text-text transition-colors hover:border-border-strong hover:bg-bg"
                                >
                                    View all bikes &rarr;
                                </Link>
                            </div>
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </Layout>
    );
}
