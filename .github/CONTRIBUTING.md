# Contributing to the Vistascan QA Agentic Solution

Thank you for contributing. This document explains the rules every contributor (human or AI) must follow.

---

## Table of Contents

- [Branch Naming](#branch-naming)
- [Architecture Rules](#architecture-rules)
- [Writing Tests](#writing-tests)
- [TypeScript Rules](#typescript-rules)
- [Pull Request Process](#pull-request-process)
- [What NOT to Do](#what-not-to-do)

---

## Branch Naming

Branch from `main` using a descriptive prefix:

| Prefix | When to use |
|--------|-------------|
| `feature/` | New page object or test capability |
| `test/` | New or expanded test coverage |
| `fix/` | Bug fix in existing tests or page objects |
| `chore/` | Dependency updates, config changes, docs |

Examples:
```
feature/services-page-object
test/homepage-functional-coverage
fix/nav-links-mobile-selector
chore/playwright-1.45-upgrade
```

---

## Architecture Rules

### Page Object Model

- Every page or major section has **its own class** in `src/pages/`
- All page classes **extend `BasePage`** from `./base.page`
- Locators are **`readonly Locator` properties** on the class — typed, not inline
- Methods represent **user actions** (`clickContactButton()`, `fillNameField()`)
- **No `expect()` inside page objects** — assertions belong in test files

```typescript
// ✅ Correct
export class ServicesPage extends BasePage {
  readonly heading: Locator;

  constructor(page: Page, config: SiteConfig) {
    super(page, config);
    this.heading = page.locator('h1');
  }

  async getHeadingText(): Promise<string> {
    return (await this.heading.textContent()) ?? '';
  }
}

// ❌ Wrong — assertion inside page object
async verifyHeading(): Promise<void> {
  await expect(this.heading).toBeVisible(); // belongs in the test
}
```

### Tests

- Import from `@fixtures/site.fixture`, not from `@playwright/test` directly
- Tag every test with at least one of: `@smoke`, `@navigation`, `@forms`, `@functional`, `@visual`, `@responsive`
- Do not hardcode URLs — always use `baseURL` or `siteConfig.url`

```typescript
// ✅ Correct
import { test, expect } from '@fixtures/site.fixture';

test('homepage loads @smoke', async ({ homePage }) => {
  expect(await homePage.isLoaded()).toBeTruthy();
});
```

---

## Writing Tests

### Before You Write

1. Read `site.config.json` to confirm the target URL and flags
2. Open the live site in your browser (or use `WebFetch`) to inspect actual HTML
3. Find real selectors — no placeholders like `[data-testid="todo"]`

### Selector Priority

Prefer in this order:
1. ARIA roles: `page.getByRole('button', { name: 'Contact' })`
2. ARIA labels: `page.getByLabel('Email address')`
3. Text content: `page.getByText('Get Started')`
4. CSS selectors based on stable attributes (not generated class names)

### Test Independence

- Each test must be able to run in isolation
- Use `test.beforeEach` to navigate, not shared page state
- Do not depend on test execution order

### New Test Checklist

- [ ] Page object class exists (or has been created/updated)
- [ ] Locators are in the page object, not in the spec
- [ ] Test is tagged with at least one suite tag
- [ ] Test does not submit any form
- [ ] Test does not hardcode a URL
- [ ] `npm run typecheck` passes

---

## TypeScript Rules

- **Strict mode is on** — `tsconfig.json` sets `"strict": true`
- No implicit `any` — always type parameters and return values
- All page object properties must be explicitly typed as `readonly Locator`
- Run `npm run typecheck` before opening a PR

---

## Pull Request Process

1. **Open a PR against `main`**
2. Fill in the PR template completely
3. Ensure all CI checks pass (Playwright tests run on GitHub Actions)
4. For visual changes: commit updated `__snapshots__/` images
5. Request a review from a maintainer
6. Squash-merge when approved

### Visual Regression PRs

If your change affects visual snapshots:
1. Run `npm run baseline` locally to capture updated screenshots
2. Commit the updated files in `__snapshots__/`
3. Note in the PR description which snapshots changed and why

---

## What NOT to Do

| Rule | Reason |
|------|--------|
| Never submit forms | Avoid polluting production data |
| Never create accounts or log in | Tests must be public-access only |
| Never hardcode base URLs in tests | `site.config.json` is the single source of truth |
| Never put `expect()` in page objects | Assertions belong in tests |
| Never use `page.waitForTimeout()` | Use Playwright auto-waiting instead |
| Never use `any` type without a comment | Strict TypeScript is enforced |
| Never commit `.env` files | Environment secrets must not be in version control |
| Never commit `node_modules/` | Dependencies are installed from `package.json` |

---

## Getting Help

- Read [README.md](../README.md) for setup and architecture
- Read [AGENTS.md](../AGENTS.md) for available Claude Code agents
- Read [Skills.md](../Skills.md) for available slash commands
- Open a GitHub Issue using the provided templates
