import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { HomePage } from '../pages/home-page';
import {
  CORRECT_USER_CREDENTIALS,
  INCORRECT_USER_CREDENTIALS,
} from '../consts/users';

test.beforeEach(async ({ page, baseURL }) => {
  await page.goto(baseURL!);
});

test.describe('User on login page', () => {
  test('should be able to login when entering correct credentials and logout', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await loginPage.login(CORRECT_USER_CREDENTIALS);
    await homePage.openMenu();
    await homePage.logout();
    await expect(loginPage.title).toBeVisible();
  });

  test('should not be able to login when entering incorrect credentials', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(INCORRECT_USER_CREDENTIALS);
    await expect(loginPage.errorMessage).toHaveText(
      'Epic sadface: Username and password do not match any user in this service',
    );
  });
});
