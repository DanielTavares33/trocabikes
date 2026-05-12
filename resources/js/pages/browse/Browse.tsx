import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import type { ListingCardData } from '~/components/home/ListingCard';
import Navbar from '~/components/home/Navbar';
import BrowseFilters from '~/pages/browse/BrowseFilters';
import BrowseListings from '~/pages/browse/BrowseListings';

const mockListings: ListingCardData[] = [
    {
        id: 1,
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
        id: 2,
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
        id: 3,
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
        id: 4,
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
        id: 5,
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
        id: 6,
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
        id: 7,
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
        id: 8,
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
        id: 9,
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
];

export default function Browse() {
    return (
        <>
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
                            <BrowseListings
                                listings={mockListings}
                                total={mockListings.length}
                            />
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
