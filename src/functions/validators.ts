import { isSpare, isStrike } from "./analyzers";

export function isCharacterValid(char: string): boolean {
  return new RegExp('^[\\d\\/xX]$').test(char)
}

export function isFirstThrowValid(firstThrow: string) {
  return !isSpare(firstThrow)
}

export function isSecondThrowValid(firstThrow: string, secondThrow: string, mayHaveSecondStrike: boolean): boolean {
  if (isSpare(secondThrow) || (isStrike(secondThrow) && isStrikeValid(mayHaveSecondStrike, firstThrow))) {
    return true
  } else{
    return Number(firstThrow) + Number(secondThrow) <= 9
  }
}

function isStrikeValid(mayHaveSecondStrike: boolean, firstThrow: string) {
  return mayHaveSecondStrike && isStrike(firstThrow);
}