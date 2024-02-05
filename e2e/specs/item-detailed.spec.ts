import test, { expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { CORRECT_USER_CREDENTIALS } from '../consts/users';
import { HomePage } from '../pages/home-page';
import { CartNavBar } from '../pages/cart-nav-bar';
import { ShoppingCartPage } from '../pages/shopping-cart-page';
import { ItemPage } from '../pages/item-page';
import { BACKPACK } from '../consts';

test.beforeEach(async ({ page, baseURL }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  await page.goto(baseURL!);
  await loginPage.login(CORRECT_USER_CREDENTIALS);
  await homePage.openItem(BACKPACK);
});

test.describe('User on item detailed page', () => {
  test('should be able to add an item to cart', async ({ page }) => {
    const itemPage = new ItemPage(page);
    const cartNavBar = new CartNavBar(page);
    const shoppingCartPage = new ShoppingCartPage(page);

    await itemPage.addBackpackToCart();
    await expect(cartNavBar.itemsInCartIcon).toHaveText('1');

    await cartNavBar.openShoppingCart();
    await expect(shoppingCartPage.title).toBeVisible();
    await expect(shoppingCartPage.getItem(BACKPACK)).toBeVisible();
  });

  test('should be able to remove an item from cart', async ({ page }) => {
    const itemPage = new ItemPage(page);
    const cartNavBar = new CartNavBar(page);
    const shoppingCartPage = new ShoppingCartPage(page);

    await itemPage.addBackpackToCart();
    await itemPage.removeBackpackFromCart();
    await expect(cartNavBar.itemsInCartIcon).not.toBeVisible();

    await cartNavBar.openShoppingCart();
    await expect(shoppingCartPage.title).toBeVisible();
    await expect(shoppingCartPage.getItem(BACKPACK)).not.toBeVisible();
  });
});
