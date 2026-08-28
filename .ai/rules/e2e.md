---
paths:
  - 'e2e/**'
---

# E2E

## Playwright e2e uses suite-scoped sqlite and testids
E2E uses a dedicated sqlite file (database/e2e.sqlite) and .env.e2e. Seed once per suite with E2eDatabaseSeeder (fillers first with older created_at, named fixtures last with later created_at so they appear on home and catalog page 1). Do not use RefreshDatabase or Pest :memory: for Playwright. Locators must be i18n-safe: data-testid, data-slug, or enum/query values — never getByText, getByLabel, getByRole name, or option labels. Store listing images under storage/app/public/e2e so Docker-owned storage/app/public/bikes does not block host PHP. Sign in through the UI each scenario (no storageState). Register once per suite with a unique email.
