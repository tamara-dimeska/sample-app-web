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
}
