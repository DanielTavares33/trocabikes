import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
    features: 'e2e/features/**/*.feature',
    steps: ['e2e/support/fixtures.ts', 'e2e/steps/**/*.ts'],
});

const headed = process.argv.some((arg) =>
    ['--headed', '--ui', '--debug'].includes(arg),
);
const debug = process.argv.includes('--debug');

export default defineConfig({
    testDir,
    globalSetup: './e2e/support/global-setup.ts',
    fullyParallel: false,
    workers: 1,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0,
    reporter: [['html', { open: 'never' }], ['line']],
    use: {
        baseURL: 'http://127.0.0.1:8001',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        ...(headed ? { headless: false } : {}),
        ...(headed && !debug ? { launchOptions: { slowMo: 500 } } : {}),
    },
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                ...(headed ? { headless: false } : {}),
                ...(headed && !debug ? { launchOptions: { slowMo: 500 } } : {}),
            },
        },
    ],
    webServer: {
        command:
            'php artisan serve --host=127.0.0.1 --port=8001 --env=e2e --no-reload > /dev/null 2>&1',
        url: 'http://127.0.0.1:8001',
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
        stdout: 'ignore',
        stderr: 'ignore',
    },
});
