import { Link } from '@inertiajs/react';
import { MapPin } from 'lucide-react';

import { show } from '@/routes/bikes';

export interface BikeCardData {
    id: number;
    title: string;
    slug: string;
    brand: string;
    category: string;
    price: number;
    year: number;
    condition: string;
    kilometers?: number;
    location: string;
    imageUrl: string;
    imageAlt: string;
}

type ConditionColor = {
    [key: string]: string;
};

const conditionColors: ConditionColor = {
    nova: 'bg-accent-muted text-accent',
    excelente: 'bg-orange-100 text-orange-700',
    boa: 'bg-stone-100 text-stone-700',
    regular: 'bg-amber-100 text-amber-700',
    usada: 'bg-stone-100 text-stone-700',
};

export default function BikeCard({ bike }: { readonly bike: BikeCardData }) {
    return (
        <Link
            href={show.url(bike.slug)}
            data-testid={`bike-card-${bike.slug}`}
            className="group relative flex flex-col overflow-hidden rounded-sm border border-border bg-surface transition-all hover:border-border-strong hover:shadow-lg"
        >
            <div className="aspect-[4/3] overflow-hidden bg-bg-subtle">
                <img
                    src={bike.imageUrl}
                    alt={bike.imageAlt}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            <div className="flex flex-1 flex-col p-4">
                <div className="mb-1 flex items-start justify-between gap-2">
                    <div className="min-w-0">
                        <p className="truncate text-xs font-medium tracking-wide text-text-subtle uppercase">
                            {bike.brand}
                        </p>
                        <h3 className="mt-0.5 line-clamp-2 text-base font-semibold text-text">
                            {bike.title}
                        </h3>
                    </div>
                    <p className="text-lg font-semibold whitespace-nowrap text-text">
                        €{bike.price.toLocaleString('pt-PT')}
                    </p>
                </div>

                <div className="mt-auto flex flex-wrap items-center gap-2">
                    <span
                        className={`rounded-sm px-2 py-0.5 text-xs font-medium capitalize ${
                            conditionColors[bike.condition.toLowerCase()] ||
                            'bg-bg-subtle text-text-muted'
                        }`}
                    >
                        {bike.condition}
                    </span>
                    <span className="text-xs text-text-muted">{bike.year}</span>
                    {bike.kilometers != null && (
                        <span className="text-xs text-text-muted">
                            {bike.kilometers.toLocaleString('pt-PT')} km
                        </span>
                    )}
                </div>

                <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-text-muted">
                        <MapPin width={12} height={12} />
                        <span>{bike.location}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
