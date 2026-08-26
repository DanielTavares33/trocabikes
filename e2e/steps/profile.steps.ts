import { expect } from '@playwright/test';

import { uniqueDisplayName } from '../support/data';
import { When, Then } from '../support/fixtures';
import { byTestId, testIds } from '../support/locators';
import {
    getProfileDisplayName,
    setProfileDisplayName,
} from '../support/scenario-state';

When('I open my profile', async ({ page }) => {
    await byTestId(page, testIds.accountMenu).click();
    await byTestId(page, testIds.navProfile).click();
});

When('I update my profile name to {string}', async ({ page }, name: string) => {
    setProfileDisplayName(name);

    await page.locator('#name').fill(name);
    await page.locator('#phone').fill('+351912345678');
    await byTestId(page, testIds.profileSave).click();
});

When('I update my profile with a unique display name', async ({ page }) => {
    const name = uniqueDisplayName('Updated Buyer');

    setProfileDisplayName(name);

    await page.locator('#name').fill(name);
    await page.locator('#phone').fill('+351912345678');
    await byTestId(page, testIds.profileSave).click();
});

Then('I should see a success toast {string}', async ({ page }, message: string) => {
    await expect(byTestId(page, testIds.toast)).toContainText(message);
});

Then('my profile should show the name {string}', async ({ page }, name: string) => {
    await expect(page.locator('#name')).toHaveValue(name);
});

Then('my profile should show my updated display name', async ({ page }) => {
    await expect(page.locator('#name')).toHaveValue(getProfileDisplayName());
});
