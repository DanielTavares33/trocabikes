import { expect } from '@playwright/test';

import { Given, When, Then } from '../support/fixtures';

Given('there are seeded bikes in the catalog', async ({ page }) => {
    await page.goto('/bikes');
    await expect(page.getByText('3 bikes found')).toBeVisible();
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

Then('I should see {string} bikes found', async ({ page }, count: string) => {
    await expect(page.getByText(`${count} bikes found`)).toBeVisible();
});
