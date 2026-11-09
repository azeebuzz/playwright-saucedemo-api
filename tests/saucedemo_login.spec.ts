import { test, expect } from '@playwright/test';

test('Verify Successful login on SauceDemo', async ({ page }) => {
    await page.goto("https://saucedemo.com");

    await page.getByPlaceholder('Username').fill("standard_user");
    await page.getByPlaceholder('Password').fill("secret_sauce");

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText("Products")).toBeVisible();
    await expect(page).toHaveURL(/.*inventory.html/);
});

// Test 2: Negative Login (Appended right below Test 1)
test('Verify error message on invalid login', async ({ page }) => {
    await page.goto('https://saucedemo.com');

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('wrong_password');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
    await expect(page).toHaveURL('https://saucedemo.com');
})