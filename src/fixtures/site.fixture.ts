/**
 * src/fixtures/site.fixture.ts
 *
 * Extends Playwright's base `test` with pre-constructed page objects and the
 * loaded site config.  All test files should import {test, expect} from here
 * instead of from '@playwright/test' directly.
 *
 * Usage in test files:
 *   import { test, expect } from '@fixtures/site.fixture';
 */

import { test as base, expect } from '@playwright/test';
import { loadSiteConfig, type SiteConfig } from '@site-types/site-config.types';
import { HomePage } from '@pages/home.page';
import { NavigationPage } from '@pages/navigation.page';
import { ContactFormPage } from '@pages/contact.page';
import { JourneyAppPage } from '@pages/journey-app.page';
import { JourneyPlatformPage } from '@pages/journey-platform.page';
import { AriaAiPage } from '@pages/aria-ai.page';
import { WhiteLabelPage } from '@pages/white-label.page';
import { CompanyPage } from '@pages/company.page';
import { BlogPage } from '@pages/blog.page';

// ── Fixture type definitions ─────────────────────────────────────────────────

export interface Fixtures {
  /** Fully resolved site configuration loaded from site.config.json */
  siteConfig: SiteConfig;
  /** Pre-navigated HomePage page object */
  homePage: HomePage;
  /** NavigationPage page object (does not auto-navigate) */
  navigationPage: NavigationPage;
  /** ContactFormPage page object (does not auto-navigate) */
  contactPage: ContactFormPage;
  /** JourneyAppPage page object (does not auto-navigate — call navigate() in tests) */
  journeyAppPage: JourneyAppPage;
  /** JourneyPlatformPage page object (does not auto-navigate — call navigate() in tests) */
  journeyPlatformPage: JourneyPlatformPage;
  /** AriaAiPage page object (does not auto-navigate — call navigate() in tests) */
  ariaAiPage: AriaAiPage;
  /** WhiteLabelPage page object (does not auto-navigate — call navigate() in tests) */
  whitelabelPage: WhiteLabelPage;
  /** CompanyPage page object (does not auto-navigate — call navigate() in tests) */
  companyPage: CompanyPage;
  /** BlogPage page object (does not auto-navigate — call navigate() in tests) */
  blogPage: BlogPage;
}

// ── Extended test object ─────────────────────────────────────────────────────

export const test = base.extend<Fixtures>({
  /**
   * siteConfig — loaded once per worker from site.config.json.
   * Shared across all fixtures in the same test.
   */
  siteConfig: async ({}, use) => {
    const config = loadSiteConfig();
    await use(config);
  },

  /**
   * homePage — constructs HomePage and navigates to the site root.
   * Waits for domcontentloaded before handing control to the test.
   */
  homePage: async ({ page, siteConfig }, use) => {
    const homePage = new HomePage(page, siteConfig);
    await homePage.navigate();
    await use(homePage);
  },

  /**
   * navigationPage — constructs NavigationPage without navigating.
   * Tests that need to be on a specific page should call navigate() themselves.
   */
  navigationPage: async ({ page, siteConfig }, use) => {
    const navigationPage = new NavigationPage(page, siteConfig);
    await use(navigationPage);
  },

  /**
   * contactPage — constructs ContactFormPage without navigating.
   * Tests should navigate to the appropriate page first.
   */
  contactPage: async ({ page, siteConfig }, use) => {
    const contactPage = new ContactFormPage(page, siteConfig);
    await use(contactPage);
  },

  /**
   * journeyAppPage — constructs JourneyAppPage without navigating.
   * Tests must call journeyAppPage.navigate() in beforeEach or the test body.
   */
  journeyAppPage: async ({ page, siteConfig }, use) => {
    const journeyAppPage = new JourneyAppPage(page, siteConfig);
    await use(journeyAppPage);
  },

  /**
   * journeyPlatformPage — constructs JourneyPlatformPage without navigating.
   * Tests must call journeyPlatformPage.navigate() in beforeEach or the test body.
   */
  journeyPlatformPage: async ({ page, siteConfig }, use) => {
    const journeyPlatformPage = new JourneyPlatformPage(page, siteConfig);
    await use(journeyPlatformPage);
  },

  /**
   * ariaAiPage — constructs AriaAiPage without navigating.
   * Tests must call ariaAiPage.navigate() in beforeEach or the test body.
   */
  ariaAiPage: async ({ page, siteConfig }, use) => {
    const ariaAiPage = new AriaAiPage(page, siteConfig);
    await use(ariaAiPage);
  },

  /**
   * whitelabelPage — constructs WhiteLabelPage without navigating.
   * Tests must call whitelabelPage.navigate() in beforeEach or the test body.
   */
  whitelabelPage: async ({ page, siteConfig }, use) => {
    const whitelabelPage = new WhiteLabelPage(page, siteConfig);
    await use(whitelabelPage);
  },

  /**
   * companyPage — constructs CompanyPage without navigating.
   * Tests must call companyPage.navigate() in beforeEach or the test body.
   */
  companyPage: async ({ page, siteConfig }, use) => {
    const companyPage = new CompanyPage(page, siteConfig);
    await use(companyPage);
  },

  /**
   * blogPage — constructs BlogPage without navigating.
   * Tests must call blogPage.navigate() in beforeEach or the test body.
   */
  blogPage: async ({ page, siteConfig }, use) => {
    const blogPage = new BlogPage(page, siteConfig);
    await use(blogPage);
  },
});

// Re-export expect so tests only need one import source
export { expect };
