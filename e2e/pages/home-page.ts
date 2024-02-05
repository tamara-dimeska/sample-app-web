import { Locator, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = this.page.getByText('Products');
  }

  async openMenu() {
    await this.page.getByText('Open Menu').click();
  }

  async logout() {
    await this.page.getByText('Logout').click();
  }

  async openItem(itemLabel: string) {
    await this.page.getByText(itemLabel).click();
  }

  async addBackpackToCart() {
    await this.page.getByTestId('add-to-cart-sauce-labs-backpack').click();
  }

  async removeBackpackFromCart() {
    await this.page.getByTestId('remove-sauce-labs-backpack').click();
  }
}
