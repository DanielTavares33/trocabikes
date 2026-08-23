import { Link } from '@inertiajs/react';
import { Heart, MapPin, Trash } from 'lucide-react';

import { useModal } from '@/hooks/useModal';
import { show } from '@/routes/bikes';
import Modal from '../ui/Modal';

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

export default function BikeCard({
    bike,
    saved = false,
}: {
    readonly bike: BikeCardData;
    readonly saved?: boolean;
}) {
    const modal = useModal();

    return (
        <Link
            href={show.url(bike.slug)}
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
                    <span className="text-xs text-text-muted">
                        {bike.year}
                    </span>
                    {bike.kilometers && (
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
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            modal.open();
                        }}
                        className="text-text-subtle transition-colors hover:text-error"
                        aria-label={
                            saved ? 'Remove from saved' : 'Save to saved bikes'
                        }
                    >
                        {saved ? (
                            <Heart
                                width={16}
                                height={16}
                                className="fill-error text-error"
                                strokeWidth={2}
                            />
                        ) : (
                            <Trash
                                width={16}
                                height={16}
                                className="fill-none text-text-subtle"
                                strokeWidth={2}
                            />
                        )}
                    </button>
                    <Modal
                        isOpen={modal.isOpen}
                        onClose={modal.close}
                        title="Confirm Removal"
                        size="md"
                        closeOnBackdrop={true}
                        closeOnEsc={true}
                    >
                        <div>
                            <p className="mb-4 text-sm text-text">
                                Are you sure you want to remove this bike from
                                your saved list?
                            </p>
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={modal.close}
                                    className="rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        // Add your removal logic here
                                        modal.close();
                                    }}
                                    className="rounded-md bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        </Link>
    );
}
