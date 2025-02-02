import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Home.module.scss'
import SearchBar from '@/components/common/SearchBar/SearchBar'
import CategoryTab from '@/components/common/CategoryTabs/CategoryTabs'
import CardList from '@/components/common/CardList/CardList/CardList'
import Container from '@/components/atoms/Container/Container'
import Button from '@/components/common/Button/Button'
import { GoArrowUpRight } from 'react-icons/go'
import Banner from '@/components/features/Banner/Banner'
import { CardData } from '@/api/hooks/card/types'
import { getCategoryPostList } from '@/api/hooks/card/cardApi'

export const HomePage = () => {
  const navigate = useNavigate()
  const [searchKeyword, setSearchKeyword] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [posts, setPosts] = useState<CardData[]>([])
  const [loading, setLoading] = useState(false)

  const categoryMap: Record<string, number> = {
    etc: 1,
    liquid: 2,
    sauce: 3,
    powder: 4,
    jam: 5,
  }

  const categoryLabelMap: Record<string, string> = {
    liquid: '액체류',
    sauce: '소스류',
    powder: '가루류',
    jam: '잼류',
    etc: '기타',
  }

  const sortByMap: Record<string, string> = {
    '최신 순': 'latest',
    '약속 시간 임박 순': 'soonest',
    '낮은 가격 순': 'lowestPrice',
    '남은 인원 적은 순': 'lowestRemain',
  }

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      const categoryId = selectedCategory ? categoryMap[selectedCategory] : 0
      const sortBy = 'latest'

      try {
        const response = await getCategoryPostList({
          categoryId: categoryId ?? undefined,
          sortBy,
          page: 1,
          size: 9,
          isMinimumPeopleMet: false,
        })
        setLoading(false)
        setPosts(response.items)
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }

    fetchPosts()
  }, [selectedCategory])

  const search = () => {
    if (searchKeyword) navigate(`/list/search/${searchKeyword}`)
  }

  const handleNavigation = () => {
    navigate('/list?sort=최신 순&page=1&filter=false')
  }
  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName)
    console.log(`선택된 카테고리: ${categoryName}`)
  }

  const displayedCategory = selectedCategory
    ? categoryLabelMap[selectedCategory] || selectedCategory
    : ''

  return (
    <Container size="full-width" direction="column" align="center">
      <div className={styles.bannerContainer}>
        <Banner />
      </div>
      <div className={styles.wrapper}>
        <Container
          direction="column"
          justify="center"
          align="center"
          style={{
            borderBottom: '1px solid var(--gray-color2)',
            padding: '52px 20px',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <div className={styles.bannerWrapper}>
            <SearchBar
              placeholder="검색하고 싶은 양념장을 입력하세요"
              width="95%"
              onChange={(value) => setSearchKeyword(value)}
              onSubmit={search}
            />
            <div className={styles.categorytabsContainer}>
              <CategoryTab onCategorySelect={handleCategorySelect} />
            </div>
          </div>
        </Container>
        <div className={styles.listContainer}>
          <span className={styles.commentMain}>
            {selectedCategory ? (
              <>
                '<span className={styles.selectedCategoryText}>{displayedCategory}</span>' 소분
                게시글 목록
              </>
            ) : (
              '양념장 소분 게시글 목록'
            )}
          </span>
          {loading && <Container style={{ height: '100px' }}>Loading...</Container>}

          <CardList cards={posts} selectedCategory={selectedCategory ?? undefined} />

          <Button
            className={styles.navigateButton}
            theme="white"
            shadow="0 0 10px rgba(0,0,0,0.1)"
            icon={<GoArrowUpRight />}
            style={{ borderRadius: '4px', color: 'black', fontWeight: '500' }}
            onClick={handleNavigation}
          >
            소분 게시물 전체 보기
          </Button>
        </div>
      </div>
    </Container>
  )
}
