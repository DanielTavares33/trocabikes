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

const recentBikes: BikeCardData[] = [
    {
        id: 1,
        title: 'Canyon Spectral CF 7 — Full Suspended MTB',
        slug: 'canyon-spectral-cf-7-full-suspended-mtb',
        brand: 'Canyon',
        category: 'Mountain Bike',
        price: 2850,
        year: 2022,
        condition: 'Excelente',
        kilometers: 450,
        location: 'Lisboa',
        imageUrl:
            'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=600&h=450&fit=crop&q=80',
        imageAlt: 'Canyon Spectral mountain bike',
    },
    {
        id: 2,
        title: 'Specialized Allez Sprint — Road Racing',
        slug: 'specialized-allez-sprint-road-racing',
        brand: 'Specialized',
        category: 'Road Bike',
        price: 1950,
        year: 2021,
        condition: 'Boa',
        kilometers: 1200,
        location: 'Porto',
        imageUrl:
            'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&h=450&fit=crop&q=80',
        imageAlt: 'Specialized Allez Sprint road bike',
    },
    {
        id: 3,
        title: 'Trek FX 3 — City Hybrid Commuter',
        slug: 'trek-fx-3-city-hybrid-commuter',
        brand: 'Trek',
        category: 'City Bike',
        price: 650,
        year: 2023,
        condition: 'Nova',
        kilometers: 0,
        location: 'Braga',
        imageUrl:
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=450&fit=crop&q=80',
        imageAlt: 'Trek FX city bike',
    },
    {
        id: 4,
        title: 'Brose S Mag — Urban E-Bike 2024',
        slug: 'brose-s-mag-urban-e-bike-2024',
        brand: 'Brose',
        category: 'E-Bike',
        price: 3200,
        year: 2024,
        condition: 'Nova',
        kilometers: 0,
        location: 'Coimbra',
        imageUrl:
            'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&h=450&fit=crop&q=80',
        imageAlt: 'Brose e-bike',
    },
    {
        id: 5,
        title: 'Giant Trance X Advanced — Carbon MTB',
        slug: 'giant-trance-x-advanced-carbon-mtb',
        brand: 'Giant',
        category: 'Mountain Bike',
        price: 4100,
        year: 2023,
        condition: 'Excelente',
        kilometers: 200,
        location: 'Lisboa',
        imageUrl:
            'https://images.unsplash.com/photo-1597326556223-28c6a7a2a7e8?w=600&h=450&fit=crop&q=80',
        imageAlt: 'Giant mountain bike',
    },
    {
        id: 6,
        title: 'Pinasca BMX Race — Chromoly Frame',
        slug: 'pinasca-bmx-race-chromoly-frame',
        brand: 'Pinasca',
        category: 'BMX',
        price: 380,
        year: 2020,
        condition: 'Boa',
        kilometers: 0,
        location: 'Porto',
        imageUrl:
            'https://images.unsplash.com/photo-1558981408-600d5c4f2db8?w=600&h=450&fit=crop&q=80',
        imageAlt: 'BMX race bike',
    },
];

export default function Welcome() {
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

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {recentBikes.map((bike) => (
                                    <BikeCard key={bike.id} bike={bike} />
                                ))}
                            </div>

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
