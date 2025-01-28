import styles from '@/pages/ListPageCategory/ListPageCategory.module.scss'
import CategoryTab from '@/components/common/CategoryTabs/CategoryTabs'
import CardList from '@/components/common/CardList/CardList/CardList'
import Toggle from '@/components/atoms/Toggle/Toggle'
import ListPageDropdown from '@/components/atoms/ListPageDropdown/ListPageDropdown'
import Pagination from '@/components/atoms/Pagination/Pagination'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ListPageCategory: React.FC = () => {
  const { category } = useParams<{ category: string }>()
  const navigate = useNavigate()
  const [isChecked, setIsChecked] = useState(false)
  const [activePage, setActivePage] = useState<number>(1)
  const [selectedCategory, setSelectedCategory] = useState<string>(category || '')
  const totalPages = 8
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState('소분 게시물 전체 보기')

  const options = ['최신 순', '약속 시간 임박 순', '낮은 가격 순', '남은 인원 적은 순']

  const handleToggle = () => {
    setIsChecked((prev) => !prev)
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionClick = (option: string) => {
    setSelected(option)
    setIsOpen(false)
  }

  const handlePageClick = (page: number) => {
    setActivePage(page)
    console.log(`선택된 페이지: ${page}`)
  }

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName)
    console.log(`선택된 카테고리: ${categoryName}`)
    navigate(`/list/category/${categoryName}`)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.comment}>카테고리 선택하기</span>
        <div className={styles.wrapper}>
          <CategoryTab showText={false} onCategorySelect={handleCategorySelect} />
        </div>
      </div>

      <div className={styles.mainbody}>
        <span className={styles.commentMain}>
          {selectedCategory ? (
            <>
              '<span className={styles.selectedCategoryText}>{selectedCategory}</span>' 소분 게시글
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
        <CardList selectedCategory={selectedCategory} />
        <Pagination totalPages={totalPages} activePage={activePage} onPageClick={handlePageClick} />
      </div>
    </div>
  )
}

export { ListPageCategory }
