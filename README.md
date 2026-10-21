# demoqa-pw-ts
playwright typescript framework for demoqa

Page-object actions use a shared self-healing locator strategy: each action tries its primary locator, then explicit accessible/semantic alternatives when the primary locator is missing, hidden, ambiguous, or disabled. A fallback selection is reported to the test output. If no candidate is currently actionable, the primary locator is still used so Playwright's normal waiting and failure diagnostics are preserved. Assertions are intentionally not healed; they continue to verify the expected page state.

The Playwright lifecycle reporter logs a `[TEST START]` line before every test and a `[TEST PASS]`, `[TEST FAIL]`, or `[TEST SKIP]` line after it, including the final status, retry attempt, and duration. The HTML report remains enabled.

To view the latest HTML report, run `npm run report`. It uses port `9324` so it can run alongside Playwright's default UI/test server on port `9323`. If port `9324` is also occupied, run `npx playwright show-report --port <available-port>`.

## Smoke / Regression tagging

Every test carries a tag via Playwright's native `tag` option. Tags live in `data/testdata.json` (`"tags": [...]` on each dataset) and are passed in the spec as `test(title, { tag: d.tags }, ...)`.

- `@smoke` - one critical happy-path dataset per module (7 tests)
- `@regression` - every dataset, including the smoke ones (15 tests)

```
npm run test:smoke                   # smoke only, all browsers
npm run test:regression              # full regression
npm run test:smoke:chromium          # smoke, Chromium only
npx playwright test --grep @regression --grep-invert @smoke   # regression minus smoke
```

## Retries

`retries` is 2 on CI and 1 locally (`playwright.config.ts`). A trace is captured on the first retry.
