import styles from './CardList.module.scss'
import Card from '../Card/Card' 
import MockImage from '@/assets/images/mock-image.png'

const mockData = Array(9).fill(
  {
    thumbnail: MockImage,
    title: '트레디종 홀그레인 머스타드',
    minPrice: '12,000원',
    maxPrice: '24,000원',
    meetingDate: '10월 16일 19시 30분',
    min: 4,
    max: 8,
    current: 5,
  });

const CardList = () => {
  return (
    <div className={styles['card-list']}>
      {mockData.map((item, index) => (
        <Card key={index} {...item} />
      ))}
    </div>
  );
};

export default CardList;
