import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com');

    await page.getByPlaceholder('Username').fill("standard_user");
    await page.getByPlaceholder('Password').fill("secret_sauce");
    await page.getByRole('button', { name: 'Login' }).click();

})

test('Sort and add to car verify', async ({ page }) => {

    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
    await page.getByRole('button', { name: 'Add to Cart' }).first().click();

    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
    await expect(page.getByRole('button', { name: 'Remove' })).toBeVisible();
});