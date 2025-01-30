export interface CardList {
  items: CardData[]
  pageInfoDto: PageInfo
}

export interface ScrollCardList {
  myPost: CardData[]
  lastCursor: number
  hasNext: boolean
}

export interface CardData {
  userPostId: number
  postTitle: string
  imageUrl: string
  portioningDate: string
  originalPrice: number
  minEngageCount: number
  maxEngageCount: number
  currentEngageCount: number
}

export interface PageInfo {
  totalItemsLength: number
  currentPage: number
  size: number
}
