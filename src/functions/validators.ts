export function isCharacterValid(char: string): boolean {
  return new RegExp('^[\\d\\/]$').test(char)
}

export function isSecondThrowValid(firstThrow: number, secondThrow: number | string): boolean {
  if (secondThrow === '/') {
    return true
  } else {
    return firstThrow + Number(secondThrow) <= 9
  }
}