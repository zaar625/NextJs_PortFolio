const auth = require('../fixtures/session.json');

describe('로그인 과정', () => {
  const { email, password } = auth;

  it('로그인하기', () => {
    cy.visit('/login');
    cy.get('[data-test=email]').type(email);
    cy.get('[data-test=password]').type(password);

    cy.get('.login__button')
      .contains('로그인')
      .click()
      .then(() => {
        cy.get('.login__form').submit();
      });
  });

  it('로그아웃', () => {
    cy.visit('/');
    cy.contains('logout').click();

    cy.logout();
  });
});
