export interface CommentsResponseData {
  comments: CommentData[]
}

export interface CommentData {
  writerUuid: string
  userNickname: string
  commentContents: string
  createdAt: string
}
