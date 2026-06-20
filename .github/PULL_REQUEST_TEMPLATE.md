## Summary

<!-- What does this PR do? 1-3 bullet points. -->

-
-

## Type of change

- [ ] New test coverage
- [ ] Bug fix (broken selector, failing assertion)
- [ ] New page object
- [ ] Visual baseline update
- [ ] Dependency / config update
- [ ] Documentation

## Test suites affected

- [ ] `@smoke`
- [ ] `@navigation`
- [ ] `@forms`
- [ ] `@functional`
- [ ] `@visual`
- [ ] `@responsive`

## Checklist

- [ ] All page object locators are `readonly Locator` properties on the class
- [ ] No `expect()` calls inside page object methods
- [ ] No hardcoded URLs — tests use `baseURL` or `siteConfig.url`
- [ ] No form submissions in any test
- [ ] All new tests are tagged with at least one suite tag
- [ ] `npm run typecheck` passes
- [ ] Tests pass locally (`npm run test:smoke` at minimum)
- [ ] Visual snapshots updated and committed (if `@visual` tests changed)

## Screenshots / Evidence

<!-- For visual changes or new test coverage, paste a screenshot or test output here. -->
