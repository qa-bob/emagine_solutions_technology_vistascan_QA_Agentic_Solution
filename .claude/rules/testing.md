---
paths:
  - "tests/**/*.spec.ts"
  - "tests/**/*.test.ts"
---

# Test File Rules

These rules apply whenever Claude reads or writes files under `tests/`.

## Imports

Always import from the custom fixture, not from Playwright directly:

```typescript
// ✅ Correct
import { test, expect } from '@fixtures/site.fixture';

// ❌ Wrong
import { test, expect } from '@playwright/test';
```

## Tags

Every `test()` call must include at least one tag:

| Tag | When |
|-----|------|
| `@smoke` | Basic availability: HTTP 200, title, no console errors |
| `@navigation` | Nav links, routing, menus, breadcrumbs |
| `@forms` | Form fields, validation, accessibility (no submission) |
| `@functional` | Business features: CTAs, accordions, pricing, video |
| `@visual` | Screenshot regression with `toHaveScreenshot()` |
| `@responsive` | Viewport-specific layout checks |

## Forbidden patterns

- No `page.waitForTimeout()` — use Playwright auto-waiting
- No hardcoded URLs — use `siteConfig.url` from the fixture or `baseURL` from config
- No form submission (`page.click('button[type=submit]')` is allowed for validation testing; actual data submission is not)
- No account creation or credential entry
- No `expect()` calls imported from anywhere other than `@fixtures/site.fixture`

## Test structure

```typescript
test.describe('Feature Area @tag', () => {
  test.beforeEach(async ({ page, siteConfig }) => {
    await page.goto(siteConfig.url, { waitUntil: 'domcontentloaded' });
  });

  test('specific behavior @tag', async ({ homePage }) => {
    // use page object methods, not raw locators
    expect(await homePage.isLoaded()).toBeTruthy();
  });
});
```

## Visual tests

```typescript
// Always use toHaveScreenshot() with a descriptive name
await expect(page).toHaveScreenshot('homepage-desktop.png', { fullPage: true });
```

Run `npm run baseline` after intentional visual changes to update snapshots.
