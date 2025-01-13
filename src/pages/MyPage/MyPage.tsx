import React, { useRef } from 'react'
import { Heading } from '@/components/atoms/Text/TextFactory'
import styles from './MyPage.module.scss'
import Card from '@/components/common/CardList/Card/Card'
import MockImage from '@/assets/images/mock-image.png'
import Container from '@/components/atoms/Container/Container'
import Button from '@/components/common/Button/Button'
import { GoArrowUpRight } from 'react-icons/go'
import FloatingButton from '@/components/common/FloatingButton/FloatingButton'

interface CardData {
  id: number
  title: string
  thumbnail: string
  minPrice: string
  maxPrice: string
  meetingDate: string
  min: number
  max: number
  current: number
}

const mockCards: CardData[] = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  thumbnail: MockImage,
  title: `트레디종 홀그레인 머스타드 ${index + 1}`,
  minPrice: '12,000원',
  maxPrice: '24,000원',
  meetingDate: '10월 16일 19시 30분',
  min: 4,
  max: 8,
  current: 5,
}))

const ScrollableCardList = ({ cards }: { cards: CardData[] }) => {
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
            key={card.id}
            thumbnail={card.thumbnail}
            title={card.title}
            minPrice={card.minPrice}
            maxPrice={card.maxPrice}
            meetingDate={card.meetingDate}
            min={card.min}
            max={card.max}
            current={card.current}
          />
        ))}
      </div>
      <div className={styles.cardScrollbar} />
    </div>
  )
}

export const MyPage = () => {
  const nickname = localStorage.getItem('userNickname')
  const name = localStorage.getItem('userName')
  const email = localStorage.getItem('userEmail')
  return (
    <div className={styles.container}>
      <div className={styles.comment}>
        <div className={styles['comment-header']}>
          <span className={styles['comment-nickname']}>{nickname}</span>님, 오늘도 야금야금 하세요!
        </div>
        <div className={styles['comment-userinfo']}>
          {name} | {email}
        </div>
      </div>
      <Container
        direction="column"
        justify="center"
        align="center"
        style={{
          borderBottom: '1px solid var(--gray-color2)',
          width: '100%',
          boxSizing: 'border-box',
        }}
      ></Container>

      <div className={styles.mypost}>
        <Heading.Small>내가 작성한 양념장 소분 게시글</Heading.Small>
        <ScrollableCardList cards={mockCards} />
      </div>

      <div className={styles.myposting}>
        <Heading.Small>현재 참여 중인 양념장 소분 게시글</Heading.Small>
        <ScrollableCardList cards={mockCards} />
      </div>

      <div className={styles.postdone}>
        <div className={styles['postdone-comment']}>
          <Heading.Small>소분 종료된 게시글</Heading.Small>
          <Button
            className={styles['postdone-btn']}
            theme="white"
            shadow="0 0 10px rgba(0,0,0,0.1)"
            icon={<GoArrowUpRight />}
            style={{
              borderRadius: '4px',
              color: 'black',
              fontWeight: '500',
              fontSize: '16px',
              padding: '15px 10px 15px 20px',
            }}
          >
            소분 종료된 게시글 전체 보기
          </Button>
        </div>
        <div className={styles['postdone-cardContainer']}>
          {mockCards.slice(0, 3).map((card) => (
            <Card
              key={card.id}
              thumbnail={card.thumbnail}
              title={card.title}
              minPrice={card.minPrice}
              maxPrice={card.maxPrice}
              meetingDate={card.meetingDate}
              min={card.min}
              max={card.max}
              current={card.current}
            />
          ))}
        </div>
      </div>
      <div className={styles.delete}>회원 탈퇴하기</div>
      <FloatingButton />
    </div>
  )
}
