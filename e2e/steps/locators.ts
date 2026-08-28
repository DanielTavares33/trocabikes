import type { Locator, Page } from '@playwright/test';

export function bikeCard(parent: Locator, slug: string): Locator {
  return parent.locator(`[data-testid="bike-card"][data-slug="${slug}"]`);
}

export function catalogBike(page: Page, slug: string): Locator {
  return bikeCard(page.getByTestId('bike-grid'), slug);
}

export function recentBike(page: Page, slug: string): Locator {
  return bikeCard(page.getByTestId('home-recent-bikes'), slug);
}

export function myBikeRow(page: Page, slug: string): Locator {
  return page.locator(`[data-testid="my-bike-row"][data-slug="${slug}"]`);
}

export async function selectBySlug(
  page: Page,
  testId: string,
  slug: string,
): Promise<void> {
  const select = page.getByTestId(testId);
  const value = await select
    .locator(`option[data-slug="${slug}"]`)
    .getAttribute('value');

  if (value === null) {
    throw new Error(`No option with data-slug="${slug}" in [${testId}].`);
  }

  await select.selectOption(value);
}
