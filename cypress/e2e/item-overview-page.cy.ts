import { CORRECT_USER_CREDENTIALS } from '../consts';

describe('User on items overview page', () => {
  const itemToInteractWith = 'Sauce Labs Backpack';
  const itemNotToInteractWith = 'Sauce Labs Bike Light';
  const backButton = 'back-to-products';
  const addToCartButton = 'add-to-cart-sauce-labs-backpack';
  const removeButton = 'remove-sauce-labs-backpack';
  const itemsInCartIcon = 'items-in-cart';
  const shoppingCartIcon = 'shopping-cart-icon';
  const yourCartTitle = 'Your Cart';

  beforeEach(() => {
    cy.login(CORRECT_USER_CREDENTIALS);
  });

  it('should be able to open an item and land on item detailed page', () => {
    cy.contains(itemToInteractWith).click();
    cy.getByDataTestId(backButton).should('exist');
    cy.contains(itemNotToInteractWith).should('not.exist');
  });

  it('should be able to add an item to cart', () => {
    cy.getByDataTestId(addToCartButton).click();
    cy.getByDataTestId(itemsInCartIcon).should('have.text', '1');

    cy.getByDataTestId(shoppingCartIcon).click();
    cy.contains(yourCartTitle).should('exist');
    cy.contains(itemNotToInteractWith).should('not.exist');
  });

  it('should be able to remove an item from cart', () => {
    cy.getByDataTestId(addToCartButton).click();
    cy.getByDataTestId(removeButton).click();
    cy.contains(itemsInCartIcon).should('not.exist');

    cy.getByDataTestId(shoppingCartIcon).click();
    cy.contains(yourCartTitle).should('exist');
    cy.contains(itemToInteractWith).should('not.exist');
  });
});
