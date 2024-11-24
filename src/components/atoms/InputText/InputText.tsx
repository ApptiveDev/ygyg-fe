import styles from './InputText.module.scss'

interface InputTextProps {
  height?: string
  width?: string
  value?: string
  placeholder?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  error?: boolean
}

function InputText({
  height,
  width,
  value,
  placeholder,
  onChange,
  error = false, // Default value is false
}: InputTextProps) {
  return (
    <div className={`${styles.Wrapper} ${error ? styles.error : ''}`} style={{ height, width }}>
      <input
        className={styles.InputWrapper} // Apply error class if there's an error
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default InputText
