import styles from '@/pages/ListPageCategory/ListPageCategory.module.scss'
import CategoryTab from '@/components/common/CategoryTabs/CategoryTabs'
import CardList from '@/components/common/CardList/CardList/CardList'
import Toggle from '@/components/atoms/Toggle/Toggle'
import ListPageDropdown from '@/components/atoms/ListPageDropdown/ListPageDropdown'
import Pagination from '@/components/atoms/Pagination/Pagination'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { getCategoryPostList } from '@/api/hooks/card/cardApi'
import { CardData } from '@/api/hooks/card/types'

const ListPageCategory: React.FC = () => {
  const { category } = useParams<{ category: string }>()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [isChecked, setIsChecked] = useState<boolean>(searchParams.get('filter') === 'true')
  const [activePage, setActivePage] = useState<number>(Number(searchParams.get('page')) || 1)
  const [selected, setSelected] = useState<string>(searchParams.get('sort') || '최신 순')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(category || null)
  const totalPages = 8
  const [isOpen, setIsOpen] = useState(false)
  const [posts, setPosts] = useState<CardData[]>([])

  const options = ['최신 순', '약속 시간 임박 순', '낮은 가격 순', '남은 인원 적은 순']

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
    setSearchParams({
      sort: selected,
      filter: String(isChecked),
      page: String(activePage),
    })
  }, [selected, isChecked, activePage, setSearchParams])

  const fetchPosts = useCallback(async () => {
    const categoryId = selectedCategory ? categoryMap[selectedCategory] : 0
    const sortBy = sortByMap[selected] || 'latest'

    try {
      const response = await getCategoryPostList({
        categoryId: categoryId ?? undefined,
        sortBy,
        page: activePage,
        size: 9,
        isMinimumPeopleMet: isChecked,
      })

      setPosts(response.items)
    } catch (error) {
      console.error('Error fetching posts:', error)
    }
  }, [selectedCategory, selected, activePage, isChecked])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])
  useEffect(() => {
    console.log('Fetched posts:', posts)
  }, [posts])

  const handleToggle = () => {
    const newFilterState = !isChecked
    setIsChecked(newFilterState)
    setSearchParams({
      sort: selected,
      filter: String(newFilterState),
      page: String(activePage),
    })
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionClick = (option: string) => {
    setSelected(option)
    setIsOpen(false)
    setSearchParams({
      sort: option,
      filter: String(isChecked),
      page: String(activePage),
    })
  }

  const handlePageClick = (page: number) => {
    setActivePage(page)
    console.log(`선택된 페이지: ${page}`)
    setSearchParams({
      sort: selected,
      filter: String(isChecked),
      page: String(page),
    })
  }

  const handleCategorySelect = (categoryName: string) => {
    if (selectedCategory === categoryName) {
      setSelectedCategory(null)
    } else {
      setSelectedCategory(categoryName)
    }
  }

  useEffect(() => {
    if (!selectedCategory || selectedCategory === '0') {
      navigate(`/list?sort=${selected}&filter=${isChecked}&page=${activePage}`, { replace: true })
    } else {
      navigate(
        `/list/category/${selectedCategory}?sort=${selected}&filter=${isChecked}&page=${activePage}`,
        { replace: true },
      )
    }
  }, [selectedCategory, selected, isChecked, activePage, navigate])

  useEffect(() => {
    const sort = searchParams.get('sort') || '최신 순'
    const filter = searchParams.get('filter') === 'true'
    const page = Number(searchParams.get('page')) || 1

    setSelected(sort)
    setIsChecked(filter)
    setActivePage(page)
  }, [category, searchParams])

  const displayedCategory = selectedCategory
    ? categoryLabelMap[selectedCategory] || selectedCategory
    : ''

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.comment}>카테고리 선택하기</span>
        <div className={styles.wrapper}>
          <CategoryTab
            showText={false}
            initialSelected={category}
            onCategorySelect={handleCategorySelect}
          />
        </div>
      </div>

      <div className={styles.mainbody}>
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

        <div className={styles.toggleDropdownWrapper}>
          <Toggle isChecked={isChecked} onToggle={handleToggle} />
          <ListPageDropdown
            isOpen={isOpen}
            selected={selected}
            options={options}
            toggleDropdown={toggleDropdown}
            handleOptionClick={handleOptionClick}
          />
        </div>
        <CardList cards={posts} selectedCategory={selectedCategory ?? '0'} />
        <Pagination totalPages={totalPages} activePage={activePage} onPageClick={handlePageClick} />
      </div>
    </div>
  )
}

export { ListPageCategory }
