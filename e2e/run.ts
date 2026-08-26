import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const extraArgs = process.argv.slice(2);
const headed = extraArgs.some((arg) =>
    ['--headed', '--ui', '--debug'].includes(arg),
);

if (headed && existsSync('/.dockerenv')) {
    console.error(`
Headed Playwright cannot show a browser inside Docker.

Run this on your host (not via make e2e / docker compose exec):

  make e2e-fix-perms
  bunx playwright install chromium
  bun run test:e2e:headed -- --grep "Buyer signs in"
`);
    process.exit(1);
}

const generate = spawnSync('bunx', ['bddgen'], { stdio: 'inherit' });

if (generate.status !== 0) {
    process.exit(generate.status ?? 1);
}

const test = spawnSync('bunx', ['playwright', 'test', ...extraArgs], {
    stdio: 'inherit',
});

process.exit(test.status ?? 1);
