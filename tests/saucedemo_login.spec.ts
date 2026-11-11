import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
});

test('Verify Successful login on SauceDemo', async ({ page }) => {

    await page.getByPlaceholder('Username').fill("standard_user");
    await page.getByPlaceholder('Password').fill("secret_sauce");

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText("Products")).toBeVisible();
    await expect(page).toHaveURL(/inventory\.html/);
});

test('Verify error message on Invalid login', async ({ page }) => {

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('wrong_password');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText(/Username and password do not match any user/)).toBeVisible();
    await expect(page).not.toHaveURL(/inventory\.html/);
});

test('Verify error message on locked_out user', async ({ page }) => {

    await page.getByPlaceholder('Username').fill('locked_out_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText(/Sorry, this user has been locked out/)).toBeVisible();
    await expect(page).not.toHaveURL(/inventory\.html/);
});

test('Sort products and add item to cart', async ({ page }) => {
    // 1. Reuse your exact login flow
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    // 2. Select "Price (low to high)" from the sort dropdown
    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

    // 3. Click "Add to cart" on the first (cheapest) product
    await page.getByRole('button', { name: 'Add to cart' }).first().click();

    // 4. Verify the shopping cart badge shows "1"
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
});

