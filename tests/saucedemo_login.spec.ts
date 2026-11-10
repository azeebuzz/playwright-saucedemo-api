import { test, expect } from '@playwright/test';

test('Verify Successful login on SauceDemo', async ({ page }) => {
    await page.goto("https://saucedemo.com");

    await page.getByPlaceholder('Username').fill("standard_user");
    await page.getByPlaceholder('Password').fill("secret_sauce");

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText("Products")).toBeVisible();
    await expect(page).toHaveURL(/.*inventory.html/);
});

test('Verify error message on Invalid login', async ({ page }) => {
    await page.goto("https://www.saucedemo.com");

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('wrong_password');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText(/Username and password do not match any user/)).toBeVisible();
    await expect(page).not.toHaveURL(/inventory\.html/);
});


