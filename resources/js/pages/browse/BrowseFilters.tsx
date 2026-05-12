const categories = [
    'All',
    'Mountain Bike',
    'Road Bike',
    'City Bike',
    'E-Bike',
    'Kids Bike',
    'BMX',
];

const conditions = ['Nova', 'Excelente', 'Boa', 'Regular'];
const priceRanges = [
    { label: 'Any', value: '' },
    { label: 'Under €500', value: '0-500' },
    { label: '€500 – €1,000', value: '500-1000' },
    { label: '€1,000 – €2,000', value: '1000-2000' },
    { label: '€2,000 – €5,000', value: '2000-5000' },
    { label: 'Over €5,000', value: '5000-' },
];

export default function BrowseFilters() {
    return (
        <aside className="w-full rounded-sm border border-border bg-surface p-6">
            <h2 className="mb-5 text-sm font-semibold tracking-wide text-text uppercase">
                Filters
            </h2>

            <div className="flex flex-col gap-6">
                <div>
                    <h3 className="mb-3 text-sm font-medium text-text">
                        Category
                    </h3>
                    <div className="flex flex-col gap-2">
                        {categories.map((cat) => (
                            <label
                                key={cat}
                                className="flex cursor-pointer items-center gap-2"
                            >
                                <input
                                    type="radio"
                                    name="category"
                                    value={cat}
                                    defaultChecked={cat === 'All'}
                                    className="h-4 w-4 accent-primary"
                                />
                                <span className="text-sm text-text-muted">
                                    {cat}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="mb-3 text-sm font-medium text-text">
                        Price
                    </h3>
                    <div className="flex flex-col gap-2">
                        {priceRanges.map((range) => (
                            <label
                                key={range.value}
                                className="flex cursor-pointer items-center gap-2"
                            >
                                <input
                                    type="radio"
                                    name="price"
                                    value={range.value}
                                    defaultChecked={range.value === ''}
                                    className="h-4 w-4 accent-primary"
                                />
                                <span className="text-sm text-text-muted">
                                    {range.label}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="mb-3 text-sm font-medium text-text">
                        Condition
                    </h3>
                    <div className="flex flex-col gap-2">
                        {conditions.map((cond) => (
                            <label
                                key={cond}
                                className="flex cursor-pointer items-center gap-2"
                            >
                                <input
                                    type="checkbox"
                                    name="condition"
                                    value={cond}
                                    className="h-4 w-4 accent-primary"
                                />
                                <span className="text-sm text-text-muted">
                                    {cond}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="mb-3 text-sm font-medium text-text">Year</h3>
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            name="year_from"
                            min="1990"
                            max="2026"
                            placeholder="From"
                            className="h-9 w-full rounded-sm border border-border bg-bg px-3 text-sm text-text placeholder:text-text-subtle focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                        />
                        <span className="text-text-muted">–</span>
                        <input
                            type="number"
                            name="year_to"
                            min="1990"
                            max="2026"
                            placeholder="To"
                            className="h-9 w-full rounded-sm border border-border bg-bg px-3 text-sm text-text placeholder:text-text-subtle focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
                        />
                    </div>
                </div>

                <button
                    type="button"
                    className="mt-2 h-9 w-full rounded-sm border border-border text-sm font-medium text-text transition-colors hover:border-border-strong hover:bg-bg-subtle"
                >
                    Clear filters
                </button>
            </div>
        </aside>
    );
}
