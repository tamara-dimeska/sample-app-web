import { Locator, Page } from '@playwright/test';

export class ItemOverviewPage {
  readonly page: Page;
  readonly backButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.backButton = this.page.getByTestId('back-to-products');
  }

  getItem(itemLabel: string): Locator {
    return this.page.getByText(itemLabel);
  }

  async addBackpackToCart() {
    await this.page.getByTestId('add-to-cart-sauce-labs-backpack').click();
  }

  async removeBackpackFromCart() {
    await this.page.getByTestId('remove-sauce-labs-backpack').click();
  }
}
