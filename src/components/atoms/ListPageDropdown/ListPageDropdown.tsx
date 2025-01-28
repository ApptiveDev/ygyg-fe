import React from 'react'
import styles from './ListPageDropdown.module.scss'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

interface ListPageDropdownProps {
  isOpen: boolean
  selected: string
  options: string[]
  toggleDropdown: () => void
  handleOptionClick: (option: string) => void
}

const ListPageDropdown: React.FC<ListPageDropdownProps> = ({
  isOpen,
  selected,
  options,
  toggleDropdown,
  handleOptionClick,
}) => {
  return (
    <div className={styles.dropdownContainer}>
      <div className={`${styles.dropdown} ${isOpen ? styles.open : ''}`} onClick={toggleDropdown}>
        <div className={`${styles.selectedOption} ${selected ? styles.active : ''}`}>
          {selected}
          {isOpen ? (
            <IoIosArrowUp style={{ color: 'black', marginLeft: '5px' }} />
          ) : (
            <IoIosArrowDown style={{ color: 'black', marginLeft: '5px' }} />
          )}
        </div>
        {isOpen && (
          <div className={styles.optionsContainer}>
            {options.map((option, index) => (
              <div
                key={index}
                className={`${styles.option} ${selected === option ? styles.selected : ''}`}
                onClick={(e) => {
                  e.stopPropagation()
                  handleOptionClick(option)
                }}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ListPageDropdown
