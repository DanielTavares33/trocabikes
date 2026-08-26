import { Head, Link, router } from '@inertiajs/react';
import {
    BadgeCheck,
    Edit,
    Link as LinkIcon,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
    Trash2,
} from 'lucide-react';
import { useState } from 'react';

import { destroy, edit, index as bikesIndex } from '@/routes/bikes';
import Footer from '~/components/home/Footer';
import Navbar from '~/components/home/Navbar';
import Layout from '~/components/layout/Layout';

const conditionColors: Record<string, string> = {
    nova: 'bg-accent-muted text-accent',
    excelente: 'bg-orange-100 text-orange-700',
    boa: 'bg-stone-100 text-stone-700',
    regular: 'bg-amber-100 text-amber-700',
    usada: 'bg-stone-100 text-stone-700',
    mau: 'bg-stone-100 text-stone-700',
};

interface SellerData {
    name: string;
    phone: string;
    whatsapp: string;
    email: string;
    type: 'particular' | 'professional';
    isVerified: boolean;
    memberSince: string;
    location: string;
    avatarUrl: string | null;
}

interface BikeImageData {
    id: number;
    url: string;
    alt: string;
}

interface BikeShowData {
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
    kilometers: number | null;
    location: string;
    description: string;
    imageUrl: string;
    imageAlt: string;
    images: BikeImageData[];
    createdAt: string;
    views: number;
    seller: SellerData;
}

interface BikeShowProps {
    bike: BikeShowData;
    canManage: boolean;
}

export default function BikeShow({ bike, canManage }: Readonly<BikeShowProps>) {
    const seller = bike.seller;
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const galleryImages =
        bike.images.length > 0
            ? bike.images
            : [{ id: 0, url: bike.imageUrl, alt: bike.imageAlt }];
    const activeImage = galleryImages[activeImageIndex] ?? galleryImages[0];

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('pt-PT', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    const handleDelete = () => {
        if (
            !window.confirm(
                'Are you sure you want to delete this bike? This cannot be undone.',
            )
        ) {
            return;
        }

        router.delete(destroy.url(bike.slug));
    };

    return (
        <Layout>
            <Head title={`${bike.title} — Trocabikes`} />

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
                                href={bikesIndex.url()}
                                className="transition-colors hover:text-text"
                            >
                                Browse bikes
                            </Link>
                            <span>/</span>
                            <span className="truncate text-text">
                                {bike.title}
                            </span>
                        </nav>

                        {canManage && (
                            <div className="mb-6 flex flex-wrap gap-3">
                                <Link
                                    href={edit.url(bike.slug)}
                                    className="inline-flex items-center gap-2 rounded-sm border border-border bg-surface px-4 py-2 text-sm font-medium text-text transition-colors hover:border-border-strong hover:bg-bg-subtle"
                                >
                                    <Edit width={16} height={16} />
                                    Edit bike
                                </Link>
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    className="inline-flex items-center gap-2 rounded-sm border border-border px-4 py-2 text-sm font-medium text-error transition-colors hover:border-error/30 hover:bg-error/5"
                                >
                                    <Trash2 width={16} height={16} />
                                    Delete bike
                                </button>
                            </div>
                        )}

                        <div className="grid gap-8 lg:grid-cols-3">
                            <div className="lg:col-span-2">
                                <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-border bg-bg-subtle">
                                    <img
                                        src={activeImage.url}
                                        alt={activeImage.alt}
                                        className="h-full w-full object-cover"
                                    />
                                    <div className="absolute bottom-4 left-4 rounded-sm bg-bg/90 px-3 py-1.5 text-xs font-medium text-text">
                                        {activeImageIndex + 1} /{' '}
                                        {galleryImages.length}
                                    </div>
                                </div>
                                {galleryImages.length > 1 && (
                                    <div className="mt-3 grid grid-cols-4 gap-2">
                                        {galleryImages.map((image, index) => (
                                            <button
                                                key={image.id}
                                                type="button"
                                                onClick={() =>
                                                    setActiveImageIndex(index)
                                                }
                                                className={`aspect-square overflow-hidden rounded-sm border ${
                                                    index === activeImageIndex
                                                        ? 'border-primary'
                                                        : 'border-border'
                                                }`}
                                            >
                                                <img
                                                    src={image.url}
                                                    alt={image.alt}
                                                    className="h-full w-full object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col gap-6">
                                <div className="rounded-sm border border-border bg-surface p-6">
                                    <div className="mb-4">
                                        <p className="mb-1 text-xs font-medium tracking-wide text-text-subtle uppercase">
                                            {bike.brand}
                                        </p>
                                        <h1 className="text-2xl leading-tight font-semibold text-text">
                                            {bike.title}
                                        </h1>
                                    </div>

                                    <div className="mb-6 flex items-baseline justify-between">
                                        <p className="text-3xl font-bold text-text">
                                            {formatPrice(bike.price)}
                                        </p>
                                        <span
                                            className={`rounded-sm px-2.5 py-1 text-xs font-medium capitalize ${
                                                conditionColors[
                                                    bike.condition.toLowerCase()
                                                ] ||
                                                'bg-bg-subtle text-text-muted'
                                            }`}
                                        >
                                            {bike.condition}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 border-t border-border pt-4">
                                        <div>
                                            <p className="text-xs text-text-subtle">
                                                Year
                                            </p>
                                            <p className="font-medium text-text">
                                                {bike.year}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-text-subtle">
                                                Size
                                            </p>
                                            <p className="font-medium text-text">
                                                {bike.size}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-text-subtle">
                                                Frame
                                            </p>
                                            <p className="font-medium text-text">
                                                {bike.frameMaterial}
                                            </p>
                                        </div>
                                        {bike.kilometers != null && (
                                            <div>
                                                <p className="text-xs text-text-subtle">
                                                    Kilometers
                                                </p>
                                                <p className="font-medium text-text">
                                                    {bike.kilometers.toLocaleString(
                                                        'pt-PT',
                                                    )}{' '}
                                                    km
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-4 flex items-center gap-2 text-sm text-text-muted">
                                        <MapPin width={16} height={16} />
                                        <span>{bike.location}</span>
                                    </div>
                                </div>

                                <div className="rounded-sm border border-border bg-surface p-6">
                                    <div className="mb-4 flex items-center gap-3">
                                        {seller.avatarUrl ? (
                                            <img
                                                src={seller.avatarUrl}
                                                alt={seller.name}
                                                className="h-12 w-12 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-bg-subtle text-sm font-semibold text-text">
                                                {seller.name
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>
                                        )}
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="font-medium text-text">
                                                    {seller.name}
                                                </p>
                                                {seller.isVerified && (
                                                    <BadgeCheck
                                                        width={16}
                                                        height={16}
                                                        className="text-primary"
                                                        fill="currentColor"
                                                    />
                                                )}
                                            </div>
                                            <p className="text-xs text-text-subtle">
                                                Member since{' '}
                                                {seller.memberSince}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        {seller.phone && (
                                            <a
                                                href={`tel:${seller.phone}`}
                                                className="flex items-center justify-center gap-2 rounded-sm bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
                                            >
                                                <Phone width={18} height={18} />
                                                Call
                                            </a>
                                        )}
                                        {seller.whatsapp && (
                                            <a
                                                href={`https://wa.me/${seller.whatsapp}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center gap-2 rounded-sm bg-green-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-600"
                                            >
                                                <MessageCircle
                                                    width={18}
                                                    height={18}
                                                />
                                                WhatsApp
                                            </a>
                                        )}
                                        {seller.email && (
                                            <a
                                                href={`mailto:${seller.email}`}
                                                className="flex items-center justify-center gap-2 rounded-sm border border-border px-4 py-2.5 text-sm font-medium text-text transition-colors hover:border-border-strong hover:bg-bg-subtle"
                                            >
                                                <Mail width={18} height={18} />
                                                Email
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <div className="rounded-sm border border-border bg-surface p-4">
                                    <p className="mb-3 text-sm font-medium text-text">
                                        Share this bike
                                    </p>
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                navigator.clipboard.writeText(
                                                    window.location.href,
                                                );
                                            }}
                                            className="flex items-center justify-center rounded-sm border border-border p-2.5 text-text-subtle transition-colors hover:border-border-strong hover:bg-bg-subtle hover:text-text"
                                            title="Copy link"
                                        >
                                            <LinkIcon width={18} height={18} />
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
                                {bike.description}
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </Layout>
    );
}
