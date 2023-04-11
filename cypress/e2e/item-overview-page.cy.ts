import { CORRECT_USER_CREDENTIALS, SELECTORS } from '../consts';

describe('User on items overview page', () => {
  beforeEach(() => {
    cy.login(CORRECT_USER_CREDENTIALS);
  });

  it('should be able to open an item and land on item detailed page', () => {
    cy.contains(SELECTORS.itemToInteractWith).click();
    cy.getByDataTestId(SELECTORS.backButton).should('exist');
    cy.contains(SELECTORS.itemNotToInteractWith).should('not.exist');
  });

  it('should be able to add an item to cart', () => {
    cy.getByDataTestId(SELECTORS.addToCartButton).click();
    cy.getByDataTestId(SELECTORS.itemsInCartIcon).should('have.text', '1');

    cy.getByDataTestId(SELECTORS.shoppingCartIcon).click();
    cy.contains(SELECTORS.yourCartTitle).should('exist');
    cy.contains(SELECTORS.itemNotToInteractWith).should('not.exist');
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
