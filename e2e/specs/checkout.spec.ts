import { HomePage } from '../pages/home-page';
import { CartNavBar } from '../pages/cart-nav-bar';
import { ShoppingCartPage } from '../pages/shopping-cart-page';
import { CheckoutPage } from '../pages/checkout-page';
import { openedShoppingCardTest as test, expect } from '../fixtures';

test.beforeEach(async ({ openedShoppingCardPage }) => {
  const shoppingCartPage = new ShoppingCartPage(openedShoppingCardPage);

  await shoppingCartPage.openCheckout();
});

test.describe('User on checkout page', () => {
  test('should be able to checkout when the form is filled', async ({
    openedShoppingCardPage,
  }) => {
    const checkoutPage = new CheckoutPage(openedShoppingCardPage);
    const cartNavBar = new CartNavBar(openedShoppingCardPage);
    const shoppingCartPage = new ShoppingCartPage(openedShoppingCardPage);
    const homePage = new HomePage(openedShoppingCardPage);

    await checkoutPage.fillInForm('Test Name', 'Test Last Name', '12345');
    await checkoutPage.clickContinueButton();
    await checkoutPage.clickCancelButton();
    await expect(checkoutPage.title).not.toBeVisible();

    await cartNavBar.openShoppingCart();
    await shoppingCartPage.openCheckout();
    await checkoutPage.fillInForm('Test Name', 'Test Last Name', '12345');
    await checkoutPage.clickContinueButton();
    await checkoutPage.clickFinishButton();
    await expect(checkoutPage.title).toBeVisible();

    await checkoutPage.clickBackButton();
    await expect(homePage.title).toBeVisible();
  });

  test('should not be able to checkout when the form is not fully filled', async ({
    openedShoppingCardPage,
  }) => {
    const checkoutPage = new CheckoutPage(openedShoppingCardPage);

    await checkoutPage.fillInLastName('Test Last Name');
    await checkoutPage.fillInPostCode('12345');
    await checkoutPage.clickContinueButton();
    await expect(checkoutPage.error).toHaveText(
      'Error: First Name is required',
    );
  });

  test('should be able to cancel the checkout flow', async ({
    openedShoppingCardPage,
  }) => {
    const checkoutPage = new CheckoutPage(openedShoppingCardPage);
    const shoppingCartPage = new ShoppingCartPage(openedShoppingCardPage);

    await checkoutPage.clickCancelButton();
    await expect(shoppingCartPage.title).toBeVisible();
  });
});
