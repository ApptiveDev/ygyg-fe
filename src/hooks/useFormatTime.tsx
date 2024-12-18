function useFormatTime(time: number) {
  if (time > 12) {
    return `오후 ${time - 12}`
  } else {
    return `오전 ${time - 12}`
  }
}

export default useFormatTime
