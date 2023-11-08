describe('로그인 과정', () => {
  it('로그인 버튼이 있는지 확인 후 로그인페이지로 이동', () => {
    cy.visit('/');
    cy.contains('login').should('exist').click();
    cy.url().should('include', '/login');
  });

  context('로그인 성공하면', () => {
    it('홈에 로그인 버튼이 보여아함.', () => {});
  });
});
