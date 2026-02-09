import { CartNavBar } from '../pages/cart-nav-bar';
import { ShoppingCartPage } from '../pages/shopping-cart-page';
import { ItemPage } from '../pages/item-page';
import { BACKPACK } from '../consts';
import { openedItemTest as test, expect } from '../fixtures';

test.describe('User on item detailed page', () => {
  test('should be able to add an item to cart', async ({ openedItemPage }) => {
    const itemPage = new ItemPage(openedItemPage);
    const cartNavBar = new CartNavBar(openedItemPage);
    const shoppingCartPage = new ShoppingCartPage(openedItemPage);

    await itemPage.addBackpackToCart();
    await expect(cartNavBar.itemsInCartIcon).toHaveText('1');

    await cartNavBar.openShoppingCart();
    await expect(shoppingCartPage.title).toBeVisible();
    await expect(shoppingCartPage.getItem(BACKPACK)).toBeVisible();
  });

  test('should be able to remove an item from cart', async ({
    openedItemPage,
  }) => {
    const itemPage = new ItemPage(openedItemPage);
    const cartNavBar = new CartNavBar(openedItemPage);
    const shoppingCartPage = new ShoppingCartPage(openedItemPage);

    await itemPage.addBackpackToCart();
    await itemPage.removeBackpackFromCart();
    await expect(cartNavBar.itemsInCartIcon).not.toBeVisible();

    await cartNavBar.openShoppingCart();
    await expect(shoppingCartPage.title).toBeVisible();
    await expect(shoppingCartPage.getItem(BACKPACK)).not.toBeVisible();
  });
});
