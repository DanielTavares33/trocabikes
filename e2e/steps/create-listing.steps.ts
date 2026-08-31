import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { expect } from '@playwright/test';

import { Then, When } from './fixtures';
import { selectBySlug } from './locators';
import { openMyBikes } from './session';

const listingPhoto = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../database/seeders/assets/listing-sample.jpg',
);

let publishedTitle = '';
let publishedSlug = '';

export { publishedSlug, publishedTitle };

When('I publish a new listing', async ({ page }) => {
  publishedTitle = `E2E Orbea Oiz ${Date.now()}`;

  await openMyBikes(page);
  await page.getByTestId('my-bikes-sell').click();
  await expect(page.getByTestId('create-listing-page')).toBeVisible();
  await expect(page.getByTestId('bike-form')).toBeVisible();

  await page.getByTestId('bike-form-title').fill(publishedTitle);
  await selectBySlug(page, 'bike-form-brand', 'trek');
  await selectBySlug(page, 'bike-form-category', 'mountain-bikes-mtb');
  await page.getByTestId('bike-form-condition').selectOption('excellent');
  await page.getByTestId('bike-form-frame').selectOption('aluminum');
  await page
    .getByTestId('bike-form-description')
    .fill('E2E listing for the create-listing journey.');
  await page.getByTestId('bike-form-year').fill('2022');
  await page.getByTestId('bike-form-size').fill('M');
  await page.getByTestId('bike-form-price').fill('1999');
  await page.getByTestId('bike-form-district').fill('Lisboa');
  await page.getByTestId('bike-form-city').fill('Lisboa');
  await page.getByTestId('bike-form-photos').setInputFiles(listingPhoto);
  await page.getByTestId('bike-form-submit').click();
});

Then('I should see the published listing', async ({ page }) => {
  await expect(page.getByTestId('bike-show')).toBeVisible();
  await expect(page.getByTestId('bike-show-title')).toHaveText(publishedTitle);
  publishedSlug =
    (await page.getByTestId('bike-show').getAttribute('data-slug')) ?? '';
});
