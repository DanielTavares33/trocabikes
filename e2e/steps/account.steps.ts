import { expect } from '@playwright/test';

import { Then, When } from './fixtures';
import { myBikeRow } from './locators';
import { openAccountMenu, openMyBikes } from './session';

When('I open my profile', async ({ page }) => {
  await openAccountMenu(page);
  await page.getByTestId('nav-profile').click();
  await expect(page.getByTestId('profile-page')).toBeVisible();
});

Then(
  'I should see the profile name {string}',
  async ({ page }, name: string) => {
    await expect(page.getByTestId('profile-name')).toHaveValue(name);
  },
);

When('I open my bikes', async ({ page }) => {
  await openMyBikes(page);
});

Then('I should see my bike {string}', async ({ page }, slug: string) => {
  await expect(myBikeRow(page, slug)).toBeVisible();
});
