import { DuplicateCheck, DuplicateCheckResponseData } from './types'
import { apiInstance } from '@/provider/Auth/apiInstance'

const joinPath = `/api/v1/auth/signup`
const nicknamePath = `/api/v1/user/duplicate-check/nickname/`
const emailPath = `/api/v1/email/duplicate-check`
const sendAuthcodePath = `/api/v1/email/auth`
const verifyAuthcodePath = `/api/v1/email/verify/auth-code`

export const checkNickname = async (nickname: string): Promise<boolean> => {
  const path = `${nicknamePath}${nickname}`
  const response = await apiInstance.get<DuplicateCheckResponseData>(path)
  const isDuplicated = response.data.result.isDuplicated

  return isDuplicated
}

export const checkEmail = async ({ email }: { email: string }): Promise<boolean> => {
  const path = `${emailPath}`
  try {
    const response = await apiInstance.get<DuplicateCheckResponseData>(path, {
      params: { email }, 
    })
    const isDuplicated = response.data.result.isDuplicated

    return isDuplicated
  } catch (error) {
    console.error('이메일 중복 확인 오류:', error)
    throw error 
  }
}

export const sendAuthCode = async (userEmail: string): Promise<void> => {
  const path = `${sendAuthcodePath}`
  try {
    const response = await apiInstance.post(path, { userEmail })
    if (!response.data.isSuccess) {
      throw new Error(response.data.message || '인증번호 전송 실패')
    }
  } catch (error) {
    console.error('인증번호 전송 실패:', error)
    throw error
  }
}

export const verifyAuthCode = async (userEmail: string, authCode: string): Promise<boolean> => {
  const path = `${verifyAuthcodePath}`
  try {
    const response = await apiInstance.get(path, {
      params: { userEmail, authCode },
    })
    const isVerified = response.data.result.isVerified
    return isVerified
  } catch (error) {
    console.error('인증번호 확인 실패:', error)
    throw error
  }
}
