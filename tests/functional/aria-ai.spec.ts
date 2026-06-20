/**
 * tests/functional/aria-ai.spec.ts
 *
 * Site-specific functional tests for the Aria AI product page.
 * Generated for: Emagine Solutions Technology (https://emaginest.com)
 *
 * Reason: Aria AI is a differentiated AI product featuring four distinct agent
 * cards and a clinic benefit grid. These are conversion-critical content blocks
 * that need dedicated tests to catch regressions in copy or layout.
 */

import { test, expect } from '@fixtures/site.fixture';

test.describe('Aria AI Page @functional', () => {
  test.beforeEach(async ({ ariaAiPage }) => {
    await ariaAiPage.navigate();
  });

  test('aria ai page loads with correct heading @functional @smoke', async ({ ariaAiPage }) => {
    await expect(ariaAiPage.heading).toBeVisible({ timeout: 10_000 });
    const headingText = await ariaAiPage.heading.textContent();
    expect(headingText?.trim()).toContain('Aria');
  });

  test('aria ai agent cards are rendered @functional', async ({ ariaAiPage }) => {
    const count = await ariaAiPage.agentCards.count();
    expect(count).toBeGreaterThan(0);

    // At least one of the known agent names should be visible
    const agentNames = ['Virtual Doula', 'Nutrition Agent', 'Fitness Agent', 'Wellness Agent'];
    let visibleCount = 0;
    for (const name of agentNames) {
      const card = ariaAiPage.page
        .locator('h2, h3, h4')
        .filter({ hasText: new RegExp(name, 'i') })
        .first();
      if (await card.count() > 0) {
        visibleCount++;
      }
    }
    expect(visibleCount).toBeGreaterThan(0);
  });

  test('how it works section is visible @functional', async ({ ariaAiPage }) => {
    await expect(ariaAiPage.howItWorksSection).toBeVisible({ timeout: 10_000 });
  });

  test('clinic benefits section is visible @functional', async ({ ariaAiPage }) => {
    const count = await ariaAiPage.clinicBenefits.count();
    expect(count).toBeGreaterThan(0);
  });

  test('contact CTA links to demo page @functional', async ({ ariaAiPage }) => {
    // The first matching link may be inside a CSS-hidden dropdown nav; check existence + href only
    const count = await ariaAiPage.contactCta.count();
    expect(count, 'Expected at least one link to the demo page').toBeGreaterThan(0);
    const href = await ariaAiPage.contactCta.getAttribute('href');
    expect(href).toContain('request-a-demo');
  });
});
