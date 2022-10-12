import * as fc from 'fast-check';
import { isCharacterValid } from "./validators";

describe('validator tests', () => {
  describe('isCharacterValid', () => {
    it('should allow single digits', () => {
      fc.assert(fc.property(fc.integer({min: 0, max: 9}), (num: number) => {
        return isCharacterValid(num.toString())
      }), {numRuns: 10, skipEqualValues: true})
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
      fc.assert(fc.property(fc.char().filter(t => nonNumericPattern.test(t)), (value: string) => {
        return !isCharacterValid(value)
      }), {numRuns: 30, skipEqualValues: true})
    })
  })
})