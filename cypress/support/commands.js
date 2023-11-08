Cypress.Commands.add('login', () => {
  cy.intercept('/api/auth/session', { fixture: 'session.json' }).as('session');
});
