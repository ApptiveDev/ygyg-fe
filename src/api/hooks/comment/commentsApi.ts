import fetchInstance from '@/api/instance/instance'
import { CommentsResponseData } from './types'

const commentPath = '/api/v1/comment'

export const getComments = async (userPostId: number): Promise<CommentsResponseData> => {
  const response = await fetchInstance.get(`${commentPath}/${userPostId}`)
  return response.data.result
}

export const postComment = async (userPostId: number, commentContents: string): Promise<void> => {
  const response = await fetchInstance.post(commentPath, { userPostId, commentContents })
}
