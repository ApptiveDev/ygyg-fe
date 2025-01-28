import defaultImg from '@/assets/images/default_image.png'
import styles from '@/components/common/CardList/Card/Card.module.scss'
import { BsClock } from 'react-icons/bs'

interface CardProps {
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

  return (
    <div className={styles.card}>
      <div className={styles['card-image-container']}>
        <img
          src={thumbnail ? thumbnail : defaultImg}
          alt={title}
          className={styles['card-image']}
        />
        <div className={styles['card-time-container']}>
          <BsClock className={styles['clock-icon']} />
          <div className={styles.meetingDate}>{meetingDate}</div>
        </div>
      </div>
      <div className={styles['card-content']}>
        <div className={styles['card-header-container']}>
          <div className={styles['card-title']}>{title}</div>
          <div className={styles['card-price']}>
            <span className={styles['current-min-price']}>{minPrice}</span>
            <span className={styles['current-max-price']}>~ {maxPrice}</span>
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
