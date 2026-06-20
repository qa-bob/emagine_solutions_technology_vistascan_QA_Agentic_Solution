/**
 * tests/functional/white-label.spec.ts
 *
 * Site-specific functional tests for the White Label product page.
 * Generated for: Emagine Solutions Technology (https://emaginest.com)
 *
 * Reason: The white-label offering targets enterprise and clinic partners.
 * The "Why Choose Us" feature cards and the launch CTA section are key
 * partner-acquisition content that must remain intact across deployments.
 */

import { test, expect } from '@fixtures/site.fixture';

test.describe('White Label Page @functional', () => {
  test.beforeEach(async ({ whitelabelPage }) => {
    await whitelabelPage.navigate();
  });

  test('white label page loads with heading @functional @smoke', async ({ whitelabelPage }) => {
    await expect(whitelabelPage.heading).toBeVisible({ timeout: 10_000 });
    const headingText = await whitelabelPage.heading.textContent();
    expect(headingText?.toLowerCase()).toContain('pregnancy');
  });

  test('why choose us feature cards are rendered @functional', async ({ whitelabelPage }) => {
    const count = await whitelabelPage.featureCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('launch CTA section is visible @functional', async ({ whitelabelPage }) => {
    await expect(whitelabelPage.ctaSection).toBeVisible({ timeout: 10_000 });
    const text = await whitelabelPage.ctaSection.textContent();
    expect(text?.toLowerCase()).toContain('launch');
  });

  test('contact CTA is present and links to demo page @functional', async ({
    whitelabelPage,
  }) => {
    // The first matching link may be inside a CSS-hidden dropdown nav; check existence + href only
    const count = await whitelabelPage.contactCta.count();
    expect(count, 'Expected at least one link to the demo page').toBeGreaterThan(0);
    const href = await whitelabelPage.contactCta.getAttribute('href');
    expect(href).toContain('request-a-demo');
  });
});
