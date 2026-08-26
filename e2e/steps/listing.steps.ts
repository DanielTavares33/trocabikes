import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

import {
    E2E_FORM_VALUES,
    materializeBikeTitle,
    renameBikeTitle,
    resolveBikeTitle,
} from '../support/catalog';
import { When, Then } from '../support/fixtures';
import { byTestId, myBikeCard, testIds } from '../support/locators';

const samplePhoto = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '../../database/seeders/assets/listing-sample.jpg',
);

async function fillBikeListingForm(page: Page, title: string): Promise<void> {
    await page.locator('#title').fill(title);
    await page
        .locator('#brand')
        .selectOption({ value: E2E_FORM_VALUES.brandId });
    await page
        .locator('#category')
        .selectOption({ value: E2E_FORM_VALUES.categoryId });
    await page.locator('#description').fill(
        'Well maintained bike ready for a new owner.',
    );
    await page.locator('#price').fill('1500');
    await page
        .locator('#condition')
        .selectOption({ value: E2E_FORM_VALUES.condition });
    await page.locator('#year').fill('2023');
    await page.locator('#size').fill('M');
    await page
        .locator('#frame_material')
        .selectOption({ value: E2E_FORM_VALUES.frameMaterial });
    await page.locator('#district').fill('Lisboa');
    await page.locator('#city').fill('Lisboa');
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
    await byTestId(page, testIds.bikeFormSubmit).click();
});

When('I open my bikes', async ({ page }) => {
    await byTestId(page, testIds.accountMenu).click();
    await byTestId(page, testIds.navMyBikes).click();
});

When(
    'I edit the bike {string} title to {string}',
    async ({ page }, currentTitle: string, newTitle: string) => {
        const card = myBikeCard(page, currentTitle);

        await card.getByTestId(testIds.myBikeEdit).click();
        await expect(page.locator('#title')).toHaveValue(currentTitle);
        await page.locator('#title').fill(newTitle);
        await byTestId(page, testIds.bikeFormSubmit).click();
    },
);

When(
    'I edit the bike with key {string} to title key {string}',
    async ({ page }, sourceKey: string, targetKey: string) => {
        const currentTitle = resolveBikeTitle(sourceKey);
        const newTitle = materializeBikeTitle(targetKey);
        const card = myBikeCard(page, currentTitle);

        await card.getByTestId(testIds.myBikeEdit).click();
        await expect(page.locator('#title')).toHaveValue(currentTitle);
        await page.locator('#title').fill(newTitle);
        await byTestId(page, testIds.bikeFormSubmit).click();

        renameBikeTitle(sourceKey, newTitle);
        renameBikeTitle(targetKey, newTitle);
    },
);

When('I delete the bike {string}', async ({ page }, title: string) => {
    page.once('dialog', (dialog) => dialog.accept());

    const card = myBikeCard(page, title);

    await card.getByTestId(testIds.myBikeDelete).click();
});

When('I delete the bike with key {string}', async ({ page }, key: string) => {
    const title = resolveBikeTitle(key);

    page.once('dialog', (dialog) => dialog.accept());

    const card = myBikeCard(page, title);

    await card.getByTestId(testIds.myBikeDelete).click();
});

Then('I should be on the bike detail page for {string}', async ({ page }, title: string) => {
    await expect(byTestId(page, testIds.bikeDetailTitle)).toHaveText(title);
});

Then(
    'I should be on the bike detail page for key {string}',
    async ({ page }, key: string) => {
        const title = resolveBikeTitle(key);

        await expect(byTestId(page, testIds.bikeDetailTitle)).toHaveText(title);
    },
);

Then('the bike {string} should not appear in my bikes', async ({ page }, title: string) => {
    await expect(myBikeCard(page, title)).toHaveCount(0);
});

Then(
    'the bike with key {string} should not appear in my bikes',
    async ({ page }, key: string) => {
        const title = resolveBikeTitle(key);

        await expect(myBikeCard(page, title)).toHaveCount(0);
    },
);
