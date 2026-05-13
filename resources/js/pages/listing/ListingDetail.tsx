import { Head, Link } from '@inertiajs/react';
import Footer from '~/components/home/Footer';
import Navbar from '~/components/home/Navbar';

interface SellerData {
    name: string;
    phone: string;
    whatsapp: string;
    email: string;
    type: 'particular' | 'professional';
    isVerified: boolean;
    memberSince: string;
    location: string;
    avatarUrl: string;
}

interface ListingDetailData {
    id: number;
    title: string;
    slug: string;
    brand: string;
    category: string;
    price: number;
    year: number;
    condition: string;
    size: string;
    frameMaterial: string;
    kilometers: number;
    location: string;
    description: string;
    imageUrl: string;
    imageAlt: string;
    createdAt: string;
    views: number;
    seller: SellerData;
}

const conditionColors: Record<string, string> = {
    nova: 'bg-accent-muted text-accent',
    excelente: 'bg-orange-100 text-orange-700',
    boa: 'bg-stone-100 text-stone-700',
    regular: 'bg-amber-100 text-amber-700',
    usada: 'bg-stone-100 text-stone-700',
};

const mockListing: ListingDetailData = {
    id: 1,
    title: 'Canyon Spectral CF 7 — Full Suspended MTB',
    slug: 'canyon-spectral-cf-7-full-suspended-mtb',
    brand: 'Canyon',
    category: 'Mountain Bike',
    price: 2850,
    year: 2022,
    condition: 'Excelente',
    size: 'L',
    frameMaterial: 'Carbon',
    kilometers: 450,
    location: 'Lisboa',
    description:
        'Vendo Canyon Spectral CF 7 em excelente estado. Bike todaajada, mantida com cuidado e sempre guardada em local seco.\n\nInclui:\n- Bicicleta completa original\n- Manual do utilizador\n- Ferramentas de manutenção básica\n\nA bike foi usada em trilhos intermédios, nunca em competição. Por isso mesmo está em óptimo estado, sem danos estruturais ou estéticos.\n\nMotivo da venda: upgrade para bike mais recente.\n\nEntrego na zona de Lisboa ou aceito envio via transportadora.',
    imageUrl:
        'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=800&h=600&fit=crop&q=80',
    imageAlt: 'Canyon Spectral mountain bike',
    createdAt: '2024-03-15',
    views: 234,
    seller: {
        name: 'Miguel Santos',
        phone: '+351 912 345 678',
        whatsapp: '+351912345678',
        email: 'miguel.santos@email.com',
        type: 'particular',
        isVerified: true,
        memberSince: 'January 2023',
        location: 'Lisboa',
        avatarUrl:
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&q=80&crop=faces',
    },
};

export default function ListingDetail() {
    const listing = mockListing;
    const seller = listing.seller;

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pt-PT', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <>
            <Head title={`${listing.title} — Trocabikes`} />

            <div className="flex min-h-screen flex-col bg-bg text-text">
                <Navbar />

                <main className="flex-1 px-6 py-8 lg:px-12">
                    <div className="mx-auto max-w-6xl">
                        <nav className="mb-6 flex items-center gap-2 text-sm text-text-muted">
                            <Link
                                href="/"
                                className="transition-colors hover:text-text"
                            >
                                Home
                            </Link>
                            <span>/</span>
                            <Link
                                href="/browse"
                                className="transition-colors hover:text-text"
                            >
                                Browse bikes
                            </Link>
                            <span>/</span>
                            <span className="truncate text-text">
                                {listing.title}
                            </span>
                        </nav>

                        <div className="grid gap-8 lg:grid-cols-3">
                            <div className="lg:col-span-2">
                                <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-border bg-bg-subtle">
                                    <img
                                        src={listing.imageUrl}
                                        alt={listing.imageAlt}
                                        className="h-full w-full object-cover"
                                    />
                                    <div className="absolute bottom-4 left-4 rounded-sm bg-bg/90 px-3 py-1.5 text-xs font-medium text-text">
                                        1 / 1
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-6">
                                <div className="rounded-sm border border-border bg-surface p-6">
                                    <div className="mb-4">
                                        <p className="mb-1 text-xs font-medium tracking-wide text-text-subtle uppercase">
                                            {listing.brand}
                                        </p>
                                        <h1 className="text-2xl font-semibold leading-tight text-text">
                                            {listing.title}
                                        </h1>
                                    </div>

                                    <div className="mb-6 flex items-baseline justify-between">
                                        <p className="text-3xl font-bold text-text">
                                            {formatPrice(listing.price)}
                                        </p>
                                        <span
                                            className={`rounded-sm px-2.5 py-1 text-xs font-medium capitalize ${
                                                conditionColors[
                                                    listing.condition.toLowerCase()
                                                ] || 'bg-bg-subtle text-text-muted'
                                            }`}
                                        >
                                            {listing.condition}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 border-t border-border pt-4">
                                        <div>
                                            <p className="text-xs text-text-subtle">
                                                Year
                                            </p>
                                            <p className="font-medium text-text">
                                                {listing.year}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-text-subtle">
                                                Size
                                            </p>
                                            <p className="font-medium text-text">
                                                {listing.size}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-text-subtle">
                                                Frame
                                            </p>
                                            <p className="font-medium text-text">
                                                {listing.frameMaterial}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-text-subtle">
                                                Kilometers
                                            </p>
                                            <p className="font-medium text-text">
                                                {listing.kilometers.toLocaleString(
                                                    'pt-PT'
                                                )}{' '}
                                                km
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex items-center gap-2 text-sm text-text-muted">
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                            <circle
                                                cx="12"
                                                cy="10"
                                                r="3"
                                            />
                                        </svg>
                                        <span>{listing.location}</span>
                                    </div>
                                </div>

                                <div className="rounded-sm border border-border bg-surface p-6">
                                    <div className="mb-4 flex items-center gap-3">
                                        <img
                                            src={seller.avatarUrl}
                                            alt={seller.name}
                                            className="h-12 w-12 rounded-full object-cover"
                                        />
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="font-medium text-text">
                                                    {seller.name}
                                                </p>
                                                {seller.isVerified && (
                                                    <svg
                                                        width="16"
                                                        height="16"
                                                        viewBox="0 0 24 24"
                                                        fill="currentColor"
                                                        className="text-primary"
                                                    >
                                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                )}
                                            </div>
                                            <p className="text-xs text-text-subtle">
                                                Member since{' '}
                                                {seller.memberSince}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <a
                                            href={`tel:${seller.phone}`}
                                            className="flex items-center justify-center gap-2 rounded-sm bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
                                        >
                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                            </svg>
                                            Call
                                        </a>
                                        <a
                                            href={`https://wa.me/${seller.whatsapp}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 rounded-sm bg-green-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-600"
                                        >
                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                                            </svg>
                                            WhatsApp
                                        </a>
                                        <a
                                            href={`mailto:${seller.email}`}
                                            className="flex items-center justify-center gap-2 rounded-sm border border-border px-4 py-2.5 text-sm font-medium text-text transition-colors hover:border-border-strong hover:bg-bg-subtle"
                                        >
                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <rect
                                                    width="20"
                                                    height="16"
                                                    x="2"
                                                    y="4"
                                                    rx="2"
                                                />
                                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                            </svg>
                                            Email
                                        </a>
                                    </div>
                                </div>

                                <div className="rounded-sm border border-border bg-surface p-4">
                                    <p className="mb-3 text-sm font-medium text-text">
                                        Share this listing
                                    </p>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(
                                                    window.location.href
                                                );
                                            }}
                                            className="flex items-center justify-center rounded-sm border border-border p-2.5 text-text-subtle transition-colors hover:border-border-strong hover:bg-bg-subtle hover:text-text"
                                            title="Copy link"
                                        >
                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                                            </svg>
                                        </button>
                                        <a
                                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center rounded-sm border border-border p-2.5 text-text-subtle transition-colors hover:border-border-strong hover:bg-bg-subtle hover:text-text"
                                            title="Share on Facebook"
                                        >
                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                            >
                                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                            </svg>
                                        </a>
                                        <a
                                            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center rounded-sm border border-border p-2.5 text-text-subtle transition-colors hover:border-border-strong hover:bg-bg-subtle hover:text-text"
                                            title="Share on X"
                                        >
                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                            >
                                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 rounded-sm border border-border bg-surface p-6">
                            <h2 className="mb-4 text-lg font-semibold text-text">
                                Description
                            </h2>
                            <div className="whitespace-pre-wrap text-text-muted">
                                {listing.description}
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
}