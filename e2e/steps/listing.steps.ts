import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

import {
    materializeBikeTitle,
    renameBikeTitle,
    resolveBikeTitle,
} from '../support/catalog';
import { When, Then } from '../support/fixtures';
import { myBikeCard } from '../support/locators';

const samplePhoto = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '../../database/seeders/assets/listing-sample.jpg',
);

async function fillBikeListingForm(page: Page, title: string): Promise<void> {
    await page.getByLabel('Title').fill(title);
    await page.locator('#brand').selectOption({ label: 'Trek' });
    await page.locator('#category').selectOption({ label: 'Road Bikes' });
    await page.getByLabel('Description').fill(
        'Well maintained bike ready for a new owner.',
    );
    await page.getByLabel('Price').fill('1500');
    await page.locator('#condition').selectOption({ label: 'Excelente' });
    await page.getByLabel('Year').fill('2023');
    await page.getByLabel('Size').fill('M');
    await page.locator('#frame_material').selectOption({ label: 'Carbon' });
    await page.getByLabel('District').fill('Lisboa');
    await page.getByLabel('City').fill('Lisboa');
    await page.locator('#photos').setInputFiles(samplePhoto);
}

When('I start selling a bike', async ({ page }) => {
    await page.goto('/bikes/create');
});

When(
    'I fill in a new bike listing titled {string}',
    async ({ page }, title: string) => {
        await fillBikeListingForm(page, title);
    },
);

When(
    'I fill in a new bike listing with key {string}',
    async ({ page }, key: string) => {
        const title = materializeBikeTitle(key);

        await fillBikeListingForm(page, title);
    },
);

When('I publish the bike listing', async ({ page }) => {
    await page.getByRole('button', { name: 'Publish bike' }).click();
});

When('I open my bikes', async ({ page }) => {
    await page.getByRole('button', { name: 'Account menu' }).click();
    await page.getByRole('link', { name: 'My Bikes' }).click();
});

When(
    'I edit the bike {string} title to {string}',
    async ({ page }, currentTitle: string, newTitle: string) => {
        const card = myBikeCard(page, currentTitle);

        await card.getByRole('link', { name: 'Edit' }).click();
        await expect(page.getByLabel('Title')).toHaveValue(currentTitle);
        await page.getByLabel('Title').fill(newTitle);
        await page.getByRole('button', { name: 'Save changes' }).click();
    },
);

When(
    'I edit the bike with key {string} to title key {string}',
    async ({ page }, sourceKey: string, targetKey: string) => {
        const currentTitle = resolveBikeTitle(sourceKey);
        const newTitle = materializeBikeTitle(targetKey);
        const card = myBikeCard(page, currentTitle);

        await card.getByRole('link', { name: 'Edit' }).click();
        await expect(page.getByLabel('Title')).toHaveValue(currentTitle);
        await page.getByLabel('Title').fill(newTitle);
        await page.getByRole('button', { name: 'Save changes' }).click();

        renameBikeTitle(sourceKey, newTitle);
        renameBikeTitle(targetKey, newTitle);
    },
);

When('I delete the bike {string}', async ({ page }, title: string) => {
    page.once('dialog', (dialog) => dialog.accept());

    const card = myBikeCard(page, title);

    await card.getByRole('button', { name: 'Delete' }).click();
});

When('I delete the bike with key {string}', async ({ page }, key: string) => {
    const title = resolveBikeTitle(key);

    page.once('dialog', (dialog) => dialog.accept());

    const card = myBikeCard(page, title);

    await card.getByRole('button', { name: 'Delete' }).click();
});

Then('I should be on the bike detail page for {string}', async ({ page }, title: string) => {
    await expect(page.getByRole('heading', { name: title })).toBeVisible();
});

Then(
    'I should be on the bike detail page for key {string}',
    async ({ page }, key: string) => {
        const title = resolveBikeTitle(key);

        await expect(page.getByRole('heading', { name: title })).toBeVisible();
    },
);

Then('the bike {string} should not appear in my bikes', async ({ page }, title: string) => {
    await expect(page.getByRole('heading', { name: title })).toHaveCount(0);
});

Then(
    'the bike with key {string} should not appear in my bikes',
    async ({ page }, key: string) => {
        const title = resolveBikeTitle(key);

        await expect(page.getByRole('heading', { name: title })).toHaveCount(0);
    },
);
