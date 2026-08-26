import { uniqueId } from './data';

export const SEEDED_BIKES = {
    'canyon-spectral': 'Canyon Spectral CF 7',
    'trek-domane': 'Trek Domane SL 5',
    'specialized-allez': 'Specialized Allez Sprint',
} as const;

export const SEEDED_BIKE_SLUGS: Record<keyof typeof SEEDED_BIKES, string> = {
    'canyon-spectral': 'canyon-spectral-cf-7',
    'trek-domane': 'trek-domane-sl-5',
    'specialized-allez': 'specialized-allez-sprint',
};

/** Stable E2eDatabaseSeeder brand IDs (creation order: Trek, Specialized, Canyon). */
export const SEEDED_BRAND_IDS: Record<string, string> = {
    Trek: '1',
    Specialized: '2',
    Canyon: '3',
};

/** Stable E2eDatabaseSeeder category IDs (creation order: Mountain, Road). */
export const SEEDED_CATEGORY_IDS = {
    mountain: '1',
    road: '2',
} as const;

export const E2E_FORM_VALUES = {
    brandId: SEEDED_BRAND_IDS.Trek,
    categoryId: SEEDED_CATEGORY_IDS.road,
    condition: 'excellent',
    frameMaterial: 'carbon',
} as const;

export function resolveBikeSlugByTitle(title: string): string | undefined {
    for (const [key, seededTitle] of Object.entries(SEEDED_BIKES)) {
        if (seededTitle === title) {
            return SEEDED_BIKE_SLUGS[key as keyof typeof SEEDED_BIKES];
        }
    }

    return undefined;
}

export function resolveSeededBrandId(brandName: string): string {
    const brandId = SEEDED_BRAND_IDS[brandName];

    if (!brandId) {
        throw new Error(`Unknown seeded brand "${brandName}".`);
    }

    return brandId;
}

const TITLE_TEMPLATES: Record<string, string> = {
    'custom-gravel': 'Custom Gravel Build',
    'edit-target': 'E2E Edit Target',
    'edit-target-updated': 'E2E Edit Target Updated',
    'delete-target': 'E2E Delete Target',
};

const materializedTitles = new Map<string, string>();

export function materializeBikeTitle(key: string): string {
    if (key in SEEDED_BIKES) {
        return SEEDED_BIKES[key as keyof typeof SEEDED_BIKES];
    }

    const existing = materializedTitles.get(key);

    if (existing) {
        return existing;
    }

    const template = TITLE_TEMPLATES[key] ?? key;
    const title = `${template} ${uniqueId()}`;

    materializedTitles.set(key, title);

    return title;
}

export function resolveBikeTitle(key: string): string {
    if (key in SEEDED_BIKES) {
        return SEEDED_BIKES[key as keyof typeof SEEDED_BIKES];
    }

    const materialized = materializedTitles.get(key);

    if (!materialized) {
        throw new Error(
            `Unknown bike key "${key}". Call materializeBikeTitle first or use a seeded key.`,
        );
    }

    return materialized;
}

export function renameBikeTitle(key: string, newTitle: string): void {
    materializedTitles.set(key, newTitle);
}

export function seededBikeTitles(): string[] {
    return Object.values(SEEDED_BIKES);
}
