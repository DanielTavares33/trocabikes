---
paths:
  - 'e2e/**'
  - 'playwright.config.ts'
---

# E2E

## Playwright e2e uses suite-scoped sqlite and testids
E2E uses `.env.e2e` and `database/e2e.sqlite` (gitignored). Seed once per suite in `globalSetup` with `E2eDatabaseSeeder` — fillers first with older `created_at`, named fixtures last so they appear on home and catalog page 1. Do not use Pest `:memory:` or `RefreshDatabase` for Playwright. Locators must be i18n-safe (`data-testid`, `data-slug`, enum/query values); never `getByText`, `getByLabel`, `getByRole` name, or option labels. Store listing images under `storage/app/public/e2e`. Sign in through the UI each scenario (no `storageState`); register once per suite with a unique email.

## Playwright webServer readiness uses port, not URL
Playwright starts `webServer` before `globalSetup`. On a fresh clone, `/` returns 500 until `database/e2e.sqlite` is migrated, so `webServer.url` never becomes ready and CI times out. Use `webServer.port` (or stdout wait); keep DB setup in `globalSetup`.

## E2E tags filter scenarios by domain
Tag features (or scenarios) in Gherkin; playwright-bdd emits Playwright `{ tag: [...] }` on each test. Feature tags apply to all scenarios in that file. Current tags: `@browse` (guest marketplace), `@auth` / `@register`, `@listings`, `@account`, `@guest` (no sign-in), `@seller` (signed-in seller). Run a subset with `bun run test:e2e:tag -- '@auth'`, `make e2e-tag TAG='@browse'`, or `bun run test:e2e -- --grep '@seller'`. Cucumber tag expressions at codegen: `bddgen test --tags '@auth and not @register'`.
