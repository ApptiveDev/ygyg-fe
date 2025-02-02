import { Heading } from '@/components/atoms/Text/TextFactory'
import { ScrollableCardList } from '@/components/common/CardList/ScrollCardList/ScrollCardList'
import styles from './MyPage.module.scss'
import { ScrollCardList } from '@/api/hooks/card/types'
import { useEffect, useState } from 'react'
import { getMyCardList } from '@/api/hooks/card/cardApi'
import Container from '@/components/atoms/Container/Container'

export const WrittenSection = () => {
  const [cards, setCards] = useState<ScrollCardList['myPost']>([])
  const [lastCursor, setLastCursor] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const fetchDetailData = async () => {
    if (loading || !hasMore) return
    setLoading(true)

    try {
      const data = await getMyCardList({
        type: 'written',
        lastCursor,
        order: 'asc',
        size: 10,
      })

      if (data) {
        setCards((prev) => [...prev, ...data.myPost])
        setLastCursor(data.lastCursor ?? null)
        setHasMore(data.hasNext)
      }
    } catch (error) {
      console.error('Failed to fetch:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!loading) {
      fetchDetailData()
    }
  }, [loading])
  return (
    <div className={styles.mypost}>
      <Heading.Small>내가 작성한 양념장 소분 게시글</Heading.Small>
      <ScrollableCardList cards={cards} loadMore={fetchDetailData} text="작성한 글이 없습니다." />
      {loading && <Container style={{ height: '100px' }}>Loading...</Container>}
    </div>
  )
}
