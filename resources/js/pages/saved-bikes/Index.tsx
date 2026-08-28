import { Head, Link } from '@inertiajs/react';
import { Heart } from 'lucide-react';
import type { BikeCardData } from '~/components/home/BikeCard';
import BikeCard from '~/components/home/BikeCard';
import Footer from '~/components/home/Footer';
import Navbar from '~/components/home/Navbar';
import Layout from '~/components/layout/Layout';

const SAVED_BIKES: BikeCardData[] = [
  {
    id: 1,
    title: 'Canyon Spectral CF 7 — Full Suspended MTB',
    slug: 'canyon-spectral-cf-7-full-suspended-mtb',
    brand: 'Canyon',
    category: 'Mountain',
    price: 2850,
    year: 2022,
    condition: 'Excellent',
    kilometers: 1200,
    location: 'Lisbon, Portugal',
    imageUrl:
      'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=600&h=450&fit=crop&q=80',
    imageAlt: 'Canyon Spectral mountain bike',
  },
  {
    id: 2,
    title: 'Specialized Allez Sprint — Road Racing',
    slug: 'specialized-allez-sprint-road-racing',
    brand: 'Specialized',
    category: 'Road',
    price: 1950,
    year: 2021,
    condition: 'Good',
    kilometers: 3500,
    location: 'Porto, Portugal',
    imageUrl:
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&h=450&fit=crop&q=80',
    imageAlt: 'Specialized Allez Sprint road bike',
  },
  {
    id: 3,
    title: 'Trek FX 3 — City Hybrid Commuter',
    slug: 'trek-fx-3-city-hybrid-commuter',
    brand: 'Trek',
    category: 'Hybrid',
    price: 650,
    year: 2023,
    condition: 'New',
    location: 'Coimbra, Portugal',
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
    condition: 'New',
    location: 'Faro, Portugal',
    imageUrl:
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&h=450&fit=crop&q=80',
    imageAlt: 'Brose e-bike',
  },
];

export default function SavedBikes() {
  return (
    <Layout>
      <Head title="Saved Bikes — Trocabikes" />

      <div className="flex min-h-screen flex-col bg-bg text-text">
        <Navbar />

        <main className="flex-1 px-6 py-10 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <nav className="mb-2 text-sm text-text-muted">
              <Link href="/" className="transition-colors hover:text-text">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="text-text">Saved Bikes</span>
            </nav>

            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-3xl font-semibold text-text">Saved Bikes</h1>
              <p className="text-sm text-text-muted">
                <span className="font-medium text-text">
                  {SAVED_BIKES.length}
                </span>{' '}
                bikes saved
              </p>
            </div>

            {SAVED_BIKES.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-sm border border-border bg-surface py-20 text-center">
                <Heart
                  width={48}
                  height={48}
                  className="mb-4 text-text-subtle"
                  strokeWidth={1.5}
                />
                <h3 className="mb-1 text-base font-semibold text-text">
                  No saved bikes yet
                </h3>
                <p className="text-sm text-text-muted">
                  Browse bikes and save the ones you like.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
                {SAVED_BIKES.map((bike) => (
                  <BikeCard key={bike.id} bike={bike} />
                ))}
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </Layout>
  );
}
