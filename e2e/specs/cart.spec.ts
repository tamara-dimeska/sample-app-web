import { HomePage } from '../pages/home-page';
import { ShoppingCartPage } from '../pages/shopping-cart-page';
import { BACKPACK } from '../consts';
import { openedShoppingCardTest as test, expect } from '../fixtures';

test.describe('User on cart page', () => {
  test('should be able to remove an item from cart', async ({
    openedShoppingCardPage,
  }) => {
    const shoppingCartPage = new ShoppingCartPage(openedShoppingCardPage);

    await shoppingCartPage.removeBackpackFromCart();
    await expect(shoppingCartPage.getItem(BACKPACK)).not.toBeVisible();
  });

  test('should be able to continue with shopping', async ({
    openedShoppingCardPage,
  }) => {
    const shoppingCartPage = new ShoppingCartPage(openedShoppingCardPage);
    const homePage = new HomePage(openedShoppingCardPage);

    await shoppingCartPage.clickContinueShoppingButton();
    await expect(shoppingCartPage.title).not.toBeVisible();
    await expect(homePage.title).toBeVisible();
  });
});
