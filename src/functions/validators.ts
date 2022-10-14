export function isCharacterValid(char: string): boolean {
  return new RegExp('^\\d$').test(char)
}

export function isTotalValid(total: number): boolean {
  return total <= 9
}