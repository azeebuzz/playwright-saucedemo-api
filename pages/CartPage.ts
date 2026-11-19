import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly productName: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productName = page.locator('[data-test="inventory-item-name"]');
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    }

    async doCheckout() {
        await this.checkoutButton.click();
    }
}