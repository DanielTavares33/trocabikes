import type { Page } from '@playwright/test';

export const testIds = {
    navSignIn: 'nav-sign-in',
    navSignUp: 'nav-sign-up',
    accountMenu: 'account-menu',
    navProfile: 'nav-profile',
    navMyBikes: 'nav-my-bikes',
    navLogout: 'nav-logout',
    authSignInSubmit: 'auth-sign-in-submit',
    authSignUpSubmit: 'auth-sign-up-submit',
    authError: 'auth-error',
    verifyEmailPage: 'verify-email-page',
    heroHeading: 'hero-heading',
    heroBrowseBikes: 'hero-browse-bikes',
    bikeCatalogHeading: 'bike-catalog-heading',
    bikeFilterBrand: 'bike-filter-brand',
    bikeFilterApply: 'bike-filter-apply',
    bikeFilterClear: 'bike-filter-clear',
    bikeDetailTitle: 'bike-detail-title',
    bikeFormSubmit: 'bike-form-submit',
    myBikeCard: 'my-bike-card',
    myBikeEdit: 'my-bike-edit',
    myBikeDelete: 'my-bike-delete',
    profileSave: 'profile-save',
    toast: 'toast',
} as const;

export function byTestId(page: Page, testId: string) {
    return page.getByTestId(testId);
}

export function bikeCard(page: Page, slug: string) {
    return page.getByTestId(`bike-card-${slug}`);
}

export function myBikeCard(page: Page, title: string) {
    return page.getByTestId(testIds.myBikeCard).filter({
        has: page.getByRole('heading', { name: title, level: 3 }),
    });
}
