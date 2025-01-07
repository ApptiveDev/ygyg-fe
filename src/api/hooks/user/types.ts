export interface DuplicateCheckResponseData {
  httpStatus: {
    error: boolean
    is1xxInformational: boolean
    is2xxSuccessful: boolean
    is3xxRedirection: boolean
    is4xxClientError: boolean
    is5xxServerError: boolean
  }
  isSuccess: boolean
  message: string
  code: number
  result: {
    isDuplicated: boolean
  }
}

export interface DuplicateCheck {
  isDuplicated: boolean
}
