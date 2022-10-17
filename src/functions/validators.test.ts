import * as fc from 'fast-check';
import { isCharacterValid, isSecondThrowValid } from "./validators";

describe('validator tests', () => {
  describe('isCharacterValid', () => {
    it('should allow single digits and spares', () => {
      fc.assert(fc.property(fc.integer({min: 0, max: 9}), (num: number) => {
        return isCharacterValid(num.toString())
      }), {numRuns: 10, skipEqualValues: true})
      fc.assert(fc.property(fc.constant('/'), (slash: string) => {
        return isCharacterValid(slash)
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
      fc.assert(fc.property(fc.char().filter(t => nonNumericPattern.test(t) && t !== '/'), (value: string) => {
        return !isCharacterValid(value)
      }), {numRuns: 30, skipEqualValues: true})
    })
  })

  describe('isSecondThrowValid', () => {
    it('should allow totals over 10 or a spare', () => {
      fc.assert(fc.property(fc.integer({min: 0, max: 9}), (firstThrow: number) => {
        return isSecondThrowValid(firstThrow, 9 - firstThrow)
      }), {numRuns: 10, skipEqualValues: true})
      fc.assert(fc.property(fc.integer({min: 0, max: 9}), (firstThrow: number) => {
        return isSecondThrowValid(firstThrow, '/')
      }))
    })

    it('should not allow totals over 10', () => {
      fc.assert(fc.property(fc.integer({min: 0, max: 9}), (firstThrow: number) => {
        return !isSecondThrowValid(firstThrow, 10 - firstThrow)
      }), {numRuns: 10, skipEqualValues: true})
    })
  })
})