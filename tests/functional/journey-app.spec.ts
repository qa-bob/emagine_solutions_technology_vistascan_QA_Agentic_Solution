/**
 * tests/functional/journey-app.spec.ts
 *
 * Site-specific functional tests for the Journey Pregnancy App product page.
 * Generated for: Emagine Solutions Technology (https://emaginest.com)
 *
 * Reason: The Journey App page is the primary product page and a key conversion
 * surface. It includes a FAQ accordion (interactive), app store download links,
 * named feature sections, and a primary CTA — all of which require dedicated
 * coverage beyond the shared navigation and smoke suites.
 */

import { test, expect } from '@fixtures/site.fixture';

test.describe('Journey App Page @functional', () => {
  test.beforeEach(async ({ journeyAppPage }) => {
    await journeyAppPage.navigate();
  });

  test('journey app page loads with correct heading @functional @smoke', async ({
    journeyAppPage,
  }) => {
    // The page has desktop-only (d-desktop) and mobile-only h1 elements.
    // Find the first one that is actually visible at the current viewport.
    const visibleHeading = journeyAppPage.page.locator('h1').filter({ visible: true }).first();
    await expect(visibleHeading).toBeVisible({ timeout: 10_000 });
    const headingText = await visibleHeading.textContent();
    // Desktop h1 says "The Journey Pregnancy App"; mobile/tablet h1 says "The Journey Platform"
    // Both are valid — this page uses responsive heading copy
    expect(headingText?.trim().toLowerCase()).toContain('journey');
  });

  test('journey app has feature sections @functional', async ({ journeyAppPage }) => {
    // Each named feature section must be present somewhere on the page
    const featureNames = ['Health Tracking', 'Share the Journey', 'Virtual Doula'];

    for (const name of featureNames) {
      const section = journeyAppPage.page
        .locator('h2, h3, h4, p, section, div')
        .filter({ hasText: new RegExp(name, 'i') })
        .first();
      await expect(section).toBeVisible({ timeout: 10_000 });
    }
  });

  test('FAQ section is visible and has items @functional', async ({ journeyAppPage }) => {
    // FAQ container must be on the page
    await expect(journeyAppPage.faqSection).toBeVisible({ timeout: 10_000 });

    // At least one FAQ question item must exist (details, li, or heading inside FAQ)
    const faqHeadings = journeyAppPage.page
      .locator('h2, h3, h4')
      .filter({ hasText: /\?/ });
    const count = await faqHeadings.count();
    expect(count).toBeGreaterThan(0);
  });

  test('FAQ accordion items are present in the DOM @functional', async ({ journeyAppPage }) => {
    // Verify FAQ section is visible
    await expect(journeyAppPage.faqSection).toBeVisible({ timeout: 10_000 });

    // Verify expandable items exist — interaction is browser/JS-implementation dependent
    // so we only assert structural presence, not click behaviour
    const faqItems = journeyAppPage.faqItems;
    const count = await faqItems.count();

    if (count > 0) {
      await expect(faqItems.first()).toBeAttached();
    } else {
      // Fall back to heading-style questions (e.g. h3/h4 containing "?")
      const questionHeadings = journeyAppPage.page
        .locator('h2, h3, h4')
        .filter({ hasText: /\?/ });
      expect(await questionHeadings.count()).toBeGreaterThan(0);
    }
  });

  test('app store download buttons are present @functional', async ({ journeyAppPage }) => {
    await expect(journeyAppPage.appStoreButton).toBeVisible({ timeout: 10_000 });
    await expect(journeyAppPage.googlePlayButton).toBeVisible({ timeout: 10_000 });

    const appStoreHref = await journeyAppPage.appStoreButton.getAttribute('href');
    const googlePlayHref = await journeyAppPage.googlePlayButton.getAttribute('href');

    expect(appStoreHref).toContain('apps.apple.com');
    expect(googlePlayHref).toContain('play.google.com');
  });

  test('primary CTA is present and links to demo page @functional', async ({
    journeyAppPage,
  }) => {
    // The first matching link may be inside a CSS-hidden dropdown nav; check existence + href only
    const cta = journeyAppPage.page.locator('a[href*="request-a-demo"]').first();
    const count = await cta.count();
    expect(count, 'Expected at least one link to the demo page').toBeGreaterThan(0);
    const href = await cta.getAttribute('href');
    expect(href).toContain('request-a-demo');
  });
});
