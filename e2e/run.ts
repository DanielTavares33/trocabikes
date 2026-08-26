import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const extraArgs = process.argv.slice(2).filter((arg) => arg !== '--');
const headed =
    process.env.HEADED === '1' ||
    extraArgs.some((arg) => ['--headed', '--ui', '--debug'].includes(arg));

function hasGraphicalDisplay(): boolean {
    if (process.platform === 'darwin' || process.platform === 'win32') {
        return true;
    }

    return Boolean(process.env.DISPLAY || process.env.WAYLAND_DISPLAY);
}

if (headed && existsSync('/.dockerenv')) {
    console.error(`
Headed Playwright cannot show a browser inside Docker.

On your host machine (not docker compose exec / make e2e):

  make e2e-fix-perms
  bunx playwright install --with-deps chromium
  bun run test:e2e:headed -- --grep "Buyer signs in"
`);
    process.exit(1);
}

if (headed && !hasGraphicalDisplay()) {
    console.error(`
No graphical display (DISPLAY / WAYLAND_DISPLAY is empty).

Playwright can only show a window in a desktop session.
If this is SSH, WSL without WSLg, or a CI runner, headed mode will not work.

Install system libs, then run from a local desktop terminal:

  sudo bunx playwright install-deps chromium
  bun run test:e2e:headed -- --grep "Buyer signs in"
`);
    process.exit(1);
}

const generate = spawnSync('bunx', ['bddgen'], { stdio: 'inherit' });

if (generate.status !== 0) {
    process.exit(generate.status ?? 1);
}

const playwrightArgs = ['playwright', 'test', ...extraArgs];

if (headed && !playwrightArgs.includes('--headed') && !playwrightArgs.includes('--ui') && !playwrightArgs.includes('--debug')) {
    playwrightArgs.push('--headed');
}

if (headed) {
    console.log('Opening headed Chromium on this machine (slowMo 800ms)…');
}

const test = spawnSync('bunx', playwrightArgs, {
    stdio: 'inherit',
    env: {
        ...process.env,
        HEADED: headed ? '1' : process.env.HEADED,
        ...(headed ? { CI: '' } : {}),
    },
});

process.exit(test.status ?? 1);
