import { expect } from '@playwright/test';

import { seededBikeTitles } from '../support/catalog';
import { Given, When, Then } from '../support/fixtures';

Given('the seeded catalog bikes are visible', async ({ page }) => {
    await page.goto('/bikes');

    for (const title of seededBikeTitles()) {
        await expect(page.getByText(title).first()).toBeVisible();
    }
});

When('I open the bike catalog', async ({ page }) => {
    await page.goto('/bikes');
});

When('I click the bike card {string}', async ({ page }, title: string) => {
    await page.getByRole('link', { name: new RegExp(title) }).first().click();
});

When('I filter bikes by brand {string}', async ({ page }, brand: string) => {
    await page.getByLabel('Filter by brand').selectOption({ label: brand });
    await page.getByRole('button', { name: 'Apply filters' }).click();
});

When('I clear bike filters', async ({ page }) => {
    await page.getByRole('button', { name: 'Clear filters' }).click();
});

Then('I should see the bike {string}', async ({ page }, title: string) => {
    await expect(page.getByText(title).first()).toBeVisible();
});

Then('I should not see the bike {string}', async ({ page }, title: string) => {
    await expect(
        page.getByRole('heading', { name: title, level: 3 }),
    ).toHaveCount(0);
});

Then('the seeded catalog bikes should be visible', async ({ page }) => {
    for (const title of seededBikeTitles()) {
        await expect(page.getByText(title).first()).toBeVisible();
    }
});
