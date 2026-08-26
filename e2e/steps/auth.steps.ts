import { expect } from '@playwright/test';

import {
    E2E_BUYER,
    E2E_SELLER,
    E2E_UNVERIFIED,
} from '../support/credentials';
import { Given, When, Then } from '../support/fixtures';

Given('I am signed in as the buyer', async ({ page }) => {
    await page.goto('/sign-in');
    await page.getByLabel('Email').fill(E2E_BUYER.email);
    await page.getByLabel('Password').fill(E2E_BUYER.password);
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page).toHaveURL('/');
});

Given('I am signed in as the seller', async ({ page }) => {
    await page.goto('/sign-in');
    await page.getByLabel('Email').fill(E2E_SELLER.email);
    await page.getByLabel('Password').fill(E2E_SELLER.password);
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page).toHaveURL('/');
});

When('I sign in as the buyer', async ({ page }) => {
    await page.goto('/sign-in');
    await page.getByLabel('Email').fill(E2E_BUYER.email);
    await page.getByLabel('Password').fill(E2E_BUYER.password);
    await page.getByRole('button', { name: 'Sign in' }).click();
});

When('I sign in with invalid credentials', async ({ page }) => {
    await page.goto('/sign-in');
    await page.getByLabel('Email').fill(E2E_BUYER.email);
    await page.getByLabel('Password').fill('wrong-password');
    await page.getByRole('button', { name: 'Sign in' }).click();
});

When('I sign in as the unverified user', async ({ page }) => {
    await page.goto('/sign-in');
    await page.getByLabel('Email').fill(E2E_UNVERIFIED.email);
    await page.getByLabel('Password').fill(E2E_UNVERIFIED.password);
    await page.getByRole('button', { name: 'Sign in' }).click();
});

When('I sign out from the account menu', async ({ page }) => {
    await page.getByRole('button', { name: 'Account menu' }).click();
    await page.getByRole('button', { name: 'Logout' }).click();
});

When(
    'I register with name {string} and email {string}',
    async ({ page }, name: string, email: string) => {
        await page.goto('/sign-up');
        await page.getByLabel('Full name').fill(name);
        await page.getByLabel('Email').fill(email);
        await page.getByLabel('Password', { exact: true }).fill('password123');
        await page.getByLabel('Confirm password').fill('password123');
        await page.getByRole('button', { name: 'Create account' }).click();
    },
);

Then('I should see the sign in link in the navbar', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Sign in' })).toBeVisible();
});

Then('I should see the account menu', async ({ page }) => {
    await expect(
        page.getByRole('button', { name: 'Account menu' }),
    ).toBeVisible();
});

Then(
    'I should see the error {string}',
    async ({ page }, message: string) => {
        await expect(page.getByText(message)).toBeVisible();
    },
);

Then('I should see the email verification notice', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Check your email' })).toBeVisible();
});
