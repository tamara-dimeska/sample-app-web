import { Locator, Page } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly title: Locator;
  readonly error: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = this.page.getByText('Thank you for your order!');
    this.error = this.page.getByTestId('error');
  }

  async fillInFirstName(firstName: string) {
    await this.page.getByTestId('firstName').fill(firstName);
  }

  async fillInLastName(lastName: string) {
    await this.page.getByTestId('lastName').fill(lastName);
  }

  async fillInPostCode(postCode: string) {
    await this.page.getByTestId('postalCode').fill(postCode);
  }

  async fillInForm(firstName: string, lastName: string, postCode: string) {
    await this.fillInFirstName(firstName);
    await this.fillInLastName(lastName);
    await this.fillInPostCode(postCode);
  }

  async clickContinueButton() {
    await this.page.getByTestId('continue').click();
  }

  async clickCancelButton() {
    await this.page.getByTestId('cancel').click();
  }

  async clickFinishButton() {
    await this.page.getByTestId('finish').click();
  }

  async clickBackButton() {
    await this.page.getByTestId('back-to-products').click();
  }
}
