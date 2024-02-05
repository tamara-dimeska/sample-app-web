import test, { expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { CORRECT_USER_CREDENTIALS } from '../consts/users';
import { HomePage } from '../pages/home-page';
import { ItemOverviewPage } from '../pages/item-overview-page';
import { CartNavBar } from '../pages/cart-nav-bar';
import { ShoppingCartPage } from '../pages/shopping-cart-page';

test.beforeEach(async ({ page, baseURL }) => {
  const loginPage = new LoginPage(page);

  await page.goto(baseURL!);
  await loginPage.login(CORRECT_USER_CREDENTIALS);
});

test.describe('User on items overview page', () => {
  test('should be able to open an item and land on item detailed page', async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    const itemOverviewPage = new ItemOverviewPage(page);

    await homePage.openItem('Sauce Labs Backpack');
    await expect(itemOverviewPage.backButton).toBeVisible();
    await expect(
      itemOverviewPage.getItem('Sauce Labs Bike Light'),
    ).not.toBeVisible();
  });

  test('should be able to add an item to cart', async ({ page }) => {
    const itemOverviewPage = new ItemOverviewPage(page);
    const cartNavBar = new CartNavBar(page);
    const shoppingCartPage = new ShoppingCartPage(page);

    await itemOverviewPage.addBackpackToCart();
    await expect(cartNavBar.itemsInCartIcon).toHaveText('1');

    await cartNavBar.openShoppingCart();
    await expect(shoppingCartPage.title).toBeVisible();
    await expect(shoppingCartPage.getItem('Sauce Labs Backpack')).toBeVisible();
    await expect(
      shoppingCartPage.getItem('Sauce Labs Bike Light'),
    ).not.toBeVisible();
  });

  test('should be able to remove an item from cart', async ({ page }) => {
    const itemOverviewPage = new ItemOverviewPage(page);
    const cartNavBar = new CartNavBar(page);
    const shoppingCartPage = new ShoppingCartPage(page);

    await itemOverviewPage.addBackpackToCart();
    await itemOverviewPage.removeBackpackFromCart();
    await expect(cartNavBar.itemsInCartIcon).not.toBeVisible();

    await cartNavBar.openShoppingCart();
    await expect(shoppingCartPage.title).toBeVisible();
    await expect(
      shoppingCartPage.getItem('Sauce Labs Backpack'),
    ).not.toBeVisible();
  });
});
