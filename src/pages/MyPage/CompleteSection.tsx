import { Heading } from '@/components/atoms/Text/TextFactory'
import Button from '@/components/common/Button/Button'
import Card from '@/components/common/CardList/Card/Card'
import { GoArrowUpRight } from 'react-icons/go'
import styles from './MyPage.module.scss'
import { useEffect, useState } from 'react'
import { ScrollCardList } from '@/api/hooks/card/types'
import { getMyCardList } from '@/api/hooks/card/cardApi'

export const CompleteSection = () => {
  const [doneCardList, setDoneCardList] = useState<ScrollCardList>()

  // useEffect(() => {
  //   const fetchDetailData = async () => {
  //     try {
  //       const data = await getMyCardList('complete', 0, 'asc', 9, 10, ['asc'])
  //       setDoneCardList(data)
  //     } catch (error) {
  //       console.error('Failed to fetch:', error)
  //     }
  //   }
  //   fetchDetailData()
  // }, [])

  return (
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
        {doneCardList?.myPost
          .slice(0, 3)
          .map((card) => (
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
    </div>
  )
}
