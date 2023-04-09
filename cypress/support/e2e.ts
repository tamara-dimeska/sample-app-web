import '.';

// Run before all tests
beforeEach(() => {
  cy.clearLocalStorage();
  cy.visit('/');
});
