export function uniqueId(): string {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function uniqueEmail(prefix = 'e2e'): string {
    return `${prefix}-${uniqueId()}@trocabikes.test`;
}

export function uniqueDisplayName(prefix = 'E2E User'): string {
    return `${prefix} ${uniqueId()}`;
}
