import { Head, Link } from '@inertiajs/react';
import {
    Archive,
    Edit,
    Eye,
    MessageSquare,
    Plus,
    Trash2,
    TrendingUp,
} from 'lucide-react';
import React from 'react';
import Footer from '~/components/home/Footer';
import Navbar from '~/components/home/Navbar';
import Layout from '~/components/layout/Layout';

type BikeStatus = 'active' | 'sold' | 'archived';

interface MyBikeListing {
    id: number;
    title: string;
    slug: string;
    brand: string;
    price: number;
    year: number;
    condition: string;
    status: BikeStatus;
    views: number;
    inquiries: number;
    createdAt: string;
    imageUrl: string;
    imageAlt: string;
}

const MY_BIKES: MyBikeListing[] = [
    
];

const statusConfig: Record<
    BikeStatus,
    { label: string; bg: string; text: string; dot: string }
> = {
    active: {
        label: 'Active',
        bg: 'bg-accent-muted',
        text: 'text-accent',
        dot: 'bg-accent',
    },
    sold: {
        label: 'Sold',
        bg: 'bg-orange-100',
        text: 'text-orange-700',
        dot: 'bg-orange-500',
    },
    archived: {
        label: 'Archived',
        bg: 'bg-stone-100',
        text: 'text-stone-600',
        dot: 'bg-stone-400',
    },
};

const conditionColors: Record<string, string> = {
    new: 'bg-accent-muted text-accent',
    excellent: 'bg-orange-100 text-orange-700',
    good: 'bg-stone-100 text-stone-700',
    fair: 'bg-amber-100 text-amber-700',
    poor: 'bg-stone-100 text-stone-700',
};

type FilterStatus = 'all' | BikeStatus;

export default function MyBikes() {
    const [filter, setFilter] = React.useState<FilterStatus>('all');

    const filteredBikes =
        filter === 'all'
            ? MY_BIKES
            : MY_BIKES.filter((bike) => bike.status === filter);

    const stats = {
        total: MY_BIKES.length,
        active: MY_BIKES.filter((b) => b.status === 'active').length,
        sold: MY_BIKES.filter((b) => b.status === 'sold').length,
        archived: MY_BIKES.filter((b) => b.status === 'archived').length,
    };

    return (
        <Layout>
            <Head title="My Bikes — Trocabikes" />

            <div className="flex min-h-screen flex-col bg-bg text-text">
                <Navbar />

                <main className="flex-1 px-6 py-10 lg:px-12">
                    <div className="mx-auto max-w-6xl">
                        <nav className="mb-2 text-sm text-text-muted">
                            <Link
                                href="/"
                                className="transition-colors hover:text-text"
                            >
                                Home
                            </Link>
                            <span className="mx-2">/</span>
                            <span className="text-text">My Bikes</span>
                        </nav>

                        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <h1 className="text-3xl font-semibold text-text">
                                My Bikes
                            </h1>
                            <Link
                                href="/listings/create"
                                className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
                            >
                                <Plus
                                    width={18}
                                    height={18}
                                    strokeWidth={2.5}
                                />
                                Create New Listing
                            </Link>
                        </div>

                        <div className="mb-6 flex gap-1 rounded-sm bg-bg-subtle p-1">
                            {(
                                [
                                    'all',
                                    'active',
                                    'sold',
                                    'archived',
                                ] as FilterStatus[]
                            ).map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setFilter(status)}
                                    className={`flex-1 rounded-sm px-4 py-2 text-sm font-medium transition-all ${
                                        filter === status
                                            ? 'bg-surface text-text shadow-sm'
                                            : 'text-text-muted hover:text-text'
                                    }`}
                                >
                                    {status === 'all'
                                        ? 'All'
                                        : status.charAt(0).toUpperCase() +
                                        status.slice(1)}
                                </button>
                            ))}
                        </div>

                        {filteredBikes.length === 0 ? (
                            <EmptyState hasFilter={filter !== 'all'} />
                        ) : (
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(340px,1fr))]">
                                {filteredBikes.map((bike) => (
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

function BikeCard({ bike }: { bike: MyBikeListing }) {
    const status = statusConfig[bike.status];

    return (
        <div className="group flex flex-col overflow-hidden rounded-sm border border-border bg-surface transition-all hover:border-border-strong hover:shadow-md">
            <div className="relative aspect-[4/3] overflow-hidden bg-bg-subtle">
                <img
                    src={bike.imageUrl}
                    alt={bike.imageAlt}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div
                    className={`absolute top-3 left-3 rounded-sm px-2.5 py-1 text-xs font-medium tracking-wide uppercase ${status.bg} ${status.text}`}
                >
                    <div className="flex items-center gap-1.5">
                        <div
                            className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
                        />
                        {status.label}
                    </div>
                </div>
            </div>

            <div className="flex flex-1 flex-col p-4">
                <div className="mb-1">
                    <p className="truncate text-xs font-medium tracking-wide text-text-subtle uppercase">
                        {bike.brand}
                    </p>
                    <h3 className="line-clamp-2 text-base font-semibold text-text">
                        {bike.title}
                    </h3>
                </div>

                <div className="mb-3 flex items-center gap-2">
                    <span
                        className={`rounded-sm px-2 py-0.5 text-xs font-medium capitalize ${
                            conditionColors[bike.condition.toLowerCase()] ||
                            'bg-bg-subtle text-text-muted'
                        }`}
                    >
                        {bike.condition}
                    </span>
                    <span className="text-xs text-text-muted">{bike.year}</span>
                    <span className="ml-auto text-lg font-semibold text-text">
                        €{bike.price.toLocaleString('pt-PT')}
                    </span>
                </div>

                <div className="mb-4 flex items-center gap-4 text-xs text-text-muted">
                    <div className="flex items-center gap-1">
                        <Eye width={14} height={14} strokeWidth={1.5} />
                        <span>{bike.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <MessageSquare
                            width={14}
                            height={14}
                            strokeWidth={1.5}
                        />
                        <span>{bike.inquiries}</span>
                    </div>
                    <span className="ml-auto text-text-subtle">
                        {new Date(bike.createdAt).toLocaleDateString('pt-PT', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                        })}
                    </span>
                </div>

                <div className="mt-auto grid grid-cols-4 gap-2 border-t border-border pt-4">
                    <Link
                        href={`/listings/${bike.slug}/edit`}
                        className="flex items-center justify-center gap-1.5 rounded-sm border border-border px-3 py-2 text-xs font-medium text-text-subtle transition-all hover:border-border-strong hover:bg-bg-subtle hover:text-text"
                    >
                        <Edit width={14} height={14} strokeWidth={1.5} />
                        <span className="hidden sm:inline">Edit</span>
                    </Link>
                    <button
                        disabled={bike.status === 'sold'}
                        className="flex items-center justify-center gap-1.5 rounded-sm border border-border px-3 py-2 text-xs font-medium text-text-subtle transition-all hover:border-border-strong hover:bg-bg-subtle hover:text-text disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <TrendingUp width={14} height={14} strokeWidth={1.5} />
                        <span className="hidden sm:inline">Sold</span>
                    </button>
                    <button
                        disabled={bike.status === 'archived'}
                        className="flex items-center justify-center gap-1.5 rounded-sm border border-border px-3 py-2 text-xs font-medium text-text-subtle transition-all hover:border-border-strong hover:bg-bg-subtle hover:text-text disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <Archive width={14} height={14} strokeWidth={1.5} />
                        <span className="hidden sm:inline">Archive</span>
                    </button>
                    <button className="flex items-center justify-center gap-1.5 rounded-sm border border-border px-3 py-2 text-xs font-medium text-error transition-all hover:border-error/30 hover:bg-error/5 hover:text-error disabled:cursor-not-allowed disabled:opacity-40">
                        <Trash2 width={14} height={14} strokeWidth={1.5} />
                        <span className="hidden sm:inline">Delete</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

function EmptyState({ hasFilter }: { hasFilter: boolean }) {
    return (
        <div className="flex flex-col items-center justify-center rounded-sm border border-border bg-surface py-20 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-bg-subtle">
                <TrendingUp
                    width={32}
                    height={32}
                    strokeWidth={1.5}
                    className="text-text-subtle"
                />
            </div>
            <h3 className="mb-1 text-base font-semibold text-text">
                {hasFilter ? 'No bikes with this status' : 'No bikes yet'}
            </h3>
            <p className="mb-4 text-sm text-text-muted">
                {hasFilter
                    ? 'Try selecting a different filter above.'
                    : 'Start by creating your first listing.'}
            </p>
            {!hasFilter && (
                <Link
                    href="/listings/create"
                    className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
                >
                    <Plus width={18} height={18} strokeWidth={2.5} />
                    Create New Listing
                </Link>
            )}
        </div>
    );
}
