/**
 * tests/visual/visual-regression.spec.ts
 *
 * Visual regression tests — compare screenshots against stored baselines.
 * Run `npm run baseline` to capture new baselines after intentional design changes.
 *
 * Each test runs only in the Playwright project whose viewport it targets, and
 * is skipped (not failed) until a baseline has been captured for it.
 *
 * Tag: @visual
 *
 * Includes desktop-only viewport screenshots for the 6 product/content pages
 * (journey-app, journey-platform, aria-ai, white-label, company, blog).
 * Mobile/tablet variants are intentionally omitted to avoid baseline explosion;
 * the shared responsive suite covers cross-viewport layout checks.
 */

import * as fs from 'fs';
import type { TestInfo } from '@playwright/test';
import { test, expect } from '@fixtures/site.fixture';
import { dismissCookieBanner } from '@utils/visual-helper';

// Shared screenshot options applied to all visual tests
const SCREENSHOT_OPTIONS = {
  maxDiffPixels: 500,
  animations: 'disabled',
  caret: 'hide',
  fullPage: true,
} as const;

const VISUAL_CASES = [
  { label: 'desktop', project: 'chromium-desktop', snapshot: 'homepage-desktop.png' },
  { label: 'mobile', project: 'mobile-chrome', snapshot: 'homepage-mobile.png' },
  { label: 'tablet', project: 'tablet', snapshot: 'homepage-tablet.png' },
] as const;

// Desktop-only options used for the new page-level visual tests
const DESKTOP_VIEWPORT_OPTIONS = {
  maxDiffPixels: 500,
  animations: 'disabled',
  caret: 'hide',
  fullPage: false,
} as const;

/**
 * Skip unless running in `project`, and skip until the baseline for `snapshot`
 * exists (same rule as the homepage cases above).
 */
function requireProjectAndBaseline(testInfo: TestInfo, project: string, snapshot: string): void {
  test.skip(testInfo.project.name !== project, `Runs only in the "${project}" project`);

  // Only `--update-snapshots` (all/changed) should create a missing baseline
  const isUpdating = ['all', 'changed'].includes(testInfo.config.updateSnapshots);
  const baselinePath = testInfo.snapshotPath(snapshot, { kind: 'screenshot' });
  test.skip(
    !isUpdating && !fs.existsSync(baselinePath),
    `No baseline at ${baselinePath} — run "npm run baseline" to capture one`
  );
}

test.describe('Visual Regression @visual', () => {
  // Skip entire suite when site config opts out
  test.beforeEach(async ({ siteConfig }) => {
    if (siteConfig.skipVisual) {
      test.skip(true, `Visual regression skipped for "${siteConfig.name}" (skipVisual: true)`);
    }
  });

  for (const { label, project, snapshot } of VISUAL_CASES) {
    test(`homepage visual regression - ${label} @visual`, async ({ page, siteConfig }, testInfo) => {
      test.skip(testInfo.project.name !== project, `Runs only in the "${project}" project`);

      // Only `--update-snapshots` (all/changed) should create a missing baseline
      const isUpdating = ['all', 'changed'].includes(testInfo.config.updateSnapshots);
      const baselinePath = testInfo.snapshotPath(snapshot, { kind: 'screenshot' });
      test.skip(
        !isUpdating && !fs.existsSync(baselinePath),
        `No baseline at ${baselinePath} — run "npm run baseline" to capture one`
      );

      await page.goto(siteConfig.url, { waitUntil: 'load' });

      // Dismiss any cookie/consent banners that would interfere with comparison
      await dismissCookieBanner(page);

      await expect(page).toHaveScreenshot(snapshot, { ...SCREENSHOT_OPTIONS });
    });
  }

  // ── Product & content pages (desktop viewport only) ──────────────────────────

  test('journey app page visual regression - desktop @visual', async ({
    page,
    journeyAppPage,
  }, testInfo) => {
    requireProjectAndBaseline(testInfo, 'chromium-desktop', 'journey-app-desktop.png');
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
  }, testInfo) => {
    requireProjectAndBaseline(testInfo, 'chromium-desktop', 'journey-platform-desktop.png');
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
  }, testInfo) => {
    requireProjectAndBaseline(testInfo, 'chromium-desktop', 'aria-ai-desktop.png');
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
  }, testInfo) => {
    requireProjectAndBaseline(testInfo, 'chromium-desktop', 'white-label-desktop.png');
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
  }, testInfo) => {
    requireProjectAndBaseline(testInfo, 'chromium-desktop', 'company-desktop.png');
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
  }, testInfo) => {
    requireProjectAndBaseline(testInfo, 'chromium-desktop', 'blog-desktop.png');
    await page.setViewportSize({ width: 1280, height: 720 });
    await blogPage.navigate();
    await dismissCookieBanner(page);
    await expect(page).toHaveScreenshot('blog-desktop.png', {
      ...DESKTOP_VIEWPORT_OPTIONS,
    });
  });
});
