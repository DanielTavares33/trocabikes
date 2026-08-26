import { createBdd, test as base } from 'playwright-bdd';

import { resetE2eDatabase } from './artisan';

export const test = base;

export const { Given, When, Then, Before } = createBdd(test);

Before(async () => {
    resetE2eDatabase();
});
