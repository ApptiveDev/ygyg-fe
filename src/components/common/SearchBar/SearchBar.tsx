import styles from './SearchBar.module.scss'
import { IoIosSearch } from 'react-icons/io'

interface SearchBarProps {
  height?: string
  width?: string
  placeholder?: string
}
function SearchBar({ height, width, placeholder }: SearchBarProps) {
  return (
    <div className={styles.Wrapper}>
      <input className={styles.InputWrapper} placeholder={placeholder} />
      <IoIosSearch style={{ height: '24px', width: '24px', color: `var(--point-color)` }} />
    </div>
  )
}

export default SearchBar
