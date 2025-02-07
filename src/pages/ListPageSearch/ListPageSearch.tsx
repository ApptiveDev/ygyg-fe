import styles from '@/pages/ListPageSearch/ListPageSearch.module.scss'
import CardList from '@/components/common/CardList/CardList/CardList'
import Toggle from '@/components/atoms/Toggle/Toggle'
import ListPageDropdown from '@/components/atoms/ListPageDropdown/ListPageDropdown'
import Pagination from '@/components/atoms/Pagination/Pagination'
import React, { useCallback, useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { getSearchPostList } from '@/api/hooks/card/cardApi'
import { CardData, PageInfo } from '@/api/hooks/card/types'
import Container from '@/components/atoms/Container/Container'

const ListPageSearch: React.FC = () => {
  const { search } = useParams<{ search: string }>()
  const [searchParams, setSearchParams] = useSearchParams()
  const [isChecked, setIsChecked] = useState<boolean>(searchParams.get('filter') === 'true')
  const [activePage, setActivePage] = useState<number>(Number(searchParams.get('page')) || 1)
  const [selected, setSelected] = useState<string>(searchParams.get('sort') || '최신 순')
  const [totalPages, setTotalPages] = useState<number>(0)
  const [initialTotalItems, setInitialTotalItems] = useState<number>(0)
  const [isOpen, setIsOpen] = useState(false)
  const [posts, setPosts] = useState<CardData[]>([])
  const [loading, setLoading] = useState(false)
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    totalItemsLength: 0,
    currentPage: 1,
    size: 9,
  })

  const options = ['최신 순', '약속 시간 임박 순', '낮은 가격 순', '남은 인원 적은 순']
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

  useEffect(() => {
    const fetchPosts = async () => {
      const sortBy = sortByMap[selected] || 'latest'
      setLoading(true)
      try {
        const response = await getSearchPostList({
          keyword: search!,
          sortBy,
          page: activePage,
          size: 9,
          isMinimumPeopleMet: isChecked,
        })
        setLoading(false)
        setPageInfo(response.pageInfoDto)
        setPosts(response.items)
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }
    fetchPosts()
  }, [search, isChecked, selected])

  useEffect(() => {
    if (pageInfo.totalItemsLength > 0) {
      if (initialTotalItems === 0 || search) {
        setInitialTotalItems(pageInfo.totalItemsLength)
        setTotalPages(Math.ceil(pageInfo.totalItemsLength / pageInfo.size))
      }
    }
  }, [search, pageInfo.totalItemsLength, pageInfo.size])

  useEffect(() => {
    setActivePage(1)
  }, [search])

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
  }

  useEffect(() => {
    const sort = searchParams.get('sort') || '최신 순'
    const filter = searchParams.get('filter') === 'true'
    const page = Number(searchParams.get('page')) || 1

    setSelected(sort)
    setIsChecked(filter)
    setActivePage(page)
  }, [searchParams])

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainbody}>
        <span className={styles.commentMain}>
          '<span className={styles.searchWordText}>{search}</span>' 의 검색 결과
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
        <CardList cards={posts} selectedCategory="" />
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

export { ListPageSearch }
