export interface PostResponseData {
  imageUrl: string
  unitName: string
  categoryName: string
  userParticipatingIn: boolean
  userNickname: string
  userPostDataOutDto: UserPostDataOutDto
  postDataOutDto: PostDataOutDto
  // [key: string]: unknown
}

export interface PostRequestData {
  imageUrl: string | null
  unitId: number
  seasoningCategoryId: number
  userPostDataInDto: UserPostDataInDto
  postDataInDto: PostDataInDto
}

export interface UserPostDataInDto {
  postTitle: string
  portioningDate: string
}

export interface PostDataInDto {
  onlinePurchaseUrl: string | null
  originalPrice: number
  amount: number
  minEngageCount: number
  maxEngageCount: number
  portioningPlaceLatitude: number
  portioningPlaceLongitude: number
  description: string
  portioningPlaceAddress: string
  portioningPlaceDetailAddress: string | null
}

export interface UserPostDataOutDto {
  id: number
  writerUuid: string | null
  postTitle: string
  portioningDate: string
  expectedMinimumPrice: number
  remainCount: number
  isFullMinimum: boolean
}

export interface PostDataOutDto {
  onlinePurchaseUrl: string
  originalPrice: number
  amount: number
  minEngageCount: number
  maxEngageCount: number
  currentEngageCount: number
  portioningPlaceLatitude: number
  portioningPlaceLongitude: number
  description: string
  portioningPlaceAddress: string
  portioningPlaceDetailAddress: string
}
