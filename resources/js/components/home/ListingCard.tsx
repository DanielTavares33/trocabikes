export interface ListingCardData {
    id: number;
    title: string;
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

export default function ListingCard({ listing }: { listing: ListingCardData }) {
    return (
        <a
            href={`#listing-${listing.id}`}
            className="group flex flex-col overflow-hidden rounded-sm border border-border bg-surface transition-all hover:border-border-strong hover:shadow-lg"
        >
            <div className="aspect-[4/3] overflow-hidden bg-bg-subtle">
                <img
                    src={listing.imageUrl}
                    alt={listing.imageAlt}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            <div className="flex flex-1 flex-col p-4">
                <div className="mb-1 flex items-start justify-between gap-2">
                    <div className="min-w-0">
                        <p className="truncate text-xs font-medium tracking-wide text-text-subtle uppercase">
                            {listing.brand}
                        </p>
                        <h3 className="mt-0.5 line-clamp-2 text-base font-semibold text-text">
                            {listing.title}
                        </h3>
                    </div>
                    <p className="text-lg font-semibold whitespace-nowrap text-text">
                        €{listing.price.toLocaleString('pt-PT')}
                    </p>
                </div>

                <div className="mt-auto flex flex-wrap items-center gap-2">
                    <span
                        className={`rounded-sm px-2 py-0.5 text-xs font-medium capitalize ${
                            conditionColors[listing.condition.toLowerCase()] ||
                            'bg-bg-subtle text-text-muted'
                        }`}
                    >
                        {listing.condition}
                    </span>
                    <span className="text-xs text-text-muted">
                        {listing.year}
                    </span>
                    {listing.kilometers && (
                        <span className="text-xs text-text-muted">
                            {listing.kilometers.toLocaleString('pt-PT')} km
                        </span>
                    )}
                </div>

                <div className="mt-2 flex items-center gap-1 text-xs text-text-muted">
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{listing.location}</span>
                </div>
            </div>
        </a>
    );
}
