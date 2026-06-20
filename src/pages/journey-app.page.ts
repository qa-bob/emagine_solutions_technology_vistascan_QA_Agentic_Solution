/**
 * src/pages/journey-app.page.ts
 *
 * Page object for the Journey Pregnancy App product page.
 * Site: Emagine Solutions Technology (https://emaginest.com/the-journey-app.html)
 *
 * Key interactive elements:
 *  - FAQ accordion with 9 expandable questions
 *  - App Store / Google Play download buttons
 *  - Feature sections (Health Tracking, Share the Journey, Virtual Doula, etc.)
 *  - Testimonial section
 *  - Primary CTA linking to request-a-demo.html
 */

import { type Page, type Locator } from '@playwright/test';
import { BasePage } from '@pages/base.page';
import type { SiteConfig } from '@site-types/site-config.types';

export class JourneyAppPage extends BasePage {
  /** Page h1 heading */
  readonly heading: Locator;

  /** FAQ container — targets elements whose text contains "FAQ" or common accordion patterns */
  readonly faqSection: Locator;

  /** Individual FAQ question items within the FAQ container */
  readonly faqItems: Locator;

  /** iOS App Store download link */
  readonly appStoreButton: Locator;

  /** Google Play download link */
  readonly googlePlayButton: Locator;

  /** Feature sections (Health Tracking, Share the Journey, Virtual Doula, VitalView, AI Features) */
  readonly featureSections: Locator;

  /** Testimonial section */
  readonly testimonialSection: Locator;

  /** Primary CTA button/link pointing toward the demo/contact page */
  readonly ctaButton: Locator;

  constructor(page: Page, config: SiteConfig) {
    super(page, config);

    this.heading = page.locator('h1').first();

    this.faqSection = page
      .locator('section, div, [class*="faq"], [class*="accordion"]')
      .filter({ hasText: /frequently asked|faq/i })
      .first();

    // FAQ items: details elements, or headings inside the FAQ section, or list items
    this.faqItems = page.locator(
      'details, [class*="faq"] li, [class*="accordion"] li, [class*="faq-item"]'
    );

    this.appStoreButton = page.locator('a[href*="apps.apple.com"]').first();

    this.googlePlayButton = page.locator('a[href*="play.google.com"]').first();

    // Feature sections identified by heading text
    this.featureSections = page
      .locator('section, div')
      .filter({ hasText: /health tracking|share the journey|virtual doula|vitalview|ai features/i });

    this.testimonialSection = page
      .locator('section, div, blockquote')
      .filter({ hasText: /testimonial|preeclampsia|blood pressure|patient|helped me/i })
      .first();

    this.ctaButton = page
      .locator('a, button')
      .filter({ hasText: /contact us|request demo|get started/i })
      .first();
  }

  /** Navigate to the Journey App product page */
  async navigate(): Promise<void> {
    const base = this.url.replace(/\/$/, '');
    await this.page.goto(`${base}/the-journey-app.html`, {
      waitUntil: 'domcontentloaded',
    });
  }

  /**
   * Click the nth FAQ item (0-indexed) to expand it.
   * Handles both <details> elements and click-to-expand patterns.
   */
  async clickFaqItem(index: number): Promise<void> {
    const items = this.faqItems;
    const item = items.nth(index);
    await item.click();
  }

  /**
   * Return true if the nth FAQ item (0-indexed) appears expanded.
   * Checks aria-expanded="true" on the item or its toggle child,
   * and falls back to checking whether a <details> element is open.
   */
  async isFaqItemExpanded(index: number): Promise<boolean> {
    const items = this.faqItems;
    const item = items.nth(index);

    // Check <details open> attribute
    const isOpen = await item.evaluate((el: Element) => {
      if (el.tagName.toLowerCase() === 'details') {
        return (el as HTMLDetailsElement).open;
      }
      // Check aria-expanded on element or first child button/summary
      const toggle = el.querySelector('[aria-expanded]') ?? el;
      return toggle.getAttribute('aria-expanded') === 'true';
    });

    return isOpen;
  }
}
