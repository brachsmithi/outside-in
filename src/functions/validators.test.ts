import * as fc from 'fast-check';
import { isCharacterValid, isSecondThrowValid, isThirdThrowValid } from "./validators";

describe('validator tests', () => {
  describe('isCharacterValid', () => {
    it('should allow single digits, spares, and strikes', () => {
      fc.assert(fc.property(fc.integer({min: 0, max: 9}), (num: number) => {
        return isCharacterValid(num.toString())
      }), {numRuns: 10, skipEqualValues: true})
      fc.assert(fc.property(fc.constant('/'), (slash: string) => {
        return isCharacterValid(slash)
      }))
      fc.assert(fc.property(fc.constant('x'), (strike: string) => {
        return isCharacterValid(strike)
      }))
      fc.assert(fc.property(fc.constant('X'), (strike: string) => {
        return isCharacterValid(strike)
      }))
    })

    it('should not allow numbers over one digit', () => {
      fc.assert(fc.property(fc.integer({min: 10}), (num: number) => {
        return !isCharacterValid(num.toString())
      }), {numRuns: 10, skipEqualValues: true})
    })

    it('should not allow negative numbers', () => {
      fc.assert(fc.property(fc.integer({max: -1}), (num: number) => {
        return !isCharacterValid(num.toString())
      }), {numRuns: 10, skipEqualValues: true})
    })

    it('should not allow non-numeric characters', () => {
      const nonNumericPattern = new RegExp('\\D')
      fc.assert(fc.property(fc.char().filter(t => nonNumericPattern.test(t) && !['/', 'x', 'X'].includes(t)), (value: string) => {
        return !isCharacterValid(value)
      }), {numRuns: 30, skipEqualValues: true})
    })
  })

  describe('isSecondThrowValid', () => {

    type ThrowConstraints = {
      min: number,
      max: number,
    }

    type ConstraintCalculator = {
      min: (seed: number) => number,
      max: (seed: number) => number,
    }

    function calculateConstraints(calculator: ConstraintCalculator, seed: number): ThrowConstraints {
      return {
        min: calculator.min(seed),
        max: calculator.max(seed),
      }
    }

    function throwGenerator(firstThrowConstraints: ThrowConstraints, secondThrowCalculator: ConstraintCalculator) {
      return fc.integer(firstThrowConstraints).chain((first) => {
        return fc.tuple(
            fc.constant(String(first)),
            fc.integer(calculateConstraints(secondThrowCalculator, first)).chain(num => {
                return fc.constant(String(num))
            })
        );
      })
    }

    function generateValidThrows() {
      return throwGenerator({min: 0, max: 9}, {min: (_: number) => 0, max: (first: number) => 9 - first})
    }

    function generateInvalidThrows() {
      return throwGenerator({min: 1, max: 9}, {min: (first: number) => 10 - first, max: (_: number) => 9})
    }

    it('should allow totals under 10 or a spare', () => {
        fc.assert(fc.property(generateValidThrows(), (pinCounts: string[]) => {
        return isSecondThrowValid(pinCounts[0], pinCounts[1], false)
      }), {numRuns: 20, skipEqualValues: true})
      fc.assert(fc.property(fc.integer({min: 0, max: 9}), (firstThrow: number) => {
        return isSecondThrowValid(String(firstThrow), '/', false)
                && isSecondThrowValid(String(firstThrow), '/', true)
      }))
    })

    it('should not allow totals over 10', () => {
      fc.assert(fc.property(generateInvalidThrows(), (pinCounts: string[]) => {
        return !isSecondThrowValid(pinCounts[0], pinCounts[1], false)
                && !isSecondThrowValid(pinCounts[0], pinCounts[1], true)
      }), {numRuns: 20, skipEqualValues: true})
    })

    it('should not allow a strike in the second throw for normal frame', () => {
      fc.assert(fc.property(fc.integer({min: 0, max: 9}), (firstThrow: number) => {
        return !isSecondThrowValid(String(firstThrow), 'x', false)
                && !isSecondThrowValid(String(firstThrow), 'X', false)
      }), {numRuns: 10, skipEqualValues: true})
      fc.assert(fc.property(fc.constant('x'), (strike: string) => {
        return !isSecondThrowValid(strike, 'x', false)
                && !isSecondThrowValid(strike, 'X', false)
      }))
      fc.assert(fc.property(fc.constant('X'), (strike: string) => {
        return !isSecondThrowValid(strike, 'x', false)
            && !isSecondThrowValid(strike, 'X', false)
      }))
    })

    it('should allow a strike in the second throw for an extra frame', () => {
      expect(isSecondThrowValid('x', 'x', true)).toBeTruthy()
      expect(isSecondThrowValid('X', 'X', true)).toBeTruthy()
    })

    it("should not allow a strike in the second throw of an extra frame when there aren't 10 pins to knock down", () => {
      fc.assert(fc.property(fc.integer({min: 0, max: 9}), (firstThrow: number) => {
        return !isSecondThrowValid(String(firstThrow), 'x', true)
            && !isSecondThrowValid(String(firstThrow), 'X', true)
      }), {numRuns: 10, skipEqualValues: true})
    })
  })

  describe('isThirdThrowValid', () => {

    type ThrowConstraints = {
      min: number,
      max: number,
    }

    type ConstraintCalculator = {
      min: (seed: number) => number,
      max: (seed: number) => number,
    }

    function calculateConstraints(calculator: ConstraintCalculator, seed: number): ThrowConstraints {
      return {
        min: calculator.min(seed),
        max: calculator.max(seed),
      }
    }

    function throwGenerator(firstThrowConstraints: ThrowConstraints, secondThrowCalculator: ConstraintCalculator) {
      return fc.integer(firstThrowConstraints).chain((first) => {
        return fc.tuple(
            fc.constant(String(first)),
            fc.integer(calculateConstraints(secondThrowCalculator, first)).chain(num => {
              return fc.constant(String(num))
            })
        );
      })
    }

    function generateValidThrows() {
      return throwGenerator({min: 0, max: 9}, {min: (_: number) => 0, max: (first: number) => 9 - first})
    }

    function generateInvalidThrows() {
      return throwGenerator({min: 1, max: 9}, {min: (first: number) => 10 - first, max: (_: number) => 9})
    }

    it('should allow totals under 10 or a spare, following a strike', () => {
      fc.assert(fc.property(generateValidThrows(), (pinCounts: string[]) => {
        return isThirdThrowValid('x', pinCounts[0], pinCounts[1])
      }), {numRuns: 20, skipEqualValues: true})
      fc.assert(fc.property(fc.integer({min: 0, max: 9}), (secondThrow: number) => {
        return isThirdThrowValid('x', String(secondThrow), '/')
      }))
    })

    it('should not allow totals over 10, following a strike', () => {
      fc.assert(fc.property(generateInvalidThrows(), (pinCounts: string[]) => {
        return !isThirdThrowValid('x', pinCounts[0], pinCounts[1])
      }), {numRuns: 20, skipEqualValues: true})
    })

    it('should allow any number after a spare', () => {
      fc.assert(fc.property(fc.integer({min: 0, max: 9}), (thirdThrow: number) => {
        return isThirdThrowValid('9', '/', String(thirdThrow))
      }), {numRuns: 10, skipEqualValues: true})
    })
  })
})