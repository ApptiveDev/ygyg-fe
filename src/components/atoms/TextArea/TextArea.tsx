import { colors } from '@/styles/colors'
import styled from '@emotion/styled'

type TextAreaProps = {
  invalid?: boolean
  customSize?: 'large' | 'small' | 'responsive'
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  error?: boolean
} & React.InputHTMLAttributes<HTMLTextAreaElement>

export const TextArea = (props: TextAreaProps) => <Input {...props} />

const Input = styled.textarea<Pick<TextAreaProps, 'invalid' | 'customSize' | 'error'>>(
  {
    width: '100%',
    boxSizing: 'border-box',
    color: '#191919',
    fontFamily: 'sans-serif',
    transition: 'border-color 200ms',
    border: '1px solid',
    borderRadius: '8px',
    padding: '18px',
    resize: 'none',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',

    '&:focus': {
      outline: 'none',
    },
    '&:disabled': {
      color: colors.gray2,
      cursor: 'not-allowed',
    },

    '&::placeholder': {
      color: '#7C7C7C',
    },
  },
  ({ customSize = 'responsive' }) => {
    const largeStyle = {
      minHeight: '230px',
      fontSize: '16px',
      lineHeight: '25px',
      padding: '20px 25px',
      display: 'inline-block',
      verticalAlign: 'top',
      textAlign: 'start',
    }

    const smallStyle = {
      minHeight: '62px',
      fontSize: '16px',
      lineHeight: '1.5',
      padding: '0px 20px',
    }

    if (customSize === 'large') return largeStyle
    if (customSize === 'small') return smallStyle
    return {}
  },
  ({ invalid = false, error = false }) => {
    if (invalid) {
      return {
        borderColor: '#7d7d7d',
      }
    }

    return {
      borderColor: error ? colors.point : 'transparent',
    }
  },
)
