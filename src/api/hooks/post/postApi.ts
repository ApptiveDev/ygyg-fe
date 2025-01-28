import fetchInstance from '@/api/instance/instance'
import { PostRequestData, PostResponseData } from './types'
import axios from 'axios'

const postPath = `/api/v1/post`

export const postPostData = async ({
  userPostDataInDto,
  postDataInDto,
  imageUrl,
  unitId,
  seasoningCategoryId,
}: PostRequestData): Promise<boolean> => {
  try {
    const response = await fetchInstance.post(postPath, {
      userPostDataInDto,
      postDataInDto,
      imageUrl,
      unitId,
      seasoningCategoryId,
    })
    const isSuccess = response.data.isSuccess
    return isSuccess
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('소분글 작성 실패:', error.response.data.message)
      } else {
        console.error('네트워크 오류 또는 응답 없음:', error.message)
      }
    } else {
      console.error('알 수 없는 오류:', error)
    }
    throw error
  }
}

export const putPostData = async (
  userPostId: number,
  { userPostDataInDto, postDataInDto, imageUrl, unitId, seasoningCategoryId }: PostRequestData,
): Promise<boolean> => {
  try {
    const response = await fetchInstance.put(`${postPath}/${userPostId}`, {
      userPostDataInDto,
      postDataInDto,
      imageUrl,
      unitId,
      seasoningCategoryId,
    })
    const isSuccess = response.data.isSuccess
    return isSuccess
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('소분글 작성 실패:', error.response.data.message)
      } else {
        console.error('네트워크 오류 또는 응답 없음:', error.message)
      }
    } else {
      console.error('알 수 없는 오류:', error)
    }
    throw error
  }
}

export const getPostData = async (userPostId: number): Promise<PostResponseData> => {
  const response = await fetchInstance.get(`${postPath}/${userPostId}`)
  return response.data.result
}

export const postJoinPost = async (userPostId: number): Promise<void> => {
  try {
    const response = await fetchInstance.post(`${postPath}/join/${userPostId}`)
    const isSuccess = response.data.isSuccess
    return isSuccess
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('소분 참여 실패:', error.response.data.message)
      } else {
        console.error('네트워크 오류 또는 응답 없음:', error.message)
      }
    } else {
      console.error('알 수 없는 오류:', error)
    }
    throw error
  }
}

export const deletePost = async (userPostId: number): Promise<void> => {
  try {
    const response = await fetchInstance.delete(`${postPath}/${userPostId}`)
    const isSuccess = response.data.isSuccess
    return isSuccess
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('소분글 삭제 실패:', error.response.data.message)
      } else {
        console.error('네트워크 오류 또는 응답 없음:', error.message)
      }
    } else {
      console.error('알 수 없는 오류:', error)
    }
    throw error
  }
}
