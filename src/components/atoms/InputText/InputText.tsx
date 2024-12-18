import { ReactNode } from 'react'
import { TextBody } from '../Text/TextFactory'
import styles from './InputText.module.scss'

interface InputTextProps {
  height?: string
  width?: string
  value?: string
  placeholder?: string
  icon?: ReactNode
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
  error?: boolean
  isPassword?: boolean
  timer?: string
}

function InputText({
  height,
  width,
  value,
  placeholder,
  icon,
  onChange,
  onKeyDown,
  error = false,
  isPassword,
  timer,
}: InputTextProps) {
  return (
    <div
      className={`${styles.Wrapper} ${error ? styles.error : ''}`}
      style={{ height: height, width: width }}
    >
      <input
        className={styles.InputWrapper}
        placeholder={placeholder}
        type={isPassword ? 'password' : 'text'}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      {timer ? (
        <TextBody.XSmall style={{ width: '30px', color: 'var(--point-color)' }}>
          {timer}
        </TextBody.XSmall>
      ) : null}
      {icon ? icon : null}
    </div>
  )
}

export default InputText
