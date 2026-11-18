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

- `saucedemo.spec.ts` covers SauceDemo login, error handling, sorting, and cart
  workflows using the Page Object Model.
- `saucedemo_login.spec.ts` and `saucedemo_cart.spec.ts` cover additional
  direct browser workflows.
- `api_test.spec.ts` covers JSONPlaceholder API requests.

The SauceDemo Page Object classes are in `pages/`:

- `LoginPage.ts` handles navigation and login actions.
- `InventoryPage.ts` handles the inventory sort and add-to-cart actions.

The browser tests access SauceDemo and the API tests access JSONPlaceholder, so
those services must be reachable when the tests run.

## History note

This repository's initial commit trail was reconstructed from available VS Code
Local History snapshots and file timestamps. It is not the original Git history;
the recorded dates reflect the available local evidence.
