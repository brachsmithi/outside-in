describe('Low Score Game', () => {
  it('should score a game with no spares or strikes', () => {
    function forFrame(frameNumber: number) {
      const label = `frame${frameNumber}`
      function rollBall(throwNumber: number, pinsKnockedDown) {
        cy.get(`input[data-cy="${ label }_throw${throwNumber}"]`).should('have.focus').type(String(pinsKnockedDown)).should('not.have.focus').should('be.disabled')
      }
      return {
        throwOneIs(pinsKnockedDown1: number) {
          rollBall(1, pinsKnockedDown1)
          return {
            throwTwoIs(pinsKnockedDown2: number) {
              rollBall(2, pinsKnockedDown2)
              return {
                whichTotals(expectedTotal: number) {
                  cy.get(`[data-cy="${ label }_total"]`).should('have.text', String(expectedTotal))
                }
              }
            }
          }
        }
      }
    }

    cy.visit('/')

    forFrame(1).throwOneIs(5).throwTwoIs(3).whichTotals(8)
    forFrame(2).throwOneIs(7).throwTwoIs(0).whichTotals(15)
    forFrame(3).throwOneIs(4).throwTwoIs(2).whichTotals(21)
    forFrame(4).throwOneIs(0).throwTwoIs(3).whichTotals(24)
    forFrame(5).throwOneIs(3).throwTwoIs(4).whichTotals(31)
    forFrame(6).throwOneIs(6).throwTwoIs(1).whichTotals(38)
    forFrame(7).throwOneIs(3).throwTwoIs(2).whichTotals(43)
    forFrame(8).throwOneIs(6).throwTwoIs(0).whichTotals(49)
    forFrame(9).throwOneIs(7).throwTwoIs(1).whichTotals(57)
    forFrame(10).throwOneIs(0).throwTwoIs(4).whichTotals(61)
  })
})