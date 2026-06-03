import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import Footer from '~/components/home/Footer';
import type { ListingCardData } from '~/components/home/ListingCard';
import Navbar from '~/components/home/Navbar';
import Layout from '~/components/layout/Layout';
import Pagination from '~/components/Pagination';
import BrowseFilters from '~/pages/browse/BrowseFilters';
import BrowseListings from '~/pages/browse/BrowseListings';

const MOCK_BIKES: Omit<ListingCardData, 'id' | 'slug'>[] = [
    {
        title: 'Canyon Spectral CF 7 — Full Suspended MTB',
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
        title: 'Specialized Allez Sprint — Road Racing',
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
        title: 'Trek FX 3 — City Hybrid Commuter',
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
        title: 'Brose S Mag — Urban E-Bike 2024',
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
        title: 'Giant Trance X Advanced — Carbon MTB',
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
        title: 'Pinasca BMX Race — Chromoly Frame',
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
    {
        title: 'Scott Addict RC — Carbon Road Bike',
        brand: 'Scott',
        category: 'Road Bike',
        price: 2800,
        year: 2022,
        condition: 'Excelente',
        kilometers: 800,
        location: 'Lisboa',
        imageUrl:
            'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&h=450&fit=crop&q=80',
        imageAlt: 'Scott road bike',
    },
    {
        title: 'CUBE Reaction Hybrid — E-MTB',
        brand: 'CUBE',
        category: 'E-Bike',
        price: 2600,
        year: 2021,
        condition: 'Boa',
        kilometers: 600,
        location: 'Faro',
        imageUrl:
            'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&h=450&fit=crop&q=80',
        imageAlt: 'CUBE e-bike',
    },
    {
        title: 'Btwin Rockrider 300 — Beginner MTB',
        brand: 'Btwin',
        category: 'Mountain Bike',
        price: 320,
        year: 2019,
        condition: 'Boa',
        kilometers: 0,
        location: 'Setubal',
        imageUrl:
            'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=600&h=450&fit=crop&q=80',
        imageAlt: 'Btwin mountain bike',
    },
    {
        title: 'Orbea Oiz H30 — XC Mountain Bike',
        brand: 'Orbea',
        category: 'Mountain Bike',
        price: 2200,
        year: 2023,
        condition: 'Excelente',
        kilometers: 300,
        location: 'Aveiro',
        imageUrl:
            'https://images.unsplash.com/photo-1597326556223-28c6a7a2a7e8?w=600&h=450&fit=crop&q=80',
        imageAlt: 'Orbea mountain bike',
    },
    {
        title: 'Merida Reacto 4000 — Aero Road',
        brand: 'Merida',
        category: 'Road Bike',
        price: 3400,
        year: 2024,
        condition: 'Nova',
        kilometers: 100,
        location: 'Lisboa',
        imageUrl:
            'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&h=450&fit=crop&q=80',
        imageAlt: 'Merida road bike',
    },
    {
        title: 'Bergamont E-Horizon Elite — Trekking E-Bike',
        brand: 'Bergamont',
        category: 'E-Bike',
        price: 1800,
        year: 2022,
        condition: 'Boa',
        kilometers: 900,
        location: 'Porto',
        imageUrl:
            'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&h=450&fit=crop&q=80',
        imageAlt: 'Bergamont e-bike',
    },
    {
        title: 'Kona Process 153 — Enduro MTB',
        brand: 'Kona',
        category: 'Mountain Bike',
        price: 3600,
        year: 2023,
        condition: 'Excelente',
        kilometers: 350,
        location: 'Leiria',
        imageUrl:
            'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=600&h=450&fit=crop&q=80',
        imageAlt: 'Kona mountain bike',
    },
    {
        title: 'BH Ultralight RC — Competition Road',
        brand: 'BH',
        category: 'Road Bike',
        price: 5200,
        year: 2024,
        condition: 'Nova',
        kilometers: 50,
        location: 'Viseu',
        imageUrl:
            'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&h=450&fit=crop&q=80',
        imageAlt: 'BH road bike',
    },
    {
        title: 'Decathlon Elops 500 — City Step-Through',
        brand: 'Decathlon',
        category: 'City Bike',
        price: 280,
        year: 2021,
        condition: 'Regular',
        kilometers: 0,
        location: 'Braga',
        imageUrl:
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=450&fit=crop&q=80',
        imageAlt: 'Decathlon city bike',
    },
    {
        title: 'Santa Cruz Hightower — Carbon Full Suspension',
        brand: 'Santa Cruz',
        category: 'Mountain Bike',
        price: 5500,
        year: 2024,
        condition: 'Nova',
        kilometers: 0,
        location: 'Lisboa',
        imageUrl:
            'https://images.unsplash.com/photo-1597326556223-28c6a7a2a7e8?w=600&h=450&fit=crop&q=80',
        imageAlt: 'Santa Cruz mountain bike',
    },
    {
        title: 'Ribble Endurance SL — Disc Road Bike',
        brand: 'Ribble',
        category: 'Road Bike',
        price: 2400,
        year: 2022,
        condition: 'Boa',
        kilometers: 1500,
        location: 'Coimbra',
        imageUrl:
            'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&h=450&fit=crop&q=80',
        imageAlt: 'Ribble road bike',
    },
    {
        title: 'Cannondale Trail 6 — Hardtail MTB',
        brand: 'Cannondale',
        category: 'Mountain Bike',
        price: 700,
        year: 2020,
        condition: 'Regular',
        kilometers: 2000,
        location: 'Faro',
        imageUrl:
            'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=600&h=450&fit=crop&q=80',
        imageAlt: 'Cannondale mountain bike',
    },
    {
        title: 'Trek Domane SL 5 — Endurance Road',
        brand: 'Trek',
        category: 'Road Bike',
        price: 3800,
        year: 2023,
        condition: 'Excelente',
        kilometers: 500,
        location: 'Porto',
        imageUrl:
            'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&h=450&fit=crop&q=80',
        imageAlt: 'Trek Domane road bike',
    },
    {
        title: 'Cortina U4 — Kids Bike 20"',
        brand: 'Cortina',
        category: 'Kids Bike',
        price: 150,
        year: 2024,
        condition: 'Nova',
        kilometers: 0,
        location: 'Aveiro',
        imageUrl:
            'https://images.unsplash.com/photo-1558981408-600d5c4f2db8?w=600&h=450&fit=crop&q=80',
        imageAlt: 'Cortina kids bike',
    },
];

const mockListings: ListingCardData[] = MOCK_BIKES.map((bike, index) => ({
    id: index + 1,
    slug: bike.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, ''),
    ...bike,
}));

const PER_PAGE = 10;

export default function Browse() {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(mockListings.length / PER_PAGE);
    const start = (currentPage - 1) * PER_PAGE;
    const paginatedListings = mockListings.slice(start, start + PER_PAGE);

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
                                <BrowseFilters />
                            </div>
                            <div className="flex flex-1 flex-col">
                                <BrowseListings
                                    listings={paginatedListings}
                                    total={mockListings.length}
                                />
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={setCurrentPage}
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
