# Emagine Solutions Technology (Vistascan) — QA Agentic Solution

Playwright + TypeScript automated test suite for [Emagine Solutions Technology](http://www.emaginesolutionstech.com), built with the Page Object Model (POM) design pattern and powered by Claude Code agentic execution.

---

## Table of Contents

- [Project Purpose](#project-purpose)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)
- [Agents](#agents)
- [Skills (Slash Commands)](#skills-slash-commands)
- [Contributor Rules](#contributor-rules)
- [Site Configuration](#site-configuration)

---

## Project Purpose

This repository contains a comprehensive GUI, functional, and regression test suite for the Emagine Solutions Technology website. Tests cover every discoverable feature of the site **without requiring account creation or actual form submission**.

| Company | Emagine Solutions Technology (Vistascan) |
|---------|------------------------------------------|
| Website | http://www.emaginesolutionstech.com |
| Industry | Mobile ultrasound imaging technology |
| Founded | 2015 |
| Leaders | Courtney Williams (CEO/Co-Founder), José Juárez (CTO/Co-Founder) |

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| [Playwright](https://playwright.dev/) | Browser automation |
| TypeScript (strict mode) | Strongly-typed test code |
| Page Object Model (POM) | Maintainable selector management |
| GitHub Actions | CI/CD pipeline |
| Claude Code | Agentic test generation and maintenance |

---

## Architecture

This project follows **Page Object Model (POM)** with **Object-Oriented Programming (OOP)** principles:

- Every page or section has its own class in `src/pages/` that extends `BasePage`
- Page classes expose typed `readonly Locator` properties — selectors live in the page object, not the test
- Page methods represent user actions (`fillNameField()`, `clickSubmit()`) — no `expect()` inside page objects
- Tests import page objects via the custom fixture in `src/fixtures/site.fixture.ts`
- Tests own all assertions via `expect()` from Playwright

### OOP Principles Applied

| Principle | Implementation |
|-----------|---------------|
| **Inheritance** | All page objects extend `BasePage` for shared navigation, screenshot, and console-error helpers |
| **Encapsulation** | Locators and DOM interaction are private to each page class |
| **Abstraction** | Tests interact with high-level methods, not raw selectors |
| **Single Responsibility** | One page object per page/section; one spec file per test category |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- Git

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd emagine_solutions_technology_vistascan_QA_Agentic_Solution

# Install Node dependencies
npm install

# Install Playwright browsers
npx playwright install --with-deps
```

### Environment Setup

Copy the example environment file (optional — the framework reads `site.config.json` by default):

```bash
cp .env.example .env
```

To override the target URL without editing `site.config.json`:

```bash
SITE_URL=http://www.emaginesolutionstech.com npx playwright test
```

### Verify Setup

Run the smoke suite to confirm everything is wired up:

```bash
npm run test:smoke
```

A passing smoke run means the site is reachable, loads without critical errors, and the framework is configured correctly.

---

## Running Tests

### npm Scripts

```bash
npm test                    # Run all tests (chromium-desktop, mobile-chrome, tablet)
npm run test:smoke          # @smoke — site loads, title present, no console errors
npm run test:navigation     # @navigation — nav links, routing, menus
npm run test:forms          # @forms — form fields, validation (no submission)
npm run test:visual         # @visual — screenshot regression
npm run test:responsive     # @responsive — layout at mobile/tablet/desktop
npm run test:headed         # Run in headed mode (visible browser)
npm run baseline            # Update visual regression snapshots
npm run report              # Open the Playwright HTML report
npm run lint                # Run ESLint
npm run typecheck           # Run TypeScript compiler check
```

### By Browser Project

```bash
npx playwright test --project=chromium-desktop
npx playwright test --project=mobile-chrome
npx playwright test --project=tablet
```

### Interactive UI Mode

```bash
npx playwright test --ui
```

### Trace Viewer (debugging)

```bash
npx playwright show-trace test-results/<run>/trace.zip
```

---

## Project Structure

```
emagine_solutions_technology_vistascan_QA_Agentic_Solution/
├── site.config.json              # Target site URL, flags, and feature toggles
├── playwright.config.ts          # Playwright projects: desktop, mobile, tablet
├── global-setup.ts               # Pre-suite reachability check
├── tsconfig.json                 # TypeScript strict mode config
├── package.json
│
├── src/
│   ├── pages/                    # Page Object Model classes
│   │   ├── base.page.ts          # BasePage — shared navigation, screenshots, helpers
│   │   ├── home.page.ts          # HomePage — hero, CTAs, headings
│   │   ├── navigation.page.ts    # NavigationPage — nav links, mobile menu
│   │   └── contact.page.ts       # ContactFormPage — form fields, validation
│   ├── fixtures/
│   │   └── site.fixture.ts       # Custom test fixtures exposing page objects
│   ├── utils/
│   │   ├── link-checker.ts       # HTTP link status checker
│   │   └── visual-helper.ts      # Screenshot comparison helpers
│   └── types/
│       └── site-config.types.ts  # SiteConfig TypeScript interface + loader
│
├── tests/
│   ├── smoke/
│   │   └── site-availability.spec.ts   # @smoke — availability, title, HTTPS
│   ├── navigation/
│   │   └── nav-links.spec.ts           # @navigation — links, routing, menus
│   ├── forms/
│   │   └── contact-form.spec.ts        # @forms — fields, validation
│   ├── functional/
│   │   └── <feature>.spec.ts           # @functional — business logic per feature
│   ├── visual/
│   │   └── visual-regression.spec.ts   # @visual — screenshot regression
│   └── responsive/
│       └── layout.spec.ts              # @responsive — viewport layout checks
│
├── __snapshots__/                # Visual regression baseline images (git-tracked)
│
├── .claude/
│   ├── agents/                   # Claude Code subagent definitions
│   │   ├── site-analyzer.md      # Crawls live site → updates site.config.json
│   │   └── test-generator.md     # Generates site-specific test files
│   ├── commands/                 # Slash command skill definitions
│   │   ├── analyze-site.md       # /analyze-site
│   │   ├── generate-full-suite.md # /generate-full-suite
│   │   ├── run-smoke.md          # /run-smoke
│   │   ├── update-baseline.md    # /update-baseline
│   │   └── generate-report.md    # /generate-report
│   ├── rules/                    # Path-scoped Claude Code rules
│   │   ├── testing.md            # Rules for test files (tests/**)
│   │   └── page-objects.md       # Rules for page object files (src/pages/**)
│   ├── hooks/
│   │   └── pre-test.sh           # Site reachability check before test runs
│   └── settings.json             # Project-level Claude Code permissions
│
├── .github/
│   ├── workflows/
│   │   └── playwright.yml        # CI: run Playwright on push/PR
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md         # Bug report template
│   │   └── test_request.md       # New test request template
│   ├── PULL_REQUEST_TEMPLATE.md  # PR template
│   └── CONTRIBUTING.md           # Contributor guidelines
│
├── CLAUDE.md                     # Claude Code project instructions
├── AGENTS.md                     # Agent documentation (imported by CLAUDE.md)
├── Skills.md                     # Skill/command documentation
└── README.md                     # This file
```

---

## Agents

Claude Code subagents are defined in `.claude/agents/`. They run in isolated context windows and are delegated specific tasks automatically.

| Agent | File | When Invoked |
|-------|------|-------------|
| `site-analyzer` | `.claude/agents/site-analyzer.md` | Crawling the live site, updating `site.config.json`, running `/analyze-site` |
| `test-generator` | `.claude/agents/test-generator.md` | Generating site-specific test files, running `/generate-full-suite` |

See [AGENTS.md](./AGENTS.md) for detailed agent documentation.

---

## Skills (Slash Commands)

Skills are invoked in Claude Code sessions with `/command-name`. They load on demand and don't consume context on every turn.

| Command | What it does |
|---------|-------------|
| `/analyze-site` | Crawl the live site, extract nav items, detect forms, update `site.config.json` |
| `/generate-full-suite` | Full POM + test generation for every discovered page and feature |
| `/run-smoke` | Run smoke tests and display a pass/fail summary table |
| `/update-baseline` | Capture fresh visual regression screenshots as the new baseline |
| `/generate-report` | Parse `test-results/results.json` and display a formatted summary |

See [Skills.md](./Skills.md) for detailed skill documentation.

---

## Contributor Rules

These rules apply to all contributors, human and AI.

### Architecture Rules

- **Every page gets its own class** in `src/pages/` extending `BasePage`
- **Locators belong in page objects**, not in test files — no raw `page.locator()` in specs
- **No `expect()` in page objects** — assertions belong in test files only
- **No hardcoded URLs** — always use `baseURL` from Playwright config (reads `site.config.json`)
- **No form submission** — test field interactions and validation only
- **No account creation** — never enter real credentials

### Test Rules

- Tag every test with at least one: `@smoke`, `@navigation`, `@forms`, `@functional`, `@visual`, `@responsive`
- Import from `@fixtures/site.fixture` not from `@playwright/test` directly
- No `page.waitForTimeout()` — use Playwright auto-waiting or `waitForSelector`

### TypeScript Rules

- Strict mode is on — no implicit `any`
- All page object properties must be explicitly typed
- Run `npm run typecheck` before submitting a PR

### Branching & PRs

- Branch from `main`: `feature/`, `fix/`, `test/`, `chore/` prefixes
- One logical change per PR
- All tests must pass in CI before merging
- Visual baseline changes require explicit `/update-baseline` run and committed snapshots

### Adding New Tests

1. Read `site.config.json` to confirm URL and flags
2. Use `WebFetch` or your browser to inspect live HTML before writing selectors
3. Add or update the relevant page object in `src/pages/`
4. Write the spec file using the page object, not raw locators
5. Tag tests appropriately
6. Run `npm run typecheck` to verify TypeScript

---

## Site Configuration

`site.config.json` controls the target URL and all feature toggles:

```json
{
  "name": "Emagine Solutions Technology",
  "url": "http://www.emaginesolutionstech.com",
  "hasContactForm": true,
  "expectedNavItems": [],
  "viewports": ["desktop", "mobile", "tablet"],
  "skipVisual": false,
  "skipForms": false,
  "auth": {
    "required": false,
    "loginUrl": "",
    "username": "",
    "password": ""
  }
}
```

Run `/analyze-site` to auto-populate `expectedNavItems` and all other fields from the live site.

---

*Part of the Phoenix Startup QA Agentic Solutions project — automated test suites for B2B SaaS companies, generated and maintained by Claude Code.*
