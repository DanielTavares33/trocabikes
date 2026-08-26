import { uniqueId } from './data';

export const SEEDED_BIKES = {
    'canyon-spectral': 'Canyon Spectral CF 7',
    'trek-domane': 'Trek Domane SL 5',
    'specialized-allez': 'Specialized Allez Sprint',
} as const;

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
