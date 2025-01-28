import styles from './CardList.module.scss'
import Card from '../Card/Card'
import defaultImg from '@/assets/images/default_image.png'

const mockData = Array(9).fill({
  thumbnail: defaultImg,
  title: '트레디종 홀그레인 머스타드',
  minPrice: '12,000원',
  maxPrice: '24,000원',
  meetingDate: '10월 16일 19시 30분',
  min: 4,
  max: 8,
  current: 5,
})

type CardListProps = {
  selectedCategory: string
}

const CardList: React.FC<CardListProps> = ({ selectedCategory }) => {
  const filteredData = selectedCategory
    ? mockData.filter((item) => item.category === selectedCategory)
    : mockData

  return (
    <div className={styles['card-list']}>
      {filteredData.map((item, index) => (
        <Card key={index} {...item} />
      ))}
    </div>
  )
}

export default CardList
