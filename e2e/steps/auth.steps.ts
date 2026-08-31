import { expect } from '@playwright/test';

import { Given, Then, When } from './fixtures';
import { openAccountMenu, signInAsSeller, submitSellerSignIn } from './session';

let registeredEmail = '';

Given('I am signed in as the seller', async ({ page }) => {
  await signInAsSeller(page);
});

When('I sign in as the seller', async ({ page }) => {
  await submitSellerSignIn(page);
});

When('I sign out', async ({ page }) => {
  await openAccountMenu(page);
  await page.getByTestId('nav-logout').click();
});

Then('I should be signed in', async ({ page }) => {
  await expect(page.getByTestId('nav-account-menu')).toBeVisible();
  await expect(page.getByTestId('nav-sign-in')).toHaveCount(0);
});

Then('I should be signed out', async ({ page }) => {
  await expect(page.getByTestId('nav-sign-in')).toBeVisible();
  await expect(page.getByTestId('nav-account-menu')).toHaveCount(0);
});

When('I register with a unique email', async ({ page }) => {
  registeredEmail = `e2e-${Date.now()}@example.com`;

  await page.getByTestId('nav-sign-up').click();
  await expect(page.getByTestId('sign-up-form')).toBeVisible();
  await page.getByTestId('sign-up-name').fill('E2E New User');
  await page.getByTestId('sign-up-email').fill(registeredEmail);
  await page.getByTestId('sign-up-password').fill('password');
  await page.getByTestId('sign-up-password-confirmation').fill('password');
  await page.getByTestId('sign-up-submit').click();
});

Then(
  'I should see the email verification notice for that address',
  async ({ page }) => {
    await expect(page.getByTestId('verify-email-page')).toBeVisible();
    await expect(page.getByTestId('verify-email-address')).toHaveText(
      registeredEmail,
    );
  },
);
