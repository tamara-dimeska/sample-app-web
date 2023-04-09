import { UserInterface } from '../types';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      getByDataTestId(value: string, timeout?: number): Chainable<Element>;
      login(user: UserInterface): Chainable<Element>;
    }
  }
}

Cypress.Commands.add('getByDataTestId', (value, timeout) => {
  cy.get(`[data-test="${value}"]`, { timeout });
});

Cypress.Commands.add('login', (user: UserInterface) => {
  cy.getByDataTestId('username').clear().type(user.username);
  cy.getByDataTestId('password').clear().type(user.password);
  cy.getByDataTestId('login-button').click();
});
