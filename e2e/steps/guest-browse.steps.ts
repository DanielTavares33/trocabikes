import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

import { Given, Then, When } from './fixtures';
import {
  catalogBike,
  homeCategory,
  recentBike,
  selectBySlug,
} from './locators';

async function gotoHome(page: Page): Promise<void> {
  await page.goto('/');
  await expect(page.getByTestId('home-recent-bikes')).toBeVisible();
}

Given('I am a guest', async ({ context }) => {
  await context.clearCookies();
});

When('I visit the home page', async ({ page }) => {
  await gotoHome(page);
});

Given('I am on the home page', async ({ page }) => {
  await gotoHome(page);
});

Then(
  'I should see the recent bike {string}',
  async ({ page }, slug: string) => {
    await expect(recentBike(page, slug)).toBeVisible();
  },
);

When('I open the catalog from home', async ({ page }) => {
  await page.getByTestId('home-browse-bikes').click();
  await expect(page.getByTestId('catalog-page')).toBeVisible();
});

Then('I should be on the catalog page', async ({ page }) => {
  await expect(page.getByTestId('catalog-page')).toBeVisible();
});

Then(
  'I should see the catalog bike {string}',
  async ({ page }, slug: string) => {
    await expect(catalogBike(page, slug)).toBeVisible();
  },
);

Given('I am on the catalog page', async ({ page }) => {
  await page.goto('/bikes');
  await expect(page.getByTestId('catalog-page')).toBeVisible();
});

When(
  'I filter the catalog by brand {string}',
  async ({ page }, slug: string) => {
    await selectBySlug(page, 'filter-brand', slug);
    await page.getByTestId('filter-apply').click();
    await expect(page).toHaveURL(/bike_brand_id=/);
    await expect(page.getByTestId('bike-grid')).toBeVisible();
  },
);

When(
  'I filter the catalog by category {string}',
  async ({ page }, slug: string) => {
    await selectBySlug(page, 'filter-category', slug);
    await page.getByTestId('filter-apply').click();
    await expect(page).toHaveURL(/bike_category_id=/);
    await expect(page.getByTestId('bike-grid')).toBeVisible();
  },
);

Then(
  'I should not see the catalog bike {string}',
  async ({ page }, slug: string) => {
    await expect(catalogBike(page, slug)).toHaveCount(0);
  },
);

When('I open the catalog bike {string}', async ({ page }, slug: string) => {
  await catalogBike(page, slug).click();
});

When('I search from home for {string}', async ({ page }, query: string) => {
  await page.getByTestId('home-search-q').fill(query);
  await page.getByTestId('home-search-submit').click();
  await expect(page.getByTestId('catalog-page')).toBeVisible();
  await expect(page).toHaveURL(/[?&]q=/);
});

When('I open the home category {string}', async ({ page }, slug: string) => {
  await homeCategory(page, slug).click();
  await expect(page.getByTestId('catalog-page')).toBeVisible();
  await expect(page).toHaveURL(/bike_category_id=/);
});

Then(
  'I should be on the bike listing {string}',
  async ({ page }, slug: string) => {
    await expect(page.getByTestId('bike-show')).toHaveAttribute(
      'data-slug',
      slug,
    );
  },
);
