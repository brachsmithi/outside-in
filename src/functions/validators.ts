import { isSpare, isStrike } from "./analyzers";

export function isCharacterValid(char: string): boolean {
  return new RegExp('^[\\d\\/xX]$').test(char)
}

export function isFirstThrowValid(firstThrow: string) {
  return !isSpare(firstThrow)
}

export function isSecondThrowValid(firstThrow: string, secondThrow: string, mayHaveSecondStrike: boolean): boolean {
  return isUnderTen(firstThrow, secondThrow)
      || isSpare(secondThrow)
      || (isStrike(secondThrow) && isStrikeValid(mayHaveSecondStrike, firstThrow))
}

export function isThirdThrowValid(firstThrow: string, secondThrow: string, thirdThrow: string) {
  return isSpare(secondThrow)
      || (isStrike(firstThrow) && (isUnderTen(secondThrow, thirdThrow) || isSpare(thirdThrow)));
}

function isUnderTen(value1: string, value2: string) {
  return Number(value1) + Number(value2) <= 9
}

function isStrikeValid(mayHaveSecondStrike: boolean, firstThrow: string) {
  return mayHaveSecondStrike && isStrike(firstThrow);
}