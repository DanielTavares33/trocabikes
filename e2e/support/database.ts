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

function runArtisan(command: string): void {
    const verbose = process.env.E2E_VERBOSE === '1';
    const stdio = verbose ? 'inherit' : 'pipe';

    try {
        execSync(command, {
            cwd: projectRoot,
            stdio,
            env: e2eEnv,
        });
    } catch (error) {
        if (!verbose && error instanceof Error && 'stdout' in error) {
            const execError = error as Error & {
                stdout?: Buffer;
                stderr?: Buffer;
            };

            if (execError.stdout?.length) {
                process.stderr.write(execError.stdout);
            }

            if (execError.stderr?.length) {
                process.stderr.write(execError.stderr);
            }
        }

        throw error;
    }
}

export function prepareE2eDatabase(): void {
    runArtisan('touch database/e2e.sqlite');
    runArtisan(
        'php artisan storage:link --force --env=e2e 2>/dev/null || true',
    );
    runArtisan(
        'php artisan migrate:fresh --seed --seeder=E2eDatabaseSeeder --force --env=e2e --no-ansi',
    );
}
