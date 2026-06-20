# Skills (Slash Commands)

Skills are repeatable workflows packaged as slash commands. They live in `.claude/commands/` and load on demand — they don't consume context on every turn like `CLAUDE.md` instructions do.

Invoke a skill in any Claude Code session by typing `/skill-name`.

---

## Available Skills

### `/analyze-site`

**File:** `.claude/commands/analyze-site.md`

Crawl the live website and produce a fully-populated `site.config.json`.

**Usage:**
```
/analyze-site
/analyze-site http://www.emaginesolutionstech.com
```

**What it does:**
1. Navigates to the site URL (from `site.config.json` or the argument)
2. Extracts page title, meta description, and nav items
3. Detects contact forms and their field structure
4. Checks for HTTPS, meta viewport, and favicon
5. Attempts `/contact`, `/contact-us` paths for additional form detection
6. Assesses responsiveness at 390px viewport
7. Outputs an updated `site.config.json` block + issues checklist

**Output:**
- Ready-to-paste `site.config.json` JSON
- Issues checklist (missing meta description, no HTTPS, broken links, etc.)

---

### `/generate-full-suite`

**File:** `.claude/commands/generate-full-suite.md`

Analyze the live website and generate a complete Page Object Model + test suite covering every discoverable feature.

**Usage:**
```
/generate-full-suite
```

**What it does:**
1. Runs `/analyze-site` to ensure `site.config.json` is current
2. Crawls every nav destination to discover all pages
3. Creates or updates page object classes in `src/pages/`
4. Generates test files for every suite type:
   - `tests/smoke/` — availability and load
   - `tests/navigation/` — all nav links
   - `tests/forms/` — every form field (no submission)
   - `tests/functional/` — business features, CTAs, accordions, videos
   - `tests/visual/` — screenshot regression
   - `tests/responsive/` — mobile/tablet/desktop layout
5. Runs `npm run typecheck` to verify TypeScript
6. Reports what was generated and what needs manual review

**Prerequisites:** Site must be reachable. Run `/analyze-site` first if `site.config.json` is empty.

---

### `/run-smoke`

**File:** `.claude/commands/run-smoke.md`

Run the `@smoke` test suite and display a clean pass/fail summary.

**Usage:**
```
/run-smoke
```

**What it does:**
1. Runs `npm run test:smoke`
2. Parses `test-results/results.json`
3. Displays a formatted summary table with duration per test
4. For failures: shows error message and a suggested fix
5. Mirrors the underlying exit code (0 = all pass, 1 = any failure)

**Failure suggestions:**

| Failure | Suggestion |
|---------|-----------|
| HTTP 4xx/5xx | Check hosting/DNS — site may be down |
| Load time > 10s | Audit with Lighthouse; check for large images or blocking JS |
| Console errors | Open browser DevTools on the live site |
| HTTP (not HTTPS) | Configure SSL/TLS certificate |
| Missing meta description | Add `<meta name="description">` to the site `<head>` |

---

### `/update-baseline`

**File:** `.claude/commands/update-baseline.md`

Refresh visual regression screenshots to use as the new baseline.

**Usage:**
```
/update-baseline
```

**What it does:**
1. Runs `npm run baseline` (`playwright test --grep @visual --update-snapshots`)
2. Replaces all images in `__snapshots__/` with fresh captures
3. Lists which snapshots were updated
4. Reminds you to commit the updated snapshots

**When to use:**
- After intentional visual changes to the site
- When setting up the framework on a new machine
- When the site's design has been updated

**Warning:** Running this accepts all current visual state as correct. Review the diff before committing.

---

### `/generate-report`

**File:** `.claude/commands/generate-report.md`

Parse the latest test results and display a structured summary.

**Usage:**
```
/generate-report
```

**What it does:**
1. Parses `test-results/results.json`
2. Displays a suite-by-suite summary table (total / passed / failed / flaky)
3. Lists all failed tests with error messages
4. Lists all flaky tests with retry information
5. Suggests next steps based on failure patterns

**Requires:** A completed test run. If `test-results/results.json` doesn't exist, run `npm test` first.

**In CI:** Skips the browser-open step and outputs results to terminal only.

---

## Adding a New Skill

1. Create a `.md` file in `.claude/commands/`:

```markdown
# /my-skill

Brief description of what this skill does.

## Usage

/my-skill [optional-argument]

## What this command does

1. Step one
2. Step two
3. Step three
```

2. The skill is immediately available as `/my-skill` in any Claude Code session.
3. Check it into version control so the whole team can use it.

See the [Claude Code skills docs](https://code.claude.com/docs/en/skills) for more details.
