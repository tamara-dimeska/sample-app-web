import test, { expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { CORRECT_USER_CREDENTIALS } from '../consts/users';
import { HomePage } from '../pages/home-page';
import { ItemPage } from '../pages/item-page';
import { CartNavBar } from '../pages/cart-nav-bar';
import { ShoppingCartPage } from '../pages/shopping-cart-page';
import { BACKPACK, BIKE_LIGHT } from '../consts';

test.beforeEach(async ({ page, baseURL }) => {
  const loginPage = new LoginPage(page);

  await page.goto(baseURL!);
  await loginPage.login(CORRECT_USER_CREDENTIALS);
});

test.describe('User on items overview (home) page', () => {
  test('should be able to open an item and land on item detailed page', async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    const itemPage = new ItemPage(page);

    await homePage.openItem(BACKPACK);
    await expect(itemPage.backButton).toBeVisible();
    await expect(itemPage.getItem(BIKE_LIGHT)).not.toBeVisible();
  });

  test('should be able to add an item to cart', async ({ page }) => {
    const cartNavBar = new CartNavBar(page);
    const shoppingCartPage = new ShoppingCartPage(page);
    const homePage = new HomePage(page);

    await homePage.addBackpackToCart();
    await expect(cartNavBar.itemsInCartIcon).toHaveText('1');

    await cartNavBar.openShoppingCart();
    await expect(shoppingCartPage.title).toBeVisible();
    await expect(shoppingCartPage.getItem(BACKPACK)).toBeVisible();
    await expect(shoppingCartPage.getItem(BIKE_LIGHT)).not.toBeVisible();
  });

  test('should be able to remove an item from cart', async ({ page }) => {
    const cartNavBar = new CartNavBar(page);
    const shoppingCartPage = new ShoppingCartPage(page);
    const homePage = new HomePage(page);

    await homePage.addBackpackToCart();
    await homePage.removeBackpackFromCart();
    await expect(cartNavBar.itemsInCartIcon).not.toBeVisible();

    await cartNavBar.openShoppingCart();
    await expect(shoppingCartPage.title).toBeVisible();
    await expect(shoppingCartPage.getItem(BACKPACK)).not.toBeVisible();
  });
});
