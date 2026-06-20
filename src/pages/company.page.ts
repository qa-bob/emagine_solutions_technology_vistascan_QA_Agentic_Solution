/**
 * src/pages/company.page.ts
 *
 * Page object for the Company/About Us page.
 * Site: Emagine Solutions Technology (https://emaginest.com/company.html)
 *
 * Key content:
 *  - H1: "About Us"
 *  - Mission statement section
 *  - Team section: Courtney Williams (Co-founder & CEO), José Juárez (Co-founder & CTO)
 *  - "In the Press" section
 *  - "Our recent articles" section
 *  - Request Demo and Contact CTAs
 */

import { type Page, type Locator } from '@playwright/test';
import { BasePage } from '@pages/base.page';
import type { SiteConfig } from '@site-types/site-config.types';

export class CompanyPage extends BasePage {
  /** Page h1 heading ("About Us") */
  readonly heading: Locator;

  /** Mission statement text block */
  readonly missionText: Locator;

  /** Team section container */
  readonly teamSection: Locator;

  /**
   * Individual team member items.
   * Targets h4 headings containing known team member names since the site
   * uses semantic HTML without explicit team member card class names.
   */
  readonly teamMembers: Locator;

  /** "In the Press" section */
  readonly pressSection: Locator;

  /** "Our recent articles" section */
  readonly blogSection: Locator;

  /** Request Demo CTA link */
  readonly requestDemoBtn: Locator;

  constructor(page: Page, config: SiteConfig) {
    super(page, config);

    this.heading = page.locator('h1').first();

    this.missionText = page
      .locator('p, section, div')
      .filter({ hasText: /maternal health crisis|remote patient monitoring|improve outcomes/i })
      .first();

    this.teamSection = page
      .locator('section, div')
      .filter({ hasText: /courtney williams|josé juárez|co-founder/i })
      .first();

    // Team member items are h4 elements with known team member names
    this.teamMembers = page.locator('h4').filter({
      hasText: /courtney williams|josé juárez|co-founder/i,
    });

    this.pressSection = page
      .locator('section, div')
      .filter({ hasText: /in the press/i })
      .first();

    this.blogSection = page
      .locator('section, div')
      .filter({ hasText: /our recent articles/i })
      .first();

    this.requestDemoBtn = page
      .locator('a[href*="request-a-demo"]')
      .first();
  }

  /** Navigate to the Company/About page */
  async navigate(): Promise<void> {
    const base = this.url.replace(/\/$/, '');
    await this.page.goto(`${base}/company.html`, {
      waitUntil: 'domcontentloaded',
    });
  }

  /** Return the number of team member items found on the page */
  async getTeamMemberCount(): Promise<number> {
    return this.teamMembers.count();
  }
}
