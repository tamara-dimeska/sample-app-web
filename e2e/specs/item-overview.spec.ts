import { HomePage } from '../pages/home-page';
import { ItemPage } from '../pages/item-page';
import { CartNavBar } from '../pages/cart-nav-bar';
import { ShoppingCartPage } from '../pages/shopping-cart-page';
import { BACKPACK, BIKE_LIGHT } from '../consts';
import { loginTest as test, expect } from '../fixtures';

test.describe('User on items overview (home) page', () => {
  test('should be able to open an item and land on item detailed page', async ({
    loggedInPage,
  }) => {
    const homePage = new HomePage(loggedInPage);
    const itemPage = new ItemPage(loggedInPage);

    await homePage.openItem(BACKPACK);
    await expect(itemPage.backButton).toBeVisible();
    await expect(itemPage.getItem(BIKE_LIGHT)).not.toBeVisible();
  });

  test('should be able to add an item to cart', async ({ loggedInPage }) => {
    const cartNavBar = new CartNavBar(loggedInPage);
    const shoppingCartPage = new ShoppingCartPage(loggedInPage);
    const homePage = new HomePage(loggedInPage);

    await homePage.addBackpackToCart();
    await expect(cartNavBar.itemsInCartIcon).toHaveText('1');

    await cartNavBar.openShoppingCart();
    await expect(shoppingCartPage.title).toBeVisible();
    await expect(shoppingCartPage.getItem(BACKPACK)).toBeVisible();
    await expect(shoppingCartPage.getItem(BIKE_LIGHT)).not.toBeVisible();
  });

  test('should be able to remove an item from cart', async ({
    loggedInPage,
  }) => {
    const cartNavBar = new CartNavBar(loggedInPage);
    const shoppingCartPage = new ShoppingCartPage(loggedInPage);
    const homePage = new HomePage(loggedInPage);

    await homePage.addBackpackToCart();
    await homePage.removeBackpackFromCart();
    await expect(cartNavBar.itemsInCartIcon).not.toBeVisible();

    await cartNavBar.openShoppingCart();
    await expect(shoppingCartPage.title).toBeVisible();
    await expect(shoppingCartPage.getItem(BACKPACK)).not.toBeVisible();
  });
});
