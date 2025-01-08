export interface userInfo {
  userEmail: string
  userPassword: string
}

export type UserResponseData = {
  result: { userUuid: string; userNickname: string; accessToken: string }
}
