import { CORRECT_USER_CREDENTIALS, SELECTORS } from '../consts';

describe('User on cart page', () => {
  beforeEach(() => {
    cy.login(CORRECT_USER_CREDENTIALS);
    cy.getByDataTestId(SELECTORS.addToCartButton).click();
    cy.getByDataTestId(SELECTORS.shoppingCartIcon).click();
  });

  it('should be able to remove an item from cart', () => {
    cy.getByDataTestId(SELECTORS.removeButton).click();
    cy.contains(SELECTORS.itemToInteractWith).should('not.exist');
  });

  it('should be able to continue with shopping', () => {
    cy.getByDataTestId(SELECTORS.continueShoppingButton).click();
    cy.contains(SELECTORS.yourCartTitle).should('not.exist');
    cy.contains(SELECTORS.productsTitle).should('exist');
  });
});
