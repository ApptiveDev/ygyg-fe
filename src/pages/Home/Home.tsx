import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Home.module.scss'
import SearchBar from '@/components/common/SearchBar/SearchBar'
import CategoryTab from '@/components/common/CategoryTabs/CategoryTabs'
import CardList from '@/components/common/CardList/CardList/CardList'
import Container from '@/components/atoms/Container/Container'
import Button from '@/components/common/Button/Button'
import { GoArrowUpRight } from 'react-icons/go'
import Banner from '@/components/features/Banner/Banner';

export const HomePage = () => {
  const navigate = useNavigate()
  const [searchKeyword, setSearchKeyword] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categoryLabelMap: Record<string, string> = {
    liquid: '액체류',
    sauce: '소스류',
    powder: '가루류',
    jam: '잼류',
    etc: '기타',
  };

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

  const displayedCategory = selectedCategory ? categoryLabelMap[selectedCategory] || selectedCategory : '';


  return (
    <Container size="full-width" direction="column" align="center">
      <div className = {styles.bannerContainer}>
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
                  '<span className={styles.selectedCategoryText}>{displayedCategory}</span>' 소분 게시글
                  목록
                </>
              ) : (
                '양념장 소분 게시글 목록'
            )}
          </span>
          <CardList selectedCategory={selectedCategory ?? undefined} />

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
