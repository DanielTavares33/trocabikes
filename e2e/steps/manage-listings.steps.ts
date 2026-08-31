import { expect } from '@playwright/test';

import { publishedSlug } from './create-listing.steps';
import { Then, When } from './fixtures';
import { myBikeRow } from './locators';
import { openMyBikes } from './session';

When('I edit my bike {string}', async ({ page }, slug: string) => {
  await openMyBikes(page);
  await myBikeRow(page, slug).getByTestId('my-bike-edit').click();
  await expect(page.getByTestId('edit-listing-page')).toBeVisible();
  await expect(page.getByTestId('edit-listing-page')).toHaveAttribute(
    'data-slug',
    slug,
  );
});

When(
  'I update the listing price to {string}',
  async ({ page }, price: string) => {
    await page.getByTestId('bike-form-price').fill(price);
    await page.getByTestId('bike-form-submit').click();
  },
);

Then(
  'I should see the listing price {string}',
  async ({ page }, price: string) => {
    await expect(page.getByTestId('bike-show')).toBeVisible();
    await expect(page.getByTestId('bike-show-price')).toHaveAttribute(
      'data-price',
      price,
    );
  },
);

When('I delete my published listing', async ({ page }) => {
  page.once('dialog', (dialog) => {
    void dialog.accept();
  });
  await page.getByTestId('bike-show-delete').click();
  await expect(page.getByTestId('my-bikes-page')).toBeVisible();
});

Then('I should not see my published listing', async ({ page }) => {
  await expect(myBikeRow(page, publishedSlug)).toHaveCount(0);
});
