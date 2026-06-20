/**
 * src/pages/white-label.page.ts
 *
 * Page object for the White Label product page.
 * Site: Emagine Solutions Technology (https://emaginest.com/white-label.html)
 *
 * Key content:
 *  - H1: "Empower your maternal health providers and patients..."
 *  - "Why Choose Us?" feature cards: Backed by Science, Branded as Yours,
 *    Intelligent Support, Scalable and Secure, Quick Launch
 *  - "Ready to launch pregnancy tracking at your organization?" CTA section
 *  - Contact CTA → request-a-demo.html
 */

import { type Page, type Locator } from '@playwright/test';
import { BasePage } from '@pages/base.page';
import type { SiteConfig } from '@site-types/site-config.types';

export class WhiteLabelPage extends BasePage {
  /** Page h1 heading */
  readonly heading: Locator;

  /**
   * "Why Choose Us?" feature cards.
   * Targeted via heading text since the site uses semantic HTML without custom class names.
   */
  readonly featureCards: Locator;

  /** "Ready to launch..." CTA section */
  readonly ctaSection: Locator;

  /** Contact/demo CTA link */
  readonly contactCta: Locator;

  constructor(page: Page, config: SiteConfig) {
    super(page, config);

    this.heading = page.locator('h1').first();

    // Feature cards identified by known "Why Choose Us" item headings
    this.featureCards = page.locator('h2, h3, h4').filter({
      hasText: /backed by science|branded as yours|intelligent support|scalable and secure|quick launch|why choose/i,
    });

    this.ctaSection = page
      .locator('section, div')
      .filter({ hasText: /ready to launch/i })
      .first();

    this.contactCta = page
      .locator('a[href*="request-a-demo"]')
      .first();
  }

  /** Navigate to the White Label product page */
  async navigate(): Promise<void> {
    const base = this.url.replace(/\/$/, '');
    await this.page.goto(`${base}/white-label.html`, {
      waitUntil: 'domcontentloaded',
    });
  }
}
