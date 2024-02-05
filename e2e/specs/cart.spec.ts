import test, { expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { CORRECT_USER_CREDENTIALS } from '../consts/users';
import { HomePage } from '../pages/home-page';
import { CartNavBar } from '../pages/cart-nav-bar';
import { ShoppingCartPage } from '../pages/shopping-cart-page';
import { BACKPACK } from '../consts';

test.beforeEach(async ({ page, baseURL }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const cartNavBar = new CartNavBar(page);

  await page.goto(baseURL!);
  await loginPage.login(CORRECT_USER_CREDENTIALS);
  await homePage.addBackpackToCart();
  await cartNavBar.openShoppingCart();
});

test.describe('User on cart page', () => {
  test('should be able to remove an item from cart', async ({ page }) => {
    const shoppingCartPage = new ShoppingCartPage(page);

    await shoppingCartPage.removeBackpackFromCart();
    await expect(shoppingCartPage.getItem(BACKPACK)).not.toBeVisible();
  });

  test('should be able to continue with shopping', async ({ page }) => {
    const shoppingCartPage = new ShoppingCartPage(page);
    const homePage = new HomePage(page);

    await shoppingCartPage.clickContinueShoppingButton();
    await expect(shoppingCartPage.title).not.toBeVisible();
    await expect(homePage.title).toBeVisible();
  });
});
