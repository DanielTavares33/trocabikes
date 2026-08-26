import { expect } from '@playwright/test';

import { uniqueDisplayName } from '../support/data';
import { When, Then } from '../support/fixtures';
import {
    getProfileDisplayName,
    setProfileDisplayName,
} from '../support/scenario-state';

When('I open my profile', async ({ page }) => {
    await page.getByRole('button', { name: 'Account menu' }).click();
    await page.getByRole('link', { name: 'Profile' }).click();
});

When('I update my profile name to {string}', async ({ page }, name: string) => {
    setProfileDisplayName(name);

    await page.getByLabel('Name').fill(name);
    await page.getByLabel('Phone').fill('+351912345678');
    await page.getByRole('button', { name: 'Save Changes' }).click();
});

When('I update my profile with a unique display name', async ({ page }) => {
    const name = uniqueDisplayName('Updated Buyer');

    setProfileDisplayName(name);

    await page.getByLabel('Name').fill(name);
    await page.getByLabel('Phone').fill('+351912345678');
    await page.getByRole('button', { name: 'Save Changes' }).click();
});

Then('I should see a success toast {string}', async ({ page }, message: string) => {
    await expect(
        page.getByRole('status').filter({ hasText: message }),
    ).toBeVisible();
});

Then('my profile should show the name {string}', async ({ page }, name: string) => {
    await expect(page.getByLabel('Name')).toHaveValue(name);
});

Then('my profile should show my updated display name', async ({ page }) => {
    await expect(page.getByLabel('Name')).toHaveValue(getProfileDisplayName());
});
