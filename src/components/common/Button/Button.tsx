import { ButtonHTMLAttributes, ReactNode } from 'react'
import { css, withTheme } from '@emotion/react'
import { colors } from '@/styles/colors'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode
  children?: ReactNode
  theme: ButtonTheme
  width?: string
  height?: string
  margin?: string
  shadow?: string
  onClick?: () => void
}

const themeStyles = {
  red: {
    background: colors.point,
    color: 'white',
    border: 'none',
  },
  'light-outlined': {
    background: 'transparent',
    color: colors.point,
    border: `1px solid ${colors.point}`,
  },
  gray: {
    background: colors.gray3,
    color: 'white',
    border: 'none',
  },
  white: {
    background: 'white',
    color: `${colors.point}`,
    border: 'none',
  },
  'light-gray': {
    background: `${colors.gray1}`,
    color: `${colors.gray3}`,
    border: 'none',
  },
}

function Button({
  icon,
  children,
  theme,
  width,
  height,
  margin,
  shadow,
  onClick,
  ...rest
}: ButtonProps) {
  const { background, color, border } = themeStyles[theme] || themeStyles.red

  const buttonStyle = css`
    width: ${width || 'auto'};
    height: ${height || 'auto'};
    margin: ${margin || '0'};
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    padding: 16px 36px;
    box-shadow: ${shadow};
    word-wrap: break-word;
    word-break: keep-all;
    overflow-wrap: break-word;
    white-space: normal;
    font-size: 20px;
    font-weight: 700;
    border-radius: 36px;
    color: ${color};
    border: ${border};
    background-color: ${background};
    transition:
      background-color 0.3s ease,
      color 0.3s ease,
      border-color 0.3s ease;
    cursor: pointer;
  `

  const iconStyle = css`
    margin-right: 8px;
    display: flex;
    align-items: center;
  `

  return (
    <button css={buttonStyle} onClick={onClick} {...rest}>
      {icon && <span css={iconStyle}>{icon}</span>}
      {children}
    </button>
  )
}

type ButtonTheme = 'red' | 'light-outlined' | 'gray' | 'white' | 'light-gray'

export default Button
