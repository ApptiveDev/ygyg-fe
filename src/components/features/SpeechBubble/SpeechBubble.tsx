import { DateForUse, TimeForUse } from '@/hooks/useFormatDateAndTime'
import styles from './SpeechBubble.module.scss'
import { useEffect } from 'react'
import Container from '@/components/atoms/Container/Container'

interface SpeechBubbleProps {
  fromMe: boolean
  text: string
  nickname: string
  createdAt: string
  deletedUser?: boolean
}

function SpeechBubble({
  fromMe = false,
  text,
  nickname,
  createdAt,
  deletedUser = false,
}: SpeechBubbleProps) {
  const month = DateForUse(createdAt?.split('T')[0]!).month
  const date = DateForUse(createdAt?.split('T')[0]!).date
  const hour = TimeForUse(createdAt?.split('T')[1]!).hour
  const minute = TimeForUse(createdAt?.split('T')[1]!).minute

  return fromMe ? (
    <div className={`${styles.speechBubble} ${styles.fromMe}`}>
      <div className={styles.text}>{text}</div>
      <Container justify="space-between">
        <div className={styles.information}>{nickname}</div>
        <div className={styles.information}>
          {month}/{date} {hour}:{minute}
        </div>
      </Container>
    </div>
  ) : (
    <div className={`${styles.speechBubble} ${styles.fromThem}`}>
      <div className={styles.text}>{text}</div>
      <Container justify="space-between">
        <div className={`${styles.information} ${deletedUser ? styles.deletedUser : ''}`}>
          {nickname}
        </div>
        <div className={styles.information}>
          {month}/{date} {hour}:{minute}
        </div>
      </Container>
    </div>
  )
}

export default SpeechBubble
