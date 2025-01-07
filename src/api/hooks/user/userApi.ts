import { DuplicateCheck, DuplicateCheckResponseData } from './types'
import { apiInstance } from '@/provider/Auth/apiInstance'

const joinPath = `/v1/auth/signup`
const nicknamePath = `/v1/user/duplicate-check/nickname/`
const emailPath = `/v1/email`

export const checkNickname = async (nickname: string): Promise<DuplicateCheck> => {
  const path = `${nicknamePath}${nickname}`
  const response = await apiInstance.get<DuplicateCheckResponseData>(path)
  console.log(response) // 디버깅용 로그
  return {
    isDuplicated: response.data.result.isDuplicated,
  }
}
