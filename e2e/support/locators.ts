import type { Page } from '@playwright/test';

export function myBikeCard(page: Page, title: string) {
    return page.locator('div.group').filter({
        has: page.getByRole('heading', { name: title, level: 3 }),
    });
}
