import { CORRECT_USER_CREDENTIALS, SELECTORS } from '../consts';

describe('User on checkout page', () => {
  beforeEach(() => {
    cy.login(CORRECT_USER_CREDENTIALS);
    cy.getByDataTestId(SELECTORS.addToCartButton).click();
    cy.getByDataTestId(SELECTORS.shoppingCartIcon).click();
    cy.getByDataTestId(SELECTORS.checkoutButton).click();
  });

  it('should be able to checkout when the form is filled', () => {
    cy.getByDataTestId(SELECTORS.firstNameField).type('Test Name');
    cy.getByDataTestId(SELECTORS.lastNameField).type('Test Last Name');
    cy.getByDataTestId(SELECTORS.postalCodeField).type('12345');
    cy.getByDataTestId(SELECTORS.continueButton).click();
    cy.getByDataTestId(SELECTORS.cancelButton).click();
    cy.contains(SELECTORS.thankYouTitle).should('not.exist');

    cy.getByDataTestId(SELECTORS.shoppingCartIcon).click();
    cy.getByDataTestId(SELECTORS.checkoutButton).click();
    cy.getByDataTestId(SELECTORS.firstNameField).type('Test Name');
    cy.getByDataTestId(SELECTORS.lastNameField).type('Test Last Name');
    cy.getByDataTestId(SELECTORS.postalCodeField).type('12345');
    cy.getByDataTestId(SELECTORS.continueButton).click();
    cy.getByDataTestId(SELECTORS.finishButton).click();
    cy.contains(SELECTORS.thankYouTitle).should('exist');

    cy.getByDataTestId(SELECTORS.backButton).click();
    cy.contains(SELECTORS.productsTitle).should('exist');
  });

  it('should not be able to checkout when the form is not fully filled', () => {
    cy.getByDataTestId(SELECTORS.lastNameField).type('Test Last Name');
    cy.getByDataTestId(SELECTORS.postalCodeField).type('12345');
    cy.getByDataTestId(SELECTORS.continueButton).click();
    cy.getByDataTestId(SELECTORS.errorMessage).should(
      'have.text',
      'Error: First Name is required',
    );
  });

  it('should be able to cancel the checkout flow', () => {
    cy.getByDataTestId(SELECTORS.cancelButton).click();
    cy.contains(SELECTORS.yourCartTitle).should('exist');
  });
});
