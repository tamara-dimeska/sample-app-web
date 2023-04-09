import {
  CORRECT_USER_CREDENTIALS,
  INCORRECT_USER_CREDENTIALS,
} from '../consts';

describe('User on login page', () => {
  const loginPageTitle = 'Swag Labs';
  const errorMessage = 'error';
  const menuButton = 'Open Menu';
  const logoutButton = 'Logout';

  it('should be able to login when entering correct credentials and logout', () => {
    cy.login(CORRECT_USER_CREDENTIALS);
    cy.contains(menuButton).click();
    cy.contains(logoutButton).click();
    cy.contains(loginPageTitle).should('exist');
  });

  it('should not be able to login when entering incorrect credentials', () => {
    cy.login(INCORRECT_USER_CREDENTIALS);
    cy.getByDataTestId(errorMessage).should(
      'have.text',
      'Epic sadface: Username and password do not match any user in this service',
    );
  });
});
