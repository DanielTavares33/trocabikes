import { expect } from '@playwright/test';

import {
    resolveBikeSlugByTitle,
    resolveSeededBrandId,
    seededBikeTitles,
} from '../support/catalog';
import { Given, When, Then } from '../support/fixtures';
import { bikeCard, byTestId, testIds } from '../support/locators';

Given('the seeded catalog bikes are visible', async ({ page }) => {
    await page.goto('/bikes');

    for (const title of seededBikeTitles()) {
        const slug = resolveBikeSlugByTitle(title);

        if (!slug) {
            throw new Error(`No seeded slug found for bike title "${title}".`);
        }

        await expect(bikeCard(page, slug)).toBeVisible();
    }
});

When('I open the bike catalog', async ({ page }) => {
    await page.goto('/bikes');
});

When('I click the bike card {string}', async ({ page }, title: string) => {
    const slug = resolveBikeSlugByTitle(title);

    if (!slug) {
        throw new Error(`No seeded slug found for bike title "${title}".`);
    }

    await bikeCard(page, slug).click();
});

When('I filter bikes by brand {string}', async ({ page }, brand: string) => {
    await byTestId(page, testIds.bikeFilterBrand).selectOption({
        value: resolveSeededBrandId(brand),
    });
    await byTestId(page, testIds.bikeFilterApply).click();
});

When('I clear bike filters', async ({ page }) => {
    await byTestId(page, testIds.bikeFilterClear).click();
});

Then('I should see the bike {string}', async ({ page }, title: string) => {
    const slug = resolveBikeSlugByTitle(title);

    if (slug) {
        await expect(bikeCard(page, slug)).toBeVisible();

        return;
    }

    await expect(
        page.getByRole('heading', { name: title, level: 3 }),
    ).toBeVisible();
});

Then('I should not see the bike {string}', async ({ page }, title: string) => {
    const slug = resolveBikeSlugByTitle(title);

    if (slug) {
        await expect(bikeCard(page, slug)).toHaveCount(0);

        return;
    }

    await expect(
        page.getByRole('heading', { name: title, level: 3 }),
    ).toHaveCount(0);
});

Then('the seeded catalog bikes should be visible', async ({ page }) => {
    for (const title of seededBikeTitles()) {
        const slug = resolveBikeSlugByTitle(title);

        if (!slug) {
            throw new Error(`No seeded slug found for bike title "${title}".`);
        }

        await expect(bikeCard(page, slug)).toBeVisible();
    }
});
