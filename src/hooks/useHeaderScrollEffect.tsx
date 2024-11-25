import { useEffect, useState } from 'react'
import { css, SerializedStyles } from '@emotion/react'

function useHeaderScrollEffect() {
  const defaultStyle = css`
    box-shadow: none;
  `
  const scrolledStyle = css`
    box-shadow: 0 0 6px 5px rgba(0, 0, 0, 0.1);
  `
  const [headerStyle, setHeaderStyle] = useState<SerializedStyles>(defaultStyle)
  const onScroll = () => {
    if (window.scrollY > 25) {
      setHeaderStyle(scrolledStyle)
      return
    }
    setHeaderStyle(defaultStyle)
  }
  useEffect(() => {
    if (!window) return
    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return { headerStyle }
}

export default useHeaderScrollEffect
