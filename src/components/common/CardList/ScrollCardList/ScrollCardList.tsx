import { useRef, useEffect, useCallback, useState } from 'react'
import Card from '../Card/Card'
import styles from './ScrollCardList.module.scss'
import { CardData } from '@/api/hooks/card/types'

export const ScrollableCardList = ({
  cards,
  loadMore,
}: {
  cards: CardData[]
  loadMore: () => void
}) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isFetching, setIsFetching] = useState(false)

  const handleScroll = useCallback(() => {
    const container = scrollRef.current
    if (!container || isFetching) return

    const { scrollLeft, clientWidth, scrollWidth } = container
    if (scrollLeft + clientWidth >= scrollWidth - 10) {
      setIsFetching(true)
      loadMore()
    }
  }, [isFetching, loadMore])

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const handleDebouncedScroll = () => {
      clearTimeout((container as any)._scrollTimeout)
      ;(container as any)._scrollTimeout = setTimeout(handleScroll, 200)
    }
    container.addEventListener('scroll', handleDebouncedScroll)
    return () => container.removeEventListener('scroll', handleDebouncedScroll)
  }, [handleScroll])

  useEffect(() => {
    setIsFetching(false)
  }, [cards])

  return (
    <div className={styles.cardListContainer}>
      <div className={styles.cardList} ref={scrollRef}>
        {cards.map((card) => (
          <Card
            key={card.userPostId}
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
