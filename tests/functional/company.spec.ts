/**
 * tests/functional/company.spec.ts
 *
 * Site-specific functional tests for the Company/About Us page.
 * Generated for: Emagine Solutions Technology (https://emaginest.com)
 *
 * Reason: The Company page establishes trust with B2B buyers by presenting the
 * founders, mission, press coverage, and recent thought-leadership articles.
 * All of these content blocks need dedicated coverage to catch regressions.
 */

import { test, expect } from '@fixtures/site.fixture';

test.describe('Company Page @functional', () => {
  test.beforeEach(async ({ companyPage }) => {
    await companyPage.navigate();
  });

  test('company page loads with about us heading @functional @smoke', async ({
    companyPage,
  }) => {
    await expect(companyPage.heading).toBeVisible({ timeout: 10_000 });
    const headingText = await companyPage.heading.textContent();
    expect(headingText?.trim().toLowerCase()).toContain('about');
  });

  test('mission statement is visible @functional', async ({ companyPage }) => {
    await expect(companyPage.missionText).toBeVisible({ timeout: 10_000 });
    const text = await companyPage.missionText.textContent();
    expect(text?.toLowerCase()).toContain('maternal health');
  });

  test('team section shows at least 2 members @functional', async ({ companyPage }) => {
    const count = await companyPage.getTeamMemberCount();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('press section is visible @functional', async ({ companyPage }) => {
    await expect(companyPage.pressSection).toBeVisible({ timeout: 10_000 });
    const text = await companyPage.pressSection.textContent();
    expect(text?.toLowerCase()).toContain('press');
  });

  test('recent articles section is visible @functional', async ({ companyPage }) => {
    await expect(companyPage.blogSection).toBeVisible({ timeout: 10_000 });
    const text = await companyPage.blogSection.textContent();
    expect(text?.toLowerCase()).toContain('article');
  });

  test('request demo CTA is present @functional', async ({ companyPage }) => {
    // The first matching link may be inside a CSS-hidden dropdown nav; check existence + href only
    const count = await companyPage.requestDemoBtn.count();
    expect(count, 'Expected at least one link to the demo page').toBeGreaterThan(0);
    const href = await companyPage.requestDemoBtn.getAttribute('href');
    expect(href).toContain('request-a-demo');
  });
});
