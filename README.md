# Playwright SauceDemo API

Playwright practice tests for the SauceDemo storefront and the JSONPlaceholder
REST API.

## Requirements

- Node.js
- npm

## Setup

```bash
npm ci
npx playwright install chromium
```

## Run the tests

```bash
npx playwright test
```

The tests are in `tests/`:

- `saucedemo_login.spec.ts` and `saucedemo_cart.spec.ts` cover browser workflows.
- `api_test.spec.ts` covers JSONPlaceholder API requests.

The browser tests access SauceDemo and the API tests access JSONPlaceholder, so
those services must be reachable when the tests run.

## History note

This repository's initial commit trail was reconstructed from available VS Code
Local History snapshots and file timestamps. It is not the original Git history;
the recorded dates reflect the available local evidence.
