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
  userName: string
  userEmail: string
  userPassword: string
  userNickname: string
  routeId: number
}
