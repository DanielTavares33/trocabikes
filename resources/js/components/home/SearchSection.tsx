export default function SearchSection() {
    return (
        <section className="border-y border-border bg-bg-subtle px-6 py-10 lg:px-12">
            <div className="mx-auto max-w-5xl">
                <h2 className="mb-6 text-center text-xl font-semibold text-text">
                    Find your bike
                </h2>

                <div className="flex flex-col gap-4 lg:flex-row">
                    <div className="relative flex-1">
                        <svg
                            className="absolute top-1/2 left-4 -translate-y-1/2 text-text-subtle"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search by brand, model, or keyword..."
                            className="h-12 w-full rounded-sm border border-border bg-surface pr-4 pl-12 text-sm text-text placeholder:text-text-subtle focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                        />
                    </div>

                    <div className="relative lg:w-48">
                        <svg
                            className="absolute top-1/2 left-4 -translate-y-1/2 text-text-subtle"
                            width="20"
                            height="20"
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
                        <select className="h-12 w-full appearance-none rounded-sm border border-border bg-surface pr-10 pl-12 text-sm text-text focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none">
                            <option value="">All locations</option>
                            <option value="lisboa">Lisboa</option>
                            <option value="porto">Porto</option>
                            <option value="braga">Braga</option>
                            <option value="coimbra">Coimbra</option>
                        </select>
                        <svg
                            className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-text-subtle"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m6 9 6 6 6-6" />
                        </svg>
                    </div>

                    <button className="h-12 cursor-pointer rounded-sm bg-primary px-8 text-sm font-medium text-white transition-colors hover:bg-primary-hover">
                        Search
                    </button>
                </div>
            </div>
        </section>
    );
}
