import { Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
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
}
