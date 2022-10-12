export function isCharacterValid(char: string): boolean {
  return new RegExp('^\\d$').test(char)
}