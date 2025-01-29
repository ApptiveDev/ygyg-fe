import { Heading } from '@/components/atoms/Text/TextFactory'
import { ScrollableCardList } from '@/components/common/CardList/ScrollCardList/ScrollCardList'
import styles from './MyPage.module.scss'
import { ScrollCardList } from '@/api/hooks/card/types'
import { useEffect, useState } from 'react'
import { getMyCardList } from '@/api/hooks/card/cardApi'
import Container from '@/components/atoms/Container/Container'

export const WrittenSection = () => {
  const [writtenCardList, setWrittenCardList] = useState<ScrollCardList>()

  useEffect(() => {
    const fetchDetailData = async () => {
      try {
        const data = await getMyCardList({
          type: 'written',
          lastCursor: 0,
          order: 'asc',
          size: 10,
        })
        setWrittenCardList(data)
      } catch (error) {
        console.error('Failed to fetch:', error)
      }
    }
    fetchDetailData()
  }, [])
  return (
    <div className={styles.mypost}>
      <Heading.Small>내가 작성한 양념장 소분 게시글</Heading.Small>
      {writtenCardList ? (
        <ScrollableCardList cards={writtenCardList?.myPost} />
      ) : (
        <Container style={{ height: '100px' }}>Loading...</Container>
      )}
    </div>
  )
}
