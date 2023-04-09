import { CORRECT_USER_CREDENTIALS } from '../consts';

describe('User on cart page', () => {
  const itemToInteractWith = 'Sauce Labs Backpack';
  const addToCartButton = 'add-to-cart-sauce-labs-backpack';
  const shoppingCartIcon = 'shopping-cart-icon';
  const removeButton = 'remove-sauce-labs-backpack';
  const continueShoppingButton = 'continue-shopping';
  const yourCartTitle = 'Your Cart';
  const productsTitle = 'Products';

  beforeEach(() => {
    cy.login(CORRECT_USER_CREDENTIALS);
    cy.getByDataTestId(addToCartButton).click();
    cy.getByDataTestId(shoppingCartIcon).click();
  });

  it('should be able to remove an item from cart', () => {
    cy.getByDataTestId(removeButton).click();
    cy.contains(itemToInteractWith).should('not.exist');
  });

  it('should be able to continue with shopping', () => {
    cy.getByDataTestId(continueShoppingButton).click();
    cy.contains(yourCartTitle).should('not.exist');
    cy.contains(productsTitle).should('exist');
  });
});
