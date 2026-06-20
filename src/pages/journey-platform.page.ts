/**
 * src/pages/journey-platform.page.ts
 *
 * Page object for the Journey Remote Patient Monitoring Platform page.
 * Site: Emagine Solutions Technology (https://emaginest.com/the-journey-platform.html)
 *
 * Key content:
 *  - 9 feature cards (Patient Health Tracking, Dashboards & Alerts, Messaging,
 *    Reports, HIPAA Secure, Telemedicine, Real-Time Data, CPT Codes, EHR Connected)
 *  - "How it Works" section
 *  - "For Patients" and "For Providers" benefit sections
 *  - Request Demo CTA
 */

import { type Page, type Locator } from '@playwright/test';
import { BasePage } from '@pages/base.page';
import type { SiteConfig } from '@site-types/site-config.types';

export class JourneyPlatformPage extends BasePage {
  /** Page h1 heading */
  readonly heading: Locator;

  /**
   * Feature cards — the 9 platform feature items.
   * The page uses semantic HTML without explicit card class names, so we target
   * headings that correspond to known feature names.
   */
  readonly featureCards: Locator;

  /** "How it Works" section */
  readonly howItWorksSection: Locator;

  /** "For Patients" benefit section */
  readonly forPatientsSection: Locator;

  /** "For Providers" benefit section */
  readonly forProvidersSection: Locator;

  /** Request Demo CTA link */
  readonly requestDemoBtn: Locator;

  constructor(page: Page, config: SiteConfig) {
    super(page, config);

    this.heading = page.locator('h1').first();

    // Feature cards: headings matching known platform feature names
    this.featureCards = page.locator('h2, h3, h4').filter({
      hasText:
        /patient health tracking|dashboards|messaging|reports|hipaa|telemedicine|real-time data|cpt codes|ehr/i,
    });

    this.howItWorksSection = page
      .locator('section, div')
      .filter({ hasText: /how it works/i })
      .first();

    this.forPatientsSection = page
      .locator('section, div')
      .filter({ hasText: /for patients/i })
      .first();

    this.forProvidersSection = page
      .locator('section, div')
      .filter({ hasText: /for providers/i })
      .first();

    this.requestDemoBtn = page
      .locator('a[href*="request-a-demo"]')
      .first();
  }

  /** Navigate to the Journey Platform product page */
  async navigate(): Promise<void> {
    const base = this.url.replace(/\/$/, '');
    await this.page.goto(`${base}/the-journey-platform.html`, {
      waitUntil: 'domcontentloaded',
    });
  }
}
