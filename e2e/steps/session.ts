import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export const seller = {
  email: 'seller@trocabikes.test',
  name: 'E2E Seller',
  password: 'password',
} as const;

export async function submitSellerSignIn(page: Page): Promise<void> {
  await page.getByTestId('nav-sign-in').click();
  await expect(page.getByTestId('sign-in-form')).toBeVisible();
  await page.getByTestId('sign-in-email').fill(seller.email);
  await page.getByTestId('sign-in-password').fill(seller.password);
  await page.getByTestId('sign-in-submit').click();
}

export async function signInAsSeller(page: Page): Promise<void> {
  await page.goto('/');
  await expect(page.getByTestId('home-recent-bikes')).toBeVisible();
  await submitSellerSignIn(page);
  await expect(page.getByTestId('nav-account-menu')).toBeVisible();
}

export async function openAccountMenu(page: Page): Promise<void> {
  await page.getByTestId('nav-account-menu').click();
  await expect(page.getByTestId('nav-logout')).toBeVisible();
}

export async function openMyBikes(page: Page): Promise<void> {
  await openAccountMenu(page);
  await page.getByTestId('nav-my-bikes').click();
  await expect(page.getByTestId('my-bikes-page')).toBeVisible();
}
