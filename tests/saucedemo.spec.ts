import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';

import { InventoryPage } from '../pages/InventoryPage';

test('Verify successful login on Saucedemo', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(inventoryPage.pageTitle).toBeVisible();
    await expect(page).toHaveURL(/inventory\.html/);
});

test('Verify error message on Invalid Login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'wrong_password');

    await expect(loginPage.errorMessage).toContainText('Username and password do not match any user');
    await expect(page).not.toHaveURL(/inventory\.html/);
});

test('Verify error message on locked_out user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');

    await expect(loginPage.errorMessage).toContainText('Sorry, this user has been locked out');
    await expect(page).not.toHaveURL(/inventory\.html/);
});

test('Sort products and add item to cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await inventoryPage.lowToHighSort();
    await inventoryPage.firstAddToCart();

    await expect(inventoryPage.cartBadge).toHaveText('1');

});