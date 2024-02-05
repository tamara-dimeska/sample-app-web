import test, { expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { CORRECT_USER_CREDENTIALS } from '../consts/users';
import { HomePage } from '../pages/home-page';
import { CartNavBar } from '../pages/cart-nav-bar';
import { ShoppingCartPage } from '../pages/shopping-cart-page';
import { CheckoutPage } from '../pages/checkout-page';

test.beforeEach(async ({ page, baseURL }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const cartNavBar = new CartNavBar(page);
  const shoppingCartPage = new ShoppingCartPage(page);

  await page.goto(baseURL!);
  await loginPage.login(CORRECT_USER_CREDENTIALS);
  await homePage.addBackpackToCart();
  await cartNavBar.openShoppingCart();
  await shoppingCartPage.openCheckout();
});

test.describe('User on checkout page', () => {
  test('should be able to checkout when the form is filled', async ({
    page,
  }) => {
    const checkoutPage = new CheckoutPage(page);
    const cartNavBar = new CartNavBar(page);
    const shoppingCartPage = new ShoppingCartPage(page);
    const homePage = new HomePage(page);

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
    page,
  }) => {
    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.fillInLastName('Test Last Name');
    await checkoutPage.fillInPostCode('12345');
    await checkoutPage.clickContinueButton();
    await expect(checkoutPage.error).toHaveText(
      'Error: First Name is required',
    );
  });

  test('should be able to cancel the checkout flow', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    const shoppingCartPage = new ShoppingCartPage(page);

    await checkoutPage.clickCancelButton();
    await expect(shoppingCartPage.title).toBeVisible();
  });
});
