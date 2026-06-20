---
name: Bug report
about: Report a broken test, incorrect selector, or test framework issue
title: "[BUG] "
labels: bug
assignees: ''
---

## Describe the bug

<!-- A clear description of what is broken. -->

## Failing test

<!-- Which test file and test name is failing? -->

**File:** `tests/<suite>/<file>.spec.ts`
**Test:** `<describe block> > <test name>`
**Tag:** `@smoke` / `@navigation` / `@forms` / `@functional` / `@visual` / `@responsive`

## Error output

```
paste the error message and stack trace here
```

## Expected behavior

<!-- What should the test do when it passes? -->

## Steps to reproduce

1. Run `npm run test:<suite>`
2. See failure in test `...`

## Environment

- **OS:** Windows / macOS / Linux
- **Node version:** `node --version`
- **Playwright version:** `npx playwright --version`
- **Browser project:** chromium-desktop / mobile-chrome / tablet

## Possible cause

<!-- If you have a hypothesis (e.g., selector changed, site updated, timing issue), note it here. -->

## Is this a site change or a test bug?

- [ ] The site changed (selector or content no longer matches)
- [ ] The test logic is wrong
- [ ] Timing / flakiness issue
- [ ] Unknown
