export function useSetTwoDigits(num: number) {
  if (num < 10) {
    return '0' + String(num)
  }
  return String(num)
}
