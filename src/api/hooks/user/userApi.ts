import fetchInstance from '@/api/instance/instance'
import { DuplicateCheckResponseData, UserInfo } from './types'
import { apiInstance } from '@/provider/Auth/apiInstance'

const signUpPath = `/api/v1/auth/signup`
const nicknamePath = `/api/v1/user/duplicate-check/nickname/`
const emailPath = `/api/v1/email`
const deleteAccountPath = `/api/v1/auth/account`

export const signUp = async ({
  userName,
  userEmail,
  userPassword,
  userNickname,
  routeId,
}: UserInfo): Promise<void> => {
  try {
    const response = await apiInstance.post(signUpPath, {
      userName: userName,
      userEmail: userEmail,
      userPassword: userPassword,
      userNickname: userNickname,
      routeId: routeId,
    })
    if (!response.data.isSuccess) {
      throw new Error(response.data.message || '회원가입 실패')
    }
  } catch (error) {
    console.error('회원가입 실패:', error)
    throw error
  }
}

export const checkNickname = async (nickname: string): Promise<boolean> => {
  const path = `${nicknamePath}${nickname}`
  const response = await apiInstance.get<DuplicateCheckResponseData>(path)
  const isDuplicated = response.data.result.isDuplicated

  return isDuplicated
}

export const checkEmail = async ({ email }: { email: string }): Promise<boolean> => {
  const path = `${emailPath}/duplicate-check`
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
  const path = `${emailPath}/auth`
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
  const path = `${emailPath}/verify/auth-code`
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

export const deleteAccount = async (): Promise<boolean> => {
  try {
    const response = await fetchInstance.delete(deleteAccountPath)
    const isSuccess = response.data.isSuccess
    return isSuccess
  } catch (error) {
    console.error('회원탈퇴 실패:', error)
    throw error
  }
}
