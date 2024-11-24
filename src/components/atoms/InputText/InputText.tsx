import styles from './InputText.module.scss'
import { IoIosSearch } from 'react-icons/io'

interface InputTextProps {
  height?: string
  width?: string
  placeholder?: string
}

function InputText({ height, width, placeholder }: InputTextProps) {
  return (
    <div className={styles.Wrapper} style={{ height, width }}>
      <input className={styles.InputWrapper} placeholder={placeholder} />
    </div>
  )
}

export default InputText
