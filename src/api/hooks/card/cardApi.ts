import fetchInstance from '@/api/instance/instance'
import { ScrollCardList } from './types'

const myCardPath = '/api/v1/post/my/list'

interface MyCardListParams {
  type: string
  lastCursor: number | null
  order: string
  size: number
}

export const getMyCardList = async ({
  type,
  lastCursor,
  order,
  size,
}: MyCardListParams): Promise<ScrollCardList> => {
  const response = await fetchInstance.get(myCardPath, {
    params: { type, lastCursor, order, size },
  })
  return response.data.result
}
