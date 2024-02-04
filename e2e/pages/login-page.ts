import { Locator, Page } from '@playwright/test';
import { UserInterface } from '../types';

export class LoginPage {
  readonly page: Page;
  readonly title: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = this.page.getByText('Swag Labs');
    this.errorMessage = this.page.getByTestId('error');
  }

  async login(user: UserInterface) {
    await this.page.getByTestId('username').fill(user.username);
    await this.page.getByTestId('password').fill(user.password);
    await this.page.getByTestId('login-button').click();
  }
}
