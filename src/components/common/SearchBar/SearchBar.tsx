import styles from './SearchBar.module.scss'
import { IoIosSearch, IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io'

interface SearchBarProps {
  height?: string
  width?: string
  radius?: number
  value?: string
  placeholder?: string
  onChange: React.Dispatch<React.SetStateAction<string>>
  onSubmit?: (
    event: React.MouseEvent<HTMLOrSVGElement> | React.KeyboardEvent<HTMLInputElement>,
  ) => void
  onToggle?: () => void
  isOpen?: boolean
  toggleActive?: boolean
  error?: boolean
}

function SearchBar({
  height,
  width,
  radius = 32,
  value,
  placeholder,
  onChange,
  onSubmit,
  onToggle,
  isOpen,
  toggleActive,
  error = false,
}: SearchBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSubmit) {
      onSubmit(e) // Enter 키 눌렀을 때 onSubmit 실행
    }
  }
  return (
    <div
      className={`${styles.Wrapper} ${error ? styles.error : ''}`}
      style={{
        borderRadius: `${radius}px`,
        height: `${height}`,
        width: `${width}`,
      }}
    >
      <input
        className={styles.InputWrapper}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className={styles.arrowWrapper} onClick={onToggle}>
        {isOpen == null ? null : toggleActive ? (
          isOpen ? (
            <IoMdArrowDropup className={styles.toggleButton} />
          ) : (
            <IoMdArrowDropdown className={styles.toggleButton} />
          )
        ) : null}
      </div>
      <IoIosSearch onClick={onSubmit} className={styles.searchButton} />
    </div>
  )
}

export default SearchBar
