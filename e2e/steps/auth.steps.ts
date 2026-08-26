import { expect } from '@playwright/test';
import type { Page } from '@playwright/test';

import {
    E2E_BUYER,
    E2E_SELLER,
    E2E_UNVERIFIED,
} from '../support/credentials';
import { uniqueEmail } from '../support/data';
import { Given, When, Then } from '../support/fixtures';
import { byTestId, testIds } from '../support/locators';
import { setRegisteredEmail } from '../support/scenario-state';

async function submitSignIn(
    page: Page,
    email: string,
    password: string,
): Promise<void> {
    await page.goto('/sign-in');
    await page.locator('#email').fill(email);
    await page.locator('#password').fill(password);
    await byTestId(page, testIds.authSignInSubmit).click();
}

Given('I am signed in as the buyer', async ({ page }) => {
    await submitSignIn(page, E2E_BUYER.email, E2E_BUYER.password);
    await expect(page).toHaveURL('/');
});

Given('I am signed in as the seller', async ({ page }) => {
    await submitSignIn(page, E2E_SELLER.email, E2E_SELLER.password);
    await expect(page).toHaveURL('/');
});

When('I sign in as the buyer', async ({ page }) => {
    await submitSignIn(page, E2E_BUYER.email, E2E_BUYER.password);
});

When('I sign in with invalid credentials', async ({ page }) => {
    await submitSignIn(page, E2E_BUYER.email, 'wrong-password');
});

When('I sign in as the unverified user', async ({ page }) => {
    await submitSignIn(page, E2E_UNVERIFIED.email, E2E_UNVERIFIED.password);
});

When('I sign out from the account menu', async ({ page }) => {
    await byTestId(page, testIds.accountMenu).click();
    await byTestId(page, testIds.navLogout).click();
});

When('I register as a new user', async ({ page }) => {
    const email = uniqueEmail('new-user');

    setRegisteredEmail(email);

    await page.goto('/sign-up');
    await page.locator('#name').fill('New User');
    await page.locator('#email').fill(email);
    await page.locator('#password').fill('password123');
    await page.locator('#password_confirmation').fill('password123');
    await byTestId(page, testIds.authSignUpSubmit).click();
});

When(
    'I register with name {string} and email {string}',
    async ({ page }, name: string, email: string) => {
        setRegisteredEmail(email);

        await page.goto('/sign-up');
        await page.locator('#name').fill(name);
        await page.locator('#email').fill(email);
        await page.locator('#password').fill('password123');
        await page.locator('#password_confirmation').fill('password123');
        await byTestId(page, testIds.authSignUpSubmit).click();
    },
);

Then('I should see the sign in link in the navbar', async ({ page }) => {
    await expect(byTestId(page, testIds.navSignIn)).toBeVisible();
});

Then('I should see the account menu', async ({ page }) => {
    await expect(byTestId(page, testIds.accountMenu)).toBeVisible();
});

Then(
    'I should see the error {string}',
    async ({ page }, message: string) => {
        await expect(byTestId(page, testIds.authError)).toHaveText(message);
    },
);

Then('I should see the email verification notice', async ({ page }) => {
    await expect(byTestId(page, testIds.verifyEmailPage)).toBeVisible();
});
