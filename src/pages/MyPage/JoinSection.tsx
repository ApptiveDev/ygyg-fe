import { Heading } from '@/components/atoms/Text/TextFactory'
import { ScrollableCardList } from '@/components/common/CardList/ScrollCardList/ScrollCardList'
import styles from './MyPage.module.scss'
import { useEffect, useState } from 'react'
import { ScrollCardList } from '@/api/hooks/card/types'
import { getMyCardList } from '@/api/hooks/card/cardApi'
import Container from '@/components/atoms/Container/Container'

export const JoinSection = () => {
  const [joinCardList, setJoinCardList] = useState<ScrollCardList>()

  useEffect(() => {
    const fetchDetailData = async () => {
      try {
        const data = await getMyCardList({
          type: 'join',
          lastCursor: 0,
          order: 'asc',
          size: 10,
        })
        setJoinCardList(data)
      } catch (error) {
        console.error('Failed to fetch:', error)
      }
    }
    fetchDetailData()
  }, [])
  return (
    <div className={styles.myposting}>
      <Heading.Small>현재 참여 중인 양념장 소분 게시글</Heading.Small>
      {joinCardList ? (
        <ScrollableCardList cards={joinCardList?.myPost} />
      ) : (
        <Container style={{ height: '100px' }}>Loading...</Container>
      )}
    </div>
  )
}
