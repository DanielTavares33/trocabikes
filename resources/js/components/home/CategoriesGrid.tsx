import { Link } from '@inertiajs/react';
import type { ReactNode } from 'react';

import { index as bikesIndex } from '@/routes/bikes';

export interface HomeCategory {
  id: number;
  name: string;
  slug: string;
}

const CATEGORY_BLURBS: Record<string, string> = {
  'mountain-bikes-mtb': 'Off-road adventures',
  'road-bikes': 'Speed and endurance',
  'hybrid-city-bikes': 'Urban commuting',
  'electric-bikes-e-bikes': 'Electric assisted',
  kids: 'Young riders',
  bmx: 'Freestyle and racing',
  'gravel-bikes': 'Mixed-surface riding',
  cyclocross: 'Off-camber racing',
  touring: 'Long-distance travel',
  folding: 'Compact city riding',
};

function MountainIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="5" cy="18" r="3" />
      <circle cx="19" cy="18" r="3" />
      <path d="M12 18V6l-4 3" />
      <path d="m8 9 4-3 4 3" />
      <path d="m9 6 3-3 3 3" />
    </svg>
  );
}

function RoadIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="4" cy="18" r="3" />
      <circle cx="20" cy="18" r="3" />
      <path d="M12 18V4" />
      <path d="m8 18 4-10 4 10" />
      <path d="M12 18h6" />
    </svg>
  );
}

function CityIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="5" cy="17" r="3" />
      <circle cx="19" cy="17" r="3" />
      <path d="M12 17V7l-5 4" />
      <path d="m10 11 4-4 4 4" />
      <path d="m7 7 5 4" />
    </svg>
  );
}

function EBikeIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="7" width="20" height="10" rx="2" />
      <path d="M17 7V4" />
      <path d="M7 7V4" />
      <path d="M7 12h2" />
      <path d="M17 12h2" />
      <path d="M12 17v2" />
    </svg>
  );
}

function KidsIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="6" cy="16" r="2" />
      <circle cx="18" cy="16" r="2" />
      <path d="M6 16l3-8h3l2 8" />
      <path d="M12 8V4" />
      <path d="M12 8h5l-1 8" />
      <path d="M9 8h-3" />
    </svg>
  );
}

function BmxIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="5" cy="17" r="3" />
      <circle cx="19" cy="17" r="3" />
      <path d="M12 17V9l-4 4" />
      <path d="m9 13 3 4" />
      <path d="M8 9l6-2 6 2" />
      <path d="M14 7h4" />
    </svg>
  );
}

function DefaultCategoryIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="5" cy="18" r="3" />
      <circle cx="19" cy="18" r="3" />
      <path d="M12 18V7" />
      <path d="m9 10 3-3 3 3" />
    </svg>
  );
}

const CATEGORY_ICONS: Record<string, ReactNode> = {
  'mountain-bikes-mtb': <MountainIcon />,
  'road-bikes': <RoadIcon />,
  'hybrid-city-bikes': <CityIcon />,
  'electric-bikes-e-bikes': <EBikeIcon />,
  kids: <KidsIcon />,
  bmx: <BmxIcon />,
};

interface CategoriesGridProps {
  categories: HomeCategory[];
}

export default function CategoriesGrid({
  categories,
}: Readonly<CategoriesGridProps>) {
  return (
    <section id="categories" className="bg-bg px-6 py-20 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-semibold text-text">
            Browse by category
          </h2>
          <p className="text-text-muted">
            Find the perfect bike for your style of riding
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={bikesIndex.url({
                query: { bike_category_id: category.id },
              })}
              data-testid="home-category"
              data-slug={category.slug}
              className="group flex flex-col items-center rounded-sm border border-border bg-surface p-8 text-center transition-all hover:border-primary hover:shadow-md"
            >
              <div className="mb-4 text-text-subtle transition-colors group-hover:text-primary">
                {CATEGORY_ICONS[category.slug] ?? <DefaultCategoryIcon />}
              </div>
              <h3 className="mb-1 text-base font-semibold text-text">
                {category.name}
              </h3>
              {CATEGORY_BLURBS[category.slug] ? (
                <p className="text-sm text-text-muted">
                  {CATEGORY_BLURBS[category.slug]}
                </p>
              ) : null}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
