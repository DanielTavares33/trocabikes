import { expect } from '@playwright/test';

import { Given, When, Then } from '../support/fixtures';

Given('I am on the home page', async ({ page }) => {
    await page.goto('/');
    await expect(
        page.getByRole('heading', { name: 'Find your next ride.' }),
    ).toBeVisible();
});

When('I click {string}', async ({ page }, label: string) => {
    await page.getByRole('link', { name: label, exact: true }).first().click();
});

When('I go to {string}', async ({ page }, path: string) => {
    await page.goto(path);
});

Then('I should see the heading {string}', async ({ page }, heading: string) => {
    await expect(page.getByRole('heading', { name: heading })).toBeVisible();
});

Then('the page URL should contain {string}', async ({ page }, fragment: string) => {
    await expect(page).toHaveURL(new RegExp(fragment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
});
