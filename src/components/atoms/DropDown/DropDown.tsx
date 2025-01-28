import { useEffect, useRef, useState } from 'react'
import styles from './DropDown.module.scss'
import useDetectClick from '@/hooks/useDetectClick'
import { IoIosArrowDown } from 'react-icons/io'

interface DropdownProps {
  placeholder: string
  children: string[]
  width?: string
  initialValue?: string
  setValue: (selectedValue: string) => void
}

function DropDown({ placeholder, children, width, initialValue, setValue }: DropdownProps) {
  const dropDownRef = useRef<HTMLUListElement>(null)
  const [isOpen, setIsOpen] = useDetectClick({ elem: dropDownRef, initialState: false })
  const [value, setValueLocal] = useState<string>(placeholder)

  useEffect(() => {
    if (initialValue) {
      handleUnitChange(initialValue)
    }
  }, [initialValue])

  const handleUnitChange = (selectedValue: string) => {
    setValueLocal(selectedValue)
    setValue(selectedValue)
    setIsOpen(false)
  }

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsOpen((prev) => !prev)
  }

  const isPlaceholder = value === placeholder

  return (
    <div>
      <div
        className={styles.dropDownWrapper}
        style={{ width: width, color: isPlaceholder ? 'var(--gray-color3)' : 'var(--black-color)' }}
        onClick={toggleDropdown}
      >
        {value}
        <IoIosArrowDown style={{ color: 'var(--gray-color3)' }} />
      </div>
      <ul
        ref={dropDownRef}
        style={{ width: width }}
        className={`${styles.dropDownMenu} ${isOpen ? styles.active : ''}`}
      >
        {children.map((child, index) => (
          <div key={index}>
            <li onClick={() => handleUnitChange(child)} className={styles.menu}>
              {child}
            </li>
            {index < children.length - 1 && <hr className={styles.separator} />}
          </div>
        ))}
      </ul>
    </div>
  )
}

export default DropDown
