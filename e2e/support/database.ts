import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const projectRoot = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '../..',
);

const e2eEnv: NodeJS.ProcessEnv = {
    ...process.env,
    APP_ENV: 'e2e',
};

export function prepareE2eDatabase(): void {
    execSync('touch database/e2e.sqlite', {
        cwd: projectRoot,
        stdio: 'inherit',
        env: e2eEnv,
    });

    execSync(
        'php artisan storage:link --force --env=e2e 2>/dev/null || true',
        {
            cwd: projectRoot,
            stdio: 'inherit',
            env: e2eEnv,
        },
    );

    execSync(
        'php artisan migrate:fresh --seed --seeder=E2eDatabaseSeeder --force --env=e2e',
        {
            cwd: projectRoot,
            stdio: 'inherit',
            env: e2eEnv,
        },
    );
}
