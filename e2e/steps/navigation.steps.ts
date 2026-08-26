import { expect } from '@playwright/test';

import { Given, When, Then } from '../support/fixtures';
import { byTestId, testIds } from '../support/locators';

const headingTestIds: Record<string, string> = {
    'Browse bikes': testIds.bikeCatalogHeading,
    'Find your next ride.': testIds.heroHeading,
};

const linkTestIds: Record<string, string> = {
    'Browse bikes': testIds.heroBrowseBikes,
};

Given('I am on the home page', async ({ page }) => {
    await page.goto('/');
    await expect(byTestId(page, testIds.heroHeading)).toBeVisible();
});

When('I click {string}', async ({ page }, label: string) => {
    const testId = linkTestIds[label];

    if (testId) {
        await byTestId(page, testId).click();

        return;
    }

    await page.getByRole('link', { name: label, exact: true }).first().click();
});

When('I go to {string}', async ({ page }, path: string) => {
    await page.goto(path);
});

Then('I should see the heading {string}', async ({ page }, heading: string) => {
    const testId = headingTestIds[heading];

    if (testId) {
        await expect(byTestId(page, testId)).toBeVisible();

        return;
    }

    await expect(page.getByRole('heading', { name: heading })).toBeVisible();
});

Then('the page URL should contain {string}', async ({ page }, fragment: string) => {
    await expect(page).toHaveURL(new RegExp(fragment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
});
