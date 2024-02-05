import { Locator, Page } from '@playwright/test';

export class ShoppingCartPage {
  readonly page: Page;
  readonly title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = this.page.getByText('Your Cart');
  }

  getItem(itemLabel: string): Locator {
    return this.page.getByText(itemLabel);
  }

  async removeBackpackFromCart() {
    await this.page.getByTestId('remove-sauce-labs-backpack').click();
  }

  async clickContinueShoppingButton() {
    await this.page.getByTestId('continue-shopping').click();
  }

  async openCheckout() {
    await this.page.getByTestId('checkout').click();
  }
}
