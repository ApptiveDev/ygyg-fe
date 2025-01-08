import { DuplicateCheck, DuplicateCheckResponseData } from './types'
import { apiInstance } from '@/provider/Auth/apiInstance'

const joinPath = `/api/v1/auth/signup`
const nicknamePath = `/api/v1/user/duplicate-check/nickname/`
const emailPath = `/api/v1/email`

export const checkNickname = async (nickname: string): Promise<boolean> => {
  const path = `${nicknamePath}${nickname}`
  const response = await apiInstance.get<DuplicateCheckResponseData>(path)
  const isDuplicated = response.data.result.isDuplicated

  return isDuplicated
}
