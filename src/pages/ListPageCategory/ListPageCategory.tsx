import styles from '@/pages/ListPageCategory/ListPageCategory.module.scss'
import CategoryTab from '@/components/common/CategoryTabs/CategoryTabs'
import CardList from '@/components/common/CardList/CardList/CardList'
import Toggle from '@/components/atoms/Toggle/Toggle'
import ListPageDropdown from '@/components/atoms/ListPageDropdown/ListPageDropdown'
import Pagination from '@/components/atoms/Pagination/Pagination'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { getCategoryPostList } from '@/api/hooks/card/cardApi'
import { CardData, PageInfo } from '@/api/hooks/card/types'
import Container from '@/components/atoms/Container/Container'

const ListPageCategory: React.FC = () => {
  const { category } = useParams<{ category: string }>()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [isChecked, setIsChecked] = useState<boolean>(searchParams.get('filter') === 'true')
  const [activePage, setActivePage] = useState<number>(Number(searchParams.get('page')) || 1)
  const [selected, setSelected] = useState<string>(searchParams.get('sort') || '최신 순')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(category || null)
  const [isOpen, setIsOpen] = useState(false)
  const [posts, setPosts] = useState<CardData[]>([])
  const [loading, setLoading] = useState(false)
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    totalItemsLength: 0,
    currentPage: 1,
    size: 9,
  })

  const [totalPages, setTotalPages] = useState<number>(0)
  const [initialTotalItems, setInitialTotalItems] = useState<number>(0) // ✅ 최초 totalItemsLength 저장

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
    setLoading(true)
    try {
      const response = await getCategoryPostList({
        categoryId: categoryId ?? undefined,
        sortBy,
        page: activePage,
        size: 9,
        isMinimumPeopleMet: isChecked,
      })
      setLoading(false)
      setPosts(response.items)
      setPageInfo(response.pageInfoDto)
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

  useEffect(() => {
    if (pageInfo.totalItemsLength > 0) {
      setTotalPages(Math.ceil(pageInfo.totalItemsLength / pageInfo.size))
    }
  }, [selectedCategory, pageInfo.totalItemsLength, pageInfo.size])

  useEffect(() => {
    setActivePage(1)
  }, [selectedCategory])

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

    setSearchParams({
      sort: selected,
      filter: String(isChecked),
      page: String(page),
    })

    navigate(
      selectedCategory
        ? `/list/category/${selectedCategory}?sort=${selected}&filter=${isChecked}&page=${page}`
        : `/list?sort=${selected}&filter=${isChecked}&page=${page}`,
      { replace: true },
    )
  }

  const handleCategorySelect = (categoryName: string) => {
    if (selectedCategory === categoryName) {
      setSelectedCategory(null)
    } else {
      setSelectedCategory(categoryName)
    }
  }

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
              '
              <span className={styles.selectedCategoryText}>
                {categoryLabelMap[selectedCategory]}
              </span>
              ' 소분 게시글 목록
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

        {loading && (
          <Container align="center" justify="center" style={{ width: '100%', height: '100px' }}>
            Loading...
          </Container>
        )}
        <CardList cards={posts} selectedCategory={selectedCategory ?? '0'} />

        <Pagination
          totalItemsLength={pageInfo.totalItemsLength}
          size={pageInfo.size}
          activePage={activePage}
          totalPages={totalPages}
          onPageClick={handlePageClick}
        />
      </div>
    </div>
  )
}

export { ListPageCategory }
