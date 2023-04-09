import { CORRECT_USER_CREDENTIALS } from '../consts';

describe('User on checkout page', () => {
  const addToCartButton = 'add-to-cart-sauce-labs-backpack';
  const shoppingCartIcon = 'shopping-cart-icon';
  const checkoutButton = 'checkout';
  const firstNameField = 'firstName';
  const lastNameField = 'lastName';
  const postalCodeField = 'postalCode';
  const continueButton = 'continue';
  const cancelButton = 'cancel';
  const errorMessage = 'error';
  const finishButton = 'finish';
  const thankYouTitle = 'Thank you for your order!';
  const backButton = 'back-to-products';
  const productsTitle = 'Products';
  const yourCartTitle = 'Your Cart';

  beforeEach(() => {
    cy.login(CORRECT_USER_CREDENTIALS);
    cy.getByDataTestId(addToCartButton).click();
    cy.getByDataTestId(shoppingCartIcon).click();
    cy.getByDataTestId(checkoutButton).click();
  });

  it('should be able to checkout when the form is filled', () => {
    cy.getByDataTestId(firstNameField).type('Test Name');
    cy.getByDataTestId(lastNameField).type('Test Last Name');
    cy.getByDataTestId(postalCodeField).type('12345');
    cy.getByDataTestId(continueButton).click();
    cy.getByDataTestId(cancelButton).click();
    cy.contains(thankYouTitle).should('not.exist');

    cy.getByDataTestId(shoppingCartIcon).click();
    cy.getByDataTestId(checkoutButton).click();
    cy.getByDataTestId(firstNameField).type('Test Name');
    cy.getByDataTestId(lastNameField).type('Test Last Name');
    cy.getByDataTestId(postalCodeField).type('12345');
    cy.getByDataTestId(continueButton).click();
    cy.getByDataTestId(finishButton).click();
    cy.contains(thankYouTitle).should('exist');

    cy.getByDataTestId(backButton).click();
    cy.contains(productsTitle).should('exist');
  });

  it('should not be able to checkout when the form is not fully filled', () => {
    cy.getByDataTestId(lastNameField).type('Test Last Name');
    cy.getByDataTestId(postalCodeField).type('12345');
    cy.getByDataTestId(continueButton).click();
    cy.getByDataTestId(errorMessage).should(
      'have.text',
      'Error: First Name is required',
    );
  });

  it('should be able to cancel the checkout flow', () => {
    cy.getByDataTestId(cancelButton).click();
    cy.contains(yourCartTitle).should('exist');
  });
});
