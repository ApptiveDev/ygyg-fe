import Container from '@/components/atoms/Container/Container'
import InputText from '@/components/atoms/InputText/InputText'
import styles from './Detail.module.scss'
import { TextBody } from '@/components/atoms/Text/TextFactory'
import Button from '@/components/common/Button/Button'
import SpeechBubble from '@/components/features/SpeechBubble/SpeechBubble'
import { DateFromData, TimeForUse } from '@/hooks/useFormatDateAndTime'
import { BsFillArrowRightCircleFill } from 'react-icons/bs'
import { useEffect, useRef, useState } from 'react'
import { CommentsResponseData } from '@/api/hooks/comment/types'
import { getComments, postComment } from '@/api/hooks/comment/commentsApi'

const initialComments = [
  {
    userUuid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    nickname: '깍두기',
    createdAt: '2024-12-14 18:11:02',
    commentContent: '안녕하세요! 소분 참여하고 싶습니다.',
  },
  {
    userUuid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    nickname: '제인구스',
    createdAt: '2024-12-14 18:12:02',
    commentContent: '네 좋습니다 !! 다들 시간이랑 장소 다 확인하셨죠?',
  },
  {
    userUuid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    nickname: '정윤구스',
    createdAt: '2024-12-14 18:21:02',
    commentContent: '넵 확인했습니다.',
  },
  {
    userUuid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    nickname: '깍두기',
    createdAt: '2024-12-14 19:01:02',
    commentContent: '넹 확인했습니다 !',
  },
  {
    userUuid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    nickname: '시웅구스',
    createdAt: '2024-12-14 19:41:02',
    commentContent: '확인했어요 ! 그런데 우리 한 분만 더 올 때까지 기다려볼까요?',
  },
  {
    userUuid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    nickname: '제인구스',
    createdAt: '2024-12-14 19:51',
    commentContent: '넵 저도 동의하는 바입니다. 그게 금액도 딱 잘 나눠지고 편할 것 같아요 !',
  },
]

interface CommentProps {
  userPostId: string
  userUuid: string
  isActivate: boolean
  onActivate: () => void
  isMyPosting: boolean
}

function CommentSection({
  userPostId,
  userUuid,
  isActivate,
  onActivate,
  isMyPosting,
}: CommentProps) {
  const [comments, setComments] = useState<CommentsResponseData>()

  useEffect(() => {
    if (userPostId) {
      const fetchDetailData = async () => {
        try {
          const data = await getComments(Number(userPostId))
          setComments(data)
        } catch (error) {
          console.error('Failed to fetch:', error)
        }
      }
      fetchDetailData()
    }
  }, [userPostId])

  return (
    <Container
      size="full-width"
      align="center"
      direction="column"
      gap={45}
      style={{
        boxSizing: 'border-box',
        paddingBottom: '50px',
      }}
    >
      {comments ? (
        isActivate || isMyPosting ? (
          <CommentActivated
            comments={comments!}
            setComments={setComments}
            userPostId={userPostId}
            userUuid={userUuid}
            isMyPosting={isMyPosting}
          />
        ) : (
          <CommentBlocked comments={comments!} userUuid={userUuid} onActivate={onActivate} />
        )
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  )
}

export default CommentSection

const CommentActivated = ({
  comments,
  setComments,
  userPostId,
  userUuid,
  isMyPosting,
}: {
  comments: CommentsResponseData
  setComments: React.Dispatch<React.SetStateAction<CommentsResponseData | undefined>>
  userPostId: string
  userUuid: string
  isMyPosting: boolean
}) => {
  const [comment, setComment] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [isFirst, setIsFirst] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current && !isFirst) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [comments])

  const saveComment = async () => {
    if (!comment.trim()) return
    setIsFirst(false)
    setIsSaving(true)

    try {
      await postComment(Number(userPostId), comment)

      const updatedComments = await getComments(Number(userPostId))
      setComments(updatedComments)
    } catch (error) {
      console.error('Failed to save comment:', error)
    } finally {
      setComment('')
      setIsSaving(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (isSaving) return
      setIsSaving(true)
      setTimeout(() => saveComment(), 100)
    }
  }

  return (
    <div style={{ width: '100%' }}>
      <Container size="full-width" direction="column" align="center" gap={12} ref={scrollRef}>
        {isMyPosting ? (
          <Button theme="gray" width="50%" style={{ borderRadius: '12px', cursor: 'auto' }}>
            소분 진행중
          </Button>
        ) : (
          <Button theme="gray" width="50%" style={{ borderRadius: '12px', cursor: 'auto' }}>
            소분 참여중
          </Button>
        )}
        <TextBody.XSmall weight={800} color="var(--point-color)" style={{ fontSize: '12px' }}>
          작성자가 지정한 시각으로부터 24시간 경과 시, 게시글이 비활성화됩니다.
        </TextBody.XSmall>
        <Container direction="column" size="full-width" gap={20} style={{ marginBottom: '15px' }}>
          {comments.comments.map((comment, index) => (
            <Container
              key={index}
              size="full-width"
              padding="0 10px"
              justify={comment.writerUuid === userUuid ? 'flex-end' : 'flex-start'}
              style={{ boxSizing: 'border-box' }}
            >
              <SpeechBubble
                fromMe={comment.writerUuid === userUuid}
                text={comment.commentContents}
                nickname={comment.userNickname}
                createdAt={comment.createdAt}
              />
            </Container>
          ))}
        </Container>
        <InputText
          width="100%"
          placeholder="댓글을 입력해주세요. (200자 이내)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          icon={
            <BsFillArrowRightCircleFill
              style={{
                width: '32px',
                height: '32px',
                color: 'var(--gray-color3)',
                cursor: 'pointer',
              }}
              onClick={saveComment}
            />
          }
          onKeyDown={handleKeyDown}
          maxLength={200}
        />
      </Container>
      <div ref={scrollRef} />
    </div>
  )
}

const CommentBlocked = ({
  comments,
  userUuid,
  onActivate,
}: {
  comments: CommentsResponseData
  userUuid: string
  onActivate: () => void
}) => {
  return (
    <Container size="full-width" direction="column" align="center" gap={12}>
      <Button theme="red" width="50%" style={{ borderRadius: '12px' }} onClick={onActivate}>
        소분 참여하기
      </Button>
      <TextBody.XSmall weight={800} color="var(--point-color)" style={{ fontSize: '12px' }}>
        소분에 참여하면 댓글창이 활성화됩니다.
      </TextBody.XSmall>
      <Container
        size="full-width"
        style={{
          height: '270px',
          overflowY: 'hidden',
          overflowX: 'visible',
          position: 'relative',
        }}
      >
        <Container direction="column" size="full-width" gap={20} style={{ filter: 'blur(6px)' }}>
          {comments.comments.map((comment, index) => (
            <Container
              key={index}
              size="full-width"
              padding="0 10px"
              justify={comment.writerUuid === userUuid ? 'flex-end' : 'flex-start'}
              style={{ boxSizing: 'border-box' }}
            >
              <SpeechBubble
                fromMe={comment.writerUuid === userUuid}
                text={comment.commentContents}
                nickname={comment.userNickname}
                createdAt={comment.createdAt}
              />
            </Container>
          ))}
        </Container>
        <TextBody.Large weight={700} className={styles.commentText}>
          소분 일시를 잘 확인하고 신중히 참여해주세요.
        </TextBody.Large>
      </Container>
    </Container>
  )
}
