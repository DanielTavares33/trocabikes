import { expect } from '@playwright/test';

import { When, Then } from '../support/fixtures';

When('I open my profile', async ({ page }) => {
    await page.getByRole('button', { name: 'Account menu' }).click();
    await page.getByRole('link', { name: 'Profile' }).click();
});

When('I update my profile name to {string}', async ({ page }, name: string) => {
    await page.getByLabel('Name').fill(name);
    await page.getByLabel('Phone').fill('+351912345678');
    await page.getByRole('button', { name: 'Save Changes' }).click();
});

Then('I should see a success toast {string}', async ({ page }, message: string) => {
    await expect(page.getByText(message)).toBeVisible();
});

Then('my profile should show the name {string}', async ({ page }, name: string) => {
    await expect(page.getByLabel('Name')).toHaveValue(name);
});
