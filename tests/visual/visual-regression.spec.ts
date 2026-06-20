/**
 * tests/visual/visual-regression.spec.ts
 *
 * Visual regression tests — compare screenshots against stored baselines.
 * Run `npm run baseline` to capture new baselines after intentional design changes.
 *
 * Tag: @visual
 *
 * Includes desktop-only viewport screenshots for the 6 product/content pages
 * (journey-app, journey-platform, aria-ai, white-label, company, blog).
 * Mobile/tablet variants are intentionally omitted to avoid baseline explosion;
 * the shared responsive suite covers cross-viewport layout checks.
 */

import { test, expect } from '@fixtures/site.fixture';
import { dismissCookieBanner } from '@utils/visual-helper';

// Shared screenshot options applied to all visual tests
const SCREENSHOT_OPTIONS = {
  maxDiffPixels: 500,
  animations: 'disabled',
  caret: 'hide',
  fullPage: true,
} as const;

// Desktop-only options used for the new page-level visual tests
const DESKTOP_VIEWPORT_OPTIONS = {
  maxDiffPixels: 500,
  animations: 'disabled',
  caret: 'hide',
  fullPage: false,
} as const;

test.describe('Visual Regression @visual', () => {
  // Skip entire suite when site config opts out
  test.beforeEach(async ({ siteConfig }) => {
    if (siteConfig.skipVisual) {
      test.skip(true, `Visual regression skipped for "${siteConfig.name}" (skipVisual: true)`);
    }
  });

  // ── Desktop ─────────────────────────────────────────────────────────────────

  test('homepage visual regression - desktop @visual', async ({ page, siteConfig }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(siteConfig.url, { waitUntil: 'networkidle' });

    // Dismiss any cookie/consent banners that would interfere with comparison
    await dismissCookieBanner(page);

    // Allow any CSS animations/transitions to settle
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('homepage-desktop.png', {
      ...SCREENSHOT_OPTIONS,
    });
  });

  // ── Mobile ──────────────────────────────────────────────────────────────────

  test('homepage visual regression - mobile @visual', async ({ page, siteConfig }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(siteConfig.url, { waitUntil: 'networkidle' });

    await dismissCookieBanner(page);
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('homepage-mobile.png', {
      ...SCREENSHOT_OPTIONS,
    });
  });

  // ── Tablet ──────────────────────────────────────────────────────────────────

  test('homepage visual regression - tablet @visual', async ({ page, siteConfig }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(siteConfig.url, { waitUntil: 'networkidle' });

    await dismissCookieBanner(page);
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('homepage-tablet.png', {
      ...SCREENSHOT_OPTIONS,
    });
  });

  // ── Product & content pages (desktop viewport only) ──────────────────────────

  test('journey app page visual regression - desktop @visual', async ({
    page,
    journeyAppPage,
  }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await journeyAppPage.navigate();
    await dismissCookieBanner(page);
    await expect(page).toHaveScreenshot('journey-app-desktop.png', {
      ...DESKTOP_VIEWPORT_OPTIONS,
    });
  });

  test('journey platform page visual regression - desktop @visual', async ({
    page,
    journeyPlatformPage,
  }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await journeyPlatformPage.navigate();
    await dismissCookieBanner(page);
    await expect(page).toHaveScreenshot('journey-platform-desktop.png', {
      ...DESKTOP_VIEWPORT_OPTIONS,
    });
  });

  test('aria ai page visual regression - desktop @visual', async ({
    page,
    ariaAiPage,
  }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await ariaAiPage.navigate();
    await dismissCookieBanner(page);
    await expect(page).toHaveScreenshot('aria-ai-desktop.png', {
      ...DESKTOP_VIEWPORT_OPTIONS,
    });
  });

  test('white label page visual regression - desktop @visual', async ({
    page,
    whitelabelPage,
  }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await whitelabelPage.navigate();
    await dismissCookieBanner(page);
    await expect(page).toHaveScreenshot('white-label-desktop.png', {
      ...DESKTOP_VIEWPORT_OPTIONS,
    });
  });

  test('company page visual regression - desktop @visual', async ({
    page,
    companyPage,
  }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await companyPage.navigate();
    await dismissCookieBanner(page);
    await expect(page).toHaveScreenshot('company-desktop.png', {
      ...DESKTOP_VIEWPORT_OPTIONS,
    });
  });

  test('blog page visual regression - desktop @visual', async ({
    page,
    blogPage,
  }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await blogPage.navigate();
    await dismissCookieBanner(page);
    await expect(page).toHaveScreenshot('blog-desktop.png', {
      ...DESKTOP_VIEWPORT_OPTIONS,
    });
  });
});
