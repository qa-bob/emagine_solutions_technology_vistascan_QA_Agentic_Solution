---
paths:
  - "src/pages/**/*.ts"
---

# Page Object Rules

These rules apply whenever Claude reads or writes files under `src/pages/`.

## Class structure

Every page object must:

1. **Import from `@playwright/test`** (not from a relative path to Playwright)
2. **Extend `BasePage`** from `./base.page`
3. **Declare locators as `readonly Locator`** properties in the constructor
4. **Never call `expect()`** — assertions belong in test files

```typescript
import { type Page, type Locator } from '@playwright/test';
import { BasePage } from '@pages/base.page';
import type { SiteConfig } from '@types/site-config.types';

export class ExamplePage extends BasePage {
  readonly heading: Locator;
  readonly ctaButton: Locator;

  constructor(page: Page, config: SiteConfig) {
    super(page, config);
    this.heading = page.locator('h1').first();
    this.ctaButton = page.getByRole('link', { name: /contact us/i }).first();
  }

  async clickCta(): Promise<void> {
    await this.ctaButton.click();
    await this.waitForLoad();
  }
}
```

## Selector strategy (priority order)

1. ARIA role: `page.getByRole('button', { name: 'Submit' })`
2. ARIA label: `page.getByLabel('Email address')`
3. Text content: `page.getByText('Get Started')`
4. Test ID: `page.getByTestId('hero-section')`
5. Stable CSS (avoid generated class names): `page.locator('[class*="nav-link"]')`

## Method conventions

- Method names describe **user actions**: `clickPrimaryNav()`, `fillNameField()`, `openMobileMenu()`
- Method return types must be explicit: `Promise<void>`, `Promise<string>`, `Promise<boolean>`
- Avoid `waitForTimeout()` — use `waitForSelector`, `waitForLoadState`, or Playwright auto-waiting

## File naming

- One class per file
- File name matches the class in kebab-case: `ServicesPage` → `services.page.ts`
- Always export the class as a named export

## After creating a new page object

Update `src/fixtures/site.fixture.ts` to expose the new page object as a fixture so tests can use it without manually constructing it.
