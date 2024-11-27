import { ReactNode, useRef, useState } from 'react'
import styles from './DropDown.module.scss'
import useDetectClick from '@/hooks/useDetectClick'
import { IoIosArrowDown } from 'react-icons/io'

interface DropdownProps {
  placeholder: string
  children: string[]
  width?: string
  setValue: (selectedValue: string) => void
}

function DropDown({ placeholder, children, width, setValue }: DropdownProps) {
  const dropDownRef = useRef<HTMLUListElement>(null)
  const [isOpen, setIsOpen] = useDetectClick({ elem: dropDownRef, initialState: false })
  const [value, setValueLocal] = useState<string>(placeholder)

  const handleUnitChange = (selectedValue: string) => {
    setValueLocal(selectedValue)
    setValue(selectedValue)
    setIsOpen(false)
  }

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsOpen((prev) => !prev)
  }
  console.log(isOpen)
  return (
    <div>
      <div className={styles.dropDownWrapper} style={{ width: width }} onClick={toggleDropdown}>
        {value}
        <IoIosArrowDown />
      </div>
      <ul
        ref={dropDownRef}
        style={{ width: width }}
        className={`${styles.dropDownMenu} ${isOpen ? styles.active : ''}`}
      >
        {children.map((value, index) => (
          <div key={index}>
            <li onClick={() => handleUnitChange(value)} className={styles.menu}>
              {value}
            </li>
            {index < children.length - 1 && <hr className={styles.separator} />}
          </div>
        ))}
      </ul>
    </div>
  )
}

export default DropDown
