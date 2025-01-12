import { apiInstance } from './apiInstance'
import type { UserResponseData } from './types'

export const AuthProvider = async (userInfo: { userEmail: string; userPassword: string }) => {
  const endpoint = `/api/v1/auth/signin`
  localStorage.removeItem('accessToken')
  try {
    const response = await apiInstance.post<UserResponseData>(endpoint, userInfo)

    const userUuid = response.data.result.userUuid
    const userNickname = response.data.result.userNickname
    const accessToken = response.data.result.accessToken
    const userName = response.data.result.userName
    const userEmail = response.data.result.userEmail

    localStorage.setItem('userUuid', userUuid)
    localStorage.setItem('userNickname', userNickname)
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('userName', userName)
    localStorage.setItem('userEmail', userEmail)

    return response.data
  } catch (error) {
    console.error('Error during login:', error)
    throw error
  }
}

export function tokenIsExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.exp * 1000 < Date.now()
  } catch (error) {
    console.error('Token parsing failed', error)
    return true
  }
}
