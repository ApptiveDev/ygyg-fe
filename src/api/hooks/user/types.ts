export interface DuplicateCheckResponseData {
  httpStatus: string
  isSuccess: boolean
  message: string
  code: number
  result: {
    isDuplicated: boolean
  }
}

export interface UserInfo {
  userEmail: string
  userPassword: string
  userNickname: string
  routeId: number
}
