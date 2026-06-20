/**
 * src/pages/blog.page.ts
 *
 * Page object for the Blog/Articles listing page.
 * Site: Emagine Solutions Technology (https://emaginest.com/blog.html)
 *
 * Key content:
 *  - H1: "Articles"
 *  - 8 blog post cards, all tagged "Womens Health"
 *  - Article titles in <h3> elements inside <a> links
 *  - "Continuar leyendo →" read-more links on each article
 *  - Articles link to external Medium publication URLs
 */

import { type Page, type Locator } from '@playwright/test';
import { BasePage } from '@pages/base.page';
import type { SiteConfig } from '@site-types/site-config.types';

export class BlogPage extends BasePage {
  /** Page h1 heading ("Articles") */
  readonly heading: Locator;

  /**
   * Individual article cards/list items.
   * The page uses a ul/li structure without explicit class names, so we target
   * article elements, list items, or sections that contain article titles (h3).
   */
  readonly articleCards: Locator;

  /**
   * "Continuar leyendo →" read-more links present on each article.
   * Matches Spanish "Continuar", English "Continue", and "Read more" variants.
   */
  readonly readMoreLinks: Locator;

  constructor(page: Page, config: SiteConfig) {
    super(page, config);

    this.heading = page.locator('h1').first();

    // Article cards: list items or article elements containing h3 title headings
    this.articleCards = page.locator('article, li, [class*="post"], [class*="article"]').filter({
      has: page.locator('h3, h2'),
    });

    this.readMoreLinks = page
      .locator('a')
      .filter({ hasText: /continuar|continue reading|read more/i });
  }

  /** Navigate to the Blog listing page */
  async navigate(): Promise<void> {
    const base = this.url.replace(/\/$/, '');
    await this.page.goto(`${base}/blog.html`, {
      waitUntil: 'domcontentloaded',
    });
  }

  /** Return the number of article cards found on the page */
  async getArticleCount(): Promise<number> {
    return this.articleCards.count();
  }
}
