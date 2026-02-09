import { Page } from '@playwright/test';
import { loginTest } from './logged-in.fixture';
import { HomePage } from '../pages/home-page';
import { BACKPACK } from '../consts';

export const openedItemTest = loginTest.extend<{ openedItemPage: Page }>({
  openedItemPage: async ({ loggedInPage }, use) => {
    const homePage = new HomePage(loggedInPage);

    await homePage.openItem(BACKPACK);
    await use(loggedInPage);
  },
});
