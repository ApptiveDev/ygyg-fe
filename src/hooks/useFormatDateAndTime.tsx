//YYYY-MM-DD 형식
export function DateFromData(date: string) {
  return date.split('T')[0]
}

//YYYY-MM-DD 형식
export function TimeFromData(date: string) {
  return date.split('T')[1]
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

//시분초 따로 받아와서 HH:MM:SS 형식으로
export function TimeForSave(time: string, minute: string, second: string) {
  return time + ':' + minute + ':' + second
}

export function TimeForUse(time: string) {
  const hour = time.split(':')[0]
  const minute = time.split(':')[1]
  const second = time.split(':')[2]

  return [hour, minute, second]
}

export function DateForPost(
  year: string,
  month: string,
  date: string,
  hour: string,
  minute: string,
  second: string = '00',
) {
  const fullDate = DateForSave(year, month, date)
  const fullTime = TimeForSave(hour, minute, second)
  return fullDate + 'T' + fullTime
}
