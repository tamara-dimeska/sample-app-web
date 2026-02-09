import { test as base, Page } from '@playwright/test';
import { CORRECT_USER_CREDENTIALS } from '../consts';
import { LoginPage } from '../pages/login-page';

export const loginTest = base.extend<{ loggedInPage: Page }>({
  loggedInPage: async ({ page, baseURL }, use) => {
    const loginPage = new LoginPage(page);

    await page.goto(baseURL!);
    await loginPage.login(CORRECT_USER_CREDENTIALS);
    await use(page);
  },
});

export const expect = loginTest.expect;
