describe('Low Score Game', () => {
  it('should score a game with no spares or strikes', () => {
    cy.visit('/')

    cy.get('input[data-cy="frame1_throw1"]').should('have.focus').type('5').should('not.have.focus').should('be.disabled')
    cy.get('input[data-cy="frame1_throw2"]').should('have.focus').type('3').should('not.have.focus').should('be.disabled')
    cy.get('[data-cy="frame1_total"]').should('have.text', '8')

    cy.get('input[data-cy="frame2_throw1"]').should('have.focus').type('7').should('not.have.focus').should('be.disabled')
    cy.get('input[data-cy="frame2_throw2"]').should('have.focus').type('0').should('not.have.focus').should('be.disabled')
    cy.get('[data-cy="frame2_total"]').should('have.text', '15')

    cy.get('input[data-cy="frame3_throw1"]').should('have.focus').type('4').should('not.have.focus').should('be.disabled')
    cy.get('input[data-cy="frame3_throw2"]').should('have.focus').type('2').should('not.have.focus').should('be.disabled')
    cy.get('[data-cy="frame3_total"]').should('have.text', '21')

    cy.get('input[data-cy="frame4_throw1"]').should('have.focus').type('0').should('not.have.focus').should('be.disabled')
    cy.get('input[data-cy="frame4_throw2"]').should('have.focus').type('3').should('not.have.focus').should('be.disabled')
    cy.get('[data-cy="frame4_total"]').should('have.text', '24')

    cy.get('input[data-cy="frame5_throw1"]').should('have.focus').type('3').should('not.have.focus').should('be.disabled')
    cy.get('input[data-cy="frame5_throw2"]').should('have.focus').type('4').should('not.have.focus').should('be.disabled')
    cy.get('[data-cy="frame5_total"]').should('have.text', '31')

    cy.get('input[data-cy="frame6_throw1"]').should('have.focus').type('6').should('not.have.focus').should('be.disabled')
    cy.get('input[data-cy="frame6_throw2"]').should('have.focus').type('1').should('not.have.focus').should('be.disabled')
    cy.get('[data-cy="frame6_total"]').should('have.text', '38')

    cy.get('input[data-cy="frame7_throw1"]').should('have.focus').type('3').should('not.have.focus').should('be.disabled')
    cy.get('input[data-cy="frame7_throw2"]').should('have.focus').type('2').should('not.have.focus').should('be.disabled')
    cy.get('[data-cy="frame7_total"]').should('have.text', '43')

    cy.get('input[data-cy="frame8_throw1"]').should('have.focus').type('6').should('not.have.focus').should('be.disabled')
    cy.get('input[data-cy="frame8_throw2"]').should('have.focus').type('0').should('not.have.focus').should('be.disabled')
    cy.get('[data-cy="frame8_total"]').should('have.text', '49')

    cy.get('input[data-cy="frame9_throw1"]').should('have.focus').type('7').should('not.have.focus').should('be.disabled')
    cy.get('input[data-cy="frame9_throw2"]').should('have.focus').type('1').should('not.have.focus').should('be.disabled')
    cy.get('[data-cy="frame9_total"]').should('have.text', '57')

    cy.get('input[data-cy="frame10_throw1"]').should('have.focus').type('0').should('not.have.focus').should('be.disabled')
    cy.get('input[data-cy="frame10_throw2"]').should('have.focus').type('4').should('not.have.focus').should('be.disabled')
    cy.get('[data-cy="frame10_total"]').should('have.text', '61')
  })
})