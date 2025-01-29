import { useRef } from 'react'
import Card from '../Card/Card'
import styles from './ScrollCardList.module.scss'
import { CardData } from '@/api/hooks/card/types'

export const ScrollableCardList = ({ cards }: { cards: CardData[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (event: React.MouseEvent) => {
    const container = scrollRef.current
    if (!container) return

    const startX = event.pageX
    const initialScrollLeft = container.scrollLeft

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.pageX - startX
      container.scrollLeft = initialScrollLeft - deltaX
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  return (
    <div className={styles.cardListContainer}>
      <div className={styles.cardList} ref={scrollRef} onMouseDown={handleMouseDown}>
        {cards.map((card) => (
          <Card
            userPostId={card.userPostId}
            thumbnail={card.imageUrl}
            title={card.postTitle}
            minPrice={String(Math.floor(card.originalPrice / card.maxEngageCount))}
            maxPrice={String(Math.floor(card.originalPrice / card.minEngageCount))}
            meetingDate={card.portioningDate}
            min={card.minEngageCount}
            max={card.maxEngageCount}
            current={card.currentEngageCount}
          />
        ))}
      </div>
      <div className={styles.cardScrollbar} />
    </div>
  )
}
