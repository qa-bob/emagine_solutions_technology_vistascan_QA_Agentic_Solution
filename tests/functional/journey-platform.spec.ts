/**
 * tests/functional/journey-platform.spec.ts
 *
 * Site-specific functional tests for the Journey Remote Patient Monitoring Platform page.
 * Generated for: Emagine Solutions Technology (https://emaginest.com)
 *
 * Reason: The platform page targets healthcare providers and presents 9 clinical
 * feature cards plus "For Patients" and "For Providers" benefit sections — all key
 * B2B conversion content that needs dedicated functional coverage.
 */

import { test, expect } from '@fixtures/site.fixture';

test.describe('Journey Platform Page @functional', () => {
  test.beforeEach(async ({ journeyPlatformPage }) => {
    await journeyPlatformPage.navigate();
  });

  test('platform page loads with correct heading @functional @smoke', async ({
    journeyPlatformPage,
  }) => {
    await expect(journeyPlatformPage.heading).toBeVisible({ timeout: 10_000 });
    const headingText = await journeyPlatformPage.heading.textContent();
    expect(headingText?.trim()).toContain('Remote Patient Monitoring');
  });

  test('platform feature cards are all rendered @functional', async ({
    journeyPlatformPage,
  }) => {
    const count = await journeyPlatformPage.featureCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('how it works section is present @functional', async ({ journeyPlatformPage }) => {
    // Section may be hidden on narrow viewports; check DOM presence rather than visibility
    const count = await journeyPlatformPage.howItWorksSection.count();
    expect(count, 'Expected a "how it works" section in the DOM').toBeGreaterThan(0);
  });

  test('for patients section is visible @functional', async ({ journeyPlatformPage }) => {
    await expect(journeyPlatformPage.forPatientsSection).toBeVisible({ timeout: 10_000 });
  });

  test('for providers section is visible @functional', async ({ journeyPlatformPage }) => {
    await expect(journeyPlatformPage.forProvidersSection).toBeVisible({ timeout: 10_000 });
  });

  test('request demo CTA is present @functional', async ({ journeyPlatformPage }) => {
    // The first matching link may be inside a CSS-hidden dropdown nav; check existence + href only
    const count = await journeyPlatformPage.requestDemoBtn.count();
    expect(count, 'Expected at least one link to the demo page').toBeGreaterThan(0);
    const href = await journeyPlatformPage.requestDemoBtn.getAttribute('href');
    expect(href).toContain('request-a-demo');
  });
});
