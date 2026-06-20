/**
 * src/pages/aria-ai.page.ts
 *
 * Page object for the Aria AI product page.
 * Site: Emagine Solutions Technology (https://emaginest.com/aria-ai.html)
 *
 * Key content:
 *  - H1: "Your Smartest Pregnancy Companion: Aria, the AI Doula"
 *  - Four AI agent cards: Virtual Doula, Nutrition Agent, Fitness Agent, Wellness Agent
 *  - "How it Works" section (4-step process)
 *  - Clinic benefits section (24/7 support, Reduce Anxiety, Flexible Integration, Secure & Scalable)
 *  - Contact CTA → request-a-demo.html
 */

import { type Page, type Locator } from '@playwright/test';
import { BasePage } from '@pages/base.page';
import type { SiteConfig } from '@site-types/site-config.types';

export class AriaAiPage extends BasePage {
  /** Page h1 heading */
  readonly heading: Locator;

  /**
   * AI agent cards — Virtual Doula, Nutrition Agent, Fitness Agent, Wellness Agent.
   * Targeted via heading text since the page uses semantic HTML without custom classes.
   */
  readonly agentCards: Locator;

  /** "How it Works" section */
  readonly howItWorksSection: Locator;

  /**
   * Clinic benefits items.
   * Targets headings/items that mention the 8 documented benefit labels.
   */
  readonly clinicBenefits: Locator;

  /** Contact CTA link pointing to the demo page */
  readonly contactCta: Locator;

  constructor(page: Page, config: SiteConfig) {
    super(page, config);

    this.heading = page.locator('h1').first();

    // Agent cards identified by their heading text
    this.agentCards = page.locator('h2, h3, h4').filter({
      hasText: /virtual doula|nutrition agent|fitness agent|wellness agent/i,
    });

    this.howItWorksSection = page
      .locator('section, div')
      .filter({ hasText: /how it works/i })
      .first();

    // Clinic benefits: headings matching the 8 known benefit labels
    this.clinicBenefits = page.locator('h2, h3, h4, p, li').filter({
      hasText:
        /24\/7 support|reduce anxiety|flexible integration|secure.*scalable|personalized onboarding|ongoing check-ins|real-time answers|analytics.*insights/i,
    });

    this.contactCta = page
      .locator('a[href*="request-a-demo"]')
      .first();
  }

  /** Navigate to the Aria AI product page */
  async navigate(): Promise<void> {
    const base = this.url.replace(/\/$/, '');
    await this.page.goto(`${base}/aria-ai.html`, {
      waitUntil: 'domcontentloaded',
    });
  }
}
