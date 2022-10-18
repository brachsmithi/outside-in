export function isCharacterValid(char: string): boolean {
  return new RegExp('^[\\d\\/]$').test(char)
}

export function isSecondThrowValid(firstThrow: string, secondThrow: string): boolean {
  if (secondThrow === '/') {
    return true
  } else {
    return Number(firstThrow) + Number(secondThrow) <= 9
  }
}