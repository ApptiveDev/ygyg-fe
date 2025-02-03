import defaultImg from '@/assets/images/default_image.png'
import styles from '@/components/common/CardList/Card/Card.module.scss'
import { DateForUse, DateFromData, TimeForUse, TimeFromData } from '@/hooks/useFormatDateAndTime'
import useFormatPrice from '@/hooks/useFormatPrice'
import { useEffect, useState } from 'react'
import { BsClock } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

interface CardProps {
  userPostId: number
  thumbnail: string | null
  title: string
  minPrice: string
  maxPrice: string
  meetingDate: string
  min: number
  max: number
  current: number
}

const Card = ({
  userPostId,
  thumbnail,
  title,
  minPrice,
  maxPrice,
  meetingDate,
  min,
  max,
  current,
}: CardProps) => {
  const blocks = Array(10).fill(null)
  const [meeting, setMeeting] = useState('')
  const navigate = useNavigate()
  const [titleForUse, setTitleForUse] = useState('')
  const accessToken = localStorage.getItem('accessToken')

  useEffect(() => {
    const { month, date } = DateForUse(DateFromData(meetingDate))
    const { hour, minute } = TimeForUse(TimeFromData(meetingDate))
    setMeeting(`${month}월 ${date}일 ${hour}시 ${minute}분`)
  }, [meetingDate])

  useEffect(() => {
    if (title.length > 19) {
      setTitleForUse(title.slice(0, 17) + '...')
    } else {
      setTitleForUse(title)
    }
  }, [title])

  const clickCard = () => {
    if (accessToken) {
      navigate(`/detail/${userPostId}`)
    } else {
      alert('로그인 후 상세 내용을 볼 수 있습니다.')
      navigate('/login')
    }
  }

  return (
    <div className={styles.card} onClick={clickCard}>
      <div className={styles['card-image-container']}>
        <img
          src={thumbnail ? thumbnail : defaultImg}
          alt={title}
          className={styles['card-image']}
        />
        <div className={styles['card-time-container']}>
          <BsClock className={styles['clock-icon']} />
          <div className={styles.meetingDate}>{meeting}</div>
        </div>
      </div>
      <div className={styles['card-content']}>
        <div className={styles['card-header-container']}>
          <div className={styles['card-title']}>{titleForUse}</div>
          <div className={styles['card-price']}>
            <span className={styles['current-min-price']}>
              {useFormatPrice(Number(minPrice))}원
            </span>
            <span className={styles['current-max-price']}>
              ~ {useFormatPrice(Number(maxPrice))}원
            </span>
          </div>
        </div>
        <div className={styles['card-count-block']}>
          {blocks.map((_, number) => {
            const blockClass = styles['count-block']
            let content = null
            let style = {}

            if (number < current) {
              style = { backgroundColor: '#ED8481', color: '#ffffff' }
            }

            if (number + 1 === min) {
              content = min
              if (min <= current) {
                style = { backgroundColor: '#ED8481', color: '#ffffff' }
              } else {
                style = {
                  backgroundColor: '#F4F4F4',
                  color: '#ED8481',
                  border: '1px solid #ED8481',
                }
              }
            }

            if (number + 1 === max) {
              content = max
              if (max <= current) {
                style = { backgroundColor: '#ED8481', color: '#ffffff' }
              } else {
                style = {
                  backgroundColor: '#F4F4F4',
                  color: '#ED8481',
                  border: '1px solid #ED8481',
                }
              }
            }

            return (
              <div className={blockClass} key={number} style={style}>
                {content && <span className={styles['block-number']}>{content}</span>}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Card
