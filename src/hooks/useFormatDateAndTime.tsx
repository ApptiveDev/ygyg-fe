//기본 YYYY. MM. DD. 형식을 YYYY-MM-DD 형식으로
export function DateFromDotToDash(date: string) {
  return date.split('T')[0]
}

export function DateForUse(fullDate: string) {
  const year = fullDate.split('-')[0]
  const month = fullDate.split('-')[1]
  const date = fullDate.split('-')[2]
  return [year, month, date]
}

//년월일 따로 받아와서 YYYY-MM-DD 형식으로
export function DateForSave(year: string, month: string, date: string) {
  return year + '-' + month + '-' + date
}

//시각을 HH:MM 형식으로
export function TimeForUse(time: string) {
  const hour = time.split(':')[0]
  const minute = time.split(':')[1]
  const second = time.split(':')[2]

  return [hour, minute, second]
}
