import styles from './InputText.module.scss'

interface InputTextProps {
  height?: string
  width?: string
  value?: string
  placeholder?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  error?: boolean
}

function InputText({ height, width, value, placeholder, onChange, error = false }: InputTextProps) {
  return (
    <div
      className={`${styles.Wrapper} ${error ? styles.error : ''}`}
      style={{ height: height, width: width }}
    >
      <input
        className={styles.InputWrapper}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default InputText
