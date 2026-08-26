import { execSync } from 'node:child_process';
import { rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '../..',
);

export function resetE2eDatabase(): void {
    execSync(
        'php artisan migrate:fresh --seed --seeder=E2eDatabaseSeeder --force --env=e2e',
        {
            cwd: projectRoot,
            stdio: 'inherit',
            env: {
                ...process.env,
                APP_ENV: 'e2e',
            },
        },
    );

    for (const directory of ['bikes', 'avatars']) {
        const target = path.join(
            projectRoot,
            'storage',
            'app',
            'public',
            directory,
        );

        rmSync(target, { recursive: true, force: true });
    }
}
