describe('Low Score Game', () => {
  it('should score a game with no spares or strikes', () => {
    cy.visit('/')

    cy.get('input[data-cy="throw1"]')
  })
})