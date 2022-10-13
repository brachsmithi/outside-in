describe('Low Score Game', () => {
  it('should score a game with no spares or strikes', () => {
    cy.visit('/')

    cy.get('input[data-cy="throw1"]').should('have.focus').type('5').should('not.have.focus').should('be.disabled')
    cy.get('input[data-cy="throw2"]').should('have.focus').type('3').should('not.have.focus').should('be.disabled')
    cy.get('[data-cy="total"]').should('have.text', '8')
  })
})