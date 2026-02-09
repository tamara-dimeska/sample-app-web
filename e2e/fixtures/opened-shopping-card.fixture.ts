import { Page } from '@playwright/test';
import { loginTest } from './logged-in.fixture';
import { CartNavBar } from '../pages/cart-nav-bar';
import { HomePage } from '../pages/home-page';

export const openedShoppingCardTest = loginTest.extend<{
  openedShoppingCardPage: Page;
}>({
  openedShoppingCardPage: async ({ loggedInPage }, use) => {
    const homePage = new HomePage(loggedInPage);
    const cartNavBar = new CartNavBar(loggedInPage);

    await homePage.addBackpackToCart();
    await cartNavBar.openShoppingCart();

    await use(loggedInPage);
  },
});
