import { CORRECT_USER_CREDENTIALS } from '../consts';

describe('User on items detailed page', () => {
  const itemToInteractWith = 'Sauce Labs Backpack';
  const addToCartButton = 'add-to-cart-sauce-labs-backpack';
  const removeButton = 'remove-sauce-labs-backpack';
  const itemsInCartIcon = 'items-in-cart';
  const shoppingCartIcon = 'shopping-cart-icon';
  const yourCartTitle = 'Your Cart';

  beforeEach(() => {
    cy.login(CORRECT_USER_CREDENTIALS);
    cy.contains(itemToInteractWith).click();
  });

  it('should be able to add an item to cart', () => {
    cy.getByDataTestId(addToCartButton).click();
    cy.getByDataTestId(itemsInCartIcon).should('have.text', '1');

    cy.getByDataTestId(shoppingCartIcon).click();
    cy.contains(yourCartTitle).should('exist');
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
