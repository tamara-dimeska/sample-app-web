import { Locator, Page } from '@playwright/test';

export class CartNavBar {
  readonly page: Page;
  readonly itemsInCartIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemsInCartIcon = this.page.getByTestId('items-in-cart');
  }

  async openShoppingCart() {
    await this.page.getByTestId('shopping-cart-icon').click();
  }
}
