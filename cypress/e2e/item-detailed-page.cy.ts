import { CORRECT_USER_CREDENTIALS, SELECTORS } from '../consts';

describe('User on items detailed page', () => {
  beforeEach(() => {
    cy.login(CORRECT_USER_CREDENTIALS);
    cy.contains(SELECTORS.itemToInteractWith).click();
  });

  it('should be able to add an item to cart', () => {
    cy.getByDataTestId(SELECTORS.addToCartButton).click();
    cy.getByDataTestId(SELECTORS.itemsInCartIcon).should('have.text', '1');

    cy.getByDataTestId(SELECTORS.shoppingCartIcon).click();
    cy.contains(SELECTORS.yourCartTitle).should('exist');
  });

  it('should be able to remove an item from cart', () => {
    cy.getByDataTestId(SELECTORS.addToCartButton).click();
    cy.getByDataTestId(SELECTORS.removeButton).click();
    cy.contains(SELECTORS.itemsInCartIcon).should('not.exist');

    cy.getByDataTestId(SELECTORS.shoppingCartIcon).click();
    cy.contains(SELECTORS.yourCartTitle).should('exist');
    cy.contains(SELECTORS.itemToInteractWith).should('not.exist');
  });
});
