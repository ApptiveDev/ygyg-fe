import styles from './CardList.module.scss'
import Card from '../Card/Card'
import defaultImg from '@/assets/images/default_image.png'
import { CardData } from '@/api/hooks/card/types'

type CardListProps = {
  cards: CardData[]
  selectedCategory?: string
}

const CardList: React.FC<CardListProps> = ({ cards }: CardListProps) => {
  return (
    <div className={styles['card-list']}>
      {cards.map((card, index) => (
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
  )
}

export default CardList
