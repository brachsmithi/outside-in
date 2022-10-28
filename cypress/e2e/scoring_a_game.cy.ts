describe('Scoring a Game', () => {
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

  it('should score a game with spares', () => {
    function spare() {
      return '/'
    }
    function forFrame(frameNumber: number) {
      const label = `frame${frameNumber}`
      function rollBall(throwNumber: number, pinsKnockedDown: number | string) {
        cy.get(`input[data-cy="${ label }_throw${throwNumber}"]`).should('have.focus').type(String(pinsKnockedDown)).should('not.have.focus').should('be.disabled')
      }
      return {
        throwOneIs(pinsKnockedDown1: number) {
          rollBall(1, pinsKnockedDown1)
          return {
            throwTwoIs(pinsKnockedDown2: string) {
              rollBall(2, pinsKnockedDown2)
            },
            throwTwoIsDisabled() {
              cy.get(`input[data-cy="${ label }_throw2"]`).should('be.disabled')
            }
          }
        }
      }
    }
    function expectFrame(frameNumber: number) {
      return {
        totalToBe(total: number) {
          cy.get(`[data-cy="frame${ frameNumber }_total"]`).should('have.text', String(total))
        }
      }
    }

    cy.visit('/')

    forFrame(1).throwOneIs(7).throwTwoIs(spare())
    forFrame(2).throwOneIs(6).throwTwoIs(spare())
    forFrame(3).throwOneIs(3).throwTwoIs(spare())
    forFrame(4).throwOneIs(9).throwTwoIs(spare())
    forFrame(5).throwOneIs(0).throwTwoIs(spare())
    forFrame(6).throwOneIs(4).throwTwoIs(spare())
    forFrame(7).throwOneIs(6).throwTwoIs(spare())
    forFrame(8).throwOneIs(7).throwTwoIs(spare())
    forFrame(9).throwOneIs(3).throwTwoIs(spare())
    forFrame(10).throwOneIs(9).throwTwoIs(spare())
    forFrame(11).throwOneIs(4).throwTwoIsDisabled()

    expectFrame(1).totalToBe(16)
    expectFrame(2).totalToBe(29)
    expectFrame(3).totalToBe(48)
    expectFrame(4).totalToBe(58)
    expectFrame(5).totalToBe(72)
    expectFrame(6).totalToBe(88)
    expectFrame(7).totalToBe(105)
    expectFrame(8).totalToBe(118)
    expectFrame(9).totalToBe(137)
    expectFrame(10).totalToBe(151)
    expectFrame(11).totalToBe(155)
  })

  it('should not allow invalid data in the game', () => {
    function forFrame(frameNumber: number) {
      const label = `frame${frameNumber}`
      function rollBall(throwNumber: number, pinsKnockedDown: string) {
        cy.get(`input[data-cy="${ label }_throw${throwNumber}"]`).should('have.focus').type(pinsKnockedDown)
      }
      function andIsReadyForInput(throwNumber: number) {
        cy.get(`input[data-cy="${ label }_throw${ throwNumber }"]`).should('have.focus').should('have.value', '')
      }
      function throwTwoIs(pinsKnockedDown: string) {
        const throwNo = 2
        rollBall(throwNo, pinsKnockedDown)
        return {
          andIsReadyForInput() {
            andIsReadyForInput(throwNo)
          },
          whichTotals(total: number) {
            cy.get(`[data-cy="${ label }_total"]`).should('have.text', String(total))
          }
        }
      }
      return {
        throwOneIs(pinsKnockedDown: string) {
          const throwNo = 1
          rollBall(throwNo, pinsKnockedDown)
          return {
            andIsReadyForInput() {
              andIsReadyForInput(throwNo)
            },
            throwTwoIs
          }
        },
        throwTwoIs
      }
    }

    cy.visit('/')

    forFrame(1).throwOneIs('s').andIsReadyForInput()
    forFrame(1).throwOneIs('8').throwTwoIs('9').andIsReadyForInput()
    forFrame(1).throwTwoIs('w').andIsReadyForInput()
    forFrame(1).throwTwoIs('1').whichTotals(9)
    forFrame(2).throwOneIs('/').andIsReadyForInput()
  })

})