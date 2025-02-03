export function useSetDeletedUser() {
  const options = [
    '소금 사러간',
    '간장 사러간',
    '된장 사러간',
    '고추장 사러간',
    '물엿 사러간',
    '후추 사러간',
    '액젓 사러간',
    '케첩 사러간',
    '머스타드 사러간',
    '참기름 사러간',
  ]
  const names = ['제인이', '예원이', '정윤이', '차현이', '시웅이', '동환이']
  const front = options[Math.floor(Math.random() * options.length)]
  const back = names[Math.floor(Math.random() * names.length)]
  return `${front} ${back}`
}
