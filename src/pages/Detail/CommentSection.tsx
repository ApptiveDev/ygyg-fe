import Container from '@/components/atoms/Container/Container'
import InputText from '@/components/atoms/InputText/InputText'
import styles from './Detail.module.scss'
import { TextBody } from '@/components/atoms/Text/TextFactory'
import Button from '@/components/common/Button/Button'
import SpeechBubble from '@/components/features/SpeechBubble/SpeechBubble'
import { DateFromDotToDash, TimeForUse } from '@/hooks/useFormatDateAndTime'
import { BsFillArrowRightCircleFill } from 'react-icons/bs'
import { useEffect, useRef, useState } from 'react'

const initialComments = [
  {
    userId: 3,
    nickname: '깍두기',
    createdAt: '2024-12-14 18:11:02',
    commentContent: '안녕하세요! 소분 참여하고 싶습니다.',
  },
  {
    userId: 5,
    nickname: '제인구스',
    createdAt: '2024-12-14 18:12:02',
    commentContent: '네 좋습니다 !! 다들 시간이랑 장소 다 확인하셨죠?',
  },
  {
    userId: 2,
    nickname: '정윤구스',
    createdAt: '2024-12-14 18:21:02',
    commentContent: '넵 확인했습니다.',
  },
  {
    userId: 3,
    nickname: '깍두기',
    createdAt: '2024-12-14 19:1:02',
    commentContent: '넹 확인했습니다 !',
  },
  {
    userId: 1,
    nickname: '시웅구스',
    createdAt: '2024-12-14 19:41:02',
    commentContent: '확인했어요 ! 그런데 우리 한 분만 더 올 때까지 기다려볼까요?',
  },
  {
    userId: 5,
    nickname: '제인구스',
    createdAt: '2024-12-14 19:51',
    commentContent: '넵 저도 동의하는 바입니다. 그게 금액도 딱 잘 나눠지고 편할 것 같아요 !',
  },
]

interface CommentProps {
  userId: number
  isActivate: boolean
  onActivate: () => void
  isMyPosting: boolean
}

function CommentSection({ userId, isActivate, onActivate, isMyPosting }: CommentProps) {
  const [comments, setComments] = useState(initialComments)

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
      {isActivate || isMyPosting ? (
        <CommentActivated
          comments={comments}
          setComments={setComments}
          userId={userId}
          isMyPosting={isMyPosting}
        />
      ) : (
        <CommentBlocked comments={comments} userId={userId} onActivate={onActivate} />
      )}
    </Container>
  )
}

export default CommentSection

const CommentActivated = ({
  comments,
  setComments,
  userId,
  isMyPosting,
}: {
  comments: typeof initialComments
  setComments: React.Dispatch<React.SetStateAction<typeof initialComments>>
  userId: number
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

  const saveComment = () => {
    if (!comment.trim()) return
    setIsFirst(false)
    const now = new Date()
    const date = DateFromDotToDash(now.toISOString())
    const time = now.toTimeString().split(' ')[0]
    const newComment = {
      userId: userId,
      nickname: '제인구스',
      createdAt: date + ' ' + time,
      commentContent: comment,
    }

    setComments((prevComments) => [...prevComments, newComment])
    setComment('')
    setIsSaving(false)
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
          {comments.map((comment, index) => (
            <Container
              key={index}
              size="full-width"
              padding="0 10px"
              justify={comment.userId === userId ? 'flex-end' : 'flex-start'}
              style={{ boxSizing: 'border-box' }}
            >
              <SpeechBubble
                fromMe={comment.userId === userId}
                text={comment.commentContent}
                nickname={comment.nickname}
                createdAt={comment.createdAt}
              />
            </Container>
          ))}
        </Container>
        <InputText
          width="100%"
          placeholder="댓글을 입력해주세요."
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
        />
      </Container>
      <div ref={scrollRef} />
    </div>
  )
}

const CommentBlocked = ({
  comments,
  userId,
  onActivate,
}: {
  comments: typeof initialComments
  userId: number
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
          {comments.map((comment, index) => (
            <Container
              key={index}
              size="full-width"
              padding="0 10px"
              justify={comment.userId === userId ? 'flex-end' : 'flex-start'}
              style={{ boxSizing: 'border-box' }}
            >
              <SpeechBubble
                fromMe={comment.userId === userId}
                text={comment.commentContent}
                nickname={comment.nickname}
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
