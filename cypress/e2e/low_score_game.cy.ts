describe('Low Score Game', () => {
  it('should score a game with no spares or strikes', () => {
    cy.visit('/')

    cy.get('input[data-cy="frame1_throw1"]').should('have.focus').type('5').should('not.have.focus').should('be.disabled')
    cy.get('input[data-cy="frame1_throw2"]').should('have.focus').type('3').should('not.have.focus').should('be.disabled')
    cy.get('[data-cy="frame1_total"]').should('have.text', '8')

    cy.get('input[data-cy="frame2_throw1"]').should('have.focus').type('7').should('not.have.focus').should('be.disabled')
    cy.get('input[data-cy="frame2_throw2"]').should('have.focus').type('0').should('not.have.focus').should('be.disabled')
    cy.get('[data-cy="frame2_total"]').should('have.text', '15')
  })
})