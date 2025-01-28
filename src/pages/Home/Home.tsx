import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.scss'
import { Heading } from '@/components/atoms/Text/TextFactory'
import SearchBar from '@/components/common/SearchBar/SearchBar'
import CategoryTab from '@/components/common/CategoryTabs/CategoryTabs'
import CardList from '@/components/common/CardList/CardList/CardList'
import Container from '@/components/atoms/Container/Container'
import Button from '@/components/common/Button/Button'
import { GoArrowUpRight } from 'react-icons/go'
import Banner from '@/components/features/Banner/Banner';

export const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  
  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName)
  }

  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate('/list');
  };

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
            <SearchBar width="95%" />
            <div className={styles.categorytabsContainer}>
            <CategoryTab onCategorySelect={handleCategorySelect} />
            </div>
          </div>
        </Container>
        <div className={styles.listContainer}>
          <Heading.Medium>양념장 소분 게시글 목록</Heading.Medium>
          <CardList selectedCategory={selectedCategory} />
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
