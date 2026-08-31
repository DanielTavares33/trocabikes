import { execFileSync } from 'node:child_process';
import {
  accessSync,
  constants,
  existsSync,
  mkdirSync,
  writeFileSync,
} from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function artisan(args: string[]): void {
  execFileSync('php', ['artisan', ...args], {
    cwd: root,
    stdio: 'inherit',
  });
}

function ensureWritableDir(relativePath: string): void {
  const dir = path.join(root, relativePath);

  mkdirSync(dir, { recursive: true });

  try {
    accessSync(dir, constants.W_OK);
  } catch {
    throw new Error(
      `E2E needs a writable ${relativePath}. If Docker owns it, run: sudo chown -R "$(whoami)" ${relativePath}`,
    );
  }
}

function ensureSqliteFile(relativePath: string): void {
  const sqlitePath = path.join(root, relativePath);

  if (!existsSync(sqlitePath)) {
    writeFileSync(sqlitePath, '');
  }
}

export default function globalSetup(): void {
  ensureWritableDir('storage/app/public/e2e');
  ensureSqliteFile('database/e2e.sqlite');

  artisan([
    'migrate:fresh',
    '--seed',
    '--seeder=E2eDatabaseSeeder',
    '--env=e2e',
    '--force',
  ]);

  artisan(['storage:link', '--env=e2e', '--force']);
}
