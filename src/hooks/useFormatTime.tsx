export function useFormatTimeToShow(time: number) {
  if (time > 12) {
    return `오후 ${time - 12}`
  } else if (time == 12) {
    return '오후 12'
  } else if (time == 0) {
    return '오전 12'
  } else {
    return `오전 ${time}`
  }
}

export function useFormatTimeToSave(time: string, hour: string) {
  if (time == '오전' && hour == '12') {
    return '00'
  } else if (time == '오후' && hour != '12') {
    return String(12 + Number(hour))
  } else return hour
}
