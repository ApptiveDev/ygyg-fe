import fetchInstance from '@/api/instance/instance'
import {
  CategoryPostListParams,
  ScrollCardList,
  SearchPostListParams,
} from '@/api/hooks/card/types'
import { CardList } from '@/api/hooks/card/types'
import { apiInstance } from '@/provider/Auth/apiInstance'

const myCardPath = `/api/v1/post/my/list`
const categoryListPagePath = `/api/v1/post/list`
const searchListPagePath = `/api/v1/post/search`

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

export const getCategoryPostList = async ({
  categoryId,
  sortBy,
  page,
  size = 9,
  isMinimumPeopleMet = false,
}: CategoryPostListParams): Promise<CardList> => {
  try {
    const path =
      categoryId && categoryId !== 0
        ? `${categoryListPagePath}/${categoryId}`
        : categoryListPagePath
    const response = await apiInstance.get(path, {
      params: { sortBy, page, size, isMinimumPeopleMet },
    })

    if (!response.data.isSuccess) {
      throw new Error(response.data.message || '카테고리 게시글 리스트 가져오기 실패')
    }

    return response.data.result
  } catch (error) {
    console.error('카테고리 게시글 요청 실패:', error)
    throw error
  }
}

export const getSearchPostList = async ({
  keyword,
  sortBy,
  page,
  size = 9,
  isMinimumPeopleMet = false,
}: SearchPostListParams): Promise<CardList> => {
  try {
    const response = await apiInstance.get(searchListPagePath, {
      params: { keyword, sortBy, page, size, isMinimumPeopleMet },
    })

    if (!response.data.isSuccess) {
      throw new Error(response.data.message || '카테고리 게시글 리스트 가져오기 실패')
    }

    return response.data.result
  } catch (error) {
    console.error('카테고리 게시글 요청 실패:', error)
    throw error
  }
}
