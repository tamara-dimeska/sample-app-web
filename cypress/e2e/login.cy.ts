import {
  CORRECT_USER_CREDENTIALS,
  INCORRECT_USER_CREDENTIALS,
  SELECTORS,
} from '../consts';

describe('User on login page', () => {
  it('should be able to login when entering correct credentials and logout', () => {
    cy.login(CORRECT_USER_CREDENTIALS);
    cy.contains(SELECTORS.menuButton).click();
    cy.contains(SELECTORS.logoutButton).click();
    cy.contains(SELECTORS.loginPageTitle).should('exist');
  });

  it('should not be able to login when entering incorrect credentials', () => {
    cy.login(INCORRECT_USER_CREDENTIALS);
    cy.getByDataTestId(SELECTORS.errorMessage).should(
      'have.text',
      'Epic sadface: Username and password do not match any user in this service',
    );
  });
});
