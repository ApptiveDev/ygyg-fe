import fetchInstance from '@/api/instance/instance'
import { apiInstance } from './apiInstance'
import type { UserResponseData } from './types'

export const AuthProvider = async (userInfo: { userEmail: string; userPassword: string }) => {
  const endpoint = `/v1/auth/signin`
  localStorage.removeItem('accessToken')
  try {
    const response = await apiInstance.post<UserResponseData>(endpoint, userInfo)

    const { accessToken } = response.data
    localStorage.setItem('accessToken', accessToken)
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
