import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
    features: 'e2e/features/**/*.feature',
    steps: ['e2e/support/fixtures.ts', 'e2e/steps/**/*.ts'],
});

export default defineConfig({
    testDir,
    fullyParallel: false,
    workers: 1,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0,
    reporter: [['html', { open: 'never' }], ['list']],
    use: {
        baseURL: 'http://127.0.0.1:8001',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
    webServer: {
        command:
            'php artisan storage:link --force --env=e2e 2>/dev/null || true && php artisan migrate:fresh --seed --seeder=E2eDatabaseSeeder --force --env=e2e && php artisan serve --host=127.0.0.1 --port=8001 --env=e2e',
        url: 'http://127.0.0.1:8001',
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
        stdout: 'pipe',
        stderr: 'pipe',
    },
});
