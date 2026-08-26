import { createBdd, test as base } from 'playwright-bdd';

import { clearScenarioState } from './scenario-state';

export const test = base;

export const { Given, When, Then, Before } = createBdd(test);

Before(async () => {
    clearScenarioState();
});
