/**
 * tests/functional/blog.spec.ts
 *
 * Site-specific functional tests for the Blog/Articles listing page.
 * Generated for: Emagine Solutions Technology (https://emaginest.com)
 *
 * Reason: The blog page drives organic SEO traffic and establishes domain
 * authority. Tests verify that articles render correctly, titles are non-empty,
 * and read-more links are present — catching any CMS publishing regressions.
 *
 * Note: "Continuar leyendo →" is the Spanish-language read-more label used
 * on each article card. This is site-specific and must be maintained exactly.
 */

import { test, expect } from '@fixtures/site.fixture';

test.describe('Blog Page @functional', () => {
  test.beforeEach(async ({ blogPage }) => {
    await blogPage.navigate();
  });

  test('blog page loads with articles heading @functional @smoke', async ({ blogPage }) => {
    await expect(blogPage.heading).toBeVisible({ timeout: 10_000 });
    const headingText = await blogPage.heading.textContent();
    expect(headingText?.trim().toLowerCase()).toContain('article');
  });

  test('blog has at least one article card @functional', async ({ blogPage }) => {
    const count = await blogPage.getArticleCount();
    expect(count).toBeGreaterThan(0);
  });

  test('read more links are present on articles @functional', async ({ blogPage }) => {
    const count = await blogPage.readMoreLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('blog articles have non-empty titles @functional', async ({ blogPage }) => {
    // Article titles are h3 elements on this page
    const titleLocator = blogPage.page.locator('h3');
    const titleCount = await titleLocator.count();
    expect(titleCount).toBeGreaterThan(0);

    // Each title should have non-empty text content
    for (let i = 0; i < Math.min(titleCount, 8); i++) {
      const title = titleLocator.nth(i);
      const text = await title.textContent();
      expect(text?.trim().length).toBeGreaterThan(0);
    }
  });
});
