import { Page, Locator } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly cartBadge: Locator;
    readonly addToCartButton: Locator;
    readonly cartButton: Locator;
    readonly sortDropdown: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.getByText('Products');
        this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.cartButton = page.locator('[data-test="shopping-cart-link"]');
    }

    async lowToHighSort() {
        await this.sortDropdown.selectOption('lohi');
    }

    async firstAddToCart() {
        await this.addToCartButton.first().click();
    }

    async openCart() {
        await this.cartButton.click();
    }

}