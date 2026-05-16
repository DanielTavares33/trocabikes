const categories = [
    {
        name: 'Mountain Bike',
        slug: 'mountain-bike',
        description: 'Off-road adventures',
        icon: (
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
        ),
    },
    {
        name: 'Road Bike',
        slug: 'road-bike',
        description: 'Speed and endurance',
        icon: (
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
        ),
    },
    {
        name: 'City Bike',
        slug: 'city-bike',
        description: 'Urban commuting',
        icon: (
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
        ),
    },
    {
        name: 'E-Bike',
        slug: 'e-bike',
        description: 'Electric assisted',
        icon: (
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
        ),
    },
    {
        name: 'Kids Bike',
        slug: 'kids-bike',
        description: 'Young riders',
        icon: (
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
        ),
    },
    {
        name: 'BMX',
        slug: 'bmx',
        description: 'Freestyle and racing',
        icon: (
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
        ),
    },
];

export default function CategoriesGrid() {
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
                        <a
                            key={category.slug}
                            href={`#${category.slug}`}
                            className="group flex flex-col items-center rounded-sm border border-border bg-surface p-8 text-center transition-all hover:border-primary hover:shadow-md"
                        >
                            <div className="mb-4 text-text-subtle transition-colors group-hover:text-primary">
                                {category.icon}
                            </div>
                            <h3 className="mb-1 text-base font-semibold text-text">
                                {category.name}
                            </h3>
                            <p className="text-sm text-text-muted">
                                {category.description}
                            </p>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
