describe('상품 구매하기 과정 과정', () => {
  const mockData = {
    class: 'TINDY',
    name: 'Tindy Tweed Square Bag'
  };

  it('상품을 클릭하면 해당 상품의 데테일 페이지로 이동합니다.', () => {
    cy.visit('/');
    cy.get('data-test = product-card')
      .click()
      .then(() => {
        cy.visit(`/${mockData.class}/${mockData.name}`);
      });
  });

  it('상품의 수량이 >=1 이고, 컬러를 선택했을 경우 배송지 입력페이지로 이동합니다.', () => {});
  // 컬러를 선택하지 않으면 alert 창이 나타납니다.
  cy.get('.productDetail__des__quan')
    .find('p')
    .should($p => {
      const value = parseInt($p.text(), 10);
      expect(value).to.be.gte(1);
    });

  cy.get('.productDetail__des__container__color')
    .find('button')
    .click()
    .then(() => {
      cy.get('.color').should('have.class', 'color_active');
    });

  cy.visit('/purchase');
});
