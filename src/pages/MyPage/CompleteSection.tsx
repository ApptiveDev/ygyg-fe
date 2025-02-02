import { Heading } from '@/components/atoms/Text/TextFactory'
import Button from '@/components/common/Button/Button'
import Card from '@/components/common/CardList/Card/Card'
import { GoArrowUpRight } from 'react-icons/go'
import styles from './MyPage.module.scss'
import { useEffect, useRef, useState } from 'react'
import { ScrollCardList } from '@/api/hooks/card/types'
import { getMyCardList } from '@/api/hooks/card/cardApi'
import { ScrollableCardList } from '@/components/common/CardList/ScrollCardList/ScrollCardList'
import Container from '@/components/atoms/Container/Container'

export const CompleteSection = () => {
  const [cards, setCards] = useState<ScrollCardList['myPost']>([])
  const [lastCursor, setLastCursor] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const isFirstRender = useRef(true)
  const fetchDetailData = async () => {
    if (loading || !hasMore) return
    setLoading(true)

    try {
      const data = await getMyCardList({
        type: 'complete',
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
    // if (isFirstRender.current) {
    //   isFirstRender.current = false
    //   return
    // }

    if (!loading) {
      fetchDetailData()
    }
  }, [loading])

  return (
    <div className={styles.mypost}>
      <Heading.Small>소분 종료된 게시글</Heading.Small>
      <ScrollableCardList cards={cards} loadMore={fetchDetailData} />
      {loading && <Container style={{ height: '100px' }}>Loading...</Container>}
    </div>
  )
}
